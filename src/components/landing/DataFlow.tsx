import { KeyRound, Split, ShieldCheck, FlaskConical, FileSearch, ArrowDown } from "lucide-react";

const stages = [
  {
    icon: KeyRound,
    title: "Identity + consents",
    description: "Patient identity, privacy consent, and informed medical consent travel on the plaintext channel — separate from sample and health data.",
  },
  {
    icon: Split,
    title: "Native dissociation",
    description: "The architecture splits flows before data reaches the provider. Blinded sample codes and validation IDs replace personal identifiers on the medical path.",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description: "The protocol verifies that required consents are validly provided without revealing the identity-to-sample association. Processing is blocked when authorization is absent.",
  },
  {
    icon: FlaskConical,
    title: "Blinded sample + health data",
    description: "The lab receives a validation ID and dissociated health data only. Patient identity is not part of this workflow.",
  },
  {
    icon: FileSearch,
    title: "Result delivery",
    description: "Results return through the blinded channel. The patient retrieves them via their portal — the lab cannot see who they belong to.",
  },
];

const DataFlow = () => {
  return (
    <section id="data-flow" className="py-24 px-6 bg-surface-elevated">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            How Your <span className="text-gradient-primary">Data</span> Moves
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            BlindData is built so identity and biological data never share the same channel — privacy is enforced by the architecture, not only by policy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.title}>
              <div className="rounded-2xl p-6 bg-card border border-border flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <stage.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1 text-foreground">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                </div>
              </div>
              {index < stages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataFlow;
