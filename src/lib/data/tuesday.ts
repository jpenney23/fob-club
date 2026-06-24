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
    date: '2026-05-19',
    dateDisplay: 'May 19, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 15,
    results: [
      { pos: '1',   name: 'Curcio, Tyson',       quotaDiff: 1,    gross: 43,   pts: 3 },
      { pos: '2',   name: 'Iuliano, Lou',         quotaDiff: 1,    gross: 44,   pts: 2 },
      { pos: '3',   name: 'Iuliano, Giro',        quotaDiff: 1,    gross: 41,   pts: 1 },
      { pos: '4',   name: 'Zedros, Alexander',    quotaDiff: 1,    gross: 44,   pts: 0.75 },
      { pos: '5',   name: 'Arbo, Ted',            quotaDiff: 0,    gross: 44,   pts: 0 },
      { pos: '6',   name: 'Masiello, Charles',    quotaDiff: 0,    gross: 46,   pts: 0 },
      { pos: '7',   name: 'Redler, William',      quotaDiff: -2,   gross: 45,   pts: 0 },
      { pos: '8',   name: 'McConaghy, Robert',    quotaDiff: -3,   gross: 46,   pts: 0 },
      { pos: '9',   name: 'Hastings, John',       quotaDiff: -3,   gross: 48,   pts: 0 },
      { pos: 'T10', name: 'Iuliano, Anthony',      quotaDiff: -3,   gross: 46,   pts: 0 },
      { pos: 'T10', name: 'Cassino, Mark',        quotaDiff: -3,   gross: 50,   pts: 0 },
      { pos: '11',  name: 'Catalagna, Paul',      quotaDiff: -3,   gross: 48,   pts: 0 },
      { pos: '12',  name: 'Arrigo, George',       quotaDiff: -4,   gross: 48,   pts: 0 },
      { pos: '13',  name: 'DeVirgilio, John',     quotaDiff: -4,   gross: 48,   pts: 0 },
      { pos: '14',  name: 'Picardo, Steve',       quotaDiff: -7,   gross: 50,   pts: 0 },
    ],
  },
  {
    round: 2,
    date: '2026-05-26',
    dateDisplay: 'May 26, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 16,
    results: [
      { pos: '1',   name: 'Finocchiaro, Joe',   quotaDiff: 3,  gross: 40, pts: 3 },
      { pos: '2',   name: 'Rotondi, Robert',     quotaDiff: 3,  gross: 38, pts: 2 },
      { pos: 'T3',  name: 'Arbo, Ted',           quotaDiff: 2,  gross: 42, pts: 1 },
      { pos: 'T3',  name: 'Catalagna, Paul',     quotaDiff: 2,  gross: 44, pts: 0.75 },
      { pos: 'T5',  name: 'Maher, Tim',          quotaDiff: 1,  gross: 39, pts: 0 },
      { pos: 'T5',  name: 'Masiello, Charles',   quotaDiff: 1,  gross: 46, pts: 0 },
      { pos: 'T5',  name: 'Hastings, John',      quotaDiff: 1,  gross: 44, pts: 0 },
      { pos: '8',   name: 'Iuliano, Lou',        quotaDiff: 0,  gross: 46, pts: 0 },
      { pos: 'T9',  name: 'Redler, William',     quotaDiff: -1, gross: 44, pts: 0 },
      { pos: 'T9',  name: 'Mallon, Joe',         quotaDiff: -1, gross: 42, pts: 0 },
      { pos: 'T11', name: 'Iuliano, Giro',       quotaDiff: -2, gross: 42, pts: 0 },
      { pos: 'T11', name: 'Cassino, Mark',       quotaDiff: -2, gross: 47, pts: 0 },
      { pos: 'T11', name: 'DeVirgilio, John',    quotaDiff: -2, gross: 46, pts: 0 },
      { pos: '14',  name: 'McConaghy, Robert',   quotaDiff: -3, gross: 45, pts: 0 },
      { pos: 'T15', name: 'Zedros, Alexander',   quotaDiff: -4, gross: 48, pts: 0 },
      { pos: 'T15', name: 'Cotton, Daniel',      quotaDiff: -4, gross: 44, pts: 0 },
    ],
  },
  {
    round: 3,
    date: '2026-06-02',
    dateDisplay: 'June 2, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 16,
    pot: 160,
    payouts: [
      { place: '1st', amount: 80 },
      { place: '2nd', amount: 40 },
      { place: '3rd', amount: 30 },
      { place: '4th', amount: 10 },
    ],
    results: [
      { pos: '1',   name: 'Cassino, Mark',      quotaDiff: 3,  gross: null, pts: 3 },
      { pos: 'T2',  name: 'McConaghy, Robert',  quotaDiff: 1,  gross: null, pts: 2 },
      { pos: 'T2',  name: 'Donnelly, Robert',   quotaDiff: 1,  gross: null, pts: 1 },
      { pos: '4',   name: 'Hastings, John',     quotaDiff: 0,  gross: null, pts: 0.75 },
      { pos: 'T5',  name: 'Finocchiaro, Joe',   quotaDiff: -1, gross: null, pts: 0 },
      { pos: 'T5',  name: 'Cotton, Daniel',     quotaDiff: -1, gross: null, pts: 0 },
      { pos: 'T5',  name: 'Iuliano, Giro',      quotaDiff: -1, gross: null, pts: 0 },
      { pos: 'T8',  name: 'DeVirgilio, John',   quotaDiff: -2, gross: null, pts: 0 },
      { pos: 'T8',  name: 'Iuliano, Lou',       quotaDiff: -2, gross: null, pts: 0 },
      { pos: 'T8',  name: 'Pisano, John',       quotaDiff: -2, gross: null, pts: 0 },
      { pos: 'T11', name: 'Picardo, Steve',     quotaDiff: -3, gross: null, pts: 0 },
      { pos: 'T11', name: 'Arrigo, George',     quotaDiff: -3, gross: null, pts: 0 },
      { pos: '13',  name: 'Zedros, Alexander',  quotaDiff: -4, gross: null, pts: 0 },
      { pos: '14',  name: 'Arbo, Ted',          quotaDiff: -5, gross: null, pts: 0 },
      { pos: 'T15', name: 'Curcio, Tyson',      quotaDiff: -6, gross: null, pts: 0 },
      { pos: 'T15', name: 'Redler, William',    quotaDiff: -6, gross: null, pts: 0 },
    ],
  },
  {
    round: 4,
    date: '2026-06-09',
    dateDisplay: 'June 9, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 4,
    results: [
      { pos: '1',   name: 'Arbo, Ted',          quotaDiff: 0,  gross: 44, pts: 1 },
      { pos: 'T2',  name: 'Cotton, Daniel',     quotaDiff: -2, gross: 45, pts: 0 },
      { pos: 'T2',  name: 'Hastings, John',     quotaDiff: -2, gross: 48, pts: 0 },
      { pos: '4',   name: 'Curcio, Tyson',      quotaDiff: -3, gross: 47, pts: 0 },
    ],
  },
  {
    round: 5,
    date: '2026-06-16',
    dateDisplay: 'June 16, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 17,
    results: [
      { pos: '1',  name: 'Hastings, John',       quotaDiff: 3,  gross: 43, pts: 3 },
      { pos: '2',  name: 'Fox, James',           quotaDiff: 1,  gross: 45, pts: 2 },
      { pos: '3',  name: 'Picardo, Steve',       quotaDiff: 1,  gross: 46, pts: 1 },
      { pos: '4',  name: 'Donnelly, Robert',     quotaDiff: 1,  gross: 54, pts: 0.75 },
      { pos: '5',  name: 'Arbo, Ted',            quotaDiff: 0,  gross: 43, pts: 0 },
      { pos: '6',  name: 'Redler, William',      quotaDiff: 0,  gross: 45, pts: 0 },
      { pos: '7',  name: 'Sacco, Joe',           quotaDiff: 0,  gross: 40, pts: 0 },
      { pos: '8',  name: 'Pippy, Doug',          quotaDiff: -1, gross: 47, pts: 0 },
      { pos: '9',  name: 'Kaloyanides, James',   quotaDiff: -2, gross: 41, pts: 0 },
      { pos: '10', name: 'Archidiacono, Victor', quotaDiff: -2, gross: 47, pts: 0 },
      { pos: '11', name: 'Iuliano, Lou',         quotaDiff: -3, gross: 49, pts: 0 },
      { pos: '12', name: 'Zedros, Alexander',    quotaDiff: -4, gross: 50, pts: 0 },
      { pos: '13', name: 'Brennan, Peter',       quotaDiff: -4, gross: 48, pts: 0 },
      { pos: '14', name: 'DeVirgilio, John',     quotaDiff: -5, gross: 48, pts: 0 },
      { pos: '15', name: 'Umile, Richard',       quotaDiff: -5, gross: 50, pts: 0 },
      { pos: '16', name: 'Maher, Tim',           quotaDiff: -5, gross: 45, pts: 0 },
      { pos: '17', name: 'Iuliano, Anthony',     quotaDiff: -6, gross: 49, pts: 0 },
    ],
  },
  {
    round: 6,
    date: '2026-06-23',
    dateDisplay: 'June 23, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 10,
    pot: 150,
    payouts: [
      { place: '1st', amount: 80 },
      { place: '2nd', amount: 40 },
      { place: '3rd', amount: 30 },
    ],
    results: [
      { pos: '1',  name: 'Finocchiaro, Joe',  quotaDiff: 4,  gross: 38, pts: 3 },
      { pos: '2',  name: 'Iuliano, Lou',      quotaDiff: 1,  gross: 45, pts: 2 },
      { pos: '3',  name: 'Donnelly, Robert',  quotaDiff: 0,  gross: 49, pts: 1 },
      { pos: '4',  name: 'Zedros, Alexander', quotaDiff: 0,  gross: 44, pts: 0.75 },
      { pos: '5',  name: 'Picardo, Steve',    quotaDiff: 0,  gross: 44, pts: 0 },
      { pos: '6',  name: 'DeVirgilio, John',  quotaDiff: -1, gross: 46, pts: 0 },
      { pos: '7',  name: 'Masiello, Charles', quotaDiff: -1, gross: 47, pts: 0 },
      { pos: '8',  name: 'McConaghy, Robert', quotaDiff: -2, gross: 43, pts: 0 },
      { pos: '9',  name: 'Pippy, Doug',       quotaDiff: -2, gross: 46, pts: 0 },
      { pos: '10', name: 'Redler, William',   quotaDiff: -4, gross: 48, pts: 0 },
    ],
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    round: i + 7,
    date: '',
    dateDisplay: 'TBD',
    location: 'Bellevue Golf Club',
    completed: false,
    results: [] as TuesdayRoundResult[],
  })),
];

// Players who participate in rounds but are not in the season-long league
// (guests from non-Bellevue clubs)
const SEASON_EXCLUDED = new Set([
  'Iuliano, Anthony',   // USGA/Mass Golf GC
  'Pisano, John',
  'Kaloyanides, James', // Boca Grove Golf & Tennis Club
  'Brennan, Peter',     // Indian Ridge Country Club
]);

// Build season standings from round results
function buildStandings(): TuesdaySeasonEntry[] {
  const playerMap = new Map<string, (number | null)[]>();

  // Initialize all known players
  tuesdayRounds[0].results.forEach(r => {
    if (SEASON_EXCLUDED.has(r.name)) return;
    playerMap.set(r.name, Array(TUESDAY_TOTAL_ROUNDS).fill(null));
  });

  // Fill in round points
  tuesdayRounds.forEach((round, ri) => {
    round.results.forEach(r => {
      if (SEASON_EXCLUDED.has(r.name)) return;
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
