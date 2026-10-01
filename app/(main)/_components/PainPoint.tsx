"use client";

import { useScrollReveal } from "@/hooks/useFadeUp";

export default function PainPoint() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-900 py-16 768:py-30"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-[1900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(closest-side, var(--color-primary-500) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-content flex-col items-center gap-6 px-6 text-center">
        <h2 className="flex flex-col text-[2.5rem] font-extrabold leading-[1.4] text-neutral-0 768:text-56">
          <span
            className={`transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            교회 운영은
          </span>
          <span
            style={{ transitionDelay: "250ms" }}
            className={`transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            한 가지 일로 끝나지
            <br className="768:hidden" /> 않으니까요
          </span>
        </h2>
        <p
          style={{ transitionDelay: "500ms" }}
          className={`text-24 leading-[1.6] tracking-[-0.03em] text-neutral-0/80 transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          주보부터 헌금, 공지, 교인, 기도제목까지
          <br className="hidden 768:inline" /> 교회에는 매일 챙겨야 할 일이 있습니다
        </p>
      </div>
    </section>
  );
}
