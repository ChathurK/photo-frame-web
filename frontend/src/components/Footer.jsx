import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import logoWhite from "../assets/logo/frameslk.shop.white.png";

const Footer = ({ language, translations, currentPage }) => {
  const lang = translations[language];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/SLframes.lk",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/frames.lk24/?hl=en",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@frames.lk2k25?_t=ZS-90AYrQ3zvmx&_r=1",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      text: "+94 76 565 37 87",
      link: "https://wa.me/94765653787",
      label: lang.footer?.contact.whatsapp,
    },
    {
      icon: EnvelopeIcon,
      text: "frames.lk24@gmail.com",
      link: "mailto:frames.lk24@gmail.com",
      label: lang.footer?.contact.email,
    },
    {
      icon: MapPinIcon,
      text: "Sri Lanka",
      link: null,
      label: lang.footer?.contact.location,
    },
  ];

  const quickLinks = [
    { name: lang.nav?.gallery, href: "#gallery" },
    { name: lang.nav?.about, href: "#about" },
    { name: lang.nav?.testimonials, href: "#testimonials" },
    { name: lang.nav?.order, href: "#order" },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (currentPage != "home" && currentPage) {
    return null;
  }

  return (
    <footer
      className="justify-center text-white"
      style={{
        background: "linear-gradient(180deg, #05b777ff -100%, #11422eff 40%)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-3 md:justify-items-center">
          {/* Brand Section */}
          <div>
            <img
              src={logoWhite}
              alt="FramesLK Logo"
              className="mb-4 h-14 w-auto ml-[-32px]"
            />
            <p className="mb-4 text-sm leading-relaxed text-white/80">
              {lang.footer?.sentence}
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              {lang.footer?.links}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li
                  key={link.name}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  <a
                    href={link.href}
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              {lang.footer?.contact.topic}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <contact.icon className="mt-1 size-5 flex-shrink-0 text-white/60" />
                  <div>
                    <div className="text-xs text-white/60">{contact.label}</div>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target={contact.link.startsWith("http") ? "_blank" : undefined}
                        rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/90 transition-colors duration-300 hover:text-white"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-sm text-white/90">
                        {contact.text}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10"></div>

        {/* Bottom Section */}
        <div className="flex items-center justify-center">
          <p className="text-sm text-white/70 max-sm:text-xs">{lang.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
