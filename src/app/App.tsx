import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Providers } from './Providers';
import { Layout } from './Layout';
import { MapPage } from '@/features/map/MapPage';
import { HomePage } from '@/features/home/HomePage';
import { LoginPage } from '@/features/auth/LoginPage';
import { PrivacyPage } from '@/features/legal/PrivacyPage';
import { LessonPage } from '@/features/lesson/LessonPage';
import { ExercisePage } from '@/features/exercise/ExercisePage';
import { ExamPage } from '@/features/exam/ExamPage';
import { ReviewPage } from '@/features/exam/ReviewPage';
import { ReviewListPage } from '@/features/exam/ReviewListPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { RankingPage } from '@/features/game/RankingPage';
import { WorkshopPage } from '@/features/game/WorkshopPage';
import { AttemptReviewPage } from '@/features/history/AttemptReviewPage';
import { GuidePage } from '@/features/pseudo/GuidePage';

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
            <Route path="repaso" element={<ReviewListPage />} />
            <Route path="repaso/:moduleId" element={<ReviewPage />} />
            <Route path="historial" element={<HistoryPage />} />
            <Route path="historial/:attemptId" element={<AttemptReviewPage />} />
            <Route path="ranking" element={<RankingPage />} />
            <Route path="taller" element={<WorkshopPage />} />
            <Route path="pseudocodigo" element={<GuidePage />} />
            <Route path="privacidad" element={<PrivacyPage />} />
            <Route path="*" element={<p className="center muted">404 · esa ruta no existe</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
