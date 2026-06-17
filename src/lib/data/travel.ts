// FOB Travel League — destination & invitational tournaments.
// Add a new event object to `travelEvents` after each trip.

export interface TravelTeam {
  place: string;        // '1st' | '2nd' | '3rd' | 'T2' | '4th'
  names: string;
  score: number;        // relative to par
  tiebreak?: boolean;   // resolved by tournament tiebreaker
}

export interface TravelFlight {
  flight: number;
  teams: TravelTeam[];
}

export interface TravelEvent {
  id: string;
  name: string;
  year: number;
  dates: string;
  venue: string;
  location: string;
  status: 'completed' | 'upcoming';
  blurb: string;
  summary: {
    players: number;
    flights: number;
    teamsPerFlight: number;
    teams: number;
    rounds: number;
  };
  flights: TravelFlight[];
  playoffTeams: { team: string; flight: number }[];
  champions: { team: string };
  runnerUp: { team: string };
  notes?: string[];
  /** Photos live in /public/images/saratoga. w/h are display dimensions (EXIF-applied). */
  gallery: { src: string; alt: string; w: number; h: number }[];
}

export const saratoga2026: TravelEvent = {
  id: 'saratoga-2026',
  name: 'Saratoga Invitational',
  year: 2026,
  dates: 'June 10–12, 2026',
  venue: 'Saratoga National Golf Club',
  location: 'Saratoga Springs, NY',
  status: 'completed',
  blurb:
    "FOB's flagship destination event — 56 players, four flights, three days of two-man team golf at Saratoga National, capped by a four-team championship playoff.",
  summary: {
    players: 56,
    flights: 4,
    teamsPerFlight: 7,
    teams: 28,
    rounds: 3,
  },
  flights: [
    {
      flight: 1,
      teams: [
        { place: '1st', names: 'DeVirgilio & Pettengill', score: -1 },
        { place: '2nd', names: 'Murphy & Viamari', score: -7 },
        { place: '3rd', names: "O'Leary & Vitale", score: -10 },
      ],
    },
    {
      flight: 2,
      teams: [
        { place: '1st', names: 'Garofano & Hennessy', score: 1 },
        { place: '2nd', names: 'Higley & Wunder', score: -18, tiebreak: true },
        { place: '3rd', names: 'Connors & DeVirgilio', score: -18, tiebreak: true },
      ],
    },
    {
      flight: 3,
      teams: [
        { place: '1st', names: 'Arbo & Sculac', score: -16 },
        { place: 'T2', names: 'Gennaro & Grittani', score: -17, tiebreak: true },
        { place: 'T2', names: 'Camuso & Mogauro', score: -17, tiebreak: true },
        { place: '4th', names: 'Busteed & Pratti', score: -22 },
      ],
    },
    {
      flight: 4,
      teams: [
        { place: '1st', names: 'Frattura & Veneziano', score: -1 },
        { place: '2nd', names: 'Archidiacono & DeVirgilio', score: -16 },
        { place: '3rd', names: 'Iuliano & McConaghy', score: -17 },
      ],
    },
  ],
  playoffTeams: [
    { team: 'DeVirgilio & Pettengill', flight: 1 },
    { team: 'Garofano & Hennessy', flight: 2 },
    { team: 'Arbo & Sculac', flight: 3 },
    { team: 'Frattura & Veneziano', flight: 4 },
  ],
  champions: { team: 'Bill Garofano & Hennessy' },
  runnerUp: { team: 'Vin Frattura & John Veneziano' },
  notes: [
    'Three rounds of golf at Saratoga National Golf Club over three days.',
    'A portion of every tournament entry supports FOB Charity.',
    'Saratoga National provided additional prizes through pro shop credits.',
    'Flight ties were resolved by the tournament tiebreaker.',
  ],
  gallery: [
    { src: '/images/saratoga/saratoga-1.jpeg', alt: 'A foursome on the course at Saratoga National', w: 480, h: 640 },
    { src: '/images/saratoga/saratoga-4.jpeg', alt: 'The group gathers at the clubhouse bar', w: 640, h: 480 },
    { src: '/images/saratoga/saratoga-3.jpeg', alt: 'FOB members at Saratoga National', w: 480, h: 640 },
    { src: '/images/saratoga/saratoga-6.jpeg', alt: 'FOB members in the Saratoga National clubhouse', w: 640, h: 480 },
    { src: '/images/saratoga/saratoga-5.jpeg', alt: 'Celebrating in the Saratoga National clubhouse', w: 480, h: 640 },
    { src: '/images/saratoga/saratoga-2.jpeg', alt: 'A foursome ready to tee off at Saratoga', w: 480, h: 640 },
    { src: '/images/saratoga/saratoga-7.jpeg', alt: 'Friends of Bellevue for the Dana-Farber Cancer Institute', w: 480, h: 640 },
  ],
};

export const travelEvents: TravelEvent[] = [saratoga2026];

export const featuredEvent = saratoga2026;
