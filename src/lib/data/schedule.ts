export type SlotStatus = 'open' | 'pending' | 'confirmed' | 'locked' | 'completed';

export interface LeagueSlot {
  id: string;
  round: number;
  date: string;
  dateDisplay: string;
  club: string;
  host: string | null;
  teeTimeWindow: string;
  status: SlotStatus;
  notes?: string;
  resultsHref?: string;
}

export const leagueSlots: LeagueSlot[] = [
  {
    id: 'slot-saratoga',
    round: 1,
    date: '2026-06-10',
    dateDisplay: 'June 10–12, 2026',
    club: 'Saratoga National Golf Club',
    host: 'FOB Travel League',
    teeTimeWindow: 'Three Rounds',
    status: 'completed',
    notes: 'Saratoga Invitational — Champions: Bill Garofano & Hennessy. See the full flight results on the Travel League page.',
    resultsHref: '/travel-league',
  },
  {
    id: 'slot-5',
    round: 2,
    date: '2026-07-15',
    dateDisplay: 'July 15, 2026',
    club: 'Kernwood CC',
    host: 'Joe Wyson',
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-3',
    round: 3,
    date: '2026-07-30',
    dateDisplay: 'July 30, 2026',
    club: 'LeBarron Hills CC',
    host: null,
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-4',
    round: 4,
    date: '2026-08-12',
    dateDisplay: 'August 12, 2026',
    club: 'Plymouth CC',
    host: 'Anthony DeVirgilio',
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-7',
    round: 5,
    date: '2026-09-21',
    dateDisplay: 'September 21, 2026',
    club: 'Bellevue Golf Club',
    host: 'FOB Committee',
    teeTimeWindow: '8:00 AM Shotgun Start',
    status: 'confirmed',
    notes: 'Annual FOB Golf Tournament — flagship event',
  },
  {
    id: 'slot-nashua',
    round: 6,
    date: '2026-10-01',
    dateDisplay: 'October 2026 · Date TBA',
    club: 'Nashua Country Club',
    host: null,
    teeTimeWindow: 'Shotgun Start · TBA',
    status: 'pending',
    notes: 'Nashua, NH — Shotgun start golf outing at Nashua Country Club. Date and start time TBA. All proceeds benefit our featured charities.',
  },
];
