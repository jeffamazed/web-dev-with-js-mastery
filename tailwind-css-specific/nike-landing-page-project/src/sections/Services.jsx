import ServiceCard from "../components/ServiceCard";
import { services } from "../constants";

const Services = () => {
  return (
    <section className="max-container">
      <h2 className="sr-only">Services</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
