// Tipos de domínio do módulo de cursos (mock)

export type CourseType = 'free' | 'paid';

export interface Course {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  type: CourseType;
  price?: number;
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  videoUrl: string;
}

export interface CoursePurchase {
  userId: string;
  courseId: string;
  purchasedAt: string; // ISO date
}

export interface CoursesContextType {
  courses: Course[];
  getLessonsByCourseId: (courseId: string) => Lesson[];
  getPurchasedCourseIds: (userId: string) => string[];
  purchaseCourse: (userId: string, courseId: string) => void;
}
