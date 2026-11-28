import { lazy, type ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Providers } from './Providers';
import { Layout } from './Layout';
import { HomePage } from '@/features/home/HomePage';

/** Cada página baja en su propio archivo al abrirla: la primera visita solo trae la portada. */
const page = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const loadMap = () => import('@/features/map/MapPage');
const MapPage = page(loadMap, 'MapPage');
const LoginPage = page(() => import('@/features/auth/LoginPage'), 'LoginPage');
const PrivacyPage = page(() => import('@/features/legal/PrivacyPage'), 'PrivacyPage');
const LessonPage = page(() => import('@/features/lesson/LessonPage'), 'LessonPage');
const ExercisePage = page(() => import('@/features/exercise/ExercisePage'), 'ExercisePage');
const ExamPage = page(() => import('@/features/exam/ExamPage'), 'ExamPage');
const ReviewPage = page(() => import('@/features/exam/ReviewPage'), 'ReviewPage');
const ReviewListPage = page(() => import('@/features/exam/ReviewListPage'), 'ReviewListPage');
const HistoryPage = page(() => import('@/features/history/HistoryPage'), 'HistoryPage');
const AttemptReviewPage = page(() => import('@/features/history/AttemptReviewPage'), 'AttemptReviewPage');
const RankingPage = page(() => import('@/features/game/RankingPage'), 'RankingPage');
const WorkshopPage = page(() => import('@/features/game/WorkshopPage'), 'WorkshopPage');
const AchievementsPage = page(() => import('@/features/game/AchievementsPage'), 'AchievementsPage');
const ProfilePage = page(() => import('@/features/game/ProfilePage'), 'ProfilePage');
const PracticePage = page(() => import('@/features/practice/PracticePage'), 'PracticePage');
const ProblemPage = page(() => import('@/features/practice/ProblemPage'), 'ProblemPage');
const GuidePage = page(() => import('@/features/pseudo/GuidePage'), 'GuidePage');

// El mapa es la pestaña que más se abre: se descarga en segundo plano apenas carga la portada.
if (typeof window !== 'undefined') window.addEventListener('load', () => void loadMap(), { once: true });

export function App() {
  return (
    <Providers>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="mapa" element={<MapPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="leccion/:lessonId" element={<LessonPage />} />
            <Route path="ejercicio/:exerciseId" element={<ExercisePage />} />
            <Route path="examen/:moduleId" element={<ExamPage />} />
            <Route path="practica" element={<PracticePage />} />
            <Route path="practica/:problemId" element={<ProblemPage />} />
            <Route path="repaso" element={<ReviewListPage />} />
            <Route path="repaso/:moduleId" element={<ReviewPage />} />
            <Route path="historial" element={<HistoryPage />} />
            <Route path="historial/:attemptId" element={<AttemptReviewPage />} />
            <Route path="ranking" element={<RankingPage />} />
            <Route path="taller" element={<WorkshopPage />} />
            <Route path="logros" element={<AchievementsPage />} />
            <Route path="perfil/:handle" element={<ProfilePage />} />
            <Route path="pseudocodigo" element={<GuidePage />} />
            <Route path="privacidad" element={<PrivacyPage />} />
            <Route path="*" element={<p className="center muted">404 · esa ruta no existe</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
