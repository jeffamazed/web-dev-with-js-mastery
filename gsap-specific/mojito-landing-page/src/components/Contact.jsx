import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../constants";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contact = ({ scrollRef, responsive }) => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const footerLeftLeafRef = useRef(null);
  const footerRightLeafRef = useRef(null);
  const titleSplitRef = useRef(null);
  const contentSplitRef = useRef(null);

  useGSAP(
    () => {
      const contact = contactRef.current;
      const title = titleRef.current;
      const leftLeaf = footerLeftLeafRef.current;
      const rightLeaf = footerRightLeafRef.current;
      if (!contact || !title || !leftLeaf || !rightLeaf) return;
      if (titleSplitRef.current) titleSplitRef.current.revert();
      if (contentSplitRef.current) contentSplitRef.current.revert();

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.group === "contact-trigger") {
          trigger.kill();
        }
      });

      const initAnimations = async () => {
        await document.fonts.ready;

        titleSplitRef.current = new SplitText(title, { type: "words" });
        contentSplitRef.current = new SplitText(
          contact.querySelectorAll("h3, p"),
          {
            type: "lines",
          },
        );

        setTimeout(() => {
          const splitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contact,
              start: "top center",
              group: "contact-trigger",
            },
            ease: "power1.inOut",
          });

          splitTimeline
            .fromTo(
              titleSplitRef.current.words,
              {
                opacity: 0,
                yPercent: -100,
                stagger: 0.02,
              },
              {
                opacity: 1,
                yPercent: 0,
              },
            )
            .fromTo(
              contentSplitRef.current.lines,
              {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
              },
              {
                opacity: 1,
                yPercent: 0,
              },
            );

          // animate leaves
          gsap
            .timeline({
              scrollTrigger: {
                trigger: contact,
                start: "top center",
                end: "center center",
                scrub: true,
                group: "contact-trigger",
              },
              ease: "power1.inOut",
            })
            .fromTo(rightLeaf, { y: 0 }, { y: -100 })
            .fromTo(leftLeaf, { y: 0 }, { y: -100 });
        }, 150);
      };

      initAnimations();

      return () => {
        if (titleSplitRef.current) titleSplitRef.current.revert();
        if (contentSplitRef.current) contentSplitRef.current.revert();
      };
    },
    {
      scope: contactRef,
      dependencies: [responsive],
    },
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

        <address>
          <h3>Visit Our Bar</h3>
          <p>88 Velvet Oak Ct. #501, Los Angeles, CA 90038</p>
        </address>

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
