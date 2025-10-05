const AboutSection = ({ language, translations }) => {
  const t = translations[language];

  return (
    <section className="mt-20 text-center max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-3 mb-8">
        {t.about.title}
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        {t.about.description}
      </p>
    </section>
  );
};

export default AboutSection;