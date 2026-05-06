export type SlotStatus = 'open' | 'pending' | 'confirmed' | 'locked';

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
}

export const leagueSlots: LeagueSlot[] = [
  {
    id: 'slot-1',
    round: 1,
    date: '2026-06-08',
    dateDisplay: 'June 8, 2026',
    club: 'TBD',
    host: null,
    teeTimeWindow: 'TBD',
    status: 'open',
  },
  {
    id: 'slot-2',
    round: 2,
    date: '2026-06-22',
    dateDisplay: 'June 22, 2026',
    club: 'TBD',
    host: null,
    teeTimeWindow: 'TBD',
    status: 'open',
  },
  {
    id: 'slot-3',
    round: 3,
    date: '2026-07-06',
    dateDisplay: 'July 6, 2026',
    club: 'TBD',
    host: null,
    teeTimeWindow: 'TBD',
    status: 'pending',
  },
  {
    id: 'slot-4',
    round: 4,
    date: '2026-07-30',
    dateDisplay: 'July 30, 2026',
    club: 'LeBarron Hills CC',
    host: null,
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-5',
    round: 5,
    date: '2026-08-12',
    dateDisplay: 'August 12, 2026',
    club: 'Plymouth CC',
    host: 'Anthony DeVirgilio',
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-6',
    round: 6,
    date: '2026-08-20',
    dateDisplay: 'August 20, 2026',
    club: 'Kernwood CC',
    host: 'Joe Wyson',
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'confirmed',
  },
  {
    id: 'slot-7',
    round: 7,
    date: '2026-09-07',
    dateDisplay: 'September 7, 2026',
    club: 'TBD',
    host: null,
    teeTimeWindow: 'TBD',
    status: 'open',
  },
  {
    id: 'slot-8',
    round: 8,
    date: '2026-09-21',
    dateDisplay: 'September 21, 2026',
    club: 'Bellevue Golf Club',
    host: 'FOB Committee',
    teeTimeWindow: '8:00 AM Shotgun Start',
    status: 'confirmed',
    notes: 'Annual FOB Golf Tournament — flagship event',
  },
];
