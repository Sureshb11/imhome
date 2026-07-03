import React, { createContext, useContext, useRef, useCallback } from 'react';

export type SectionId =
  | 'how'
  | 'services'
  | 'biosensors'
  | 'monitoring'
  | 'doctors'
  | 'activity'
  | 'cta';

type ScrollCtx = {
  // Section components report their Y offset within the ScrollView here.
  registerSection: (id: SectionId, y: number) => void;
  // Nav links call this to smooth-scroll to a section (replaces anchor links).
  scrollToSection: (id: SectionId) => void;
};

const Ctx = createContext<ScrollCtx | null>(null);

const NAV_HEIGHT = 68; // keep target below the fixed nav bar

export function ScrollProvider({
  children,
  scrollTo,
}: {
  children: React.ReactNode;
  scrollTo: (y: number) => void;
}) {
  const offsets = useRef<Record<string, number>>({});

  const registerSection = useCallback((id: SectionId, y: number) => {
    offsets.current[id] = y;
  }, []);

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const y = offsets.current[id];
      if (y != null) scrollTo(Math.max(0, y - NAV_HEIGHT));
    },
    [scrollTo]
  );

  return (
    <Ctx.Provider value={{ registerSection, scrollToSection }}>
      {children}
    </Ctx.Provider>
  );
}

export function useScrollNav() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useScrollNav must be used within ScrollProvider');
  return ctx;
}
