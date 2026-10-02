"use client";

import bulletinImg from "@/assets/images/fragmented-bulletin.webp";
import donationImg from "@/assets/images/fragmented-donation.webp";
import talkImg from "@/assets/images/fragmented-group-chat.webp";
import personImg from "@/assets/images/fragmented-member-list.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";

const CARDS = [
  {
    src: bulletinImg.src,
    aspect: "aspect-960/1042",
    delay: "150ms",
    floatDuration: "4.2s",
    innerWidth: "90.2%",
    rotate: "-6.04deg",
    desktop: { left: "1.48%", top: "3.25%", width: "49.27%", height: "30.28%" },
    mobile: { left: "4.28%", top: "1.05%", width: "78.14%", height: "23.96%" },
  },
  {
    src: donationImg.src,
    aspect: "aspect-1200/1045",
    delay: "300ms",
    floatDuration: "3.6s",
    innerWidth: "83.0%",
    rotate: "16.38deg",
    desktop: { left: "39.35%", top: "18.21%", width: "66.94%", height: "35.70%" },
    mobile: { left: "-3.36%", top: "23.45%", width: "106.16%", height: "28.19%" },
  },
  {
    src: personImg.src,
    aspect: "aspect-1120/1045",
    delay: "450ms",
    floatDuration: "4.8s",
    innerWidth: "86.3%",
    rotate: "-10.95deg",
    desktop: { left: "-2.22%", top: "44.04%", width: "60.10%", height: "32.98%" },
    mobile: { left: "-0.31%", top: "49.52%", width: "95.30%", height: "26.05%" },
  },
  {
    src: talkImg.src,
    aspect: "aspect-960/974",
    delay: "600ms",
    floatDuration: "4.5s",
    innerWidth: "79.2%",
    rotate: "17.84deg",
    desktop: { left: "41.20%", top: "66.08%", width: "56.12%", height: "32.52%" },
    mobile: { left: "9.48%", top: "72.61%", width: "88.98%", height: "25.65%" },
  },
];

// While the section is pinned (see `collapseProgress` below), each card sinks
// toward the canvas's bottom-center and shrinks/fades away — `dx`/`dy` are in
// %-of-the-card's-own-box (what `translate()` resolves against), computed
// from its center so every card actually converges on the same target point
// regardless of its own size or starting position.
function getSinkStyle(
  position: { left: string; top: string; width: string; height: string },
  progress: number,
) {
  const width = parseFloat(position.width);
  const height = parseFloat(position.height);
  const centerX = parseFloat(position.left) + width / 2;
  const centerY = parseFloat(position.top) + height / 2;
  const dx = ((50 - centerX) / width) * 100 * progress;
  const dy = ((100 - centerY) / height) * 100 * progress;
  const scale = 1 - progress * 0.7;

  return {
    transform: `translate(${dx}%, ${dy}%) scale(${scale})`,
    opacity: 1 - progress,
  };
}

function ScatterCard({
  card,
  positions,
  zIndex,
  visible,
  collapseProgress,
}: {
  card: (typeof CARDS)[number];
  positions: "mobile" | "desktop";
  zIndex: number;
  visible: boolean;
  collapseProgress: number;
}) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setFloating(true), parseInt(card.delay, 10) + 900);
    return () => clearTimeout(timer);
  }, [visible, card.delay]);

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ ...card[positions], zIndex, ...getSinkStyle(card[positions], collapseProgress) }}
    >
      <div
        style={{
          width: card.innerWidth,
          transform: `translateY(${visible ? "0" : "24px"})`,
          transitionDelay: card.delay,
          animationName: floating ? "float" : "none",
          animationDuration: card.floatDuration,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
        className={`transition-all duration-900 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          style={{ transform: `rotate(${card.rotate})` }}
          className="overflow-hidden rounded-[17.28px] shadow-xl 768:rounded-[36px]"
        >
          <img
            src={card.src}
            alt=""
            className={`w-full ${card.aspect} object-cover`}
          />
        </div>
      </div>
    </div>
  );
}

function ScatterCanvas({
  aspectRatio,
  positions,
  visible,
  collapseProgress,
}: {
  aspectRatio: string;
  positions: "mobile" | "desktop";
  visible: boolean;
  collapseProgress: number;
}) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio }}
    >
      {CARDS.map((card, index) => (
        <ScatterCard
          key={card.src}
          card={card}
          positions={positions}
          zIndex={index + 1}
          visible={visible}
          collapseProgress={collapseProgress}
        />
      ))}
    </div>
  );
}

export default function FragmentedToolsSection() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  const [stickyTopOffset, setStickyTopOffset] = useState("0px");
  const [collapseProgress, setCollapseProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateStickyTopOffset = () => setStickyTopOffset(`calc(100vh - ${section.offsetHeight}px)`);
    updateStickyTopOffset();

    const observer = new ResizeObserver(updateStickyTopOffset);
    observer.observe(section);
    window.addEventListener("resize", updateStickyTopOffset);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickyTopOffset);
    };
  }, [sectionRef]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = section?.parentElement;
    if (!section || !wrapper) return;

    const updateCollapseProgress = () => {
      const viewportHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const dwellRange = wrapper.offsetHeight - sectionHeight;
      if (dwellRange <= 0) {
        setCollapseProgress(0);
        return;
      }
      const naturalTop = wrapper.getBoundingClientRect().top;
      const stuckThreshold = viewportHeight - sectionHeight;
      const progress = (stuckThreshold - naturalTop) / dwellRange;
      setCollapseProgress(Math.min(1, Math.max(0, progress)));
    };

    updateCollapseProgress();
    window.addEventListener("scroll", updateCollapseProgress, { passive: true });
    window.addEventListener("resize", updateCollapseProgress);
    return () => {
      window.removeEventListener("scroll", updateCollapseProgress);
      window.removeEventListener("resize", updateCollapseProgress);
    };
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      style={{ top: stickyTopOffset }}
      className="sticky overflow-hidden bg-neutral-900 py-16 768:py-30"
    >
      <div
        className="pointer-events-none absolute -bottom-25 left-1/2 h-87.5 w-[120%] -translate-x-1/2 rounded-full opacity-50 blur-3xl 768:w-[1620px]"
        style={{
          backgroundImage:
            "radial-gradient(closest-side, var(--color-primary-500) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-content flex-col gap-16 px-6">
        <div
          className={`flex flex-col gap-6 transition-all duration-1000 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-40 font-extrabold leading-[1.4] text-neutral-0">
            필요한 일을 처리하려면
            <br />
            여러 곳을 오가야 합니다
          </h2>
          <p className="text-24 leading-[1.6] tracking-[-0.03em] text-neutral-0/80">
            주보는 문서로, 헌금은 엑셀로, 공지는 메신저로.
            <br />
            교회 운영에 필요한 정보들이 흩어져 있습니다.
          </p>
        </div>

        <div className="768:hidden">
          <ScatterCanvas
            aspectRatio="327 / 1143"
            positions="mobile"
            visible={visible}
            collapseProgress={collapseProgress}
          />
        </div>
        <div className="hidden 768:block">
          <ScatterCanvas
            aspectRatio="1080 / 1878"
            positions="desktop"
            visible={visible}
            collapseProgress={collapseProgress}
          />
        </div>
      </div>
    </section>
  );
}
