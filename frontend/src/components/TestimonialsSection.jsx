import { StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const TestimonialsSection = ({ language, translations }) => {
  const lang = translations[language];

  const testimonials = [
    {
      text: "Absolutely loved the oil painting version of my family photo!",
      author: "Anushka",
    },
    {
      text: "ගිබ්ලි-ශෛලියේ රාමුව ඉන්ද්‍රජාලික විය. මගේ සහෝදරිය සඳහා පරිපූර්ණ තෑග්ගක්.",
      author: "කසුන්",
    },
    {
      text: "Great service and quick delivery. Highly recommend.",
      author: "Nadeesha",
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
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-green-2 to-green-1 opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              {/* ChatBubble Icon */}
              {/* <div
                className={`mb-4 inline-flex rounded-xl bg-green-2/10 p-3`}
              >
                 <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-2" />
              </div> */}

              {/* Testimonial Text */}
              <p className="mb-2 text-base leading-relaxed text-gray-700">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div>
                  <strong className="block text-green-3">
                    &ndash;&nbsp;{testimonial.author}
                  </strong>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-2 to-green-1 transition-all duration-300 group-hover:w-full`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
