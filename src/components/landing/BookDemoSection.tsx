import { CalendarClock } from "lucide-react";
import CalBookingEmbed, { CAL_URL } from "@/components/landing/CalBookingEmbed";

const BookDemoSection = () => {
  return (
    <section id="book-demo" className="py-24 px-4 sm:px-6 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <CalendarClock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">15-minute walkthrough</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Book a <span className="text-gradient-primary">Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a time that works for you. We&apos;ll walk through Native Dissociation — identity, consent, authorization, and blinded lab processing.
          </p>
        </div>

        {/* Full Cal.com UI: host details | month calendar | time slots */}
        <div className="mx-auto w-full max-w-[1100px]">
          <CalBookingEmbed namespace="blindedata-demo-inline" />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Powered by{" "}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            Cal.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default BookDemoSection;
