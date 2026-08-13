import {
  KeyRound,
  FileKey,
  ClipboardList,
  BadgeCheck,
  Smartphone,
  Shield,
  Unlock,
  FlaskConical,
  FileSearch,
  UserRound,
  Dna,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "plaintext" | "blindedata" | "blinded";

const phase1Stages = [
  {
    icon: KeyRound,
    title: "Identity + admin info",
    description:
      "Patient provides identity and administrative information at the Lab Registration service. No sample code or health data.",
    channel: "plaintext" as Channel,
  },
  {
    icon: FileKey,
    title: "Consents captured",
    description:
      "Privacy/data-processing consent and informed medical consent are recorded on the plaintext channel.",
    channel: "plaintext" as Channel,
  },
  {
    icon: ClipboardList,
    title: "Service confirmed",
    description: "Patient selects the requested diagnostic service. Service validity and availability are confirmed.",
    channel: "plaintext" as Channel,
  },
  {
    icon: BadgeCheck,
    title: "Validation ID issued",
    description:
      "A Validation ID certifies registration, consents, and authorized service. Available to patient and BlindeData. Phase One ends — no Sample Code.",
    channel: "plaintext" as Channel,
    featured: true,
  },
];

const phase2Stages = [
  {
    icon: Smartphone,
    title: "Patient App: blind locally",
    description:
      "Patient provides Validation ID + Sample Code + health data. Sample Code and health data are blinded client-side before transmission.",
    channel: "blinded" as Channel,
  },
  {
    icon: Shield,
    title: "BlindeData: verify & sign",
    description:
      "BlindeData receives Validation ID (visible) + blinded form (content not accessible). Verifies, consumes Validation ID, blind-signs payload. No association retained.",
    channel: "blindedata" as Channel,
    featured: true,
  },
  {
    icon: Unlock,
    title: "Patient unblinds locally",
    description:
      "Signed blinded form returned to Patient App. Client unblinds locally → Sample Code + health data + BlindeData signature. No identity, no Validation ID.",
    channel: "blinded" as Channel,
  },
  {
    icon: FlaskConical,
    title: "Lab receives signed submission",
    description:
      "Laboratory receives Sample Code and required health data with a verifiable authorization signature — not patient identity and not the Validation ID.",
    channel: "blinded" as Channel,
  },
  {
    icon: FileSearch,
    title: "Report by Sample Code",
    description:
      "Lab associates report with Sample Code. Patient retrieves results through the Patient App using the Sample Code they know.",
    channel: "blinded" as Channel,
  },
];

const channelStyles: Record<
  Channel,
  { label: string; node: string; badge: string; card: string }
> = {
  plaintext: {
    label: "Plaintext channel",
    node: "border-amber/50 bg-amber/10 text-amber",
    badge: "bg-amber/10 text-amber border-amber/20",
    card: "hover:border-amber/30",
  },
  blindedata: {
    label: "BlindeData",
    node: "border-primary bg-primary/15 text-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    card: "hover:border-primary/40 ring-1 ring-primary/10",
  },
  blinded: {
    label: "Blinded channel",
    node: "border-teal/50 bg-teal/10 text-teal",
    badge: "bg-teal/10 text-teal border-teal/20",
    card: "hover:border-teal/30",
  },
};

const TimelineStages = ({
  stages,
  phaseNum,
  startIndex,
}: {
  stages: typeof phase1Stages;
  phaseNum: 1 | 2;
  startIndex: number;
}) => (
  <div className="relative mx-auto max-w-3xl">
    <div
      className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-amber/40 via-primary/40 to-teal/40 md:left-[27px]"
      aria-hidden
    />
    <div className="space-y-0">
      {stages.map((stage, index) => {
        const styles = channelStyles[stage.channel];
        const StageIcon = stage.icon;
        const globalIndex = startIndex + index;

        return (
          <div key={stage.title} className="relative flex gap-4 md:gap-6">
            <div className="relative z-10 flex shrink-0 flex-col items-center pt-6">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm md:h-14 md:w-14",
                  styles.node,
                  stage.featured && "ring-2 ring-primary/25 ring-offset-2 ring-offset-background"
                )}
              >
                <StageIcon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              {index < stages.length - 1 && (
                <div className="my-2 h-full min-h-[1.5rem] w-px bg-border/60" aria-hidden />
              )}
            </div>

            <div
              className={cn(
                "mb-6 flex-1 rounded-2xl border bg-card/90 p-5 backdrop-blur-sm transition-all duration-300 md:p-6",
                stage.featured ? "border-primary/30 shadow-md shadow-primary/5" : "border-border",
                styles.card
              )}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground">
                  P{phaseNum} · {String(globalIndex + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    styles.badge
                  )}
                >
                  {styles.label}
                </span>
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-foreground md:text-xl">
                {stage.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {stage.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const DataFlow = () => {
  return (
    <section id="data-flow" className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-amber/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Data movement
            </span>
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold md:text-5xl">
            How Your <span className="text-gradient-primary">Data</span> Moves
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            BlindeData is built on two strictly separated phases. Identity and consent never share a channel with
            sample data — privacy is enforced by architecture, not only by policy.
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-3 py-1.5">
            <UserRound className="h-3.5 w-3.5 text-amber" />
            <span className="text-xs font-medium text-amber">Phase 1 — Plaintext</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">BlindeData</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-3 py-1.5">
            <Dna className="h-3.5 w-3.5 text-teal" />
            <span className="text-xs font-medium text-teal">Phase 2 — Blinded</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber border border-amber/20">
            Phase 1
          </span>
          <span className="text-sm text-muted-foreground">Registration & consent → Validation ID</span>
        </div>
        <TimelineStages stages={phase1Stages} phaseNum={1} startIndex={0} />

        <div className="relative my-10 flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="relative flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-background px-6 py-3">
            <PenLine className="h-4 w-4 text-primary" />
            <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
              End of Phase One — no Sample Code in Phase 1
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal border border-teal/20">
            Phase 2
          </span>
          <span className="text-sm text-muted-foreground">Blinded submission → Lab → Report by Sample Code</span>
        </div>
        <TimelineStages stages={phase2Stages} phaseNum={2} startIndex={phase1Stages.length} />

        <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-border/80 bg-muted/20 px-5 py-4 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Two phases, one protocol.</span> The Validation ID never
            reaches the laboratory. The lab receives Sample Code and health data with a verifiable authorization
            signature — neither patient identity nor the Validation ID used during authorization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataFlow;
