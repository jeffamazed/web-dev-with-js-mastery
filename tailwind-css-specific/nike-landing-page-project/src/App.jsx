import {
  Hero,
  PopularProducts,
  SuperQuality,
  Services,
  SpecialOffers,
  CustomerReviews,
  Subscribe,
  Footer,
} from "./sections";
import Nav from "./components/Nav";
import { createRef, useRef } from "react";
import TopLink from "./components/TopLink";
import { navLinks } from "./constants";

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navLinks.map(({ target }) => [target, createRef()])),
  ).current;

  return (
    <>
      <div id="top" className="sr-only" />
      <Nav sectionRef={sectionRef} />
      <TopLink />
      <main className="relative">
        <div ref={sectionRef.home} className="padding-b xl:pl-16 wide:pr-16">
          <Hero />
        </div>
        <div ref={sectionRef.products} className="padding">
          <PopularProducts />
        </div>
        <div ref={sectionRef.about} className="padding">
          <SuperQuality />
        </div>
        <div className="padding-x py-10">
          <Services />
        </div>
        <div className="padding">
          <SpecialOffers />
        </div>
        <div className="bg-pale-blue padding">
          <CustomerReviews />
        </div>
        <div ref={sectionRef.contact} className="padding-x py-16 sm:py-32">
          <Subscribe />
        </div>
      </main>
      <div className="bg-gray-950 padding-x padding-t pb-8">
        <Footer />
      </div>
    </>
  );
};

export default App;
