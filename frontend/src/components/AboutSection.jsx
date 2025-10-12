const AboutSection = ({ language, translations }) => {
  const t = translations[language];

  return (
    <section className="mx-auto mt-20 max-w-4xl px-4 text-center">
      <h2 className="mb-8 text-3xl font-bold text-green-3">{t.about.title}</h2>
      <p className="text-lg leading-relaxed text-gray-600">
        {t.about.description}
      </p>
    </section>
  );
};

export default AboutSection;
