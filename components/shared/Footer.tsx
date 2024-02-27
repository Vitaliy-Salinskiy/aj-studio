import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerCopyrights, footerFeatures, socials } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="appContainer border-b-[2px] border-black">
        <div className="flex flex-col lg:flex-row gap-12 py-12">
          <ul className="flex flex-col xl:flex-row gap-10 flex-[4]">
            <li>
              <Image src="/logo.svg" alt="footer-logo" width={55} height={55} />
            </li>
            {footerFeatures.map((item) => (
              <li key={item.title} className="flex flex-col gap-4">
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex flex-col gap-2 py-2 cursor-pointer">
                  {item.subtitles.map((subtitle) => (
                    <p key={subtitle}>{subtitle}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="max-w-[616px]">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Subscribe</h3>
              <p>
                Join our newsletter to stay up to date on features and releases.
              </p>
            </div>
            <form className="flex flex-col gap-4 mt-6">
              <Input
                className="p-3 border-[2px] border-black rounded-[5px] font-semibold placeholder:font-normal focus-visible:ring-0 focus-visible:ring-transparent"
                type="email"
                placeholder="Enter your email"
              />
              <div>
                <Button type="button">Subscribe</Button>
              </div>
            </form>
            <p className="mt-6">
              By subscribing you agree to with our Privacy Policy and provide
              consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
      <section>
        <div className="appContainer">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8 pt-4 pb-10 lg:pt-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <h4>{currentYear} Relume. All right reserved.</h4>
              <ul className="flex gap-6">
                {footerCopyrights.map((right, index) => (
                  <li key={index} className="underline cursor-pointer">
                    {right}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  target="_blank"
                  href={social.link}
                  className="w-6 h-6"
                >
                  <social.icon
                    className="text-2xl hover:scale-125 transition-transform duration-300"
                    style={{ color: social.color }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
