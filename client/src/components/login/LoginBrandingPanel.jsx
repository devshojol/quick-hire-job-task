import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineBriefcase,
  HiOutlineCheckBadge,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import logoWhite from "@/src/assets/images/Logo.png";

const FEATURES = [
  { icon: HiOutlineBriefcase, text: "Post & manage job listings" },
  { icon: HiOutlineUserGroup, text: "Review applications instantly" },
  { icon: HiOutlineCheckBadge, text: "Full control over your hiring" },
];

export default function LoginBrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 rounded-full bg-white/3" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <Link href="/">
          <Image
            src={logoWhite}
            alt="QuickHire"
            width={140}
            height={33}
            className="brightness-0 invert"
          />
        </Link>
      </div>

      {/* Center content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white leading-tight mb-4">
          Manage your <br /> hiring with ease.
        </h2>
        <p className="text-white/70 text-base mb-10 max-w-xs">
          Access the admin panel to post jobs, manage listings, and streamline
          your recruitment process.
        </p>

        <ul className="space-y-4">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} QuickHire. All rights reserved.
        </p>
      </div>
    </div>
  );
}
