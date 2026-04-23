import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tools from './pages/Tools';
import EmailValidator from './pages/tools/EmailValidator';
import CPFGenerator from './pages/tools/CPFGenerator';
import CNPJGenerator from './pages/tools/CNPJGenerator';
import CEPFinder from './pages/tools/CEPFinder';
import PhoneValidator from './pages/tools/PhoneValidator';
import FakeDataGenerator from './pages/tools/FakeDataGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#09090B] text-white selection:bg-purple-500/30 overflow-x-hidden font-sans flex flex-col">
        {/* Background Grid */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent"></div>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/email-validator" element={<EmailValidator />} />
            <Route path="/tools/cpf" element={<CPFGenerator />} />
            <Route path="/tools/cnpj" element={<CNPJGenerator />} />
            <Route path="/tools/cep" element={<CEPFinder />} />
            <Route path="/tools/phone-validator" element={<PhoneValidator />} />
            <Route path="/tools/fake-data" element={<FakeDataGenerator />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
