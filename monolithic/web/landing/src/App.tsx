import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";
import TeachersPage from "@/pages/teachers";
import StudentsPage from "@/pages/students";
import BrowsePage from "@/pages/browse";
import FeaturesPage from "@/pages/features";
import PricingPage from "@/pages/pricing";
import TeamPage from "@/pages/team";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
