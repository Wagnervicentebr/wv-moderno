import { useMemo, useState } from 'react';
import { Lock, Gift, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CoursesContext';
import { formatDuration } from '../utils/courses';
import type { Course } from '../types/courses';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from './ui/utils';
import './CoursesScreen.filter.css';

interface CoursesScreenProps {
  onNavigate: (view: string, params?: { courseId?: string }) => void;
}

export function CoursesScreen({ onNavigate }: CoursesScreenProps) {
  const { user } = useAuth();
  const { courses, getPurchasedCourseIds } = useCourses();
  const [searchName, setSearchName] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');

  const userId = user?.id ?? '';

  const purchasedIds = useMemo(
    () => (userId ? getPurchasedCourseIds(userId) : []),
    [userId, getPurchasedCourseIds]
  );

  const myCourses = useMemo(
    () => courses.filter((c) => purchasedIds.includes(c.id)),
    [courses, purchasedIds]
  );

  const filteredAllCourses = useMemo(() => {
    let list = courses;
    if (typeFilter === 'free') list = list.filter((c) => c.type === 'free');
    else if (typeFilter === 'paid') list = list.filter((c) => c.type === 'paid');
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }
    return list;
  }, [courses, typeFilter, searchName]);

  const filteredMyCourses = useMemo(() => {
    let list = myCourses;
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }
    return list;
  }, [myCourses, searchName]);

  const isPurchased = (courseId: string) => purchasedIds.includes(courseId);
  const canAccessLesson = (course: Course) =>
    course.type === 'free' || isPurchased(course.id);
  const goToCheckout = (course: Course) =>
    course.type === 'paid' && !isPurchased(course.id);

  const handleCourseClick = (course: Course) => {
    if (canAccessLesson(course)) {
      onNavigate('course-lesson', { courseId: course.id });
    } else if (goToCheckout(course)) {
      onNavigate('course-checkout', { courseId: course.id });
    }
  };

  const renderCourseBadge = (course: Course) => {
    if (course.type === 'free') {
      return (
        <Badge variant="secondary" className="gap-1 bg-emerald-100 text-emerald-800 border-0">
          <Gift className="w-3 h-3" />
          Grátis
        </Badge>
      );
    }
    if (isPurchased(course.id)) {
      return (
        <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-800 border-0">
          <CheckCircle className="w-3 h-3" />
          Comprado
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1">
        <Lock className="w-3 h-3" />
        Pago
      </Badge>
    );
  };

  const renderCourseCard = (course: Course) => (
    <Card
      key={course.id}
      className={cn(
        'overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-black/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20'
      )}
      onClick={() => handleCourseClick(course)}
    >
      <div className="h-52 md:h-56 bg-gradient-to-br from-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))] flex items-center justify-center">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white/60 text-sm font-medium">Curso</span>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{course.name}</CardTitle>
          {renderCourseBadge(course)}
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-[rgb(var(--color-text-secondary))]">
          {formatDuration(course.durationMinutes)}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-16 md:pb-8 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl mb-2">Cursos</h1>
          <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
            Cursos gratuitos e pagos para você assistir
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as 'all' | 'mine')}>
          <TabsList className="mb-4 bg-white border border-black/5 p-1 gap-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:text-[rgb(var(--color-text-secondary))] data-[state=active]:shadow-sm px-4 py-2 rounded-lg transition-colors"
            >
              Todos os cursos
            </TabsTrigger>
            <TabsTrigger
              value="mine"
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:text-[rgb(var(--color-text-secondary))] data-[state=active]:shadow-sm px-4 py-2 rounded-lg transition-colors"
            >
              Meus cursos
            </TabsTrigger>
          </TabsList>

          {activeTab === 'all' && (
            <div className="courses-filter-row grid grid-cols-1 md:grid-cols-10 gap-4 mb-6">
              <div className="courses-filter-input relative min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--color-text-secondary))]" />
                <Input
                  type="search"
                  placeholder="Buscar por nome..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-9 bg-white w-full"
                />
              </div>
              <div className="courses-filter-select min-w-0">
                <Select value={typeFilter} onValueChange={(v: string) => setTypeFilter(v as 'all' | 'free' | 'paid')}>
                  <SelectTrigger className="w-full bg-white min-w-0">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="free">Grátis</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {activeTab === 'mine' && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--color-text-secondary))]" />
                <Input
                  type="search"
                  placeholder="Buscar por nome..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
            </div>
          )}

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAllCourses.length === 0 ? (
                <p className="col-span-full text-center py-8 text-[rgb(var(--color-text-secondary))]">
                  Nenhum curso encontrado.
                </p>
              ) : (
                filteredAllCourses.map(renderCourseCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="mine" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMyCourses.length === 0 ? (
                <p className="col-span-full text-center py-8 text-[rgb(var(--color-text-secondary))]">
                  Você ainda não possui cursos. Compre ou acesse os gratuitos em &quot;Todos os cursos&quot;.
                </p>
              ) : (
                filteredMyCourses.map(renderCourseCard)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
