"use client";

import { ClientRouting } from "@/models/routing/client.routing";
import { SectionLink } from "./components/section-link";
import { CONFIG_MODAL_SECTIONS } from "./store";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfigModalStore } from "./store";
import { ReactNode } from "react";

export function ConfigModal() {
  const isModalOpen = useConfigModalStore((state) => state.isOpen);
  const closeModal = useConfigModalStore((state) => state.close);
  const currentSection = useConfigModalStore((state) => state.currentSection);

  function close() {
    closeModal();
  }

  return (
    <Modal className="w-full max-w-2xl h-96" open={isModalOpen} onClose={close}>
      <div className="grid grid-cols-6 h-full w-full">
        <aside className="col-span-2 border-r border-neutral-700/60 pr-2">
          <nav className="flex flex-col h-full">
            {CONFIG_MODAL_SECTIONS.map((section, i) => (
              <SectionLink key={i} section={section}>
                {section}
              </SectionLink>
            ))}
          </nav>
        </aside>
        <section className="col-span-4 flex flex-col pl-2">
          <header className="flex justify-between items-center w-full">
            <h1 className="dark:text-neutral-200 font-semibold">
              {currentSection.split("")[0].toUpperCase() +
                currentSection.split("").slice(1).join("")}
            </h1>
            <Button variant="button-icon" size="icon" onClick={close}>
              <X />
            </Button>
          </header>
          <main className="w-full flex flex-col"></main>
        </section>
      </div>
    </Modal>
  );
}

export function ConfigModalTrigger({ children }: { children: ReactNode }) {
  const openConfigModal = useConfigModalStore((state) => state.open);
  return (
    <Button asChild variant="ghost" onClick={openConfigModal}>
      {children}
    </Button>
  );
}
