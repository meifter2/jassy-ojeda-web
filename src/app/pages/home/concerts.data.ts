export type ConcertStatus = 'upcoming' | 'past';

export type Concert = {
  id: string;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  status: ConcertStatus;
  ticketUrl?: string;
};

export const CONCERTS: readonly Concert[] = [
  /*
  EJEMPLO DE PRÓXIMO CONCIERTO (NO SE RENDERIZA)
  {
    id: 'ejemplo-malaga-2026-12-15',
    day: '15',
    month: 'DIC',
    year: '2026',
    city: 'Málaga, España',
    venue: 'Concierto de ejemplo — Sala por confirmar',
    status: 'upcoming',
  },
  */
  {
    id: 'cochera-cabaret-2026-06-21',
    day: '21',
    month: 'JUN',
    year: '2026',
    city: 'Málaga, España',
    venue: 'Cochera Cabaret',
    status: 'past',
  },
  {
    id: 'isla-sonica-2026-06-06',
    day: '6',
    month: 'JUN',
    year: '2026',
    city: 'Isla Cristina (Huelva), España',
    venue: 'Isla Sónica',
    status: 'past',
  },
  {
    id: 'teatre-del-raval-2026-05-09',
    day: '9',
    month: 'MAY',
    year: '2026',
    city: 'Gandía, España',
    venue: 'Teatre del Raval',
    status: 'past',
  },
  {
    id: 'sala-silikona-2026-05-02',
    day: '2',
    month: 'MAY',
    year: '2026',
    city: 'Madrid, España',
    venue: 'Sala Silikona',
    status: 'past',
  },
  {
    id: 'garage-bar-elviris-2026-04-19',
    day: '19',
    month: 'ABR',
    year: '2026',
    city: 'Jaén, España',
    venue: 'Garage Bar Elviris',
    status: 'past',
  },
  {
    id: 'sala-sideral-2026-04-18',
    day: '18',
    month: 'ABR',
    year: '2026',
    city: 'Albacete, España',
    venue: 'Sala Sideral',
    status: 'past',
  },
  {
    id: 'sala-rem-2026-04-04',
    day: '4',
    month: 'ABR',
    year: '2026',
    city: 'Murcia, España',
    venue: 'Sala Rem',
    status: 'past',
  },
  {
    id: 'sala-vesta-2026-04-03',
    day: '3',
    month: 'ABR',
    year: '2026',
    city: 'Madrid, España',
    venue: 'Sala Vesta',
    status: 'past',
  },
  {
    id: 'gong-galaxy-club-2026-03-28',
    day: '28',
    month: 'MAR',
    year: '2026',
    city: 'Oviedo, España',
    venue: 'Gong Galaxy Club',
    status: 'past',
  },
  {
    id: 'magclub-final-band-slam-2025-11-15',
    day: '15',
    month: 'NOV',
    year: '2025',
    city: 'Gibraltar, Reino Unido',
    venue: 'Sala MagClub – Final Band Slam 2025 (2º Puesto)',
    status: 'past',
  },
  {
    id: 'magclub-band-slam-2025-11-08',
    day: '08',
    month: 'NOV',
    year: '2025',
    city: 'Gibraltar, Reino Unido',
    venue: 'Sala MagClub – Band Slam 2025',
    status: 'past',
  },
  {
    id: 'malagacrea-2025-09-18',
    day: '18',
    month: 'SEP',
    year: '2025',
    city: 'Málaga, España',
    venue: 'Eduardo Ocón – MálagaCrea (3º Puesto)',
    status: 'past',
  },
  {
    id: 'brisa-festival-2025-07-26',
    day: '26',
    month: 'JUL',
    year: '2025',
    city: 'Málaga, España',
    venue: 'Brisa Festival',
    status: 'past',
  },
  {
    id: 'red-friday-2025-04-25',
    day: '25',
    month: 'ABR',
    year: '2025',
    city: 'Málaga, España',
    venue: 'La Térmica – Red Friday',
    status: 'past',
  },
  {
    id: 'brisa-en-tu-barrio-2024-07-26',
    day: '26',
    month: 'JUL',
    year: '2024',
    city: 'Málaga, España',
    venue: 'Eduardo Ocón – Brisa En Tu Barrio',
    status: 'past',
  },
];
