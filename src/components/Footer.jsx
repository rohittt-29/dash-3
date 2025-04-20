import { Logo } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="relative bottom-0
     bg-gray-900 bg-gradient-to-t from-green-700/5 shadow-md backdrop-blur-md border-t border-gray-800 text-gray-400 text-sm py-4 mt-10 md:py-6 md:text-base">
      
      {/* Social Icons - Fixed Bottom Left */}
      <div className="absolute bottom-4 left-4 flex gap-2 text-gray-400 text-sm md:text-2xl"> 
        <a href="https://www.linkedin.com/in/rohit-mali-163267257/overlay/contact-info/" className="hover:text-white transition">
          <i className="ri-linkedin-box-fill"></i>
        </a>
        <a href="https://github.com/rohittt-29" className="hover:text-white transition">
          <i className="ri-github-fill"></i>
        </a>
        <a href="https://x.com/rohittt_mali?t=RhZUcrMBKhNQMrZbRtJt5A&s=09" className="hover:text-white transition">
          <i className="ri-twitter-x-fill"></i>
        </a>
      </div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <img className="w-16 md:w-24 ml-10 mb-2 md:mb-2" src={Logo} alt="logo" />
          <p className="text-xs md:text-sm mt-2 md:mt-0">Your daily dose of crypto stats 💹</p>
        </div>

        {/* Links */}
        <div className="flex gap-3 md:gap-6 text-xs md:text-sm">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>
      </div>

      {/* Copyright & Signature */}
      <p className="text-center text-xs md:text-sm text-gray-500 mt-3">
        © {new Date().getFullYear()} <span className="italic">Dash3</span>. All rights reserved.
      </p>
      <p className="text-center text-xs md:text-base text-gray-500 mt-1">
        Made with <i className="ri-heart-fill text-red-600 md:text-xl text-sm animate-pulse drop-shadow-[0_0_5px_red]"></i>
        <span className="ml-1 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">by Papa Rohit</span>
      </p>

    </footer>
  );
};

export default Footer;
