import GetStarted from "./GetStarted";
import { Badge } from "./ui/badge";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col sm:py-16 py-6`}>
      <div
        className={`flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2"></div>

        <div className="w-[90%] mx-auto">
          <Badge className={`font-poppins font-normal text-sm ml-2 mb-4`}>
            <span>Take Control of your Financial Documents</span>
          </Badge>
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1 font-poppins font-semibold text-7xl text-black dark:text-white">
              The Next <br className="sm:block hidden" />{" "}
              <span className="bg-gradient-to-r from-green-800 to-green-300 bg-clip-text text-transparent">
                Generation
              </span>{" "}
              <br />
              Finance Solution
            </div>
          </div>
          <p className={`font-poppins mt-5`}>
            Finnovate AI acts as your team&apos;s second brain, storing all your
            files and allowing easy vector search.
          </p>
        </div>
      </div>

      <div
        className={`flex-1 flex justify-center items-center md:my-0 my-10 relative`}
      >
        <img
          src={"robot.png"}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      {/* <div className={`sm:hidden flex justify-center items-center`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
