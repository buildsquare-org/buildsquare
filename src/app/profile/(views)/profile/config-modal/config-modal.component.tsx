"use client";

import { SectionLink } from "./components/section-link";
import { CONFIG_MODAL_SECTIONS, TConfigModalSection } from "./store";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfigModalStore } from "./store";
import { ReactNode } from "react";
import { GeneralSection } from "./sections/general";
import { UsernameSection } from "./sections/username";
import { LinksSection } from "./sections/links";

function ModalSectionViews({
  userId,
  section,
}: {
  userId: string;
  section: TConfigModalSection;
}) {
  const MODAL_SECTIONS: Record<TConfigModalSection, JSX.Element> = {
    general: <GeneralSection userId={userId} />,
    username: <UsernameSection userId={userId} />,
    links: <LinksSection userId={userId} />,
  };

  return MODAL_SECTIONS[section];
}

export function ConfigModal({ userId }: { userId: string }) {
  const isModalOpen = useConfigModalStore((state) => state.isOpen);
  const closeModal = useConfigModalStore((state) => state.close);
  const currentSection = useConfigModalStore((state) => state.currentSection);

  function close() {
    closeModal();
  }

  return (
    <Modal
      className="w-full max-w-2xl h-96 p-0"
      open={isModalOpen}
      onClose={close}
    >
      <div className="grid grid-cols-6 h-full w-full">
        <aside className="col-span-2 border-r border-neutral-700/60">
          <nav className="flex flex-col h-full">
            {CONFIG_MODAL_SECTIONS.map((section, i) => (
              <SectionLink key={i} section={section}>
                {section}
              </SectionLink>
            ))}
          </nav>
        </aside>
        <section className="col-span-4 flex flex-col p-2 overflow-y-auto">
          <header className="flex justify-between items-center w-full">
            <h1 className="dark:text-neutral-200 font-semibold">
              {currentSection.split("")[0].toUpperCase() +
                currentSection.split("").slice(1).join("")}
            </h1>
            <Button variant="button-icon" size="icon" onClick={close}>
              <X />
            </Button>
          </header>
          <main className="w-full h-full flex flex-col">
            <ModalSectionViews userId={userId} section={currentSection} />
          </main>
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
