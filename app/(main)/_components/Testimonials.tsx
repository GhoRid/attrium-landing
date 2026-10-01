"use client";

import interview1 from "@/assets/images/testimonial-photo-1.webp";
import interview2 from "@/assets/images/testimonial-photo-2.webp";
import interview3 from "@/assets/images/testimonial-photo-3.webp";
import ChevronLeft from "@/assets/svgs/chevron-left.svg";
import ChevronRight from "@/assets/svgs/chevron-right.svg";
import QuoteMark from "@/assets/svgs/quote-mark.svg";
import { useScrollReveal } from "@/hooks/useFadeUp";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    title: "함께할 첫 이야기를 기다리고 있어요",
    body: "아트리움과 함께한 교회의 생생한 후기를 차곡차곡 채워갈 예정입니다. 가장 먼저 함께해주실 교회를 기다리고 있어요.",
    name: "ATTRIUM",
    image: interview1.src,
  },
  {
    title: "함께할 첫 이야기를 기다리고 있어요",
    body: "아트리움과 함께한 교회의 생생한 후기를 차곡차곡 채워갈 예정입니다. 가장 먼저 함께해주실 교회를 기다리고 있어요.",
    name: "ATTRIUM",
    image: interview2.src,
  },
  {
    title: "함께할 첫 이야기를 기다리고 있어요",
    body: "아트리움과 함께한 교회의 생생한 후기를 차곡차곡 채워갈 예정입니다. 가장 먼저 함께해주실 교회를 기다리고 있어요.",
    name: "ATTRIUM",
    image: interview3.src,
  },
];

// [clone of last, ...real items, clone of first, clone of second] — the extra trailing
// clone keeps a "next" photo peeking in at the wrap boundary too, so the reset from the
// last real slide back to the first never leaves the peek slot momentarily empty.
const SLIDES = [
  TESTIMONIALS[TESTIMONIALS.length - 1],
  ...TESTIMONIALS,
  TESTIMONIALS[0],
  TESTIMONIALS[1],
];
const FIRST_REAL_SLIDE = 1;
const LAST_REAL_SLIDE = TESTIMONIALS.length;
const FORWARD_RESET_AT = TESTIMONIALS.length + 1;
const MOBILE_CARD_WIDTH = 327;
const DESKTOP_CARD_WIDTH = 480;
const CARD_GAP = 16;
const TRANSITION_MS = 300;

export default function Testimonials() {
  const [slide, setSlide] = useState(FIRST_REAL_SLIDE);
  const [animate, setAnimate] = useState(true);
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();
  // Locked while a slide transition (including the invisible loop-reset) is in flight —
  // clicking faster than the 300ms transition used to outrun the reset and push `slide`
  // past the ends of SLIDES, leaving an empty gap with no photo rendered there.
  // A ref (not state) so the 5s auto-advance timer — whose closure is created once per
  // `slide` change — always reads the live value instead of a stale snapshot from the
  // render it was scheduled in (state would freeze it at `true` forever after one run).
  const busyRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(MOBILE_CARD_WIDTH);
  const STEP = cardWidth + CARD_GAP;

  // The slide track's transform is computed in JS pixels. Below 1024px each
  // card fills the carousel's own measured width (it's fluid there), so the
  // width driving the transform has to be measured, not assumed — a fixed
  // guess would drift on any viewport that isn't exactly the one it was
  // tuned for. At 1024px+ cards are a fixed 480px regardless of container size.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const updateCardWidth = () => {
      setCardWidth(window.innerWidth < 1024 ? el.clientWidth : DESKTOP_CARD_WIDTH);
    };

    updateCardWidth();
    const observer = new ResizeObserver(updateCardWidth);
    observer.observe(el);
    window.addEventListener("resize", updateCardWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  const activeIndex =
    (((slide - 1) % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
  const testimonial = TESTIMONIALS[activeIndex];

  const advance = (direction: 1 | -1) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setSlide((s) => s + direction);
  };

  // Settle ~TRANSITION_MS after `slide` changes: if we've landed on a cloned slide at
  // either end, snap back to the equivalent real slide with no animation; otherwise just
  // release the lock. Driven by a timer rather than the DOM `transitionend` event, because
  // `transitionend` never fires when the track is `hidden` (display:none) below the 768px
  // breakpoint — that left `busyRef` stuck `true` forever after the first advance on
  // mobile, freezing the carousel on whatever slide it had just moved to.
  useEffect(() => {
    const id = setTimeout(() => {
      if (slide === FORWARD_RESET_AT) {
        setAnimate(false);
        setSlide(FIRST_REAL_SLIDE);
      } else if (slide === 0) {
        setAnimate(false);
        setSlide(LAST_REAL_SLIDE);
      } else {
        busyRef.current = false;
      }
    }, TRANSITION_MS);
    return () => clearTimeout(id);
  }, [slide]);

  // Re-enable the transition on the next frame, after the instant (unanimated) loop-reset —
  // and only now release the lock, once the reset has actually settled.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          busyRef.current = false;
        }),
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  // Auto-advance every 5s; the timer restarts whenever the slide changes, so a manual
  // click simply pushes the next auto-advance back rather than fighting it.
  useEffect(() => {
    const id = setTimeout(() => advance(1), 5000);
    return () => clearTimeout(id);
  }, [slide]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden py-16 768:py-30"
    >
      <div
        className="flex flex-col items-start gap-6 pr-6 1024:flex-row 1024:pr-0"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 67.5rem) / 2 + 1.5rem))" }}
      >
        <div
          className={`flex w-full flex-col items-start gap-12 transition-all duration-1600 ease-out 1024:max-w-120 1024:shrink-0 ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-40 font-extrabold tracking-tight text-neutral-900">
            교회 운영,
            <br /> 이렇게 달라졌습니다
          </h2>

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="이전 후기"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-100 hover:bg-neutral-50"
              >
                <ChevronLeft
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="다음 후기"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-100 hover:bg-neutral-50"
              >
                <ChevronRight
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            </div>

            <div className="flex w-full flex-col items-start gap-6 rounded-3xl bg-neutral-50 p-8 768:gap-8 768:p-10">
              <div className="flex w-full flex-col items-start gap-4 768:gap-6">
                <QuoteMark aria-hidden="true" />
                <div className="flex w-full flex-col items-start gap-2 leading-normal">
                  <p className="line-clamp-1 w-full text-18 font-bold text-neutral-900">
                    {testimonial.title}
                  </p>
                  <p className="line-clamp-3 h-[4.8rem] w-full text-16 font-medium text-neutral-600">
                    {testimonial.body}
                  </p>
                </div>
              </div>
              <p className="w-full text-16 font-bold text-left text-neutral-600">
                {testimonial.name}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="aspect-9/10 w-full min-w-0 overflow-hidden 1024:aspect-auto 1024:h-auto 1024:flex-1 1024:self-stretch"
        >
          <div
            className={`flex h-full gap-4 ${animate ? "transition-transform duration-300 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${slide * STEP}px)` }}
          >
            {SLIDES.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`flex h-full w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-1000 ease-out 768:rounded-3xl 1024:w-120 ${
                  visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-40 font-extrabold text-neutral-300">
                    {((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
