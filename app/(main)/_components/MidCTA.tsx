"use client";

import { useContactModal } from "@/store/contactModal.store";
import gradient from '@/assets/images/gradient.webp'

export default function MidCTA() {
  const onOpenContact = useContactModal()
  return (
    <section
      id="contact"
      className="flex min-h-[320px] flex-col items-center justify-center gap-6 bg-cover bg-center px-6 py-16 text-center 768:h-[400px] 768:py-0"
      style={{ backgroundImage: `url(${gradient.src})` }}
    >
      <div className="flex flex-col items-center leading-[1.4] text-primary-500">
        <p className="text-32 font-light tracking-[-0.03em]">ATTRIUM이 만드는</p>
        <p className="text-32 font-bold tracking-[-0.03em]">
          달라진 교회의 운영을
          <br className="768:hidden" /> 직접 경험해 보세요!
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 768:flex-row 768:gap-4">
        <button
          type="button"
          onClick={onOpenContact}
          className="flex h-14 w-40 cursor-pointer items-center justify-center rounded-full text-16 font-semibold text-neutral-0 tracking-[-0.48px]"
          style={{
            backgroundImage:
              'linear-gradient(-76deg, var(--color-primary-500) 0%, var(--color-primary-400) 100%)',
          }}
        >
          도입 문의
        </button>
      </div>
    </section>
  )
}
