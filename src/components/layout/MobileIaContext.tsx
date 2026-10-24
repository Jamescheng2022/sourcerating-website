"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
} from "react";

export type IaMode = "directory" | "editorial";

interface MobileIaContextType {
  iaMode: IaMode;
  setIaMode: (mode: IaMode) => void;
  toggleIaMode: () => void;
}

const MobileIaContext = createContext<MobileIaContextType>({
  iaMode: "directory",
  setIaMode: () => {},
  toggleIaMode: () => {},
});

let inMemoryIaMode: IaMode | null = null;

export function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "sr_ia_mode" || !event.key) {
      if (event.newValue === "editorial" || event.newValue === "directory") {
        inMemoryIaMode = event.newValue;
      } else if (event.newValue === null) {
        inMemoryIaMode = null;
      }
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener("sr-ia-change", callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("sr-ia-change", callback);
  };
}

export function getSnapshot(): IaMode {
  if (typeof window === "undefined") return "directory";
  try {
    const params = new URLSearchParams(window.location.search);
    const urlIa = params.get("ia");
    if (urlIa === "editorial" || urlIa === "directory") {
      return urlIa;
    }
  } catch {
    // ignore
  }

  // Session override wins when the active tab chose a mode (including when storage write failed)
  if (inMemoryIaMode) {
    return inMemoryIaMode;
  }

  try {
    const saved = localStorage.getItem("sr_ia_mode");
    if (saved === "editorial" || saved === "directory") {
      return saved;
    }
  } catch {
    // ignore security / storage restrictions
  }

  return "directory";
}

export function getServerSnapshot(): IaMode {
  return "directory";
}

export function setIaMode(mode: IaMode) {
  if (typeof window === "undefined") return;

  // Record session in-memory override first so failed storage writes do not revert the UI
  inMemoryIaMode = mode;

  try {
    localStorage.setItem("sr_ia_mode", mode);
  } catch {
    // Storage blocked / private browsing mode / quota exceeded
  }

  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has("ia")) {
      url.searchParams.set("ia", mode);
      window.history.replaceState(window.history.state, "", url.toString());
    }
  } catch {
    // Invalid URL or history API blocked
  }

  try {
    window.dispatchEvent(new Event("sr-ia-change"));
  } catch {
    // Event dispatch error
  }
}

export function resetIaModeForTesting() {
  inMemoryIaMode = null;
}

export function MobileIaProvider({ children }: { children: React.ReactNode }) {
  const iaMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setIaModeCallback = useCallback((mode: IaMode) => {
    setIaMode(mode);
  }, []);

  const toggleIaMode = useCallback(() => {
    const nextMode = iaMode === "directory" ? "editorial" : "directory";
    setIaMode(nextMode);
  }, [iaMode]);

  return (
    <MobileIaContext.Provider
      value={{ iaMode, setIaMode: setIaModeCallback, toggleIaMode }}
    >
      {children}
    </MobileIaContext.Provider>
  );
}

export function useMobileIa() {
  return useContext(MobileIaContext);
}
