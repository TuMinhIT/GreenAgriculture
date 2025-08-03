import { useState } from "react";
import { assets } from "../assets/assets";
const ContactInfo = () => {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="gap-3 flex flex-col fixed z-10  top-[60%] right-3  overflow-hidden  transition-all duration-300 ease-linear">
        <div
          onClick={handleClick}
          className={`${visible ? "rotate-180" : "flex"}
                   hover:scale-110 mr-2 rounded-full mb-3 justify-center p-1 `}
        >
          <img
            src={assets.chevron_b}
            alt=""
            className="w-8 h-8 border border-gray-50 rounded-full "
          />
        </div>
        {visible && (
          <>
            <div className="border hover:bg-red-400 border-gray-50 p-2 rounded-full bg-red-600">
              <img src={assets.phone_call} alt="" className="w-8 h-8" />
            </div>
            <div className=" border hover:bg-blue-400 border-gray-50 p-2 rounded-full bg-blue-600">
              <img src={assets.facebook} alt="" className="w-8 h-8" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactInfo;
