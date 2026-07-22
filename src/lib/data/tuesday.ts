export interface TuesdayRoundResult {
  pos: string;
  name: string;
  quotaDiff: number | null;
  gross: number | null;
  pts: number;
}

// Session 2 rounds are entered without pts — they're computed from field size + finish.
type RawResult = Omit<TuesdayRoundResult, 'pts'> & { pts?: number };

interface RawRound {
  date: string;
  dateDisplay: string;
  location: string;
  completed: boolean;
  playerCount?: number;
  pot?: number;
  payouts?: { place: string; amount: number }[];
  results: RawResult[];
}

export interface TuesdayRound extends RawRound {
  round: number;         // season-wide round number (1-based)
  session: 1 | 2;
  sessionRound: number;  // round number within its session (1-based)
  results: TuesdayRoundResult[];
}

export interface TuesdaySeasonEntry {
  name: string;
  roundPoints: (number | null)[];
  totalPoints: number;
  droppedCount: number;  // # of mulligan-week (lowest) scores dropped from the total
}

export const TUESDAY_SEASON_START = 'May 19, 2026';
export const TUESDAY_SEASON_END = 'August 30, 2026';
export const FOB_CUP_CHAMPIONSHIP = 'September 1, 2026';

export const SESSION1_ROUNDS = 7;
export const SESSION2_ROUNDS = 7;
export const TUESDAY_TOTAL_ROUNDS = SESSION1_ROUNDS + SESSION2_ROUNDS;

// Format points: whole numbers plain, fractions trimmed (8.20 -> 8.2, 0.75 -> 0.75)
export const fmtPts = (n: number): string =>
  Number.isInteger(n) ? String(n) : String(+n.toFixed(2));

// ── Session 1 (May 19 – June 30) — complete. Legacy scoring: 1st 3, 2nd 2, 3rd 1, 4th 0.75.
const session1Raw: RawRound[] = [
  {
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
      { pos: 'T10', name: 'Iuliano, Anthony',     quotaDiff: -3,   gross: 46,   pts: 0 },
      { pos: 'T10', name: 'Cassino, Mark',        quotaDiff: -3,   gross: 50,   pts: 0 },
      { pos: '11',  name: 'Catalagna, Paul',      quotaDiff: -3,   gross: 48,   pts: 0 },
      { pos: '12',  name: 'Arrigo, George',       quotaDiff: -4,   gross: 48,   pts: 0 },
      { pos: '13',  name: 'DeVirgilio, John',     quotaDiff: -4,   gross: 48,   pts: 0 },
      { pos: '14',  name: 'Picardo, Steve',       quotaDiff: -7,   gross: 50,   pts: 0 },
    ],
  },
  {
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
  {
    date: '2026-06-30',
    dateDisplay: 'June 30, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 12,
    pot: 180,
    payouts: [
      { place: '1st', amount: 90 },
      { place: '2nd', amount: 40 },
      { place: '3rd', amount: 30 },
      { place: '4th', amount: 20 },
    ],
    results: [
      { pos: '1',  name: 'Iuliano, Lou',      quotaDiff: 2,  gross: 45, pts: 3 },
      { pos: '2',  name: 'Cassino, Mark',     quotaDiff: 2,  gross: 43, pts: 2 },
      { pos: '3',  name: 'Redler, William',   quotaDiff: 1,  gross: 44, pts: 1 },
      { pos: '4',  name: 'McConaghy, Robert', quotaDiff: 1,  gross: 42, pts: 0.75 },
      { pos: '5',  name: 'Donnelly, Robert',  quotaDiff: 0,  gross: 51, pts: 0 },
      { pos: '6',  name: 'Hastings, John',    quotaDiff: 0,  gross: 47, pts: 0 },
      { pos: '7',  name: 'DeVirgilio, John',  quotaDiff: -2, gross: 49, pts: 0 },
      { pos: '8',  name: 'Curcio, Tyson',     quotaDiff: -2, gross: 45, pts: 0 },
      { pos: '9',  name: 'Zedros, Alexander', quotaDiff: -3, gross: 48, pts: 0 },
      { pos: '10', name: 'Fox, James',        quotaDiff: -3, gross: 50, pts: 0 },
      { pos: '11', name: 'Pippy, Doug',       quotaDiff: -4, gross: 48, pts: 0 },
      { pos: '12', name: 'Finocchiaro, Joe',  quotaDiff: -4, gross: 46, pts: 0 },
    ],
  },
];

