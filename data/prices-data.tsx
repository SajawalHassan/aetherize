export type PriceCardType = {
  name: string;
  description: string;
  price: number;
  features: string[];
  priorityLvl: number;
};

export const priceCardsData: PriceCardType[] = [
  {
    name: "Basic",
    description:
      "For creators craving a quick start, build your website with all the essentials—for free.",
    price: 0,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    priorityLvl: 0,
  },
  {
    name: "Creator",
    description:
      "For ambitious creators, unlock advanced tools and customization with the Creator plan.",
    price: 29,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    priorityLvl: 1,
  },
  {
    name: "Enterprise",
    description:
      "For businesses ready to scale, the Enterprise plan offers premium features—tailored to you.",
    price: 29,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    priorityLvl: 2,
  },
];
