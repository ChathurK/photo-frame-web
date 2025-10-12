const TestimonialsSection = ({ language, translations }) => {
  const t = translations[language];

  const testimonials = [
    {
      text: t.testimonials.testimonial1.text,
      author: t.testimonials.testimonial1.author,
    },
    {
      text: t.testimonials.testimonial2.text,
      author: t.testimonials.testimonial2.author,
    },
    {
      text: t.testimonials.testimonial3.text,
      author: t.testimonials.testimonial3.author,
    },
  ];

  return (
    <section id="testimonials" className="mt-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-green-3">
        {t.testimonials.title}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rounded-custom bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              "{testimonial.text}"
            </p>
            <strong className="block text-green-2">{testimonial.author}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
