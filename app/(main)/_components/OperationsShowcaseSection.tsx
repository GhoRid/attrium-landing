"use client";

import admin from "@/assets/images/operations-admin.webp";
import kiosk from "@/assets/images/operations-kiosk.webp";
import mobile from "@/assets/images/operations-mobile.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CHANNELS = [
  {
    title: "ADMIN",
    body: "교인, 헌금, 주보, 공지 및 소식 등\n교회에 필요한 다양한 정보를 한곳에서 관리합니다.",
    image: admin.src,
  },
  {
    title: "MOBILE",
    body: "모바일 주보와 교회 소식을 확인하고\n기도 제목을 나누며 성도와 교회의 연결을 이어갑니다.",
    image: mobile.src,
  },
  {
    title: "KIOSK",
    body: "관리자 페이지의 정보와 연결되어\n교회에 방문한 성도가 헌금하고 필요한 정보를 확인할 수 있습니다.",
    image: kiosk.src,
  },
];

export default function OperationsShowcaseSection() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-16 768:py-30"
    >
      <div className="mx-auto flex max-w-content flex-col gap-16 px-6">
        <div
          className={`flex flex-col gap-6 transition-all duration-1400 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-40 font-extrabold leading-[1.4] text-neutral-900">
            어디서든
            <br />
            하나로 이어지는
            <br className="768:hidden" /> 교회 운영
          </h2>
          <p className="whitespace-normal text-16 font-medium leading-[1.6] tracking-[-0.03em] text-neutral-700 768:whitespace-pre-line">
            {
              "교회 운영에 필요한 정보는 한곳에서 관리하고, 필요한 정보는 키오스크와 모바일을 통해 성도에게 전달됩니다.\nADMIN에서 관리하고 KIOSK와 MOBILE로 연결되는 하나의 흐름으로 교회 운영을 보다 편리하게 만들어갑니다."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 1024:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <div
              key={channel.title}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
              className={`flex flex-col overflow-hidden rounded-3xl border border-neutral-100 transition-all duration-1000 ease-out 768:flex-row 1024:flex-col ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="aspect-684/640 w-full bg-neutral-50 768:min-w-0 768:flex-1 1024:aspect-auto 1024:h-80 1024:flex-none">
                <img
                  src={channel.image}
                  alt={channel.title}
                  className="h-full w-full object-cover 1024:object-contain"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 py-8 768:min-w-0 768:flex-1 1024:flex-none">
                <p className="text-18 font-extrabold text-primary-500">{channel.title}</p>
                <p className="whitespace-pre-line text-16 font-medium leading-normal text-neutral-600">
                  {channel.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
