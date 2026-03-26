export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  description: string;
  hourlyRate: number;
  radius: number;
  location: string;
  verified: boolean;
  completedJobs: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  customerName: string;
  status: 'open' | 'in_progress' | 'completed';
  suggestedPrice: { min: number; max: number };
  createdAt: string;
  details?: {
    dimensions?: string;
    materials?: string;
    preparation?: string;
    tools?: string;
  };
}

export interface Offer {
  id: string;
  taskId: string;
  providerId: string;
  provider: Provider;
  price: number;
  message: string;
  estimatedDuration: string;
  createdAt: string;
}

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Michael Schmidt',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    rating: 4.9,
    reviewCount: 87,
    skills: ['Furniture Assembly', 'Mounting', 'Moving'],
    description: 'Erfahrener Handwerker mit 10 Jahren Erfahrung im Raum Stuttgart.',
    hourlyRate: 45,
    radius: 20,
    location: 'Stuttgart-Mitte',
    verified: true,
    completedJobs: 145,
  },
  {
    id: '2',
    name: 'Anna Müller',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    rating: 4.8,
    reviewCount: 62,
    skills: ['Painting', 'Furniture Assembly', 'Shelving'],
    description: 'Spezialisiert auf Malerarbeiten und Möbelmontage.',
    hourlyRate: 40,
    radius: 15,
    location: 'Stuttgart-West',
    verified: true,
    completedJobs: 98,
  },
  {
    id: '3',
    name: 'Thomas Weber',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 34,
    skills: ['Moving', 'Heavy Lifting', 'Assembly'],
    description: 'Zuverlässiger Umzugshelfer und Möbelmonteur.',
    hourlyRate: 38,
    radius: 25,
    location: 'Stuttgart-Ost',
    verified: true,
    completedJobs: 56,
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'IKEA Kleiderschrank montieren',
    description: 'Ich benötige Hilfe beim Aufbau eines PAX Kleiderschranks (2,5m breit). Alle Teile und Werkzeuge sind vorhanden.',
    category: 'Furniture Assembly',
    location: 'Stuttgart-Mitte, 70173',
    customerName: 'Lisa K.',
    status: 'open',
    suggestedPrice: { min: 80, max: 120 },
    createdAt: '2026-03-10T14:30:00Z',
    details: {
      dimensions: '2.5m breit x 2.4m hoch x 0.6m tief',
      materials: 'IKEA PAX System - alle Teile vorhanden',
      preparation: 'Raum ist leer und vorbereitet',
      tools: 'Werkzeug wird vom Kunden bereitgestellt',
    },
  },
  {
    id: '2',
    title: 'Wandregal anbringen',
    description: 'Drei Wandregale müssen in Wohnzimmer angebracht werden. Wand ist aus Beton.',
    category: 'Mounting',
    location: 'Stuttgart-West, 70176',
    customerName: 'Max B.',
    status: 'open',
    suggestedPrice: { min: 60, max: 90 },
    createdAt: '2026-03-11T09:15:00Z',
    details: {
      dimensions: 'Regale: jeweils 1.2m x 0.3m',
      materials: 'Betonwand - Dübel und Schrauben vorhanden',
      preparation: 'Regale sind bereits gekauft',
      tools: 'Bohrmaschine benötigt',
    },
  },
  {
    id: '3',
    title: 'Zimmer streichen',
    description: 'Schlafzimmer (ca. 20m²) muss in weiß gestrichen werden. Decke und Wände.',
    category: 'Painting',
    location: 'Stuttgart-Süd, 70180',
    customerName: 'Sarah W.',
    status: 'open',
    suggestedPrice: { min: 250, max: 350 },
    createdAt: '2026-03-11T11:00:00Z',
    details: {
      dimensions: '20m² Bodenfläche, 2.5m Deckenhöhe',
      materials: 'Farbe muss noch gekauft werden',
      preparation: 'Möbel können zur Seite gerückt werden',
      tools: 'Alle Malerwerkzeuge mitbringen',
    },
  },
  {
    id: '4',
    title: 'Umzugshilfe - 2 Zimmer Wohnung',
    description: 'Benötige Hilfe beim Umzug von 2-Zimmer Wohnung. Möbel ab- und aufbauen.',
    category: 'Moving',
    location: 'Stuttgart-Ost, 70188',
    customerName: 'Julia M.',
    status: 'open',
    suggestedPrice: { min: 180, max: 250 },
    createdAt: '2026-03-10T16:45:00Z',
  },
];

export const mockOffers: Offer[] = [
  {
    id: 'o1',
    taskId: '1',
    providerId: '1',
    provider: mockProviders[0],
    price: 95,
    message: 'Ich habe viel Erfahrung mit IKEA PAX Systemen und kann den Aufbau professionell durchführen.',
    estimatedDuration: '2-3 Stunden',
    createdAt: '2026-03-10T15:00:00Z',
  },
  {
    id: 'o2',
    taskId: '1',
    providerId: '2',
    provider: mockProviders[1],
    price: 110,
    message: 'Guten Tag! Ich kann morgen vorbeikommen und den Schrank montieren.',
    estimatedDuration: '3 Stunden',
    createdAt: '2026-03-10T15:30:00Z',
  },
  {
    id: 'o3',
    taskId: '1',
    providerId: '3',
    provider: mockProviders[2],
    price: 85,
    message: 'Erfahrener Möbelmonteur. Kann heute noch kommen falls gewünscht.',
    estimatedDuration: '2 Stunden',
    createdAt: '2026-03-10T16:00:00Z',
  },
];
