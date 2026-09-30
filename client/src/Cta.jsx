import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./cta.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* swap this one constant to change the photo */
const PROFILE_IMAGE = "/mahadlast.png";
const PROFILE_ALT = "Mahad Khan";

const WHATSAPP_URL = "https://wa.me/923332879619";

export default function Cta() {
  const sectionRef = useRef(null);
  const columnRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const chatRef = useRef(null);
  const photoRef = useRef(null);
  const typingRef = useRef(null);
  const bubbleRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const headingLines = SplitText.create(".cta_heading .cta-line, .cta_heading .cta-span-heading", {
          type: "lines",
          mask: "lines",
          linesClass: "cta-split-line",
        });

        const paragraphLines = SplitText.create(".cta_paragraph", {
          type: "lines",
          mask: "lines",
          linesClass: "cta-split-line",
        });

        gsap.from(headingLines.lines, {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnRef.current,
            start: "top 90%",
            once: true,
          },
        });

        gsap.from(paragraphLines.lines, {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnRef.current,
            start: "top 65%",
            once: true,
          },
        });

        /* ---------- chat sequence ---------- */
        gsap.set([typingRef.current, bubbleRef.current, buttonRef.current], { autoAlpha: 0 });

        const chat = gsap.timeline({
          scrollTrigger: {
            trigger: chatRef.current,
            start: "top 85%",
            once: true,
          },
        });

        chat
          .fromTo(
            photoRef.current,
            { autoAlpha: 0, scale: 0.6 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }
          )
          .fromTo(
            typingRef.current,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" },
            0.15
          )
          .to(typingRef.current, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power2.in" }, "+=1.2")
          .fromTo(
            bubbleRef.current,
            { autoAlpha: 0, scale: 0.8 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }
          )
          .fromTo(
            buttonRef.current,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* ---------- remeasure once fonts have settled ---------- */
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    const img = photoRef.current;
    if (img && !img.complete) {
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="cta_section">
      <div className="container">
        <div className="column cta-column" ref={columnRef}>
          <h2 className="cta_heading" ref={headingRef}>
            <span className="cta-line">Elevate Your</span>
            <span className="cta-line">Digital</span>
            <span className="cta-span-heading">Experience</span>
          </h2>

          <p className="cta_paragraph" ref={paragraphRef}>
            Every website and software product has room to improve. Get a clearer
            view of what&apos;s working, what&apos;s holding you back, and how to
            build something faster, cleaner, and easier to grow.
          </p>

          <div className="cta_chat" ref={chatRef}>
            <div className="cta_chat_row">
              <img className="cta_photo" ref={photoRef} src={PROFILE_IMAGE} alt={PROFILE_ALT} />

              <div className="cta_bubble_col">
                <div className="cta-chat-typing-wrap" ref={typingRef} aria-hidden="true">
                  <span className="cta-typing-dot" />
                  <span className="cta-typing-dot" />
                  <span className="cta-typing-dot" />
                </div>

                <div className="cta-chat-bubble" ref={bubbleRef}>
                  Have a project in mind?
                </div>

                <a
                  className="cta-button"
                  ref={buttonRef}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                >
                  Let’s Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
