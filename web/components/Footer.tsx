import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for our data structures
type FooterLink = {
  name: string;
  link: string;
};

type FooterLinkSection = {
  title: string;
  links: FooterLink[];
};

type SocialMediaLink = {
  id: string;
  icon: string;
  link: string;
};

// Footer data
const footerLinks: FooterLinkSection[] = [
  {
    title: "Useful Links",
    links: [
      { name: "Content", link: "#" },
      { name: "How it Works", link: "#" },
      { name: "Create", link: "#" },
      { name: "Explore", link: "#" },
      { name: "Terms & Services", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Help Center", link: "#" },
      { name: "Partners", link: "#" },
      { name: "Suggestions", link: "#" },
      { name: "Blog", link: "#" },
      { name: "Newsletters", link: "h#" },
    ],
  },
  {
    title: "Partner",
    links: [
      { name: "Our Partner", link: "#" },
      { name: "Become a Partner", link: "#" },
    ],
  },
];



const Footer = () => {
  return (
    <section className="flex justify-center items-center sm:py-16 py-6 flex-col  sm:px-16 px-6 bg-gray-200 dark:bg-gray-800">
      <div className="flex justify-center items-start md:flex-row flex-col mb-8 w-full">
        <div className="flex-1 flex flex-col justify-start md:mt-4">
            <div className='flex items-center gap-4 text-2xl font-bold'>
          <Image
            src="/finnovate_logo.png"
            alt="hoobank"
            width={46}
            height={72}
            className="object-contain "
          />
          <div className='px-1 py-1'>Finnovate AI</div>
          </div>
          <p className="font-poppins font-normal text-[18px] leading-[30.8px] text-dimWhite mt-4 max-w-[312px]">
            A new way to get your Financial Queries Solved.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className="flex flex-col ss:my-0 my-4 min-w-[150px]">
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-black dark:text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px]  cursor-pointer
                        hover:text-green-500 ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-black dark:text-white">
          Copyright Ⓒ 2025 Finnovate AI. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6 gap-4">
            <Link
              href={""}
            >
              <Instagram />
            </Link>
            <Link
              href={""}
            >
              <Twitter />
            </Link>
            <Link
              href={""}
            >
              <Facebook />
            </Link>
            <Link
              href={""}
            >
              <Linkedin />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;