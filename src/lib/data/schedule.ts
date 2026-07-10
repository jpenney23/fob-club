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
    host: 'FOB Travel',
    teeTimeWindow: 'Three Rounds',
    status: 'completed',
    notes: 'Saratoga Invitational — Champions: Bill Garofano & Hennessy. See the full flight results on the Travel page.',
    resultsHref: '/travel-league',
  },
  {
    id: 'slot-5',
    round: 2,
    date: '2026-07-15',
    dateDisplay: 'July 15, 2026',
    club: 'Kernwood CC',
    host: 'Chip Seelig',
    teeTimeWindow: '12:00 PM Noon Start',
    status: 'locked',
  },
  {
    id: 'slot-3',
    round: 3,
    date: '2026-07-30',
    dateDisplay: 'July 30, 2026',
    club: 'LeBaron Hills CC',
    host: 'Wayne Campos',
    teeTimeWindow: '10:00 AM First Tee Time',
    status: 'open',
    notes: '$300 per player — includes box lunch, golf, appetizers, one drink after golf, and a charitable donation. Payments are made directly to FOB.',
  },
  {
    id: 'slot-4',
    round: 4,
    date: '2026-08-12',
    dateDisplay: 'August 12, 2026',
    club: 'Plymouth CC',
    host: 'Anthony DeVirgilio',
    teeTimeWindow: '12:30 PM Start',
    status: 'locked',
    notes: '$200 per player — includes golf and FOB charitable donation. Lobster Fest to follow (price TBA).',
  },
  {
    id: 'slot-7',
    round: 5,
    date: '2026-09-21',
    dateDisplay: 'September 21, 2026',
    club: 'Bellevue Golf Club',
    host: 'FOB Committee',
    teeTimeWindow: '8:00 AM Shotgun Start',
    status: 'locked',
    notes: 'Annual FOB Golf Tournament — flagship event. Morning (8:00 AM) and afternoon shotguns are both sold out.',
  },
  {
    id: 'slot-nashua',
    round: 6,
    date: '2026-10-05',
    dateDisplay: 'October 5, 2026',
    club: 'Nashua Country Club',
    host: null,
    teeTimeWindow: 'Shotgun Start · ~12:00 PM (TBA)',
    status: 'open',
    notes: 'Nashua, NH — All-inclusive $300 per player includes golf, food, and prizes for the winners. Payments are made directly to FOB. All proceeds benefit our featured charities.',
  },
];
