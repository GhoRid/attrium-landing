import Logo from "@/assets/svgs/logo.svg";

const QUICK_LINKS = [
  { label: "메인", href: "#top" },
  { label: "서비스 소개", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

const CONTACT_LINES = [
  "062-512-2644",
  "010-9076-1159",
  "trvs.heonjae@gmail.com",
  "평일 10:00 - 18:00",
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-neutral-50 py-10">
      <div className="flex w-full max-w-content flex-col gap-12 px-6">
        <div className="flex w-full flex-col gap-10 1024:flex-row 1024:items-start 1024:justify-between">
          <div className="flex flex-col items-start gap-4 leading-[1.5]">
            <Logo
              role="img"
              aria-label="Attrium"
              className="h-8 w-[131px] text-neutral-900"
            />
            <p className="text-16 font-regular text-neutral-900">
              교회의 일상을 더 나은 방향으로
              <br className="hidden 768:inline" /> ATTRIUM은 교회에 필요한 변화와 새로운 가능성을
              함께 고민합니다
            </p>
          </div>

          <div className="hidden flex-wrap items-start gap-8 768:flex 768:gap-16">
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-16 font-semibold text-neutral-900">바로가기</h3>
              <ul className="flex flex-col items-start gap-2 leading-[1.5]">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex h-[21px] items-center text-14 font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4">
              <h3 className="text-16 font-semibold text-neutral-900">도입문의</h3>
              <ul className="flex flex-col items-start gap-2 leading-[1.5]">
                {CONTACT_LINES.map((line) => (
                  <li
                    key={line}
                    className="text-14 font-medium text-neutral-600"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-6">
          <div className="w-full border-t border-neutral-200" />
          <div className="flex flex-col items-start gap-1 text-14 font-medium leading-[1.5] text-neutral-600">
            <p>
              대표자 이예준, 이헌재 ｜ 개인정보보호책임자 이헌재 ｜ 사업자등록번호 746-87-03690 ｜
              주소 전남광주통합특별시 북구 면앙로 1, 하나빌딩 6층
            </p>
            <p>© TWORIVERS INC. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
