"use client";

import churchLogo from "@/assets/images/chunggwang-church-logo.webp";
import AttriumLogo from "@/assets/svgs/logo.svg";
import { useScrollReveal } from "@/hooks/useFadeUp";

function LogoRow({ empty = false }: { empty?: boolean }) {
  return (
    <div className="relative h-20 w-full overflow-hidden 768:h-24">
      {!empty && (
        <img
          src={churchLogo.src}
          alt="협력 교회 로고"
          width={95}
          height={32}
          className="absolute top-1/2 h-8 w-auto -translate-y-1/2 animate-slide-across"
        />
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-neutral-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-neutral-50 to-transparent" />
    </div>
  );
}

export default function ChurchMarquee() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-16 768:py-40"
    >
      <div
        className={`mx-auto max-w-content px-6 transition-all duration-1000 ease-out ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="flex flex-wrap items-center justify-center gap-x-4 text-center text-40 font-extrabold leading-[1.4] tracking-tight text-neutral-900">
          <AttriumLogo
            role="img"
            aria-label="Attrium"
            className="h-6 w-auto 768:h-10 text-primary-500"
          />
          <span>은 교회와 함께</span> <span className="block basis-full 1024:hidden" />
          <span>더 나은 내일을 만듭니다.</span>
        </h2>

        {/* <div className="mt-10 flex flex-col gap-4 768:mt-16 768:gap-6">
          <LogoRow />
          <LogoRow empty />
        </div> */}
      </div>
    </section>
  );
}
