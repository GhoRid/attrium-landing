"use client";

import { useScrollReveal } from '@/hooks/useFadeUp'
import onePlaceImg from '@/assets/images/one-place.webp'

export default function OnePlace() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-0 py-16 768:py-[120px]"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-12 px-6 text-center 768:gap-16">
        <div className="flex flex-col gap-4 768:gap-6">
          <h2 className="text-[2.5rem] font-extrabold leading-[1.4] text-neutral-900 768:text-56">
            <span
              style={{ transitionDelay: '0ms' }}
              className={`inline-block transition-all duration-[1600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              이제,{' '}
            </span>
            <span
              style={{ transitionDelay: '200ms' }}
              className={`inline-block text-primary-500 transition-all duration-[1600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              한곳에서.
            </span>
          </h2>
          <p
            style={{ transitionDelay: '400ms' }}
            className={`text-24 leading-[1.6] tracking-[-0.03em] text-neutral-700 transition-all duration-[1600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            흩어져 있던 교회 운영 업무를
            <br />
            ATTRIUM에서 하나의 흐름으로 관리하세요
          </p>
        </div>

        <img
          src={onePlaceImg.src}
          alt="아트리움 관리자, 모바일, 키오스크 화면"
          style={{ transitionDelay: '600ms' }}
          className={`w-full max-w-[1200px] aspect-[2400/1198] object-contain transition-all duration-[1600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
      </div>
    </section>
  )
}
