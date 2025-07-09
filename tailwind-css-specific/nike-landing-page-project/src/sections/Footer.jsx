import { copyrightSign } from "../assets/icons";
import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer className="max-container">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <section
          aria-labelledby="footer-main-heading"
          className="flex flex-col items-start"
        >
          <h2 className="sr-only" id="footer-main-heading">
            Back to School Starts at Nike
          </h2>

          <a href="/" aria-label="Go to Nike homepage">
            <img src={footerLogo} alt="Nike logo" width={150} height={47} />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Gear up for the new term at your local Nike store—find your perfect
            fit in person and enjoy exclusive rewards.
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </a>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="explore-heading"
          className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap"
        >
          <h2 id="explore-heading" className="sr-only">
            Explore Nike
          </h2>
          {footerLinks.map((section) => {
            const id = `${section.title
              .toLowerCase()
              .replace(/ /g, "-")}-heading`;
            return (
              <section aria-labelledby={id} key={section.title}>
                <h3
                  className="text-white font-montserrat text-2xl leading-normal font-medium mb-6"
                  id={id}
                >
                  {section.title}
                </h3>
                <ul>
                  {section.links.map((link) => (
                    <li
                      key={link.name}
                      className="mt-3 text-white-400 font-montserrat text-base leading-normal hover:text-slate-gray transition-colors duration-200 ease-in-out"
                    >
                      <a href={link.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </section>
      </div>
      <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
        <a
          className="flex items-center gap-2 font-montserrat"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Copyright"
        >
          <img
            src={copyrightSign}
            alt="copyright sign"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          Copyright. All rights reserved.
        </a>
        <a
          className="font-montserrat"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
