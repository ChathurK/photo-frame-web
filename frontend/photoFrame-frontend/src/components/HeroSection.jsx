// Import hero showcase images
import heroImage1 from '../assets/Ghibli collection/5.jpg';
import heroImage2 from '../assets/oil paint collection/4.jpg';
import heroImage3 from '../assets/mini frames/6.jpg';
import heroImage4 from '../assets/Ghibli collection/8.jpg';

const HeroSection = ({ language, translations }) => {
  const t = translations[language];

  const handleOrderClick = () => {
    // Scroll to order section
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center mt-12 mb-8">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-3 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t.hero.description}
        </p>
        <button 
          onClick={handleOrderClick}
          className="px-8 py-4 bg-green-2 text-white rounded-lg font-semibold hover:bg-green-1 transition-colors shadow-lg hover:shadow-xl"
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
            className="w-full h-80 object-cover"
          />
        </div>
        
        {/* Floating gallery thumbnails */}
        <div className="absolute -top-4 -right-4 w-20 h-20 overflow-hidden rounded-lg shadow-xl border-4 border-white">
          <img 
            src={heroImage2} 
            alt="Oil painting frame" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 overflow-hidden rounded-lg shadow-xl border-4 border-white">
          <img 
            src={heroImage3} 
            alt="Mini frame" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/2 -right-6 w-12 h-12 overflow-hidden rounded-lg shadow-xl border-4 border-white">
          <img 
            src={heroImage4} 
            alt="Ghibli artwork" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;