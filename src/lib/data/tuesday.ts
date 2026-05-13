export interface TuesdayRoundResult {
  pos: string;
  name: string;
  quotaDiff: number | null;
  gross: number | null;
  pts: number;
}

export interface TuesdayRound {
  round: number;
  date: string;
  dateDisplay: string;
  location: string;
  completed: boolean;
  playerCount?: number;
  pot?: number;
  payouts?: { place: string; amount: number }[];
  results: TuesdayRoundResult[];
}

export interface TuesdaySeasonEntry {
  name: string;
  roundPoints: (number | null)[];
  totalPoints: number;
}

export const TUESDAY_SEASON_START = 'May 19, 2026';
export const TUESDAY_SEASON_END = 'August 30, 2026';
export const TUESDAY_TOTAL_ROUNDS = 14;

export const tuesdayRounds: TuesdayRound[] = [
  {
    round: 1,
    date: '2026-05-12',
    dateDisplay: 'May 12, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 15,
    pot: 150,
    payouts: [
      { place: '1st', amount: 80 },
      { place: '2nd', amount: 60 },
    ],
    results: [
      { pos: '1',   name: 'Curcio, Tyson',       quotaDiff: 2,    gross: null, pts: 4 },
      { pos: 'T2',  name: 'Devirgilio, John',     quotaDiff: 1,    gross: 45,   pts: 3 },
      { pos: 'T2',  name: 'McConaghy, Robert',    quotaDiff: -1,   gross: 45,   pts: 2 },
      { pos: 'T2',  name: 'Masiello, Charles',    quotaDiff: -1,   gross: 43,   pts: 1 },
      { pos: '5',   name: 'Catalagna, Paul',      quotaDiff: -1,   gross: 48,   pts: 0.75 },
      { pos: 'T6',  name: 'Cassino, Mark',        quotaDiff: -2,   gross: 47,   pts: 0 },
      { pos: 'T6',  name: 'Donnelly, Robert',     quotaDiff: -3,   gross: 48,   pts: 0 },
      { pos: 'T6',  name: 'Finocchiaro, Joe',     quotaDiff: -3,   gross: 58,   pts: 0 },
      { pos: 'T9',  name: 'Hastings, John',       quotaDiff: -3,   gross: 44,   pts: 0 },
      { pos: 'T9',  name: 'Iuliano, Lou',         quotaDiff: -4,   gross: 50,   pts: 0 },
      { pos: 'T11', name: 'Cotton, Daniel',       quotaDiff: -5,   gross: 49,   pts: 0 },
      { pos: 'T11', name: 'Picardo, Steve',       quotaDiff: -5,   gross: 45,   pts: 0 },
      { pos: 'T11', name: 'Zedros, Alexander',    quotaDiff: -5,   gross: 49,   pts: 0 },
      { pos: '14',  name: 'Leary, Joe',           quotaDiff: -6,   gross: 51,   pts: 0 },
      { pos: '15',  name: 'Redler, William',      quotaDiff: -7,   gross: 50,   pts: 0 },
    ],
  },
  ...Array.from({ length: 13 }, (_, i) => ({
    round: i + 2,
    date: '',
    dateDisplay: 'TBD',
    location: 'Bellevue Golf Club',
    completed: false,
    results: [] as TuesdayRoundResult[],
  })),
];

// Build season standings from round results
function buildStandings(): TuesdaySeasonEntry[] {
  const playerMap = new Map<string, (number | null)[]>();

  // Initialize all known players
  tuesdayRounds[0].results.forEach(r => {
    playerMap.set(r.name, Array(TUESDAY_TOTAL_ROUNDS).fill(null));
  });

  // Fill in round points
  tuesdayRounds.forEach((round, ri) => {
    round.results.forEach(r => {
      if (!playerMap.has(r.name)) {
        playerMap.set(r.name, Array(TUESDAY_TOTAL_ROUNDS).fill(null));
      }
      playerMap.get(r.name)![ri] = r.pts;
    });
  });

  return Array.from(playerMap.entries())
    .map(([name, roundPoints]) => ({
      name,
      roundPoints,
      totalPoints: roundPoints.reduce<number>((sum, p) => sum + (p ?? 0), 0),
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export const tuesdaySeasonStandings = buildStandings();
