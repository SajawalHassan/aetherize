export type pricingType = "popular" | "normal";

export interface PriceTier {
  type: pricingType;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export const priceTiers: PriceTier[] = [
  {
    type: "normal",
    name: "Basic",
    description: "For creators craving a quick start, build your website with all the essentials—for free.",
    price: 0,
    features: ["5 Lifetime Projects", "30 AI Requests per day", "Lorem  Ipsum"],
  },
  {
    type: "popular",
    name: "Creator",
    description: "For ambitious creators, unlock advanced tools and customization with the Creator plan.",
    price: 29,
    features: ["5 Lifetime Projects", "30 AI Requests per day", "Lorem  Ipsum"],
  },
  {
    type: "normal",
    name: "Enterprise",
    description: "For businesses ready to scale, the Enterprise plan offers premium features—tailored to you.",
    price: 39,
    features: ["5 Lifetime Projects", "30 AI Requests per day", "Lorem  Ipsum"],
  },
];
