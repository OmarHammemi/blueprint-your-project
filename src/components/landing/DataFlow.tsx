import {
  KeyRound,
  Split,
  ShieldCheck,
  FlaskConical,
  FileSearch,
  ArrowDownRight,
  UserRound,
  Dna,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "identity" | "dissociation" | "blinded";

const stages: {
  icon: typeof KeyRound;
  title: string;
  description: string;
  channel: Channel;
  featured?: boolean;
}[] = [
  {
    icon: KeyRound,
    title: "Identity + consents",
    description:
      "Patient identity, privacy consent, and informed medical consent travel on the plaintext channel — separate from sample and health data.",
    channel: "identity",
  },
  {
    icon: Split,
    title: "Native dissociation",
    description:
      "The architecture splits flows before data reaches the provider. Blinded sample codes and validation IDs replace personal identifiers on the medical path.",
    channel: "dissociation",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description:
      "The protocol verifies that required consents are validly provided without revealing the identity-to-sample association. Processing is blocked when authorization is absent.",
    channel: "blinded",
    featured: true,
  },
  {
    icon: FlaskConical,
    title: "Blinded sample + health data",
    description:
      "The lab receives a validation ID and dissociated health data only. Patient identity is not part of this workflow.",
    channel: "blinded",
  },
  {
    icon: FileSearch,
    title: "Result delivery",
    description:
      "Results return through the blinded channel. The patient retrieves them via their portal — the lab cannot see who they belong to.",
    channel: "blinded",
  },
];

const channelStyles: Record<
  Channel,
  { label: string; node: string; badge: string; card: string }
> = {
  identity: {
    label: "Identity channel",
    node: "border-amber/50 bg-amber/10 text-amber",
    badge: "bg-amber/10 text-amber border-amber/20",
    card: "hover:border-amber/30",
  },
  dissociation: {
    label: "Native dissociation",
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
            BlindData is built so identity and biological data never share the same channel — privacy
            is enforced by the architecture, not only by policy.
          </p>
        </div>

        {/* Channel legend */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-3 py-1.5">
            <UserRound className="h-3.5 w-3.5 text-amber" />
            <span className="text-xs font-medium text-amber">Identity channel</span>
          </div>
          <ArrowDownRight className="hidden h-4 w-4 text-muted-foreground/50 sm:block" />
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
            <Split className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Dissociation</span>
          </div>
          <ArrowDownRight className="hidden h-4 w-4 text-muted-foreground/50 sm:block" />
          <div className="flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-3 py-1.5">
            <Dna className="h-3.5 w-3.5 text-teal" />
            <span className="text-xs font-medium text-teal">Blinded channel</span>
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-amber/40 via-primary/40 to-teal/40 md:left-[27px]"
            aria-hidden
          />

          <div className="space-y-0">
            {stages.map((stage, index) => {
              const styles = channelStyles[stage.channel];
              const StageIcon = stage.icon;

              return (
                <div key={stage.title} className="relative flex gap-4 md:gap-6">
                  {/* Timeline node */}
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

                  {/* Card */}
                  <div
                    className={cn(
                      "mb-6 flex-1 rounded-2xl border bg-card/90 p-5 backdrop-blur-sm transition-all duration-300 md:p-6",
                      stage.featured
                        ? "border-primary/30 shadow-md shadow-primary/5"
                        : "border-border",
                      styles.card
                    )}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold tracking-wider text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
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

        {/* Summary strip */}
        <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-border/80 bg-muted/20 px-5 py-4 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Two channels, one protocol.</span>{" "}
            Identity never rides with sample data — dissociation and authorization happen before the
            lab sees a single record.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataFlow;
