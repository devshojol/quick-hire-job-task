import Link from "next/link";

const CTABanner = () => {
  return (
    <section className="mx-4 md:mx-8 lg:mx-auto lg:max-w-screen-xl my-12 overflow-hidden bg-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Start posting
            <br />
            jobs today
          </h2>
          <p className="text-blue-200 mb-8 text-sm md:text-base">
            Start posting jobs for only $10.
          </p>
          <div>
            <Link
              href="/admin"
              className="inline-block px-6 py-3 bg-white text-primary font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>

        {/* Right - dashboard mockup */}
        <div className="hidden lg:flex items-center justify-end overflow-hidden relative bg-[#3733C2]">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
          />
          <div className="relative p-8 w-full max-w-sm ml-auto">
            {/* Dashboard mockup card */}
            <div className="bg-white rounded-lg shadow-2xl p-4 transform translate-x-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#25324B]">Recruiting Dashboard</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#F8F8FD] rounded p-3">
                  <div className="text-[10px] text-gray-400 mb-1">Job Listings</div>
                  <div className="text-xl font-bold text-primary">76</div>
                  <div className="text-[10px] text-green-500 mt-1">+12% this month</div>
                </div>
                <div className="bg-[#F8F8FD] rounded p-3">
                  <div className="text-[10px] text-gray-400 mb-1">Applications</div>
                  <div className="text-xl font-bold text-[#26A4FF]">24</div>
                  <div className="text-[10px] text-green-500 mt-1">+8% this month</div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-[#F8F8FD] rounded p-3 mb-3">
                <div className="text-[10px] text-gray-400 mb-2">Monthly Activity</div>
                <div className="flex items-end gap-1 h-10">
                  {[30, 55, 40, 70, 45, 85, 60, 90, 50, 75, 65, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: h > 70 ? "#4640DE" : "#D6DDEB",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom stat */}
              <div className="flex items-center justify-between bg-[#F8F8FD] rounded p-3">
                <div>
                  <div className="text-[10px] text-gray-400">Total Views</div>
                  <div className="text-base font-bold text-[#25324B]">2,342</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Hired</div>
                  <div className="text-base font-bold text-green-500">67</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
