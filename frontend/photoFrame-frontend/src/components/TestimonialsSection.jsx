const TestimonialsSection = ({ language, translations }) => {
  const t = translations[language];

  const testimonials = [
    {
      text: t.testimonials.testimonial1.text,
      author: t.testimonials.testimonial1.author
    },
    {
      text: t.testimonials.testimonial2.text,
      author: t.testimonials.testimonial2.author
    },
    {
      text: t.testimonials.testimonial3.text,
      author: t.testimonials.testimonial3.author
    }
  ];

  return (
    <section id="testimonials" className="mt-20">
      <h2 className="text-3xl font-bold text-green-3 mb-8 text-center">
        {t.testimonials.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-custom p-6 shadow-sm">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              "{testimonial.text}"
            </p>
            <strong className="block text-green-2">
              {testimonial.author}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;