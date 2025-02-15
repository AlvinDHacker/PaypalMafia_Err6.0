import { ArrowUp } from "lucide-react";

const GetStarted = () => (
  <div
    className={`flex justify-center items-center  w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
  >
    <div
      className={`flex justify-center items-center dark:text-black text-white flex-col bg-primary w-[100%] h-[100%] rounded-full`}
    >
      <div className={`flex justify-center items-start flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span>Get</span>
        </p>
        <ArrowUp />
      </div>

      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span>Started</span>
      </p>
    </div>
  </div>
);

export default GetStarted;
