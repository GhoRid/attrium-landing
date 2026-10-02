"use client";

import interview1 from "@/assets/images/testimonial-photo-1.webp";
import interview2 from "@/assets/images/testimonial-photo-2.webp";
import interview3 from "@/assets/images/testimonial-photo-3.webp";
import QuoteMark from "@/assets/svgs/quote-mark.svg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTERVIEW_IMAGES = [interview1, interview2, interview3];

export default function TestimonialsSection() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="overflow-hidden py-16 768:py-30">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 1024:flex-row">
        <div
          className={`flex w-full flex-col gap-12 transition-all duration-1600 ease-out 1024:max-w-120 1024:shrink-0 ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-40 font-extrabold tracking-tight text-neutral-900">
            교회 운영,
            <br /> 이렇게 달라졌습니다
          </h2>

          <div className="flex w-full flex-col gap-6 rounded-3xl bg-neutral-50 p-8 768:gap-8 768:p-10">
            <div className="flex flex-col gap-4 768:gap-6">
              <QuoteMark aria-hidden="true" />
              <div className="flex flex-col gap-2 leading-normal">
                <p className="text-18 font-bold text-neutral-900">
                  함께할 첫 이야기를 기다리고 있어요
                </p>
                <p className="text-16 font-medium text-neutral-600">
                  아트리움과 함께한 교회의 생생한 후기를 차곡차곡 채워갈 예정입니다. 가장 먼저 함께해주실 교회를 기다리고 있어요.
                </p>
              </div>
            </div>
            <p className="text-16 font-bold text-neutral-600">ATTRIUM</p>
          </div>
        </div>

        <div className="flex min-w-0 w-full flex-1 snap-x gap-4 overflow-x-auto 1024:grid 1024:grid-cols-3 1024:overflow-visible">
          {INTERVIEW_IMAGES.map((image, index) => (
            <div
              key={image.src}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`aspect-9/10 w-4/5 shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-1000 ease-out 768:rounded-3xl 1024:w-auto ${
                visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <img src={image.src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
