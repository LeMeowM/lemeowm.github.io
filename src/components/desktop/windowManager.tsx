// Window manager for the desktop shell.
//
// Two kinds of window exist:
//   panels   — the canonical terminal / image / settings windows. They live in a
//              fixed grid (no dragging), so the manager only tracks whether each
//              is shown, and which one is maximized over the desktop.
//   floating — blog and source readers. They register themselves on mount, get a
//              z-index from a counter so each new one opens in front, and appear
//              in the taskbar until closed.
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type PanelId = "terminal" | "profile" | "settings";

export type FloatingEntry = {
  key: string;
  title: string;
  icon: string;
  raise: () => void;
  close: () => void;
};

type WindowManager = {
  visible: Record<PanelId, boolean>;
  maximized: PanelId | null;
  show: (id: PanelId) => void;
  hide: (id: PanelId) => void;
  togglePanel: (id: PanelId) => void;
  toggleMaximize: (id: PanelId) => void;
  active: string | null;
  setActive: (key: string) => void;
  floating: FloatingEntry[];
  register: (entry: FloatingEntry) => void;
  unregister: (key: string) => void;
  /** Next z-index for a floating window; higher means further in front. */
  allocZ: () => number;
};

const noop = () => undefined;

const fallback: WindowManager = {
  visible: { terminal: true, profile: true, settings: true },
  maximized: null,
  show: noop,
  hide: noop,
  togglePanel: noop,
  toggleMaximize: noop,
  active: "terminal",
  setActive: noop,
  floating: [],
  register: noop,
  unregister: noop,
  allocZ: () => 200,
};

const WindowContext = createContext<WindowManager>(fallback);

export const useWindows = () => useContext(WindowContext);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<Record<PanelId, boolean>>({
    terminal: true,
    profile: true,
    settings: true,
  });
  const [maximized, setMaximized] = useState<PanelId | null>(null);
  const [active, setActiveKey] = useState<string | null>("terminal");
  const [floating, setFloating] = useState<FloatingEntry[]>([]);
  const zCounter = useRef(200);

  const show = useCallback((id: PanelId) => {
    setVisible(prev => ({ ...prev, [id]: true }));
    setActiveKey(id);
  }, []);

  const hide = useCallback((id: PanelId) => {
    setVisible(prev => ({ ...prev, [id]: false }));
    setMaximized(prev => (prev === id ? null : prev));
  }, []);

  const togglePanel = useCallback(
    (id: PanelId) =>
      setVisible(prev => {
        const next = !prev[id];
        if (next) setActiveKey(id);
        else setMaximized(m => (m === id ? null : m));
        return { ...prev, [id]: next };
      }),
    []
  );

  const toggleMaximize = useCallback((id: PanelId) => {
    setMaximized(prev => (prev === id ? null : id));
    setActiveKey(id);
  }, []);

  const setActive = useCallback((key: string) => setActiveKey(key), []);

  const register = useCallback((entry: FloatingEntry) => {
    setFloating(prev => {
      const i = prev.findIndex(e => e.key === entry.key);
      if (i === -1) return [...prev, entry];
      const next = [...prev];
      next[i] = entry;
      return next;
    });
  }, []);

  const unregister = useCallback((key: string) => {
    setFloating(prev => prev.filter(e => e.key !== key));
    setActiveKey(prev => (prev === key ? "terminal" : prev));
  }, []);

  const allocZ = useCallback(() => {
    zCounter.current += 1;
    return zCounter.current;
  }, []);

  const value = useMemo(
    () => ({
      visible,
      maximized,
      show,
      hide,
      togglePanel,
      toggleMaximize,
      active,
      setActive,
      floating,
      register,
      unregister,
      allocZ,
    }),
    [
      visible,
      maximized,
      show,
      hide,
      togglePanel,
      toggleMaximize,
      active,
      setActive,
      floating,
      register,
      unregister,
      allocZ,
    ]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};
