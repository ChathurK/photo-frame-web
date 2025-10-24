import TestimonialImg1 from "../assets/testimonial_imgs/TS-IMG-1.png";
import TestimonialImg2 from "../assets/testimonial_imgs/TS-IMG-2.png";
import TestimonialImg3 from "../assets/testimonial_imgs/TS-IMG-3.png";

const TestimonialsSection = ({ language, translations }) => {
  const lang = translations[language];

  const testimonials = [
    {
      text: "Absolutely loved the oil painting version of my family photo!",
      author: "Anushka",
      photo: TestimonialImg1,
    },
    {
      text: "Customer service එක ඇත්තටම හොඳයි. Order එක ඉල්ලපු දවසටම ලැබුණා. Photo එකේ quality එක වගේම frame එකෙ quality එකත් ගොඩක් හොඳයි. Frames.lk එකට ස්තුතියි <3",
      author: "Shehan J.",
      photo: TestimonialImg3,
    },
    {
      text: "Highly recommend! 💯 Great service and fast delivery. Friendly staff. Thank you..",
      author: "Nadeesha",
      photo: TestimonialImg2,
    },
  ];

  return (
    <section id="testimonials" className="pb-12 pt-4">
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
              {lang.testimonials.badge ?? "Customer Reviews"}
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-green-3 md:text-5xl">
            {lang.testimonials?.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {lang.testimonials?.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative h-fit overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-2 to-green-1 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>

              {/* Content */}
              <div className="relative">
                {/* Quote SVG Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-green-2/10 p-3 transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="max-sm:size-7 size-8 text-green-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="mb-6 text-base leading-relaxed text-gray-700">
                  "{testimonial.text}"
                </p>

                {/* Author with Avatar Photo */}
                <div className="flex items-center gap-3">
                  <div className="size-12 overflow-hidden rounded-full ring-2 ring-green-2/20">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <strong className="block text-green-3">
                      {testimonial.author}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-2 to-green-1 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
