import { footerLinks } from "../constants/index";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="w-full bg-violet-300 py-4 text-custom-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left flex-1">
          &copy; Nova {year}. All rights reserved
        </p>

        <div className="flex justify-center gap-4 flex-1">
          {footerLinks.map(({ href, icon, name }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-black transition-colors duration-300 ease-in-out hover:text-blue-50"
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="flex-1">
          <a
            href="#privacy-policy"
            className="text-center text-sm hover:underline md:text-right transition-colors duration-300 ease-in-out hover:text-blue-50 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
