const Footer = ({ language, translations }) => {
  const t = translations[language];

  return (
    <footer className="mt-20 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
      <p className="leading-relaxed">{t.footer.copyright}</p>
    </footer>
  );
};

export default Footer;
