import {
  Hero,
  PopularProducts,
  SuperQuality,
  Services,
  SpecialOffers,
  CustomerReviews,
  Subscribe,
  Footer,
  TopButton,
} from "./sections";
import Nav from "./components/Nav";
import { useRef } from "react";

const App = () => {
  const refs = {
    home: useRef(null),
    about: useRef(null),
    products: useRef(null),
    contact: useRef(null),
  };

  return (
    <>
      <Nav sectionRefs={refs} />
      <TopButton />
      <main className="relative">
        <div ref={refs.home} className="padding-b xl:pl-16 wide:pr-16">
          <Hero />
        </div>
        <div ref={refs.products} className="padding">
          <PopularProducts />
        </div>
        <div ref={refs.about} className="padding">
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
        <div ref={refs.contact} className="padding-x py-16 sm:py-32">
          <Subscribe />
        </div>
        <div className="bg-gray-950 padding-x padding-t pb-8">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default App;
