import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import type { Course, Lesson, CoursePurchase, CoursesContextType } from '../types/courses';
import { mockCourses } from '../data/mockCourses';
import { mockLessons } from '../data/mockCourses';

const COURSE_PURCHASES_KEY = 'course_purchases';

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [purchases, setPurchases] = useState<CoursePurchase[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(COURSE_PURCHASES_KEY);
    if (saved) {
      try {
        const parsed: CoursePurchase[] = JSON.parse(saved);
        setPurchases(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading course purchases:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(COURSE_PURCHASES_KEY, JSON.stringify(purchases));
  }, [purchases]);

  const getLessonsByCourseId = useMemo(() => {
    return (courseId: string): Lesson[] => {
      return mockLessons
        .filter((l) => l.courseId === courseId)
        .sort((a, b) => a.order - b.order);
    };
  }, []);

  const getPurchasedCourseIds = useMemo(() => {
    return (userId: string): string[] => {
      return purchases
        .filter((p) => p.userId === userId)
        .map((p) => p.courseId);
    };
  }, [purchases]);

  const purchaseCourse = (userId: string, courseId: string) => {
    const purchasedAt = new Date().toISOString();
    setPurchases((prev) => {
      if (prev.some((p) => p.userId === userId && p.courseId === courseId)) {
        return prev;
      }
      return [...prev, { userId, courseId, purchasedAt }];
    });
  };

  const value: CoursesContextType = useMemo(
    () => ({
      courses: mockCourses,
      getLessonsByCourseId,
      getPurchasedCourseIds,
      purchaseCourse,
    }),
    [getLessonsByCourseId, getPurchasedCourseIds]
  );

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}
