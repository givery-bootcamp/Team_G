import { Smartphone, Globe, Eye, Workflow, Brain } from "lucide-react";
import React from "react";

const iconMap = {
  smartphone: Smartphone,
  globe: Globe,
  eye: Eye,
  workflow: Workflow,
  brain: Brain,
};

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

const features = [
  {
    title: "Instant Sharing",
    description: "Share your moments instantly across the globe with our seamless social connectivity.",
    icon: "globe",
  },
  {
    title: "Interactive Media",
    description:
      "Bring your stories to life with dynamic media tools that allow for interactive and engaging visual posts.",
    icon: "eye",
  },
  {
    title: "Privacy First",
    description:
      "Your privacy matters. Count on our robust privacy settings to keep your personal information safe and secure.",
    icon: "workflow",
  },
  {
    title: "Smart Suggestions",
    description:
      "Enhance your posting experience with AI-driven suggestions tailored to your interests and interactions.",
    icon: "brain",
  },
] as Feature[];

const FeaturePanel = ({ feature }: { feature: Feature }) => {
  return (
    <div className="rounded-lg border border-slate-400 px-3 py-6 transition-colors hover:border-slate-300 hover:bg-slate-100">
      <h2 className="flex items-center gap-1 font-bold text-slate-900 md:text-2xl">
        {React.createElement(iconMap[feature.icon])}
        {feature.title}
      </h2>
      <p className="mt-4 text-xs text-slate-600 md:text-sm">{feature.description}</p>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="mx-auto max-w-4xl px-3 py-6 md:py-14">
      <h2 className="mb-4 text-center text-4xl font-extrabold text-slate-900">Features</h2>
      <div className="grid w-full grid-cols-2 gap-4 md:gap-6">
        {features.map((feature, i) => (
          <FeaturePanel key={i} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
