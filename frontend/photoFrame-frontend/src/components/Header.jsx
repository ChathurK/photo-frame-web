import logo from '../assets/logo/fRAMESLK.COM NEW LOGO-02.png';

const Header = ({ language, translations, onPageChange }) => {
  const t = translations[language];

  return (
    <header className="flex items-center justify-between py-6">
      <button 
        onClick={() => onPageChange && onPageChange('home')}
        className="flex items-center p-2 transition-opacity cursor-pointer hover:opacity-80"
      >
        <img 
          src={logo} 
          alt="FRAMES.LK Logo" 
          className="w-auto h-12"
        />
      </button>
      <nav className="flex gap-8">
        <a href="#works" className="px-2 py-1 font-medium transition-colors text-green-2 hover:text-green-1">
          {t.nav.works}
        </a>
        <a href="#testimonials" className="px-2 py-1 font-medium transition-colors text-green-2 hover:text-green-1">
          {t.nav.testimonials}
        </a>
        <a href="#video" className="px-2 py-1 font-medium transition-colors text-green-2 hover:text-green-1">
          {t.nav.promo}
        </a>
        <button 
          onClick={() => onPageChange && onPageChange('order')}
          className="px-2 py-1 font-medium transition-colors cursor-pointer text-green-2 hover:text-green-1"
        >
          {t.nav.order}
        </button>
      </nav>
    </header>
  );
};

export default Header;