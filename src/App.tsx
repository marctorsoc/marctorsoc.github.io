import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeContext, useDarkMode } from './utils/darkMode';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Academia from './pages/Academia';  // Add back Academia import
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import About from './pages/About';
import Post from './pages/Post';

export default function App() {
  const darkMode = useDarkMode();

  return (
    <DarkModeContext.Provider value={darkMode}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:slug" element={<Post />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}