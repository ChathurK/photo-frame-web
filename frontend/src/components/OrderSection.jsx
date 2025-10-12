const OrderSection = ({ language, translations, onPageChange }) => {
  const t = translations[language];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(t.order.whatsappMessage);
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+94771234567";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleOrderPageRedirect = () => {
    if (onPageChange) {
      onPageChange("order");
    }
  };

  return (
    <section id="order" className="mt-20 text-center">
      <h2 className="mb-10 text-3xl font-bold text-green-3">
        {t.order?.title || "Order Your Frame"}
      </h2>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <button
          onClick={handleOrderPageRedirect}
          className="min-w-[180px] rounded-xl bg-green-2 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-1"
        >
          {t.order?.orderOnline || "Order Online"}
        </button>
        <span className="px-4 py-2 text-sm text-gray-500">or</span>
        <button
          onClick={handleWhatsAppOrder}
          className="min-w-[180px] rounded-xl bg-green-1 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-3"
        >
          {t.order.cta}
        </button>
      </div>
    </section>
  );
};

export default OrderSection;
