import { User, Split, ShieldCheck, FlaskConical, FileCheck, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: User,
    title: "Identity & Consent",
    description:
      "Patient provides identity, privacy consent, and informed medical consent on a dedicated channel — never bundled with sample or health data.",
    detail: "Consent and identity stay on the plaintext flow.",
  },
  {
    icon: Split,
    title: "Native Dissociation",
    description:
      "The architecture separates identity from sample identifiers before data reaches the lab. The provider does not receive the association in the first place.",
    detail: "Dissociation happens by design, not after the fact.",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description:
      "The protocol verifies required consents are valid without revealing the identity-to-sample link. Valid consent enables processing; missing consent blocks it.",
    detail: "Authorization proofs cover authenticity and integrity — unlinkability comes from the architecture.",
    featured: true,
  },
  {
    icon: FlaskConical,
    title: "Lab Processing",
    description:
      "Lab receives blinded samples with validation IDs. It can confirm a sample is authorized for processing while remaining unable to see patient identity.",
    detail: "Labs process dissociated data only.",
  },
  {
    icon: FileCheck,
    title: "Result Delivery",
    description:
      "Results return through the blinded channel. The patient retrieves them via their portal — identity was never part of the lab workflow.",
    detail: "Results reach the patient without re-linking identity at the provider.",
  },
];

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) => (
  <div
    className={cn(
      "group relative flex h-full flex-col rounded-2xl border bg-card/90 p-6 backdrop-blur-sm transition-all duration-300",
      "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
      step.featured
        ? "border-primary/40 ring-1 ring-primary/15"
        : "border-border"
    )}
  >
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
        <step.icon className="h-5 w-5 text-primary" />
      </div>
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-bold tracking-wider",
          step.featured
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        STEP {String(index + 1).padStart(2, "0")}
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

const HowItWorks = () => {
  const topSteps = steps.slice(0, 3);
  const bottomSteps = steps.slice(3);

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
              The workflow
            </span>
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold md:text-5xl">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Identity and consent travel one path; blinded sample identifiers and health data travel
            another — from kit registration through authorized lab processing to result delivery.
          </p>
        </div>

        {/* Desktop flow rail */}
        <div className="relative mb-8 hidden lg:block">
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="relative grid grid-cols-5 gap-4 px-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex justify-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm",
                    step.featured
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary/30 bg-card text-primary"
                  )}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 + 2 layout — readable card widths */}
        <div className="mb-12 space-y-5">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:mx-auto lg:max-w-4xl">
            {bottomSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index + 3} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:gap-6 md:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <GitBranch className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display mb-2 text-xl font-semibold text-foreground">
                End-to-end workflow
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                BlindData keeps identity verification, consent collection, native dissociation,
                authorization, and result delivery as independent steps. Labs can verify that a
                sample is legitimately authorized for processing while remaining unable to see
                patient identity through the BlindData workflow — so re-identification is not a
                policy choice, it is prevented by architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
