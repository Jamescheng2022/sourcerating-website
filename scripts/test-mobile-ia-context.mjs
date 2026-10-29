import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadMobileIaContext() {
  const file = "src/components/layout/MobileIaContext.tsx";
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const result = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
    },
    reportDiagnostics: true,
  });
  assert.equal((result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);

  const listeners = new Map();
  const mockStorage = {
    store: {},
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
    },
    setItem(key, value) {
      this.store[key] = String(value);
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  };

  const mockWindow = {
    location: {
      href: "https://www.sourcerating.com/",
      search: "",
    },
    history: {
      state: null,
      replaceState(state, title, url) {
        mockWindow.location.href = url;
        const u = new URL(url);
        mockWindow.location.search = u.search;
      },
    },
    localStorage: mockStorage,
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      if (listeners.has(type)) listeners.get(type).delete(handler);
    },
    dispatchEvent(event) {
      const set = listeners.get(event.type);
      if (set) {
        for (const handler of set) handler(event);
      }
      return true;
    },
  };

  class MockEvent {
    constructor(type) {
      this.type = type;
    }
  }

  class MockStorageEvent extends MockEvent {
    constructor(type, init = {}) {
      super(type);
      this.key = init.key ?? null;
      this.oldValue = init.oldValue ?? null;
      this.newValue = init.newValue ?? null;
    }
  }

  const compiledModule = { exports: {} };
  vm.runInNewContext(
    result.outputText,
    {
      module: compiledModule,
      exports: compiledModule.exports,
      window: mockWindow,
      localStorage: mockStorage,
      URL,
      URLSearchParams,
      Event: MockEvent,
      StorageEvent: MockStorageEvent,
      require(id) {
        if (id === "react") {
          return {
            default: { createElement: () => null },
            createElement: () => null,
            createContext: () => ({ Provider: () => null }),
            useContext: () => ({ iaMode: "directory" }),
            useSyncExternalStore: (sub, getSnap) => getSnap(),
            useCallback: fn => fn,
          };
        }
        throw new Error(`Unexpected import: ${id}`);
      },
    },
    { filename: file }
  );

  return {
    ...compiledModule.exports,
    mockWindow,
    mockStorage,
    MockStorageEvent,
  };
}

test("stale 'directory' stored, setItem throws, select 'editorial', expect the snapshot 'editorial'", () => {
  const ctx = loadMobileIaContext();

  // 1. Stale 'directory' stored in localStorage
  ctx.mockStorage.store["sr_ia_mode"] = "directory";
  assert.equal(ctx.getSnapshot(), "directory", "Initial snapshot reads stale storage");

  // 2. setItem throws (storage blocked, quota exceeded, or private browsing)
  ctx.mockStorage.setItem = () => {
    throw new Error("QuotaExceededError: write operation blocked");
  };

  // 3. Select 'editorial'
  ctx.setIaMode("editorial");

  // 4. Stale storage still has 'directory' because write failed
  assert.equal(ctx.mockStorage.store["sr_ia_mode"], "directory", "Storage was not updated");

  // 5. The snapshot must be 'editorial' because in-memory session override wins over stale storage
  assert.equal(ctx.getSnapshot(), "editorial", "Snapshot must yield 'editorial' despite failed storage write");
});

test("cross-tab sync updates in-memory session override when storage event arrives", () => {
  const ctx = loadMobileIaContext();
  let changeFired = 0;
  const unsubscribe = ctx.subscribe(() => {
    changeFired++;
  });

  // Start with editorial in session
  ctx.setIaMode("editorial");
  assert.equal(ctx.getSnapshot(), "editorial");

  // Another tab changes storage to directory
  const storageEvent = new ctx.MockStorageEvent("storage", {
    key: "sr_ia_mode",
    oldValue: "editorial",
    newValue: "directory",
  });
  ctx.mockWindow.dispatchEvent(storageEvent);

  assert.equal(ctx.getSnapshot(), "directory", "Cross-tab storage event updates active snapshot");
  assert.ok(changeFired > 0, "Subscriber was notified of cross-tab change");

  unsubscribe();
});

test("explicit URL parameter ?ia= takes precedence over both storage and session override", () => {
  const ctx = loadMobileIaContext();
  ctx.mockStorage.store["sr_ia_mode"] = "directory";
  ctx.mockWindow.location.search = "?ia=editorial";

  assert.equal(ctx.getSnapshot(), "editorial", "URL parameter wins");
});
