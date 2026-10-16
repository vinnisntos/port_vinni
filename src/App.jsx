import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Navbar from './components/site/Navbar';
import Footer from './components/site/Footer';
import ScrollToTop from './components/site/ScrollToTop';
import Backdrop from './components/site/Backdrop';
import CommandPaletteHost from './components/site/CommandPaletteHost';
import EasterEggs from './components/site/EasterEggs';
import Home from './pages/Home';

// A Home é a página de entrada e vai no bundle principal; as demais rotas
// são carregadas sob demanda.
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Tools = lazy(() => import('./pages/Tools'));
const EmailValidator = lazy(() => import('./pages/tools/EmailValidator'));
const CPFGenerator = lazy(() => import('./pages/tools/CPFGenerator'));
const CNPJGenerator = lazy(() => import('./pages/tools/CNPJGenerator'));
const CEPFinder = lazy(() => import('./pages/tools/CEPFinder'));
const PhoneValidator = lazy(() => import('./pages/tools/PhoneValidator'));
const FakeDataGenerator = lazy(() => import('./pages/tools/FakeDataGenerator'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lê o base configurado no vite.config.js em build time.
// Sempre "/", já que o site roda na raiz do domínio próprio.
const BASE_URL = import.meta.env.BASE_URL || '/';

function App() {
  return (
    <BrowserRouter basename={BASE_URL}>
      {/* LazyMotion carrega só o conjunto domAnimation (entradas, in-view, exit, hover);
          reducedMotion="user" faz toda animação respeitar a preferência do sistema. */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ScrollToTop />
          <Backdrop />
          <CommandPaletteHost />
          <EasterEggs />
          <div className="flex min-h-[100dvh] flex-col overflow-x-clip text-foreground">
            <Navbar />

            <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 md:px-8">
              {/* Fallback vazio com altura: a troca de rota é rápida e um spinner só piscaria */}
              <Suspense fallback={<div className="min-h-[100dvh]" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/en" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/en/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/en/projects" element={<Projects />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/tools/email-validator" element={<EmailValidator />} />
                  <Route path="/tools/cpf" element={<CPFGenerator />} />
                  <Route path="/tools/cnpj" element={<CNPJGenerator />} />
                  <Route path="/tools/cep" element={<CEPFinder />} />
                  <Route path="/tools/phone-validator" element={<PhoneValidator />} />
                  <Route path="/tools/fake-data" element={<FakeDataGenerator />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  );
}

export default App;
