import { assets } from "../assets/assets";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🌱",
      title: "100% Organic",
      description:
        "Tất cả sản phẩm được chứng nhận organic, không sử dụng hóa chất độc hại",
      color: "bg-green-100",
    },
    {
      icon: "🚚",
      title: "Giao hàng tận nơi",
      description:
        "Miễn phí vận chuyển cho đơn hàng từ 500k, giao hàng trong 24h",
      color: "bg-blue-100",
    },
    {
      icon: "🏆",
      title: "Chất lượng đảm bảo",
      description:
        "Cam kết hoàn tiền 100% nếu không hài lòng về chất lượng sản phẩm",
      color: "bg-yellow-100",
    },
    {
      icon: "💚",
      title: "Thân thiện môi trường",
      description:
        "Bao bì tái chế, quy trình sản xuất bền vững, bảo vệ hành tinh xanh",
      color: "bg-emerald-100",
    },
  ];
  const stats = [
    { number: "1,000+", label: "Khách hàng tin tưởng" },
    { number: "500+", label: "Nông dân đối tác" },
    { number: "50+", label: "Sản phẩm organic" },
    { number: "5", label: "Năm kinh nghiệm" },
  ];
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn Green Agriculture?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến những sản phẩm nông nghiệp tốt nhất, với
            chất lượng vượt trội và dịch vụ hoàn hảo
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                className={`${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow`}
              >
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* Stats Section */}
        <div className="bg-green-600 rounded-2xl p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-green-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Sẵn sàng trải nghiệm sản phẩm organic?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn khách hàng đã tin tưởng lựa chọn Green
            Agriculture cho lối sống khỏe mạnh và bền vững
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Mua sắm ngay
            </button>
            <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-medium rounded-full hover:bg-green-600 hover:text-white transition-all duration-300">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
