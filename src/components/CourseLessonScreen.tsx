import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, PlayCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useCourses } from '../contexts/CoursesContext';
import { extractYoutubeVideoId } from '../utils/courses';
import type { Lesson } from '../types/courses';
import { cn } from './ui/utils';
import './CourseLessonScreen.layout.css';

interface CourseLessonScreenProps {
  courseId: string;
  onBack: () => void;
}

const EMBED_BASE = 'https://www.youtube.com/embed/';

export function CourseLessonScreen({ courseId, onBack }: CourseLessonScreenProps) {
  const { courses, getLessonsByCourseId } = useCourses();
  const lessons = useMemo(() => getLessonsByCourseId(courseId), [getLessonsByCourseId, courseId]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);

  useEffect(() => {
    if (lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
    if (lessons.length === 0) {
      setSelectedLesson(null);
    }
  }, [lessons, selectedLesson]);

  const videoId = useMemo(
    () => (selectedLesson ? extractYoutubeVideoId(selectedLesson.videoUrl) : null),
    [selectedLesson]
  );

  const embedUrl = videoId ? `${EMBED_BASE}${videoId}` : null;
  const hasValidVideo = Boolean(videoId);

  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-16 md:pb-8 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Voltar aos cursos
        </Button>

        {course && (
          <h1 className="text-lg font-semibold text-[rgb(var(--color-text-primary))] mb-4 truncate">
            {course.name}
          </h1>
        )}

        {lessons.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center">
            <p className="text-[rgb(var(--color-text-secondary))]">
              Nenhuma aula disponível para este curso.
            </p>
          </div>
        ) : (
          <div
            className="course-lesson-layout-80-20 grid grid-cols-1 md:grid-cols-10 gap-4 w-full"
            aria-label="Player de vídeo e lista de aulas"
          >
            {/* Vídeo: 70% ao lado das aulas em telas grandes; em cima no mobile */}
            <div className="course-lesson-video flex flex-col min-h-0 min-w-0 rounded-xl border bg-white overflow-hidden md:col-span-7 order-1">
              <div className="relative w-full aspect-video bg-black/90 min-h-[200px] md:min-h-[320px]">
                {hasValidVideo && embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={selectedLesson ? `Vídeo: ${selectedLesson.title}` : 'Player de vídeo'}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-[rgb(var(--color-text-secondary))]"
                    role="alert"
                  >
                    <AlertCircle className="w-12 h-12 shrink-0 opacity-70" aria-hidden />
                    <p className="text-sm font-medium">
                      Vídeo indisponível ou privado
                    </p>
                    <p className="text-xs max-w-sm">
                      Este vídeo não pode ser exibido. Selecione outra aula na lista.
                    </p>
                  </div>
                )}
              </div>
              {selectedLesson && (
                <div className="p-3 border-t bg-[rgb(var(--color-surface))]">
                  <h2 className="text-sm font-semibold text-[rgb(var(--color-text-primary))] truncate">
                    {selectedLesson.title}
                  </h2>
                </div>
              )}
            </div>

            {/* Lista de aulas: 30% ao lado do vídeo na mesma linha (desktop); embaixo no mobile */}
            <aside
              className="course-lesson-sidebar flex flex-col min-h-0 min-w-0 rounded-xl border bg-white overflow-hidden md:col-span-3 order-2"
              aria-label="Lista de aulas"
            >
              <div className="p-3 border-b bg-[rgb(var(--color-surface))]">
                <h2 className="text-sm font-semibold text-[rgb(var(--color-text-primary))]">
                  Aulas
                </h2>
              </div>
              <ul className="flex-1 overflow-y-auto p-2 space-y-1" role="list">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedLesson(lesson)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))]',
                        selectedLesson?.id === lesson.id
                          ? 'bg-sky-100 text-sky-800 font-medium border border-sky-200'
                          : 'text-[rgb(var(--color-text-primary))] hover:bg-black/5'
                      )}
                      aria-current={selectedLesson?.id === lesson.id ? 'true' : undefined}
                      aria-label={`Assistir: ${lesson.title}`}
                    >
                      <span className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 shrink-0" aria-hidden />
                        <span className="truncate">{lesson.title}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
