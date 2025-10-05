// Import all collection images
import oilPaint1 from '../assets/oil paint collection/1.jpg';
import oilPaint2 from '../assets/oil paint collection/2.jpg';
import oilPaint3 from '../assets/oil paint collection/3.jpg';
import oilPaint4 from '../assets/oil paint collection/4.jpg';
import oilPaint5 from '../assets/oil paint collection/5.jpg';
import oilPaint6 from '../assets/oil paint collection/6.jpg';

import ghibli1 from '../assets/Ghibli collection/1.jpg';
import ghibli2 from '../assets/Ghibli collection/2.jpg';
import ghibli3 from '../assets/Ghibli collection/3.jpg';
import ghibli4 from '../assets/Ghibli collection/4.jpg';
import ghibli5 from '../assets/Ghibli collection/5.jpg';
import ghibli6 from '../assets/Ghibli collection/6.jpg';

import mini1 from '../assets/mini frames/1.jpg';
import mini2 from '../assets/mini frames/2.jpg';
import mini3 from '../assets/mini frames/3.jpg';
import mini4 from '../assets/mini frames/4.jpg';
import mini5 from '../assets/mini frames/5.jpg';
import mini6 from '../assets/mini frames/6.jpg';

const GallerySection = () => {

  const collections = [
    {
      name: 'Oil Paint Collection',
      images: [oilPaint1, oilPaint2, oilPaint3, oilPaint4, oilPaint5, oilPaint6],
      description: 'Classic oil painting style portraits with rich textures and vibrant colors'
    },
    {
      name: 'Ghibli Collection',
      images: [ghibli1, ghibli2, ghibli3, ghibli4, ghibli5, ghibli6],
      description: 'Magical Studio Ghibli inspired artwork with whimsical charm'
    },
    {
      name: 'Mini Frames',
      images: [mini1, mini2, mini3, mini4, mini5, mini6],
      description: 'Compact and elegant mini frames perfect for any space'
    }
  ];

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold text-green-3 mb-8 text-center">
        Our Complete Gallery
      </h2>
      
      {collections.map((collection, collectionIndex) => (
        <div key={collectionIndex} className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-green-2 mb-4">
              {collection.name}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {collection.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collection.images.map((image, imageIndex) => (
              <div 
                key={imageIndex} 
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src={image} 
                  alt={`${collection.name} ${imageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-8 text-lg">
          Ready to create your own custom photo frame?
        </p>
        <button 
          onClick={() => window.scrollTo({ top: document.getElementById('order')?.offsetTop, behavior: 'smooth' })}
          className="px-10 py-4 bg-green-2 text-white rounded-lg font-semibold hover:bg-green-1 transition-colors"
        >
          Start Your Order
        </button>
      </div>
    </section>
  );
};

export default GallerySection;