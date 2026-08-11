export const CAL_LINK = "hutlaunch/15min";
export const CAL_URL = "https://cal.com/hutlaunch/15min";

/** Official Cal.com embed URL — month view, dark theme, green brand (matches Cal UI). */
const EMBED_SRC =
  "https://cal.com/hutlaunch/15min?embed=true&theme=dark&layout=month_view";

interface CalBookingEmbedProps {
  className?: string;
  /** Unused — kept for call-site compatibility */
  namespace?: string;
}

/**
 * Inline Cal.com booking UI (host | calendar | time slots),
 * matching https://cal.com/hutlaunch/15min
 */
const CalBookingEmbed = ({ className = "" }: CalBookingEmbedProps) => {
  return (
    <div
      className={`cal-booking-shell w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black ${className}`}
    >
      <iframe
        title="Book a 15 min meeting — Cal.com"
        src={EMBED_SRC}
        loading="lazy"
        className="block w-full border-0"
        style={{
          minHeight: "700px",
          height: "720px",
          background: "#000",
        }}
        allow="camera; microphone; fullscreen; payment"
      />
    </div>
  );
};

export default CalBookingEmbed;
