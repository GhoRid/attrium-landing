"use client";

import { useScrollReveal } from "@/hooks/useFadeUp";
import { Lottie } from "lottie-react";
import connection from "@/assets/lotties/connection.json";
import folder from "@/assets/lotties/folder.json";
import heart from "@/assets/lotties/heart.json";
import star from "@/assets/lotties/star.json";

const BENEFITS = [
  {
    title: "교회 업무를 한곳에서",
    body: "교인 관리부터 헌금, 주보, 공지까지 흩어져 있던 교회 업무를\n한곳에서 편리하게 관리할 수 있습니다.",
    lottie: folder,
  },
  {
    title: "반복되는 일은 간편하게",
    body: "반복되는 주보 작성과 헌금 관리 등 번거로운 업무를\n간편하게 처리하고, 교회 운영에 필요한 시간을 줄여줍니다.",
    lottie: star,
  },
  {
    title: "어디서든 이어지는 교회",
    body: "관리자 페이지에서 입력한 정보가 키오스크와 모바일 주보로\n연결되어, 교회 안팎에서 편리하게 이용할 수 있습니다.",
    lottie: connection,
  },
  {
    title: "성도와 더 가까이",
    body: "함께 기도하기, 교회 소식 등을 통해\n성도와 교회의 소통을 자연스럽게 이어갑니다.",
    lottie: heart,
  },
];

export default function BenefitsGrid() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-0 py-16 768:py-[120px]"
    >
      <div
        className={`mx-auto max-w-content px-6 transition-all duration-[1000ms] ease-out ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-center text-40 font-extrabold tracking-tight text-neutral-900">
          왜 ATTRIUM을
          <br className="768:hidden" /> 선택할까요?
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 768:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="flex h-[248px] flex-col items-start justify-between rounded-3xl bg-neutral-50 p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] 768:h-[320px] 768:p-10"
            >
              <Lottie
                src={benefit.lottie}
                loop
                autoplay
                className="h-16 w-16 768:h-20 768:w-20 1024:h-[104px] 1024:w-[104px]"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-24 font-bold leading-[1.4] text-neutral-900">
                  {benefit.title}
                </h3>
                <p className="whitespace-normal text-16 font-medium leading-[1.5] text-neutral-700 1024:whitespace-pre-line">
                  {benefit.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
