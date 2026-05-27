import { HashRouter, Routes, Route } from 'react-router-dom';
import { DiaryProvider } from './context/DiaryContext';
import Layout from './components/layout/Layout';
import DiaryPage from './pages/DiaryPage';
import FoodPage from './pages/FoodPage';
import WeightPage from './pages/WeightPage';
import LearnPage from './pages/LearnPage';
import HotPage from './pages/HotPage';
import AlmanacPage from './pages/AlmanacPage';
import DiscoverPage from './pages/DiscoverPage';

export default function App() {
  return (
    <DiaryProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DiaryPage />} />
            <Route path="/weight" element={<WeightPage />} />
            <Route path="/almanac" element={<AlmanacPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DiaryProvider>
  );
}
