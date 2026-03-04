import Image from "next/image";
import Link from "next/link";
import CTAImage from "../../assets/images/CTA.png";

const CTABanner = () => {
  return (
    <section
      style={{
        clipPath: "polygon(15% 0, 100% 0, 100% 75%, 75% 100%, 0 100%, 0% 15%)",
      }}
      className="container mx-auto bg-primary p-6 sm:px-12 lg:px-20 lg:flex justify-between h-auto lg:h-125 gap-10"
    >
      <div className=" lg:py-16 flex flex-col justify-center shrink-0">
        <h2 className="text-2xl text-center lg:text-left md:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
          Start posting
          <br />
          jobs today
        </h2>
        <p className="text-white mb-8 text-sm md:text-base text-center lg:text-left">
          Start posting jobs for only $10.
        </p>
        <div>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 mb-8 lg:mb-0 w-full lg:w-auto bg-white text-primary font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Sign Up For Free
          </Link>
        </div>
      </div>

      <div className="flex items-end shrink">
        <Image
          src={CTAImage}
          alt="Dashboard Mockup"
          width={565}
          height={346}
          className="object-contain mx-auto w-full"
        />
      </div>
    </section>
  );
};

export default CTABanner;
