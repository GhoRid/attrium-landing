"use client";

import ContactModal from "@/components/ContactModal";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const ContactModalContext = createContext<(() => void) | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  return (
    <ContactModalContext.Provider value={openModal}>
      {children}
      <ContactModal open={isOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const openModal = useContext(ContactModalContext);
  if (!openModal) throw new Error("useContactModal must be used inside ContactModalProvider");
  return openModal;
}
