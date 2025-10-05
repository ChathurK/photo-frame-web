// Import sample images from collections
import oilPaint1 from '../assets/oil paint collection/1.jpg';
import oilPaint2 from '../assets/oil paint collection/2.jpg';
import oilPaint3 from '../assets/oil paint collection/3.jpg';
import ghibli1 from '../assets/Ghibli collection/1.jpg';
import ghibli2 from '../assets/Ghibli collection/2.jpg';
import ghibli3 from '../assets/Ghibli collection/3.jpg';
import mini1 from '../assets/mini frames/1.jpg';
import mini2 from '../assets/mini frames/2.jpg';
import mini3 from '../assets/mini frames/3.jpg';

const WorksSection = ({ language, translations }) => {
  const t = translations[language];

  const works = [
    {
      images: [oilPaint1, oilPaint2, oilPaint3],
      title: t.works.oilPainting,
      category: 'oil-paint'
    },
    {
      images: [ghibli1, ghibli2, ghibli3],
      title: t.works.ghibliStyle,
      category: 'ghibli'
    },
    {
      images: [mini1, mini2, mini3],
      title: t.works.classicPortrait,
      category: 'mini-frames'
    }
  ];

  return (
    <section id="works" className="mt-20">
      <h2 className="text-3xl font-bold text-green-3 mb-8 text-center">
        {t.works.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {works.map((work, workIndex) => (
          <div key={workIndex} className="bg-white rounded-custom p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-green-3 mb-4 text-center">
              {work.title}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {work.images.map((image, imageIndex) => (
                <div key={imageIndex} className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={image} 
                    alt={`${work.title} ${imageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">
              <button className="text-green-2 font-medium hover:text-green-1 transition-colors px-4 py-2 rounded-lg hover:bg-green-50">
                View More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;