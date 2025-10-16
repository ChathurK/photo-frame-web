import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import gallery images
import design1 from "../assets/gallerySectionImgs/Top 100 designs/DT 65.jpg";
import design2 from "../assets/gallerySectionImgs/Top 100 designs/DT 69.jpg";
import design3 from "../assets/gallerySectionImgs/Top 100 designs/DT 89.jpg";

import oil1 from "../assets/gallerySectionImgs/Top Oil paint/1.jpg";
import oil2 from "../assets/gallerySectionImgs/Top Oil paint/4.jpg";
import oil3 from "../assets/gallerySectionImgs/Top Oil paint/5.jpg";

import ghibli1 from "../assets/gallerySectionImgs/Top Ghibli collection/1.jpg";
import ghibli2 from "../assets/gallerySectionImgs/Top Ghibli collection/7.jpg";
import ghibli3 from "../assets/gallerySectionImgs/Top Ghibli collection/15.jpg";

import mini1 from "../assets/gallerySectionImgs/Top Mini frames/2.jpg";
import mini2 from "../assets/gallerySectionImgs/Top Mini frames/7.jpg";
import mini3 from "../assets/gallerySectionImgs/Top Mini frames/11.jpg";

const GallerySection = ({ language, translations }) => {
  const lang = translations[language];
  const [hoveredCard, setHoveredCard] = useState("designs-0"); // Default to first card expanded

  const collections = [
    {
      id: "oil",
      name: lang.gallery?.oilPainting.title,
      images: [oil1, oil2, oil3],
      description: lang.gallery?.oilPainting.description,
    },
    {
      id: "mini",
      name: lang.gallery?.miniFrames.title,
      images: [mini1, mini2, mini3],
      description: lang.gallery?.miniFrames.description,
    },
    {
      id: "designs",
      name: lang.gallery?._100Design.title,
      images: [design1, design2, design3],
      description: lang.gallery?._100Design.description,
    },
    {
      id: "ghibli",
      name: lang.gallery?.ghibli.title,
      images: [ghibli1, ghibli2, ghibli3],
      description: lang.gallery?.ghibli.description,
    },
  ];

  // Desktop Expandable Card Component
  const ExpandableCard = ({ collection, index }) => {
    const isHovered = hoveredCard === `${collection.id}-${index}`;
    // console.log(`${isHovered} = ${hoveredCard} === ${collection.id}-${index}`); // Debug log
    // console.log(hoveredCard); // Debug log
    return (
      <div
        style={{
          flexGrow: isHovered ? 4 : 1,
          flexShrink: 1,
          flexBasis: 0,
          transition: "flex-grow 0.6s ease",
        }}
        className="group relative h-[500px] cursor-pointer overflow-hidden rounded-xl"
        onMouseEnter={() => setHoveredCard(`${collection.id}-${index}`)}
        // onMouseLeave={() => setHoveredCard(null)} -> No onMouseLeave - card stays expanded
      >
        {/* Background Image */}
        <img
          src={collection.images[index]}
          alt={`${collection.name} ${index + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-30" : "opacity-80"
          }`}
        ></div>
      </div>
    );
  };

  // Mobile Carousel Component
  const MobileCarousel = ({ collection }) => {
    return (
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper pb-12"
      >
        {collection.images.map((image, index) => (
          <SwiperSlide key={index} className="!w-[280px]">
            <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl">
              {/* Image */}
              <img
                src={image}
                alt={`${collection.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-white">
                    {index === 0
                      ? "Popular"
                      : index === 1
                        ? "Trending"
                        : "Featured"}
                  </span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">
                  {collection.name}
                </h4>
                <p className="text-sm text-gray-200">Design {index + 1}</p>
              </div>

              {/* Number */}
              <div className="absolute right-4 top-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-lg font-bold text-white">
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <section id="gallery" className="pb-12 pt-4 max-sm:pt-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-2/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-2 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-2"></span>
            </span>
            <span className="text-xs font-semibold text-green-2 md:text-sm">
              Featured Collections
            </span>
          </div>
          {/* Section Title & Description Text */}
          <h2 className="mb-4 text-4xl font-bold text-green-3 md:text-5xl">
            {lang.gallery?.title}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
            {lang.gallery?.description}
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-12">
          {collections.map((collection) => (
            <div key={collection.id} className="space-y-8">
              {/* Collection Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-green-3 md:text-3xl">
                    {collection.name}
                  </h3>
                  <p className="text-base text-gray-600">
                    {collection.description}
                  </p>
                </div>
              </div>

              {/* Desktop - Expandable Cards */}
              <div className="hidden gap-4 md:flex">
                {[0, 1, 2].map((index) => (
                  <ExpandableCard
                    key={index}
                    collection={collection}
                    index={index}
                  />
                ))}
              </div>

              {/* Mobile - Swiper Carousel */}
              <div className="md:hidden">
                <MobileCarousel collection={collection} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-14 rounded-xl bg-gradient-to-r from-green-2/10 to-green-1/10 p-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-green-3 md:text-3xl">
            Ready to Create Your Own?
          </h3>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            Transform your favorite photos into stunning framed artwork
          </p>
          <button
            onClick={() =>
              document
                .getElementById("order")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative overflow-hidden rounded-lg bg-green-2 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-1 hover:shadow-xl"
          >
            <span className="relative z-10">Start Your Order</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-1 to-green-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
