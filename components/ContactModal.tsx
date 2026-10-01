"use client";

import { CloseIcon } from "@/components/Icons";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === dialogRef.current)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-neutral-900/50 px-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-labelledby="contact-modal-title"
        aria-modal="true"
        className="relative flex max-h-[90vh] w-full max-w-160 flex-col items-start gap-8 overflow-y-auto rounded-4xl bg-neutral-0 p-8 768:gap-12 768:rounded-[40px] 768:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-600 768:right-12 768:top-12"
        >
          <CloseIcon
            aria-hidden="true"
            className="h-8 w-8"
          />
        </button>

        <p
          id="contact-modal-title"
          className="text-32 font-extrabold leading-[1.4] tracking-[-1.08px] text-neutral-900"
        >
          도입 문의
        </p>

        <div className="flex w-full flex-col items-start gap-4 text-24 leading-[1.4] text-neutral-900">
          <p className="font-bold">문의 전화</p>
          <div className="flex w-full flex-col items-start gap-2 font-medium">
            <p>062-512-2644</p>
            <p>010-9076-1159</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4 text-24 leading-[1.4] text-neutral-900">
          <p className="font-bold">운영 시간</p>
          <p className="font-medium">평일 10:00 ~ 18:00</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
