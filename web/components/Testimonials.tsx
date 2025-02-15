// types/index.ts
export interface FeedbackItem {
  id: string;
  content: string;
  name: string;
  title: string;
  img: string;
}

// data/feedback.ts
export const feedback: FeedbackItem[] = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "/people01.png",
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: "/people02.png",
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: "/people03.png",
  },
];

// components/Testimonials.tsx
import { FC } from "react";
import FeedbackCard from "./FeedbackCard";

const Testimonials: FC = () => (
  <section
    id="clients"
    className="sm:py-16 py-6 flex justify-center items-center flex-col relative"
  >
    {/* Gradient Background */}
    <div className="absolute z-0 w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    {/* Header Section */}
    <div className="w-[90%] mx-auto text-black dark:text-white flex justify-between items-center flex-col sm:mb-16 mb-6">
      <h2 className="font-poppins font-semibold text-3xl mb-3 w-full">
        What People say about us
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className="font-poppins font-normal text-dimWhite text-md text-left max-w-[450px]">
          Everything you need to accept card payments and grow your business
          anywhere on the planet.
        </p>
      </div>
    </div>

    {/* Testimonials Cards */}
    <div className="flex flex-wrap sm:justify-start justify-center w-[90%] mx-auto feedback-container relative z-[1]">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Testimonials;
