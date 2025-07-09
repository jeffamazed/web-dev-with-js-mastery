import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../constants";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";

const Contact = ({ scrollRef }) => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const footerLeftLeafRef = useRef(null);
  const footerRightLeafRef = useRef(null);

  useGSAP(
    () => {
      let titleSplit;
      let contentSplit;

      document.fonts.ready.then(() => {
        titleSplit = new SplitText(titleRef.current, {
          type: "words",
        });
        contentSplit = new SplitText(
          contactRef.current.querySelectorAll("h3, p"),
          {
            type: "lines",
          }
        );

        const splitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contactRef.current,
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
          trigger: contactRef.current,
          start: "35% center",
          end: "center center",
          scrub: true,
        },
        ease: "power1.inOut",
      });

      leavesTimeline
        .to(footerRightLeafRef.current, {
          y: -80,
          ease: "power1.inOut",
        })
        .to(footerLeftLeafRef.current, {
          y: -80,
          ease: "power1.inOut",
        });

      return () => {
        if (titleSplit) titleSplit.revert();
        if (contentSplit) contentSplit.revert();
      };
    },
    {
      scope: contactRef,
      dependencies: [],
    }
  );

  return (
    <footer
      ref={(el) => {
        scrollRef.current = el;
        contactRef.current = el;
      }}
      id="contact"
    >
      <img
        src="./images/footer-right-leaf.png"
        alt="right leaf"
        id="f-right-leaf"
        ref={footerRightLeafRef}
      />
      <img
        src="./images/footer-left-leaf.png"
        alt="left leaf"
        id="f-left-leaf"
        ref={footerLeftLeafRef}
      />

      <div className="content">
        <h2 ref={titleRef}>Step Into Our World</h2>

        <section>
          <h3>Visit Our Bar</h3>
          <p>88 Velvet Oak Ct. #501, Los Angeles, CA 90038</p>
        </section>

        <section>
          <h3>Contact Us</h3>
          <p>(323) 555-0174</p>
          <p>hello@mohitococktail.com</p>
        </section>

        <section>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </section>

        <section>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img
                  className="hover:animate-pulse will-change-transform transition-transform duration-200"
                  src={social.icon}
                  alt={social.name}
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Contact;
