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

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("sr-ia-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sr-ia-change", callback);
  };
}

function getSnapshot(): IaMode {
  if (typeof window === "undefined") return "directory";
  try {
    const params = new URLSearchParams(window.location.search);
    const urlIa = params.get("ia");
    if (urlIa === "editorial" || urlIa === "directory") {
      return urlIa;
    }
    const saved = localStorage.getItem("sr_ia_mode");
    if (saved === "editorial" || saved === "directory") {
      return saved;
    }
  } catch {
    // ignore security / storage restrictions
  }
  return "directory";
}

function getServerSnapshot(): IaMode {
  return "directory";
}

export function MobileIaProvider({ children }: { children: React.ReactNode }) {
  const iaMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setIaMode = useCallback((mode: IaMode) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sr_ia_mode", mode);
        window.dispatchEvent(new Event("sr-ia-change"));
      } catch {
        // ignore
      }
    }
  }, []);

  const toggleIaMode = useCallback(() => {
    const nextMode = iaMode === "directory" ? "editorial" : "directory";
    setIaMode(nextMode);
  }, [iaMode, setIaMode]);

  return (
    <MobileIaContext.Provider value={{ iaMode, setIaMode, toggleIaMode }}>
      {children}
    </MobileIaContext.Provider>
  );
}

export function useMobileIa() {
  return useContext(MobileIaContext);
}
