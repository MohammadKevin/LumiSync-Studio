import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TeamSection from "./components/TeamSection";
import Services from "./components/Services";
import PortfolioGrid from "./components/PortfolioGrid";
import Synergy from "./components/Synergy";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Floating Header Navbar */}
      <Navbar />

      <main className="flex flex-col flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Dynamic profiles panel */}
        <TeamSection />

        {/* Offerings list */}
        <Services />

        {/* Dynamic project card grids */}
        <PortfolioGrid />

        {/* Workflow sinergi sequence */}
        <Synergy />

        {/* Contact inputs card */}
        <ContactForm />
      </main>

      {/* Footer bar */}
      <Footer />
    </>
  );
}