// ── Session 2 (begins July 14) — clean slate, new FOB Cup point system.
// Points are computed from field size + finish; do NOT hand-enter pts here.
const session2Raw: RawRound[] = [
  {
    date: '2026-07-14',
    dateDisplay: 'July 14, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 8,
    results: [
      { pos: '1', name: 'Picardo, Steve',    quotaDiff: 4,  gross: 44 },
      { pos: '2', name: 'Iuliano, Lou',      quotaDiff: 1,  gross: 45 },
      { pos: '3', name: 'Zedros, Alexander', quotaDiff: 1,  gross: 47 },
      { pos: '4', name: 'Hastings, John',    quotaDiff: -1, gross: 46 },
      { pos: '5', name: 'McConaghy, Robert', quotaDiff: -2, gross: 43 },
      { pos: '6', name: 'Finocchiaro, Joe',  quotaDiff: -2, gross: 43 },
      { pos: '7', name: 'DeVirgilio, John',  quotaDiff: -3, gross: 48 },
      { pos: '8', name: 'Masiello, Charles', quotaDiff: -3, gross: 51 },
    ],
  },
  {
    date: '2026-07-21',
    dateDisplay: 'July 21, 2026',
    location: 'Bellevue Golf Club',
    completed: true,
    playerCount: 13,
    results: [
      { pos: '1',  name: 'Iuliano, Lou',      quotaDiff: 3,  gross: 44 },
      { pos: '2',  name: 'Donnelly, Robert',  quotaDiff: 1,  gross: 44 },
      { pos: '3',  name: 'Finocchiaro, Joe',  quotaDiff: 0,  gross: 41 },
      { pos: '4',  name: 'McConaghy, Robert', quotaDiff: 0,  gross: 42 },
      { pos: '5',  name: 'Cotton, Daniel',    quotaDiff: -1, gross: 42 },
      { pos: '6',  name: 'Picardo, Steve',    quotaDiff: -1, gross: 48 },
      { pos: '7',  name: 'DeVirgilio, John',  quotaDiff: -2, gross: 47 },
      { pos: '8',  name: 'Masiello, Charles', quotaDiff: -2, gross: 47 },
      { pos: '9',  name: 'Catalagna, Paul',   quotaDiff: -3, gross: 48 },
      { pos: '10', name: 'Redler, William',   quotaDiff: -3, gross: 42 },
      { pos: '11', name: 'Rotondi, Robert',   quotaDiff: -4, gross: 44 },
      { pos: '12', name: 'Hastings, John',    quotaDiff: -6, gross: 52 },
      { pos: '13', name: 'Zedros, Alexander', quotaDiff: -6, gross: 52 },
    ],
  },
  // Remaining Session 2 weeks — TBD
  ...Array.from({ length: SESSION2_ROUNDS - 2 }, () => ({
    date: '',
    dateDisplay: 'TBD',
    location: 'Bellevue Golf Club',
    completed: false,
    results: [] as RawResult[],
  })),
];

// FOB Cup Session 2 scoring:
//   Points = (finish % × field size) + 1 participation point.
//   1st = 100%, 2nd = 90% … 10th = 10%, 11th+ = 0% (participation only).
//   Tied finishers share the average of the percentages they span.
function computeSession2Points(results: RawResult[], fieldSize: number): number[] {
  const pctForRank = (rank: number) => (rank <= 10 ? (100 - (rank - 1) * 10) / 100 : 0);
  const pts: number[] = new Array(results.length).fill(0);
  let i = 0;
  while (i < results.length) {
    let j = i;
    while (j + 1 < results.length && results[j + 1].pos === results[i].pos) j++;
    let sumPct = 0;
    for (let rank = i + 1; rank <= j + 1; rank++) sumPct += pctForRank(rank);
    const avgPct = sumPct / (j - i + 1);
    const value = Math.round((avgPct * fieldSize + 1) * 100) / 100;
    for (let k = i; k <= j; k++) pts[k] = value;
    i = j + 1;
  }
  return pts;
}

