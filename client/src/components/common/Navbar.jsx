import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/images/Logo.png";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <nav className="relative container px-5 mx-auto py-5 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-gray-600 font-medium">
          <Link href="/" className="mr-4">
            <Image src={logo} alt="Logo" width={152} height={36} />
          </Link>
          <div className="hidden md:flex items-center gap-5">
            <Link href="/jobs">Find Jobs</Link>
            <Link href="/login">Browse Companies</Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center gap-3 h-full">
          <Link href="/login" className="px-6 py-3 text-primary font-bold">
            Login
          </Link>
          <div className="bg-secondary self-stretch w-px" />
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-white hover:bg-indigo-700 transition-colors font-bold"
          >
            Sign Up
          </Link>
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
