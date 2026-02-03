import { User, FlaskConical, ShieldCheck, FileCheck } from "lucide-react";
import nativeDissociationImg from "@/assets/native-dissociation.jpg";

const steps = [
  {
    icon: User,
    title: "Register Your Kit",
    description: "Patient securely registers their test kit through our portal. Personal identity is verified but never linked to samples.",
    color: "bg-amber",
  },
  {
    icon: FlaskConical,
    title: "Sample Processing",
    description: "Lab receives blinded samples with cryptographic validation IDs. They know the data is authentic but can't identify the patient.",
    color: "bg-teal",
  },
  {
    icon: ShieldCheck,
    title: "Blind Verification",
    description: "Third-party service provides RSA blind signatures, mathematically proving data integrity without identity linkage.",
    color: "bg-navy-light",
  },
  {
    icon: FileCheck,
    title: "Anonymous Retrieval",
    description: "Patient retrieves their results using their private key. Only they can decrypt and view their medical data.",
    color: "bg-accent",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Native Dissociation</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            How We Protect Your Privacy
          </h2>
          <p className="text-muted-foreground text-lg">
            Your identity and medical data flow through two completely separate, cryptographically secured channels that can never be linked.
          </p>
        </div>

        {/* Visual Diagram */}
        <div className="mb-20 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto glow-border">
          <img
            src={nativeDissociationImg}
            alt="Native Dissociation - Two separate data streams"
            className="w-full h-auto"
          />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -z-10" />
              )}

              <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/50 h-full">
                {/* Step number */}
                <div className="text-xs font-bold text-muted-foreground mb-4">
                  STEP {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
