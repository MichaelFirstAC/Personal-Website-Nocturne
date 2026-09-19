import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type CompanionId = 'galaxia' | 'invader' | 'pacman';

interface DragState {
  id: CompanionId;
  x: number;
  y: number;
}

interface ArcadeContextValue {
  /** Currently dragging companion info, null when idle */
  draggingCompanion: DragState | null;
  /** Update the drag position of a companion */
  setDragging: (state: DragState | null) => void;
  /** Which game is currently being played */
  activeGame: CompanionId | null;
  /** Launch a game by companion ID */
  launchGame: (id: CompanionId) => void;
  /** Close the active game */
  closeGame: () => void;
  /** Register the dock element for hit-testing */
  registerDock: (el: HTMLElement | null) => void;
  /** Check if a point is over the dock */
  isOverDock: (x: number, y: number) => boolean;
  /** Whether something is currently hovering over the dock */
  dockHovered: boolean;
  setDockHovered: (v: boolean) => void;
}

const ArcadeContext = createContext<ArcadeContextValue | null>(null);

export const useArcade = () => {
  const ctx = useContext(ArcadeContext);
  if (!ctx) throw new Error('useArcade must be used within ArcadeProvider');
  return ctx;
};

export const ArcadeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draggingCompanion, setDraggingCompanion] = useState<DragState | null>(null);
  const [activeGame, setActiveGame] = useState<CompanionId | null>(null);
  const [dockHovered, setDockHovered] = useState(false);
  const dockRef = useRef<HTMLElement | null>(null);

  const setDragging = useCallback((state: DragState | null) => {
    setDraggingCompanion(state);
    if (!state) setDockHovered(false);
  }, []);

  const launchGame = useCallback((id: CompanionId) => {
    setActiveGame(id);
    setDraggingCompanion(null);
    setDockHovered(false);
  }, []);

  const closeGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  const registerDock = useCallback((el: HTMLElement | null) => {
    dockRef.current = el;
  }, []);

  const isOverDock = useCallback((x: number, y: number): boolean => {
    if (!dockRef.current) return false;
    const rect = dockRef.current.getBoundingClientRect();
    // Generous hit area (expanded by 20px each side for easier drop)
    const pad = 20;
    return (
      x >= rect.left - pad &&
      x <= rect.right + pad &&
      y >= rect.top - pad &&
      y <= rect.bottom + pad
    );
  }, []);

  return (
    <ArcadeContext.Provider
      value={{
        draggingCompanion,
        setDragging,
        activeGame,
        launchGame,
        closeGame,
        registerDock,
        isOverDock,
        dockHovered,
        setDockHovered,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  );
};
