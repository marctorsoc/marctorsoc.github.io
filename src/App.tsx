import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeContext, useDarkMode } from './utils/darkMode';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Academia from './pages/Academia';
import Divulgation from './pages/Divulgation';
import OffTopic from './pages/OffTopic';
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
            <Route path="/divulgation" element={<Divulgation />} />
            <Route path="/off-topic" element={<OffTopic />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:slug" element={<Post />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
} 