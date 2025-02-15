import React from "react";
import Button from "./Button";

const CTA = () => (
  <section
    className="flex flex-col sm:flex-row justify-between items-center 
  dark:hover:bg-black hover:bg-white bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-all duration-200 rounded-[20px] sm:py-12 py-6 sm:px-16 px-6 sm:my-16 my-6 max-w-7xl mx-auto 0"
  >
    <div className="flex flex-1 flex-col">
      <h2 className="font-semibold text-[40px] xs:text-[48px] text-black dark:text-white leading-[66.8px] xs:leading-[76.8px] w-full">
        Let&apos;s try our service now!
      </h2>
      <p className="text-black-300 dark:text-white text-lg leading-[30.8px] max-w-[470px] mt-5">
        Everything you need to accept card payments and grow your business
        anywhere on the planet.
      </p>
    </div>

    <div className="ml-0 sm:ml-10 mt-10 sm:mt-0">
      <Button />
    </div>
  </section>
);

export default CTA;
