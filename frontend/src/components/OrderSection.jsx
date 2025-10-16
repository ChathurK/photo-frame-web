import {
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const OrderSection = ({ language, translations, onPageChange }) => {
  const lang = translations[language];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(lang.order.whatsappMessage);
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+94771234567";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleOrderPageRedirect = () => {
    if (onPageChange) {
      onPageChange("order");
    }
  };

  return (
    <section id="order" className="relative overflow-hidden pb-12 pt-4">
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
              {lang.order.badge ?? "Start Your Order"}
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-green-3 md:text-5xl">
            {lang.order?.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {lang.order?.subtitle}
          </p>
        </div>

        {/* Order Options */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Online Order Card - PRIMARY */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-2 to-green-1 p-6 transition-all duration-300 hover:shadow-[0px_0px_100px_rgba(34,197,94,0.3)]">
            {/* Recommended Badge */}
            <div className="absolute right-6 top-6">
              <div className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white">
                {lang.order.rec ?? "RECOMMENDED"}
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
                <ShoppingBagIcon className="size-10 text-white max-sm:size-8" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-bold text-white">
                {lang.order?.orderOnline}
              </h3>

              {/* Description */}
              <p className="mb-3 text-sm leading-relaxed text-white/90">
                {lang.order?.orderOnlineDesc}
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-3 text-sm text-white">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-white" />
                  <span>{lang.order?.orderOnlineFeat1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-white" />
                  <span>{lang.order?.orderOnlineFeat2}</span>
                </li>
              </ul>

              {/* Button */}
              <button
                onClick={handleOrderPageRedirect}
                className="w-full rounded-lg bg-white px-6 py-4 font-bold text-green-2 shadow-md transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  {lang.order?.orderOnlineBtn}
                  <ChevronDoubleRightIcon className="size-4" />
                </span>
              </button>
            </div>
          </div>

          {/* WhatsApp Order Card - SECONDARY */}
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 transition-all duration-300 hover:shadow-xl">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-1 to-green-3 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-green-1/10 p-4 transition-transform duration-300 group-hover:scale-110">
                <ChatBubbleLeftRightIcon className="size-10 text-green-1 max-sm:size-8" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-bold text-green-3">
                {lang.order?.orderWhatsapp}
              </h3>

              {/* Description */}
              <p className="mb-3 text-sm leading-relaxed text-gray-600">
                {lang.order?.orderWhatsappDesc}
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-green-1" />
                  <span>{lang.order?.orderWhatsappFeat1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-green-1" />
                  <span>{lang.order?.orderWhatsappFeat2}</span>
                </li>
              </ul>

              {/* Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full rounded-lg border-2 border-green-1 bg-white px-6 py-4 font-semibold text-green-1 transition-all duration-300 hover:bg-green-1 hover:text-white"
              >
                {lang.order.orderWhatsappBtn}
              </button>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-1 to-green-3 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
