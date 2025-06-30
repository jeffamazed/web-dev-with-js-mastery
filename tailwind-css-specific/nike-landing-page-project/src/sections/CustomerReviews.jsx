import ReviewCard from "../components/ReviewCard";
import { reviews } from "../constants";

const CustomerReviews = () => {
  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="max-container"
    >
      <h3
        id="customer-reviews-heading"
        className="font-palanquin text-center text-4xl font-bold"
      >
        Our <span className="text-coral-red">Customers </span>Speak for Us
      </h3>
      <p className="info-text mx-auto mt-4 max-w-lg text-center">
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className="mt-14 flex justify-evenly items-center max-lg:flex-col gap-14">
        {reviews.map((review) => (
          <ReviewCard key={review.customerName} {...review} />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
