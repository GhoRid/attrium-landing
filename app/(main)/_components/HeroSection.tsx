import heroImg from "@/assets/images/hero.webp";
import onePlaceImg from "@/assets/images/one-place.webp";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden pt-32 768:h-screen 768:pt-40"
    >
      <img
        src={heroImg.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto max-w-content px-6 text-center">
        <span className="text-18 font-semibold text-primary-600">
          교회를 위한 새로운 디지털 경험
        </span>

        <h1 className="mx-auto mt-4 max-w-none text-[2.5rem] font-bold tracking-tight text-neutral-900 768:max-w-2xl 768:text-56">
          교회의 모든 순간
          <br /> 하나로 연결하세요
        </h1>
      </div>

      <img
        src={onePlaceImg.src}
        alt="아트리움 관리자, 모바일, 키오스크 화면"
        className="pointer-events-none relative left-1/2 mt-10 w-[92%] max-w-none -translate-x-1/2 flex-none object-contain object-bottom 768:mt-20 768:w-[117%] 768:min-h-0 768:flex-1"
      />
    </section>
  );
}
