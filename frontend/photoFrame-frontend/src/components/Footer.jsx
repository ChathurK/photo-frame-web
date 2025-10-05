const Footer = ({ language, translations }) => {
  const t = translations[language];

  return (
    <footer className="mt-20 text-center text-sm text-gray-500 py-8 border-t border-gray-200">
      <p className="leading-relaxed">{t.footer.copyright}</p>
    </footer>
  );
};

export default Footer;