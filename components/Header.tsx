"use client";

import Logo from "@/assets/svgs/logo.svg";
import { useContactModal } from "@/store/contactModal.store";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "메인", href: "#top" },
  { label: "서비스 소개", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const onOpenContact = useContactModal();
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("top");

    const updateOverHero = () => {
      const heroHeight = heroEl?.offsetHeight ?? 0;
      setOverHero(window.scrollY < heroHeight);
    };

    updateOverHero();
    window.addEventListener("scroll", updateOverHero, { passive: true });
    window.addEventListener("resize", updateOverHero);
    return () => {
      window.removeEventListener("scroll", updateOverHero);
      window.removeEventListener("resize", updateOverHero);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-500 ease-in-out ${
        overHero ? "" : "bg-neutral-0/20"
      } ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-6">
        <a href="#top">
          <Logo
            role="img"
            aria-label="Attrium"
            className="h-6 w-auto text-primary-500"
          />
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 768:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-10 items-center text-16 font-bold text-neutral-900 transition-colors hover:text-primary-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenContact}
            className="flex h-10 w-24 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-primary-500 px-4 text-16 font-bold text-neutral-0 transition-colors"
          >
            도입 문의
          </button>
        </div>
      </div>
    </header>
  );
}
