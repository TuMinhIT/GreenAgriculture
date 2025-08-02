import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="relative w-full">
        <div className="mx-auto w-full max-w-7xl px-5">
          <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
            {/* <!-- Column: Company --> */}
            <ul>
              <p className="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">
                Company
              </p>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  News
                </Link>
              </li>
            </ul>
            {/* <!-- Column: Help Center --> */}
            <ul>
              <p className="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">
                Help Center
              </p>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            {/* <!-- Column: Resources --> */}
            <ul>
              <p className="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">
                Resources
              </p>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Free Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
            {/* <!-- Column: Products --> */}
            <ul>
              <p className="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">
                Products
              </p>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  UI Kits
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Icons
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans antialiased text-base text-current py-1 hover:text-primary"
                >
                  Mockups
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Footer Bottom Section --> */}
          <div className=" bg-gray-300 mt-5 flex w-full flex-col items-center justify-center gap-4 border-t border-stone-200 py-4 md:flex-row md:justify-around">
            <small className="font-sans antialiased text-sm text-current text-center">
              © 2025{" "}
              <Link
                href="https://www.creative-tim.com/david-ui/docs/html/footer"
                className="hover:underline"
              >
                MinhTuIT
              </Link>
              . All Rights Reserved.
            </small>
            {/* <!-- Social Media Links --> */}
            <div className="flex gap-1 sm:justify-center">
              <Link
                href="#"
                className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent text-stone-800 hover:bg-stone-200/10"
              >
                F
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
