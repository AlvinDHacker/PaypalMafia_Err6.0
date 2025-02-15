"use client";
import Link from "next/link";
import GetStarted from "./GetStarted";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  AppWindow,
  Clapperboard,
  Coins,
  ExternalLink,
  FilePieChart,
  MessageCircleMore,
} from "lucide-react";
import { LineShadowText } from "./ui/line-shadow-text";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "../components/ui/terminal";
import { IconCloud } from "./ui/icon-cloud";

const Hero = () => {
  const slugs = [
    "paypal",
    "visa",
    "mastercard",
    "stripe",
    "americanexpress",
    "chase",
    "citibank",
    "capitalone",
    "discover",
    "amex",
    "barclays",
    "allianz",
    "metlife",
    "prudential",
    "vanguard",
    "fidelity",
    "schwab",
    "blackrock",
    "robinhood",
    "etrade",
    "wealthfront",
    "betterment",
    "sofi",
    "stash",
    "acorns",
    "mint",
    "plaid",
    "affirm",
    "klarna",
    "afterpay",
    "zelle",
    "venmo",
    "cashapp",
    "alipay",
    "wechatpay",
    "googlepay",
    "applepay",
    "samsungpay",
    "revolut",
  ];

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );
  return (
    <>
      <section id="home" className={`flex md:flex-row flex-col sm:py-16 py-6`}>
        <div
          className={`flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6`}
        >
          <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2"></div>

          <div className="sm:w-[90%] w-full mx-auto">
            <Badge className={`font-poppins font-normal text-sm ml-2 mb-4`}>
              <span>Take Control of your Finances</span>
            </Badge>
            <div className="flex flex-row justify-between items-center">
              <div className="flex-1 font-poppins font-semibold sm:text-7xl text-5xl text-black dark:text-white">
                The Next <br className="sm:block hidden" />{" "}
                <LineShadowText
                  className=" text-green-800"
                  shadowColor={"black"}
                >
                  Generation
                </LineShadowText>{" "}
                {/* <span className="bg-gradient-to-r from-green-800 to-green-300 bg-clip-text text-transparent">
                  
                </span> */}
                <br />
                Finance Chatbot
              </div>
            </div>
            <p className={`font-poppins my-5`}>
              Finnovate AI simplifies financial management by providing
              intelligent insights, interactive analysis, and real-time querying
              of financial documents and data.
            </p>

            <Authenticated>
              <Link href={"/dashboard"}>
                <Button className="gap-3">
                  Journey with us <ExternalLink />
                </Button>
              </Link>
            </Authenticated>
            <Unauthenticated>
              <Button>
                <SignInButton />
              </Button>
            </Unauthenticated>
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
      <section className="w-[90%] mx-auto">
        <div className="text-black dark:text-white flex justify-between items-center flex-col sm:mb-16 mb-6">
          <h2 className="font-poppins font-semibold text-3xl mb-3 w-full">
            What do we do ?
          </h2>
          <div className="w-full md:mt-0 mt-6">
            <p className="font-poppins font-normal text-dimWhite text-md text-left mb-3 ">
              Finnovate AI is a domain-specific, AI-powered financial management
              platform designed to revolutionize how organizations manage their
              finances.
            </p>
            <p className="font-poppins font-normal text-dimWhite text-md text-left">
              We are basically a chatbot on steriods which helps you for all
              things finance.. Our unique features help you get a response in
              graphs and charts which help you visualize better... Not only that
              as a chatbot we even analyse youtube videos and answer your
              questions based on it...
            </p>
          </div>
        </div>
        <h2 className="font-poppins font-semibold text-3xl mb-4 mt-10 w-full">
          Our Main Features
        </h2>

        <div className="grid sm:grid-cols-4 gap-3 mb-6">
          <div className="sm:col-span-2">
            <Terminal className="sm:w-full min-w-[90%]">
              <TypingAnimation>
                &gt; The Next Generation Finance Solution
              </TypingAnimation>
              <AnimatedSpan delay={1500} className="text-green-500">
                <span>✔ Document Analysis and Insights</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-green-500">
                <span>✔ Interactive Video Integration</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2500} className="text-green-500">
                <span>✔ Graph and Chart Generation</span>
              </AnimatedSpan>
              <AnimatedSpan delay={3000} className="text-green-500">
                <span>✔ Tax Optimization Suggestions</span>
              </AnimatedSpan>
              <AnimatedSpan delay={3500} className="text-green-500">
                <span>✔ Collaborative Financial Review</span>
              </AnimatedSpan>
              <AnimatedSpan delay={4000} className="text-green-500">
                <span>✔ Expense Categorization and Analysis</span>
              </AnimatedSpan>
              <AnimatedSpan delay={4500} className="text-green-500">
                <span>✔ Smart Querying with Contextual AI</span>
              </AnimatedSpan>
              <AnimatedSpan delay={5000} className="text-green-500">
                <span>✔ PDF Extension for Browsers</span>
              </AnimatedSpan>
              <AnimatedSpan delay={5500} className="text-green-500">
                <span>✔ Data Privacy and Security</span>
              </AnimatedSpan>
              <AnimatedSpan delay={6000} className="text-blue-500">
                <span>ℹ Thank you for using Finnovate AI:</span>
                <span className="pl-2">- Try it out</span>
              </AnimatedSpan>
              <TypingAnimation delay={6500} className="text-muted-foreground">
                Success! Project initialized.
              </TypingAnimation>
              <TypingAnimation delay={7000} className="text-muted-foreground">
                You may now add components.
              </TypingAnimation>
            </Terminal>
          </div>

          <div className="dark:hover:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 bg-gray-200 dark:text-white text-black flex flex-col justify-between transition-all duration-300 p-6 rounded-2xl max-w-[370px] shadow-md hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AppWindow className="text-green-500 w-6 h-6" />
              <p className="font-semibold text-lg">Chrome Extension</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              We simplify the process by enabling users to ask questions
              directly about online PDFs.
            </p>
          </div>
          <div className="dark:hover:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 bg-gray-200 dark:text-white text-black flex flex-col justify-between transition-all duration-300 p-6 rounded-2xl max-w-[370px] shadow-md hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clapperboard className="text-green-500 w-6 h-6" />
              <p className="font-semibold text-lg">Upload Videos</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Upload financial videos or presentations and interact with the
              content through chat-based questions and answers.
            </p>
          </div>

          <div className="dark:hover:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 bg-gray-200 dark:text-white text-black flex flex-col justify-between transition-all duration-300 p-6 rounded-2xl max-w-[370px] shadow-md hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FilePieChart className="text-green-500 w-6 h-6" />
              <p className="font-semibold text-lg">Graph & Chart Generation</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Visualize spending patterns, revenue trends, and financial metrics
              through automatically generated graphs and charts.
            </p>
          </div>
          <div className="dark:hover:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 bg-gray-200 dark:text-white text-black flex flex-col justify-between transition-all duration-300 p-6 rounded-2xl max-w-[370px] shadow-md hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="text-green-500 w-6 h-6" />
              <p className="font-semibold text-lg">Tax Optimization</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Get personalized tax-saving strategies and recommendations
              tailored to institutional finance needs.
            </p>
          </div>
          <div className="dark:hover:bg-gray-900 hover:bg-gray-100 dark:bg-gray-800 bg-gray-200 dark:text-white text-black flex flex-col justify-between transition-all duration-300 p-6 rounded-2xl max-w-[370px] shadow-md hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircleMore className="text-green-500 w-6 h-6" />
              <p className="font-semibold text-lg">Collaborative Reviews</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Multiple team members can collaborate on financial documents,
              leave comments, and discuss insights in real-time.
            </p>
          </div>
        </div>

        <div className=" md:grid grid-cols-2 pb-5 gap-7">
          <div className="col-span-1">
            <h2 className="font-poppins font-semibold text-3xl mb-4 mt-10 w-full">
              We&apos;ve trained for everything on Finance
            </h2>
            <div className="w-full mt-6">
              <p className="font-poppins font-normal text-dimWhite max-w-[450px] text-md text-left mb-6 ">
                From saving and investing to budgeting and wealth management, we
                cover every aspect of finance to help you make informed
                decisions and secure your financial future.
              </p>
            </div>
            <Authenticated>
              <Link href={"/dashboard"}>
                <Button className="gap-3">
                  Try it out <ExternalLink />
                </Button>
              </Link>
            </Authenticated>
            <Unauthenticated>
              <Button>
                <SignInButton />
              </Button>
            </Unauthenticated>
          </div>
          <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
