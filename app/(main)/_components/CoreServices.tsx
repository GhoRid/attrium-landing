"use client";

import bulletin from "@/assets/images/core-service-bulletin.webp";
import donation from "@/assets/images/core-service-donation.webp";
import notice from "@/assets/images/core-service-notice.webp";
import pray from "@/assets/images/core-service-pray.webp";
import { useScrollReveal } from "@/hooks/useFadeUp";
import { useState } from "react";

const SERVICES = [
  {
    number: "01",
    label: "주보 생성",
    title: "주보 생성",
    body: "매주 만드는 주보, 더 간편하게 필요한 내용을 쉽게 구성하고 깔끔한 주보를 완성할 수 있습니다",
    image: bulletin.src,
  },
  {
    number: "02",
    label: "헌금하기",
    title: "헌금하기",
    body: "모바일과 키오스크로 언제 어디서든 편리하게 번거로운 절차 없이 몇 번의 터치만으로 헌금을 완료할 수 있습니다",
    image: donation.src,
  },
  {
    number: "03",
    label: "기도하기",
    title: "기도하기",
    body: "마음을 담은 기도 제목을 함께 나누고 성도들과 서로를 위해 기도하며 더 가까워질 수 있습니다",
    image: pray.src,
  },
  {
    number: "04",
    label: "공지&소식",
    title: "공지사항 및 교회 소식",
    body: "중요한 공지와 소식을 놓치지 않도록 모든 성도에게 빠르고 정확하게 전달할 수 있습니다",
    image: notice.src,
  },
];

export default function CoreServices() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();
  const service = SERVICES[active];

  return (
    <section
      ref={sectionRef}
      className="py-16 768:py-30"
    >
      <div className="mx-auto flex max-w-content flex-col gap-10 px-6 768:gap-16">
        <div className="flex flex-col gap-6 768:flex-row 768:items-center 768:justify-between">
          <h2
            className={`text-40 font-extrabold leading-[1.4] text-neutral-900 transition-all duration-1800 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            교회에 꼭 필요한
            <br />
            핵심 서비스
          </h2>

          <div className="scrollbar-hide -mx-6 flex min-w-0 items-start gap-2 overflow-x-auto">
            <div
              className="w-4 shrink-0"
              aria-hidden="true"
            />
            {SERVICES.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(i)}
                style={{
                  transitionProperty: "transform, opacity, background-color, color, border-color",
                  transitionDuration: "800ms, 800ms, 150ms, 150ms, 150ms",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: `${400 + i * 150}ms, ${400 + i * 150}ms, 0ms, 0ms, 0ms`,
                }}
                className={`flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-full px-4 text-16 font-bold whitespace-nowrap ${
                  visible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                } ${
                  i === active ? "bg-primary-500 text-neutral-0" : "bg-neutral-75 text-neutral-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div
              className="w-4 shrink-0"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 transition-all delay-500 duration-1800 ease-out 768:gap-4 1024:grid-cols-[1fr_2fr] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 768:h-auto 768:min-h-60 768:justify-between 768:gap-0 768:rounded-3xl 768:bg-neutral-75 768:p-9 1024:h-90">
            <p className="text-48 font-extrabold leading-normal text-primary-500">
              {service.number}
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-24 font-bold leading-[1.4] text-neutral-900">{service.title}</p>
              <p className="whitespace-pre-line text-16 font-medium leading-normal text-neutral-700">
                {service.body}
              </p>
            </div>
          </div>

          <div className="relative -mx-6 aspect-2/1 overflow-hidden bg-neutral-100 768:mx-0 768:rounded-3xl 1024:aspect-auto">
            {SERVICES.map((item, i) => {
              const offset = i - active;
              return (
                <div
                  key={item.label}
                  className="absolute inset-0 transition-all duration-150 ease-in-out"
                  style={{
                    transform: `translateY(${offset === 0 ? 0 : offset > 0 ? 40 : -40}px)`,
                    opacity: offset === 0 ? 1 : 0,
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
