'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SessionId } from '@/lib/data/tuesday';

interface TuesdaySessionValue {
  activeSession: SessionId;
  setActiveSession: (id: SessionId) => void;
}

const TuesdaySessionContext = createContext<TuesdaySessionValue | null>(null);

export function TuesdaySessionProvider({ children }: { children: ReactNode }) {
  const [activeSession, setActiveSession] = useState<SessionId>(2);
  return (
    <TuesdaySessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </TuesdaySessionContext.Provider>
  );
}

export function useTuesdaySession(): TuesdaySessionValue {
  const ctx = useContext(TuesdaySessionContext);
  if (!ctx) throw new Error('useTuesdaySession must be used within a TuesdaySessionProvider');
  return ctx;
}
