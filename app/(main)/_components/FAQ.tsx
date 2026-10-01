"use client";

import { ExpandIcon } from "@/components/Icons";
import { useScrollReveal } from "@/hooks/useFadeUp";
import { useState } from "react";

const FAQS = [
  {
    question: "도입을 위해 교회에서 준비해야 할 것이 있나요?",
    answer:
      "도입 전 교회의 운영 환경과 필요한 사항을 확인한 후 안내해드립니다. 상담을 통해 필요한 내용을 함께 정리할 수 있습니다.",
  },
  {
    question: "IT에 익숙하지 않은 담당자도 사용할 수 있나요?",
    answer:
      "별도의 전문적인 기술 지식이 없어도 사용할 수 있도록 구성되어 있으며, 도입 과정에서 서비스 이용에 필요한 안내를 제공합니다.",
  },
  {
    question: "도입하는 데 얼마나 시간이 걸리나요?",
    answer:
      "교회의 규모와 도입 범위에 따라 달라질 수 있습니다. 상담을 통해 교회의 상황을 확인한 후 예상 일정을 안내해드립니다.",
  },
  {
    question: "도입 비용은 어떻게 책정되나요?",
    answer:
      "교회의 규모와 이용 환경, 도입 범위에 따라 달라질 수 있습니다. 상담을 통해 필요한 내용을 확인한 후 적합한 이용 방식을 안내해드립니다.",
  },
  {
    question: "도입 후에도 도움을 받을 수 있나요?",
    answer:
      "네. 서비스 도입 이후에도 이용 과정에서 궁금한 사항이나 도움이 필요한 경우 지원을 받을 수 있습니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-30"
    >
      <div className="mx-auto max-w-content px-6">
        <h2
          className={`text-56 font-extrabold tracking-tight text-neutral-900 transition-all duration-1000 ease-out ${
            visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          FAQ
        </h2>

        <div className="mt-12 divide-y divide-neutral-100">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`transition-all duration-1000 ease-out ${
                  visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-24 font-bold text-neutral-900">{faq.question}</span>
                  <ExpandIcon
                    open={isOpen}
                    aria-hidden="true"
                    className="h-9 w-9 shrink-0 text-neutral-900"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-16 font-medium leading-relaxed text-neutral-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
