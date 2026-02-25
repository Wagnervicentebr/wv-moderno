import type { Course, Lesson } from '../types/courses';

// Vídeos reais de curso de cabeleireiro/barbeiro para demonstração das aulas
export const mockLessons: Lesson[] = [
  {
    id: 'l1-1',
    courseId: 'c1',
    title: 'Corte social passo a passo',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=pz5FnqjFqGg', // Vitor Correia
  },
  {
    id: 'l1-2',
    courseId: 'c1',
    title: 'Passo a passo corte social - curso de barbeiro',
    order: 2,
    videoUrl: 'https://www.youtube.com/watch?v=Q7ZvcdZLAS0',
  },
  {
    id: 'l1-3',
    courseId: 'c1',
    title: 'Corte de cabelo na tesoura',
    order: 3,
    videoUrl: 'https://www.youtube.com/watch?v=9_DkPLKNV5A', // Felippe Caetano
  },
  {
    id: 'l2-1',
    courseId: 'c2',
    title: 'Degradê três tons',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=3sXgShaxpUU', // Barbeiro Barbosa
  },
  {
    id: 'l2-2',
    courseId: 'c2',
    title: 'Desenho e degradê',
    order: 2,
    videoUrl: 'https://www.youtube.com/watch?v=dFy8G4nNRSI', // Felippe Caetano
  },
  {
    id: 'l3-1',
    courseId: 'c3',
    title: 'Corte em camadas - técnica de finalização',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=oO1mOezaJNc', // Gabriel Deodato
  },
];

// durationMinutes: soma das aulas ou valor fixo para o mock
export const mockCourses: Course[] = [
  {
    id: 'c1',
    name: 'Introdução à barbeiraria',
    description: 'Corte social, conceitos e prática com tesoura. Ideal para começar na profissão.',
    durationMinutes: 37,
    type: 'free',
    imageUrl: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/barba.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vYmFyYmEucG5nIiwiaWF0IjoxNzcyMDM5OTcyLCJleHAiOjE4MDM1NzU5NzJ9.7uL-fnAIVVwKFWf-0QPWWsTuakjvpXQce47uiKrIfrM",
  },
  {
    id: 'c2',
    name: 'Curso completo de barbeiro',
    description: 'Degradê, desenho e técnicas profissionais. Conteúdo avançado com certificação.',
    durationMinutes: 120,
    type: 'paid',
    price: 199.9,
    imageUrl: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/masculino/barba-cabelo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNjdWxpbm8vYmFyYmEtY2FiZWxvLnBuZyIsImlhdCI6MTc3MjAzOTkxMywiZXhwIjoxODAzNTc1OTEzfQ.1mbRrY0nUnhvIRAL38hdaLWj003AXU7gR_fOwYO0LSU",
  },
  {
    id: 'c3',
    name: 'Cortes em camadas e finalização',
    description: 'Técnicas de corte em camadas e finalização para salão. Conteúdo exclusivo.',
    durationMinutes: 45,
    type: 'paid',
    price: 79.9,
    imageUrl: "https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/coloracao-completa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb2xvcmFjYW8tY29tcGxldGEucG5nIiwiaWF0IjoxNzcyMDQwMTMwLCJleHAiOjE4MDM1NzYxMzB9.jIQRwfkNK4C6M08QK3LguAOI_G0jnJaDP_xUD2o7Bz4",
  },
];
