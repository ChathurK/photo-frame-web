const OrderSection = ({ language, translations, onPageChange }) => {
  const t = translations[language];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(t.order.whatsappMessage);
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+94771234567";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleOrderPageRedirect = () => {
    if (onPageChange) {
      onPageChange('order');
    }
  };

  return (
    <section id="order" className="mt-20 text-center">
      <h2 className="text-3xl font-bold text-green-3 mb-10">
        {t.order?.title || 'Order Your Frame'}
      </h2>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={handleOrderPageRedirect}
          className="px-8 py-4 text-lg bg-green-2 text-white rounded-xl font-semibold hover:bg-green-1 transition-colors min-w-[180px]"
        >
          {t.order?.orderOnline || 'Order Online'}
        </button>
        <span className="text-gray-500 text-sm px-4 py-2">or</span>
        <button 
          onClick={handleWhatsAppOrder}
          className="px-8 py-4 text-lg bg-green-1 text-white rounded-xl font-semibold hover:bg-green-3 transition-colors min-w-[180px]"
        >
          {t.order.cta}
        </button>
      </div>
    </section>
  );
};

export default OrderSection;