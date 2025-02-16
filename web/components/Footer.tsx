import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      { name: "Documents", link: "/dashboard/documents" },
      { name: "Search", link: "/dashboard/search" },
      { name: "Notes", link: "/dashboard/notes" },
      { name: "Analytics", link: "/dashboard/analytics" },
    ],
  },
  {
    title: "Creators",
    links: [
      { name: "Alvin Dsouza", link: "https://github.com/AlvinDHacker" },
      { name: "Alston Soares", link: "https://github.com/Alstudd/" },
      { name: "Vishal Singh", link: "https://github.com/singhvishalrajput/" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Mail", link: "mailto:alvindsouza2204@gmail.com" },
      { name: "Phone", link: "tel:9820257477" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="flex justify-center items-center py-6 flex-col border-t border-gray-200 dark:border-gray-800">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center items-start md:flex-row flex-col mb-8 w-full">
          <div className="flex-1 flex flex-col justify-start md:mt-4">
            <div className="flex items-center gap-4 text-2xl font-bold">
              <Image
                src="/finnovate_logo.png"
                alt="hoobank"
                width={46}
                height={72}
                className="object-contain "
              />
              <div className="px-1 py-1">Finnovate AI</div>
            </div>
            <p className="font-poppins font-normal text-sm text-dimWhite mt-4 max-w-[312px]">
              A new way to get your Financial Queries Solved.
            </p>
          </div>

          <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap">
            {footerLinks.map((footerlink) => (
              <div
                key={footerlink.title}
                className="flex flex-col min-w-[150px] md:mt-0 mt-5"
              >
                <h4 className="font-semibold uppercase text-md text-black dark:text-white">
                  {footerlink.title}
                </h4>
                <ul className="list-none mt-4">
                  {footerlink.links.map((link, index) => (
                    <li
                      key={link.name}
                      className={`text-sm cursor-pointer
                        hover:text-green-500 ${
                          index !== footerlink.links.length - 1
                            ? "mb-2"
                            : "mb-0"
                        }`}
                    >
                      {footerlink.title == "Creators" ? (
                        <Link target="blank" href={link.link}>
                          {link.name}
                        </Link>
                      ) : (
                        <Link href={link.link}>{link.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="font-poppins font-normal text-center sm:text-sm text-xs text-black dark:text-white">
            Copyright Ⓒ 2025 Finnovate AI. All Rights Reserved.
          </p>

          <div className="flex flex-row md:mt-0 mt-6 gap-4">
            <Link href={""}>
              <Instagram />
            </Link>
            <Link href={""}>
              <Twitter />
            </Link>
            <Link href={""}>
              <Facebook />
            </Link>
            <Link href={""}>
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
