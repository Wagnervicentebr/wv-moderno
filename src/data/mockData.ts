// Mock data for services, professionals, and products
// In production, this would come from Supabase database

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: 'masculino' | 'feminino' | 'manicure' | 'maquiagem';
  image: string;
}

export interface Professional {
  id: string;
  name: string;
  specialties: string[];
  image: string;
  services: string[]; // service IDs
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const services: Service[] = [
  // MASCULINO
  
  {
    id: 'm2',
    name: 'Barba Completa',
    description: 'Aparar, modelar e finalizar barba com produtos premium e toalha quente',
    duration: 45,
    price: 400,
    category: 'masculino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/barba.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vYmFyYmEucG5nIiwiaWF0IjoxNzY2MzE2NjgwLCJleHAiOjE3Njg5MDg2ODB9.2_JJSRiy6sk2wn7cviU4uWnE_D9wgluP4t-2tsYlMYM",
  },
  {
    id: 'm5',
    name: 'Consultoria Visagista',
    description: 'Corte de cabelo masculino com acabamento premium e finalização personalizada',
    duration: 60,
    price: 800,
    category: 'masculino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/Visagismo-masculino.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vVmlzYWdpc21vLW1hc2N1bGluby5wbmciLCJpYXQiOjE3NjYzMjQ3NjMsImV4cCI6MTc2ODkxNjc2M30.3ITsIoM5nh9I5xYYbNeHCLFUeCtaV54f_04YfTqSSrE",
  },
  {
    id: 'm3',
    name: 'Corte + Barba Premium',
    description: 'Combo completo de corte masculino premium com design de barba e acabamento luxo',
    duration: 90,
    price: 1100,
    category: 'masculino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/barba-cabelo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vYmFyYmEtY2FiZWxvLnBuZyIsImlhdCI6MTc2NjMxNjcwMiwiZXhwIjoxNzY4OTA4NzAyfQ.HvmYKJpce_Nggv3bT2y6V_HTef4efH0W3kSga0YcZfQ",
  },
  {
    id: 'm4',
    name: 'Hidratação Masculina',
    description: 'Tratamento de hidratação profunda para cabelos e couro cabeludo masculino',
    duration: 45,
    price: 450,
    category: 'masculino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/hidratacao-masculino.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vaGlkcmF0YWNhby1tYXNjdWxpbm8ucG5nIiwiaWF0IjoxNzY2MzE2NzExLCJleHAiOjE3Njg5MDg3MTF9.Op_fUewMYacmN2mW7_sUIhXfu35aEKcokChEO-R1ul4",
  },
  {
    id: 'm1',
    name: 'Design de Sobrancelha Masculina',
    description: 'Design profissional e natural de sobrancelhas masculinas',
    duration: 30,
    price: 250,
    category: 'masculino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/corte-masculino.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vY29ydGUtbWFzY3VsaW5vLnBuZyIsImlhdCI6MTc2NjMxNjczMywiZXhwIjoxNzY4OTA4NzMzfQ.njs7lr8Gd-FJnlPSI7cvX6fjeDaHLQfNbJ84XDAVNs0",
  },
  

  // FEMININO
  {
    id: 'f1',
    name: 'Corte Feminino Premium',
    description: 'Corte feminino personalizado com técnicas avançadas e finalização luxuosa',
    duration: 90,
    price: 1200,
    category: 'feminino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/corte-feminino.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb3J0ZS1mZW1pbmluby5wbmciLCJpYXQiOjE3NjYzMTY2MTEsImV4cCI6MTc2ODkwODYxMX0.YiEULVReLoRdzEOkqJbX3gzwsHHSSxY8lFm6wl0SaEo"
  },
  {
    id: 'f2',
    name: 'Escova Progressiva Premium',
    description: 'Tratamento capilar progressivo com produtos de alta qualidade importados',
    duration: 180,
    price: 2500,
    category: 'feminino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/escova-progressiva.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9lc2NvdmEtcHJvZ3Jlc3NpdmEucG5nIiwiaWF0IjoxNzY2MzE2NTk4LCJleHAiOjE3Njg5MDg1OTh9.Zbv-i7Qeu-joR-_UTf1eVVtTmGjsZezzh4uShcNSXLY"
  },
  {
    id: 'f3',
    name: 'Coloração Completa',
    description: 'Coloração profissional com produtos de luxo e técnicas exclusivas',
    duration: 150,
    price: 1800,
    category: 'feminino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/coloracao-completa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb2xvcmFjYW8tY29tcGxldGEucG5nIiwiaWF0IjoxNzY2MzE2NjI0LCJleHAiOjE3Njg5MDg2MjR9.PJxypQ_MRYB1XXPG0M0CoXTM39tS6PvkaGMd_Rtdf48"
  },
  {
    id: 'f4',
    name: 'Mechas Balayage',
    description: 'Técnica exclusiva de iluminação com efeito natural e sofisticado',
    duration: 180,
    price: 2200,
    category: 'feminino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/mechas-balayage.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9tZWNoYXMtYmFsYXlhZ2UucG5nIiwiaWF0IjoxNzY2MzE2NTY3LCJleHAiOjE3Njg5MDg1Njd9.4nm7d8UzKvM0n-xJo-Euv4F9PD0N6wzNO0J4_mH4G3A",
  },
  {
    id: 'f5',
    name: 'Hidratação Premium',
    description: 'Tratamento de hidratação profunda com máscaras e ampolas premium',
    duration: 60,
    price: 600,
    category: 'feminino',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/hidratacao-premium.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9oaWRyYXRhY2FvLXByZW1pdW0ucG5nIiwiaWF0IjoxNzY2MzE2NTgwLCJleHAiOjE3Njg5MDg1ODB9.SBHycqtYuCGQRTDiBYGTau1wgagSZ6784OPhIFDsF6U"
  },
  {
    id: 'f6',
    name: 'Penteado para Eventos',
    description: 'Penteado sofisticado para casamentos, festas e eventos especiais',
    duration: 120,
    price: 1500,
    category: 'feminino',
    image: 'https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/penteado-eventos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9wZW50ZWFkby1ldmVudG9zLnBuZyIsImlhdCI6MTc2NjMxNjQ3MCwiZXhwIjoxNzY4OTA4NDcwfQ.oiKwdTJx3k2KalUZwksOgPcStPk6YyQAmhmcqmRL65Y',
  },

  // MAQUIAGEM
  {
    id: 'mk1',
    name: 'Maquiagem Social',
    description: 'Maquiagem elegante para eventos sociais e ocasiões especiais',
    duration: 60,
    price: 800,
    category: 'maquiagem',
    image: 'https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/hidratacao-premium.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9oaWRyYXRhY2FvLXByZW1pdW0ucG5nIiwiaWF0IjoxNzY2MzE2NTgwLCJleHAiOjE3Njg5MDg1ODB9.SBHycqtYuCGQRTDiBYGTau1wgagSZ6784OPhIFDsF6U',
  },
  {
    id: 'mk2',
    name: 'Maquiagem de Noiva',
    description: 'Maquiagem completa de noiva com teste prévio e produtos de longa duração',
    duration: 120,
    price: 1800,
    category: 'maquiagem',
    image: 'https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/penteado-eventos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9wZW50ZWFkby1ldmVudG9zLnBuZyIsImlhdCI6MTc2NjMxNjQ3MCwiZXhwIjoxNzY4OTA4NDcwfQ.oiKwdTJx3k2KalUZwksOgPcStPk6YyQAmhmcqmRL65Y'
  },
  {
    id: 'mk3',
    name: 'Maquiagem Profissional',
    description: 'Maquiagem para ensaios fotográficos, trabalhos e sessões profissionais',
    duration: 90,
    price: 1200,
    category: 'maquiagem',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/mechas-balayage.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9tZWNoYXMtYmFsYXlhZ2UucG5nIiwiaWF0IjoxNzY2MzE2NTY3LCJleHAiOjE3Njg5MDg1Njd9.4nm7d8UzKvM0n-xJo-Euv4F9PD0N6wzNO0J4_mH4G3A",
  },
  {
    id: 'mk4',
    name: 'Design de Sobrancelha com Henna',
    description: 'Design profissional de sobrancelhas com aplicação de henna premium',
    duration: 45,
    price: 400,
    category: 'maquiagem',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/corte-feminino.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb3J0ZS1mZW1pbmluby5wbmciLCJpYXQiOjE3NjYzMTY2MTEsImV4cCI6MTc2ODkwODYxMX0.YiEULVReLoRdzEOkqJbX3gzwsHHSSxY8lFm6wl0SaEo"
  },
  {
    id: 'mk5',
    name: 'Micropigmentação de Sobrancelhas',
    description: 'Técnica de micropigmentação fio a fio para sobrancelhas naturais e definidas',
    duration: 180,
    price: 3500,
    category: 'maquiagem',
    image: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/coloracao-completa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb2xvcmFjYW8tY29tcGxldGEucG5nIiwiaWF0IjoxNzY2MzE2NjI0LCJleHAiOjE3Njg5MDg2MjR9.PJxypQ_MRYB1XXPG0M0CoXTM39tS6PvkaGMd_Rtdf48"
  },
  {
    id: 'mk6',
    name: 'Limpeza de Pele Premium',
    description: 'Limpeza profunda com extração, esfoliação e máscara de tratamento',
    duration: 90,
    price: 700,
    category: 'maquiagem',
    image: 'https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/penteado-eventos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9wZW50ZWFkby1ldmVudG9zLnBuZyIsImlhdCI6MTc2NjMxNjQ3MCwiZXhwIjoxNzY4OTA4NDcwfQ.oiKwdTJx3k2KalUZwksOgPcStPk6YyQAmhmcqmRL65Y'
  },

  // MANICURE
  {
    id: 'n1',
    name: 'Manicure Premium',
    description: 'Tratamento completo de unhas das mãos com produtos de alta qualidade',
    duration: 60,
    price: 500,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1762373349045-c2decd4ec3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMGhhbmRzJTIwbmFpbHN8ZW58MXx8fHwxNzY2MjIzNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'n2',
    name: 'Pedicure Premium',
    description: 'Tratamento completo de unhas dos pés com esfoliação e hidratação',
    duration: 75,
    price: 600,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1638859460750-181fcc7936a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMHNwYSUyMGZlZXR8ZW58MXx8fHwxNzY2MjIzNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'n3',
    name: 'Unhas em Gel',
    description: 'Aplicação de unhas em gel com acabamento profissional e duradouro',
    duration: 90,
    price: 850,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZWwlMjBuYWlscyUyMHBvbGlzaHxlbnwxfHx8fDE3NjYyMjM3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'n4',
    name: 'Alongamento de Unhas',
    description: 'Alongamento de unhas com técnicas modernas e design personalizado',
    duration: 120,
    price: 1200,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1660300110557-e2419a8b766e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwbmFpbCUyMGV4dGVuc2lvbnN8ZW58MXx8fHwxNzY2MjIzNzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'n5',
    name: 'Nail Art Premium',
    description: 'Arte exclusiva nas unhas com técnicas avançadas e decoração luxuosa',
    duration: 90,
    price: 950,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NjIyMzc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },

];

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Ricardo Silva',
    specialties: ['Cortes Masculinos', 'Barba', 'Design'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    services: ['m1', 'm2', 'm3', 'm4', 'm5'],
  },
  {
    id: '2',
    name: 'Mariana Costa',
    specialties: ['Cortes Femininos', 'Coloração', 'Escova'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    services: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
  },
  {
    id: '3',
    name: 'Rafael Santos',
    specialties: ['Cortes Masculinos e Femininos', 'Coloração'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    services: ['m1', 'm3', 'f1', 'f3', 'f5'],
  },
  {
    id: '4',
    name: 'Julia Fernandes',
    specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    services: ['n1', 'n2', 'n3', 'n4', 'n5'],
  },
  {
    id: '5',
    name: 'Beatriz Almeida',
    specialties: ['Maquiagem', 'Sobrancelhas', 'Estética'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    services: ['mk1', 'mk2', 'mk3', 'mk4', 'mk5', 'mk6'],
  },
  {
    id: '6',
    name: 'Camila Rodrigues',
    specialties: ['Unhas', 'Micropigmentação', 'Design'],
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    services: ['n1', 'n2', 'n3', 'n4', 'n5', 'mk4', 'mk5'],
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Glow Spray Serum',
    description: 'Este sérum com um Booster de Proteção UV protege o cabelo dos danos causados pela exposição solar.',
    price: 180,
    category: 'Cabelos',
    images: ['https://dm.henkel-dam.com/is/image/henkel/abc_master_glow_spray_serum_teaser_v1?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/ARKIV_ABC_Glow_Serum_467?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/ARKIV_ABC_Glow_Serum_353?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/ARKIV_ABC_Glow_Serum_436?wid=768&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Hydrate Champô',
    description: 'O Sodium C14-16 Olefin Sulfonate é o substituto dos sulfatos e limpa o cabelo, proporcionando uma rica e cuidada espuma.',
    price: 190,
    category: 'Cabelos',
    images: ['https://dm.henkel-dam.com/is/image/henkel/42392491_1?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/MAR-2021_ABC_CONTENT_20210322_1117-11?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/ABC_Community_Flatlay_Shooting_06_202238143?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/ABC_TEXTURE_Shp_Hyd_Amp_Deep_138-1?wid=768&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Replenish Máscara Light Cream',
    description: 'Repara e nutre o cabelo fino a médio danificado com esta máscara em creme leve, com manteiga de karité rica em vitaminas, proteína de arroz e água de arroz.',
    price: 280,
    category: 'Cabelos',
    images: ['https://dm.henkel-dam.com/is/image/henkel/ABC_Replenish_Light_Mask_200ml_061?wid=1440&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Hydrate Loção',
    description: 'Phenoxyethanol normalmente usado pelos farmacêuticos e cosméticos.',
    price: 220,
    category: 'Cabelos',
    images: ['https://dm.henkel-dam.com/is/image/henkel/42392804_1?wid=768&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Sérum de Hidratação Suavizante',
    description: 'É um sérum à base de água profundamente hidratante que define e suaviza o cabelo para reduzir o frizz.',
    price: 350,
    category: 'Skincare',
    images: ['https://dm.henkel-dam.com/is/image/henkel/ABC_HYDRATE_Smoothing_Serum?wid=1440&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Creme Leve de Mãos e Cabelo',
    description: 'A fórmula com Bakuchiol é super leve com uma textura quase-inexistente. O creme nutre e protege a pele o cabelo, para resultados comprovados por cabeleireiros e maravilhosamente maleáveis.',
    price: 480,
    category: 'Skincare',
    images: ['https://dm.henkel-dam.com/is/image/henkel/42393337_ABC_Hand_Hair_LightCream_75ml_5_NEW?wid=768&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
  {
    id: 'p7',
    name: 'Água Enriquecedora',
    description: 'Experimente a transformação com a Authentic Beauty Concept Enhancing Water, uma versátil névoa em spray sem enxaguamento para o cabelo e para o rosto.',
    price: 240,
    category: 'Skincare',
    images: ['https://dm.henkel-dam.com/is/image/henkel/42405450_ABC_Enhancing_Water_100ml_5_NEW?wid=768&fmt=webp&qlt=90&fit=hfit%2C1', 'https://dm.henkel-dam.com/is/image/henkel/used_MAR-2021_ABC_CONTENT_20210322_1493?wid=700&fmt=webp&qlt=90'],
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Sérum de Hidratação Suavizante',
    description: 'É um sérum à base de água profundamente hidratante que define e suaviza o cabelo para reduzir o frizz.',
    price: 350,
    category: 'Skincare',
    images: ['https://dm.henkel-dam.com/is/image/henkel/ABC_HYDRATE_Smoothing_Serum?wid=1440&fmt=webp&qlt=90&fit=hfit%2C1'],
    inStock: true,
  },
];

// Generate time slots for booking (9:00 AM to 7:00 PM)
export function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Randomly mark some slots as unavailable for demo purposes
      const available = Math.random() > 0.3;
      slots.push({ time, available });
    }
  }
  return slots;
}

// Admin Dashboard - Revenue Data
export interface MonthlyRevenueData {
  day: number;
  revenue: number;
  previousMonthRevenue?: number;
}

export interface AnnualRevenueData {
  month: string;
  revenue: number;
}

export interface HourlyRevenueData {
  hour: string;
  revenue: number;
}

// Generate monthly revenue data (current month vs previous month)
export function getMonthlyRevenueData(): MonthlyRevenueData[] {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  const data: MonthlyRevenueData[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    // Realistic revenue pattern - lower on weekdays, higher on weekends
    const dayOfWeek = new Date(now.getFullYear(), now.getMonth(), day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const baseRevenue = isWeekend ? 2500 : 1800;
    const variation = Math.random() * 1000 - 500;
    const revenue = Math.max(500, baseRevenue + variation);
    
    // Previous month comparison
    const prevMonthBaseRevenue = isWeekend ? 2300 : 1700;
    const prevMonthVariation = Math.random() * 900 - 450;
    const previousMonthRevenue = Math.max(500, prevMonthBaseRevenue + prevMonthVariation);
    
    data.push({
      day,
      revenue: Math.round(revenue),
      previousMonthRevenue: Math.round(previousMonthRevenue),
    });
  }
  return data;
}

// Get annual revenue data (last 12 months)
export function getAnnualRevenueData(): AnnualRevenueData[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const baseValues = [45000, 48000, 52000, 50000, 55000, 58000, 62000, 60000, 65000, 68000, 72000, 78000];
  
  return months.map((month, index) => ({
    month,
    revenue: baseValues[index] + (Math.random() * 8000 - 4000),
  }));
}

// Get hourly revenue data (9:00 to 19:00)
export function getHourlyRevenueData(): HourlyRevenueData[] {
  const hours = [];
  const peakHours = [11, 15, 18]; // 11:00, 15:00, 18:00 are peak hours
  
  for (let hour = 9; hour < 20; hour++) {
    const hourStr = `${hour.toString().padStart(2, '0')}:00`;
    const isPeakHour = peakHours.includes(hour);
    
    // Peak hours have higher revenue
    const baseRevenue = isPeakHour ? 800 : 400;
    const variation = Math.random() * 300 - 150;
    const revenue = Math.max(100, baseRevenue + variation);
    
    hours.push({
      hour: hourStr,
      revenue: Math.round(revenue),
    });
  }
  return hours;
}

// Product Sales Data
export interface ProductSalesData {
  name: string;
  sales: number;
  revenue: number;
}

export function getProductSalesData(): ProductSalesData[] {
  const productSales = [
    { name: 'Glow Spray Serum', sales: 45, revenue: 8100 },
    { name: 'Hydrate Champô', sales: 52, revenue: 9880 },
    { name: 'Replenish Máscara', sales: 28, revenue: 7840 },
    { name: 'Hydrate Loção', sales: 38, revenue: 8360 },
    { name: 'Sérum Suavizante', sales: 32, revenue: 11200 },
    { name: 'Creme Mãos e Cabelo', sales: 19, revenue: 9120 },
  ];
  return productSales;
}

// Bookings Data
export interface BookingsData {
  day: number;
  bookings: number;
  completed: number;
}

export function getMonthlyBookingsData(): BookingsData[] {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  const data: BookingsData[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(now.getFullYear(), now.getMonth(), day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // More bookings on weekends
    const baseBookings = isWeekend ? 12 : 8;
    const variation = Math.floor(Math.random() * 4 - 2);
    const bookings = Math.max(3, baseBookings + variation);
    const completed = Math.floor(bookings * (0.85 + Math.random() * 0.15));
    
    data.push({
      day,
      bookings,
      completed,
    });
  }
  return data;
}