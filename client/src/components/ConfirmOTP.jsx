import { useState } from "react";

const ConfirmOTP = ({ setShowOTP, setConfirmOTP, handleVerify }) => {
  const [otp, setOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() !== "") {
      setConfirmOTP(otp);
      handleVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-6"
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-xl"
          onClick={() => setShowOTP(false)}
        >
          x
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Xác thực OTP
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhập mã OTP
          </label>
          <input
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Nhập OTP"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-all"
        >
          Xác nhận OTP
        </button>
      </form>
    </div>
  );
};

export default ConfirmOTP;
