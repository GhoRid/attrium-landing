"use client";

import ContactModal from "@/components/ContactModal";
import { createContext, createElement, useCallback, useContext, useState, type ReactNode } from "react";

const ContactModalContext = createContext<(() => void) | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  return createElement(
    ContactModalContext.Provider,
    { value: show },
    children,
    createElement(ContactModal, { open, onClose: hide }),
  );
}

export function useContactModal() {
  const open = useContext(ContactModalContext);
  if (!open) throw new Error("useContactModal must be used inside ContactModalProvider");
  return open;
}
