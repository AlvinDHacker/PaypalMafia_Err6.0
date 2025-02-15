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
      "I wish I knew about this tool earlier. It makes my work so easy. Now I don't need to rely on anything else for my financial decisions",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "/people01.png",
  },
  {
    id: "feedback-2",
    content:
      "Finnovate AI made financial analysis a breeze! I get instant insights and clear graphs without any hassle.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: "/people02.png",
  },
  {
    id: "feedback-3",
    content:
      "The ability to ask questions directly on PDFs saved me so much time. It’s a game-changer!",
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

    {/* Header Section */}
    <div className="w-[90%] mx-auto text-black dark:text-white flex justify-between items-center flex-col sm:mb-16 mb-6">
      <h2 className="font-poppins font-semibold text-3xl mb-3 w-full">
        What People say about us
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <div className="font-poppins font-normal text-dimWhite text-md text-left max-w-[450px]">
          You didn&apos;t hear it from us ... <br />
          Listen to what our users have said about us
        </div>
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
