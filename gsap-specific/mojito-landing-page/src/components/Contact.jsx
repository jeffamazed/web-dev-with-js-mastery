import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../constants";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const Contact = ({ scrollRef }) => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const titleSplit = new SplitText("#contact h2", {
        type: "words",
      });
      const contentSplit = new SplitText("#contact h3, #contact p", {
        type: "lines",
      });

      const splitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top center",
        },
        ease: "power1.inOut",
      });

      splitTimeline
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: -100,
          stagger: 0.02,
        })
        .from(contentSplit.lines, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.02,
        });
    });

    const leavesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "35% center",
        end: "center center",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    leavesTimeline
      .to("#f-right-leaf", {
        y: -80,
        ease: "power1.inOut",
      })
      .to("#f-left-leaf", {
        y: -50,
        ease: "power1.inOut",
      });
  });

  return (
    <footer ref={scrollRef} id="contact">
      <img
        src="./images/footer-right-leaf.png"
        alt="right leaf"
        id="f-right-leaf"
      />
      <img
        src="./images/footer-left-leaf.png"
        alt="left leaf"
        id="f-left-leaf"
      />

      <div className="content">
        <h2>Step Into Our World</h2>

        <section aria-labelledby="location-heading">
          <h3 id="location-heading">Visit Our Bar</h3>
          <p>88 Velvet Oak Ct. #501, Los Angeles, CA 90038</p>
        </section>

        <section aria-labelledby="contact-us-heading">
          <h3 id="contact-us-heading">Contact Us</h3>
          <p>(323) 555-0174</p>
          <p>hello@mohitococktail.com</p>
        </section>

        <section aria-labelledby="opening-hours-heading">
          <h3 id="opening-hours-heading">Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </section>

        <section aria-labelledby="socials-contact-heading">
          <h3 id="socials-contact-heading">Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Contact;
