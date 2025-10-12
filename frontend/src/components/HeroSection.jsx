// Import hero showcase images
import heroImage1 from "../assets/Ghibli collection/5.jpg";
import heroImage2 from "../assets/oil paint collection/4.jpg";
import heroImage3 from "../assets/mini frames/6.jpg";
import heroImage4 from "../assets/Ghibli collection/8.jpg";

const HeroSection = ({ language, translations }) => {
  const t = translations[language];

  const handleOrderClick = () => {
    // Scroll to order section
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mb-8 mt-12 grid items-center gap-12 md:grid-cols-2">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight text-green-3 md:text-5xl">
          {t.hero.title}
        </h1>
        <p className="text-lg leading-relaxed text-gray-600">
          {t.hero.description}
        </p>
        <button
          onClick={handleOrderClick}
          className="rounded-lg bg-green-2 px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-green-1 hover:shadow-xl"
        >
          {t.hero.cta}
        </button>
      </div>
      <div className="relative">
        {/* Main showcase image */}
        <div className="relative overflow-hidden rounded-custom shadow-2xl">
          <img
            src={heroImage1}
            alt="Featured photo frame artwork"
            className="h-80 w-full object-cover"
          />
        </div>

        {/* Floating gallery thumbnails */}
        <div className="absolute -right-4 -top-4 h-20 w-20 overflow-hidden rounded-lg border-4 border-white shadow-xl">
          <img
            src={heroImage2}
            alt="Oil painting frame"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 h-16 w-16 overflow-hidden rounded-lg border-4 border-white shadow-xl">
          <img
            src={heroImage3}
            alt="Mini frame"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -right-6 top-1/2 h-12 w-12 overflow-hidden rounded-lg border-4 border-white shadow-xl">
          <img
            src={heroImage4}
            alt="Ghibli artwork"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
