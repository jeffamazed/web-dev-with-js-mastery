import { footerLinks } from "../constants";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="container mx-auto">
        <section>
          {/* sr-only */}
          <h2 className="sr-only">Shopping Assistance</h2>

          <p className="font-semibold text-gray text-sm">
            More ways to shop:{" "}
            <a href="/" className="footer-link text-custom-white">
              Find an Apple Store
            </a>{" "}
            or{" "}
            <a href="/" className="footer-link text-custom-white">
              other retailer
            </a>{" "}
            near you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call{" "}
            <a href="tel:8005550199" className="footer-link text-custom-white">
              (800) 555-0199
            </a>
            .
          </p>
        </section>

        {/* divider */}
        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <section className="flex md:flex-row flex-col md:items-center justify-between gap-2">
          {/* sr-only */}
          <h2 className="sr-only">Legal and Site Information</h2>

          <p className="font-semibold text-gray text-xs">
            &copy; {year} Apple Inc. All rights reserved.
          </p>

          <ul className="flex flex-col sm:flex-row gap-1">
            {footerLinks.map((link, i) => (
              <li key={link} className="font-semibold text-gray text-xs">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {link}
                  {i !== footerLinks.length - 1 && (
                    <span className="mx-2 max-sm:hidden">|</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
