import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Về Chúng Tôi</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến những sản phẩm nông nghiệp xanh, sạch và
            bền vững cho sức khỏe của bạn và gia đình.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Green Agriculture được thành lập với sứ mệnh cung cấp những sản
                phẩm nông nghiệp organic chất lượng cao, góp phần xây dựng một
                cộng đồng sống khỏe mạnh và bền vững.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi tin rằng thực phẩm sạch không chỉ tốt cho sức khỏe mà
                còn bảo vệ môi trường cho thế hệ tương lai.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-800 font-medium">
                    100% Organic
                  </span>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-800 font-medium">
                    Không Hóa Chất
                  </span>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-800 font-medium">Bền Vững</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={assets.background}
                alt="Organic farming"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chất Lượng
              </h3>
              <p className="text-gray-600">
                Cam kết cung cấp sản phẩm chất lượng cao nhất, được kiểm tra
                nghiêm ngặt từ khâu sản xuất đến tiêu dùng.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bền Vững
              </h3>
              <p className="text-gray-600">
                Áp dụng các phương pháp canh tác bền vững, bảo vệ môi trường và
                hệ sinh thái tự nhiên.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cộng Đồng
              </h3>
              <p className="text-gray-600">
                Hỗ trợ nông dân địa phương và xây dựng cộng đồng tiêu dùng có
                trách nhiệm với môi trường.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600">
              Những con người tận tâm đằng sau thành công của Green Agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src={assets.user}
                alt="CEO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nguyễn Văn A
              </h3>
              <p className="text-green-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Với hơn 15 năm kinh nghiệm trong lĩnh vực nông nghiệp organic
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src={assets.user}
                alt="CTO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trần Thị B
              </h3>
              <p className="text-green-600 mb-2">Giám Đốc Kỹ Thuật</p>
              <p className="text-gray-600 text-sm">
                Chuyên gia về công nghệ canh tác bền vững và quản lý chất lượng
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src={assets.user}
                alt="Marketing Director"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lê Văn C
              </h3>
              <p className="text-green-600 mb-2">Giám Đốc Marketing</p>
              <p className="text-gray-600 text-sm">
                Chuyên gia về xây dựng thương hiệu và phát triển thị trường
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Nông Dân Đối Tác</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Khách Hàng Hài Lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Sản Phẩm Organic</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-green-100">Năm Kinh Nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
