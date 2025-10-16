import {
  SparklesIcon,
  TruckIcon,
  PaintBrushIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const AboutSection = ({ language, translations }) => {
  const lang = translations[language];

  const features = [
    {
      icon: PaintBrushIcon,
      title: lang.about?.features.artisticExcellence.title,
      description: lang.about?.features.artisticExcellence.description,
    },
    {
      icon: SparklesIcon,
      title: lang.about?.features.premiumQuality.title,
      description: lang.about?.features.premiumQuality.description,
    },
    {
      icon: TruckIcon,
      title: lang.about?.features.freeDelivery.title,
      description: lang.about?.features.freeDelivery.description,
    },
    {
      icon: HeartIcon,
      title: lang.about?.features.madeWithLove.title,
      description: lang.about?.features.madeWithLove.description,
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden pb-12 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-2/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-2 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-2"></span>
            </span>
            <span className="text-xs font-semibold text-green-2 md:text-sm">
              {lang.about.badge ?? "Our Specialty"}
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-green-3 md:text-5xl">
            {lang.about.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-gray-600">
            {lang.about.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-green-2 to-green-1 opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex rounded-xl bg-green-2/10 p-3 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="max-sm:size-7 size-8 text-green-2" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-green-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-2 to-green-1 transition-all duration-300 group-hover:w-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-14 grid gap-8 rounded-xl bg-gradient-to-br from-green-2/5 to-green-1/5 p-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-green-3">500+</div>
            <div className="text-gray-600">{lang.about.stat1 ?? "Happy Customers"}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-green-3">1000+</div>
            <div className="text-gray-600">{lang.about.stat2 ?? "Frames Created"}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-green-3">100%</div>
            <div className="text-gray-600">{lang.about.stat3 ?? "Customer Satisfaction"}</div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] animate-float rounded-full bg-green-600/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] animate-float-delayed rounded-full bg-green-400/5 blur-3xl"></div>
      </div> */}
    </section>
  );
};

export default AboutSection;
