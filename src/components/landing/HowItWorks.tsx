import { User, FileKey, ClipboardList, BadgeCheck, Smartphone, Shield, PenLine, Unlock, FlaskConical, FileSearch, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const phase1Steps = [
  {
    icon: User,
    title: "Identity & Admin Info",
    description:
      "Patient accesses the registration service and provides identity and administrative information on the plaintext channel.",
    detail: "No sample code or health data at this stage.",
  },
  {
    icon: FileKey,
    title: "Privacy & Medical Consent",
    description:
      "Privacy/data-processing consent and informed medical consent are captured and recorded on the identity channel.",
    detail: "Required authorizations before any sample processing.",
  },
  {
    icon: ClipboardList,
    title: "Service Request",
    description:
      "Patient selects and confirms the requested diagnostic service. The service is validated as available and unused.",
    detail: "Service selection only — no biological sample yet.",
  },
  {
    icon: BadgeCheck,
    title: "Validation ID Issued",
    description:
      "A Validation ID certifies valid registration, required consents, and an authorized service. Made available to the patient and BlindeData.",
    detail: "Phase One ends here. No Sample Code anywhere in this flow.",
    featured: true,
  },
];

const phase2Steps = [
  {
    icon: Smartphone,
    title: "Patient App Submission",
    description:
      "In a separate step, the patient provides Validation ID, Sample Code, and required health/anamnestic data through the Patient App.",
    detail: "Sample Code and health data are blinded client-side.",
  },
  {
    icon: Shield,
    title: "BlindeData Verification",
    description:
      "BlindeData receives the Validation ID (visible) and blinded form (content not accessible). Validates, consumes the ID, and blind-signs the payload.",
    detail: "BlindeData signs without knowing Sample Code or health data.",
    featured: true,
  },
  {
    icon: Unlock,
    title: "Patient Unblinds Locally",
    description:
      "The Patient App receives the signed blinded form and unblinds locally. Result: Sample Code + health data + verifiable BlindeData signature — no identity, no Validation ID.",
    detail: "Unblinding happens entirely on the patient client.",
  },
  {
    icon: FlaskConical,
    title: "Lab Receives Signed Data",
    description:
      "The laboratory receives Sample Code and required health data with a cryptographically verifiable authorization — neither patient identity nor Validation ID.",
    detail: "Lab verifies BlindeData's signature, not the Validation ID.",
  },
  {
    icon: FileSearch,
    title: "Report by Sample Code",
    description:
      "The lab associates the report with the Sample Code. The patient, who knows the Sample Code, retrieves results through the Patient App.",
    detail: "Report linkage: Sample Code → Report. Not Patient → Report.",
  },
];

const StepCard = ({
  step,
  index,
  phaseLabel,
}: {
  step: (typeof phase1Steps)[number];
  index: number;
  phaseLabel: string;
}) => (
  <div
    className={cn(
      "group relative flex h-full flex-col rounded-2xl border bg-card/90 p-6 backdrop-blur-sm transition-all duration-300",
      "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
      step.featured ? "border-primary/40 ring-1 ring-primary/15" : "border-border"
    )}
  >
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
        <step.icon className="h-5 w-5 text-primary" />
      </div>
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-bold tracking-wider",
          step.featured ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        {phaseLabel} · {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <h3 className="font-display mb-2 text-lg font-semibold leading-snug text-foreground">
      {step.title}
    </h3>
    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
      {step.description}
    </p>

    <div className="mt-auto rounded-lg border border-primary/10 bg-primary/5 px-3 py-2.5">
      <p className="text-xs font-medium leading-relaxed text-primary">{step.detail}</p>
    </div>
  </div>
);

const PhaseBreak = () => (
  <div className="relative my-10 flex items-center justify-center">
    <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <div className="relative flex flex-col items-center gap-1 rounded-2xl border-2 border-primary/30 bg-background px-8 py-4 shadow-sm">
      <PenLine className="h-5 w-5 text-primary" />
      <span className="font-display text-sm font-bold uppercase tracking-widest text-primary">
        End of Phase One
      </span>
      <span className="text-xs text-muted-foreground">Phase Two begins in the Patient App — separate flow</span>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-surface-elevated px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Two-phase protocol
            </span>
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold md:text-5xl">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Identity and consent are collected in Phase One. Sample data and health information flow through a
            completely separate blinded path in Phase Two. Native Dissociation is the property of this architecture —
            not a single processing step.
          </p>
        </div>

        {/* Phase 1 */}
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-amber/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber border border-amber/20">
            Phase 1 — Plaintext Registration
          </span>
          <span className="text-sm text-muted-foreground">Patient → Lab Registration → Validation ID</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {phase1Steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} phaseLabel="P1" />
          ))}
        </div>

        <PhaseBreak />

        {/* Phase 2 */}
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal border border-teal/20">
            Phase 2 — Blinded Health-Data Flow
          </span>
          <span className="text-sm text-muted-foreground">Patient App → BlindeData → Lab → Report</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {phase2Steps.slice(0, 3).map((step, index) => (
            <StepCard key={step.title} step={step} index={index} phaseLabel="P2" />
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:mx-auto lg:max-w-4xl">
          {phase2Steps.slice(3).map((step, index) => (
            <StepCard key={step.title} step={step} index={index + 3} phaseLabel="P2" />
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:gap-6 md:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <GitBranch className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display mb-2 text-xl font-semibold text-foreground">
                Two phases, one architecture
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                BlindeData keeps registration/consent and sample/health-data flows strictly separate. The Validation ID
                exists only in Phase One and at BlindeData during authorization. The laboratory receives signed Sample
                Code and health data — never patient identity and never the Validation ID — so the two flows cannot be
                reconnected at the provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
