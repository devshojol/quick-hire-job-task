import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/images/Logo.png";
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={logo}
              alt="QuickHire"
              width={130}
              height={30}
              className="brightness-200 mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-5">About</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-5">Resources</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-2">Get job notifications</h3>
            <p className="text-gray-400 text-sm mb-5">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-3 py-2.5 bg-white text-gray-800 text-sm focus:outline-none min-w-0"
              />
              <button className="px-4 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">2021 © QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube].map((Icon, i) => (
              <Link key={i} href="#" className="text-gray-400 hover:text-white transition-colors p-1">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
