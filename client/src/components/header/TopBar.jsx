const TopBar = () => {
  return (
    <div className="bg-green-600 text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>📞 Hotline: 1900-1234</span>
          <span className="hidden md:inline">✉️ info@greenagriculture.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">
            🚚 Miễn phí vận chuyển đơn từ 500k
          </span>
          <span>🎯 Ưu đãi 20% cho khách hàng mới</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
