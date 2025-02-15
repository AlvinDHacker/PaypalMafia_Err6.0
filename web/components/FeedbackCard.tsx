import { FC } from "react";
import Image from "next/image";

interface FeedbackCardProps {
  content: string;
  name: string;
  title: string;
  img: string;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ content, name, title, img }) => (
  <div className="dark:hover:bg-black hover:bg-white
  dark:bg-gray-800 bg-gray-200
   dark:text-white flex
  hover:text-black justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <Image
      src="/quotes.svg"
      alt="double_quotes"
      width={43}
      height={28}
      className="object-contain"
    />

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] my-10">
      {content}
    </p>

    <div className="flex flex-row">
      <Image
        src={img}
        alt={name}
        width={48}
        height={48}
        className="rounded-full h-12 w-12"
      />
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px]">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
          {title}
        </p>
      </div>
    </div>
  </div>
);

export default FeedbackCard;