function assembleRounds(): TuesdayRound[] {
  const rounds: TuesdayRound[] = [];
  let roundNum = 0;

  session1Raw.forEach((r, i) => {
    roundNum += 1;
    rounds.push({
      ...r,
      round: roundNum,
      session: 1,
      sessionRound: i + 1,
      results: r.results.map(res => ({ ...res, pts: res.pts ?? 0 })),
    });
  });

  session2Raw.forEach((r, i) => {
    roundNum += 1;
    const fieldSize = r.playerCount ?? r.results.length;
    const computed = computeSession2Points(r.results, fieldSize);
    rounds.push({
      ...r,
      round: roundNum,
      session: 2,
      sessionRound: i + 1,
      results: r.results.map((res, k) => ({ ...res, pts: computed[k] ?? 0 })),
    });
  });

  return rounds;
}

export const tuesdayRounds: TuesdayRound[] = assembleRounds();

export const tuesdaySession1Rounds = tuesdayRounds.filter(r => r.session === 1);
export const tuesdaySession2Rounds = tuesdayRounds.filter(r => r.session === 2);

// Players who compete but are not in the season-long league (guests from other clubs)
const SEASON_EXCLUDED = new Set([
  'Iuliano, Anthony',   // USGA/Mass Golf GC
  'Pisano, John',
  'Kaloyanides, James', // Boca Grove Golf & Tennis Club
  'Brennan, Peter',     // Indian Ridge Country Club
]);

// Build session standings.
//   applyMulligan: drop each player's two lowest weekly totals once they've
//   played more than 2 rounds (the "two mulligan weeks per session" rule).
function buildStandings(
  rounds: TuesdayRound[],
  totalRounds: number,
  applyMulligan: boolean,
): TuesdaySeasonEntry[] {
  const playerMap = new Map<string, (number | null)[]>();

  rounds.forEach((round, ri) => {
    round.results.forEach(r => {
      if (SEASON_EXCLUDED.has(r.name)) return;
      if (!playerMap.has(r.name)) playerMap.set(r.name, Array(totalRounds).fill(null));
      playerMap.get(r.name)![ri] = r.pts;
    });
  });

  return Array.from(playerMap.entries())
    .map(([name, roundPoints]) => {
      const played = roundPoints.filter((p): p is number => p !== null);
      let total = played.reduce((sum, p) => sum + p, 0);
      let droppedCount = 0;

      if (applyMulligan && played.length > 2) {
        const sorted = [...played].sort((a, b) => a - b);
        droppedCount = 2;
        total -= sorted[0] + sorted[1];
      }

      return {
        name,
        roundPoints,
        totalPoints: Math.round(total * 100) / 100,
        droppedCount,
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export const tuesdaySession1Standings = buildStandings(
  tuesdaySession1Rounds,
  SESSION1_ROUNDS,
  false,
);
export const tuesdaySession2Standings = buildStandings(
  tuesdaySession2Rounds,
  SESSION2_ROUNDS,
  true,
);

// Single source of truth for per-session UI (toggle, podium, standings)
export type SessionId = 1 | 2;

export interface TuesdaySessionMeta {
  id: SessionId;
  label: string;
  status: 'Live' | 'Complete';
  standings: TuesdaySeasonEntry[];
  rounds: TuesdayRound[];
  totalRounds: number;
  scoringNote: string;
}

export const tuesdaySessions: TuesdaySessionMeta[] = [
  {
    id: 2,
    label: 'Session 2',
    status: 'Live',
    standings: tuesdaySession2Standings,
    rounds: tuesdaySession2Rounds,
    totalRounds: SESSION2_ROUNDS,
    scoringNote: 'Points = field size × finish % + 1 participation point · 2 mulligan weeks dropped',
  },
  {
    id: 1,
    label: 'Session 1',
    status: 'Complete',
    standings: tuesdaySession1Standings,
    rounds: tuesdaySession1Rounds,
    totalRounds: SESSION1_ROUNDS,
    scoringNote: 'Session 1 is final — Lou Iuliano & Joe Finn advance to the FOB Cup Playoffs',
  },
];

export const getTuesdaySession = (id: SessionId): TuesdaySessionMeta =>
  tuesdaySessions.find(s => s.id === id) ?? tuesdaySessions[0];
