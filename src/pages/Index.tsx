import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import DataFlow from "@/components/landing/DataFlow";
import Portals from "@/components/landing/Portals";
import BookDemoSection from "@/components/landing/BookDemoSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <DataFlow />
        <Portals />
        <BookDemoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
