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
import { Database } from "@/models/supabase";

function ModalSectionViews({
  profile,
  section,
  onClose,
}: {
  profile: Database["public"]["Tables"]["profile"]["Row"];
  section: TConfigModalSection;
  onClose: () => void;
}) {
  const MODAL_SECTIONS: Record<TConfigModalSection, JSX.Element> = {
    general: <GeneralSection profile={profile} />,
    username: (
      <UsernameSection
        userId={profile.user_id}
        defaultUsername={profile.username}
      />
    ),
    links: <LinksSection profile={profile} />,
  };

  return MODAL_SECTIONS[section];
}

export function ConfigModal({
  profile,
}: {
  profile: Database["public"]["Tables"]["profile"]["Row"];
}) {
  const isModalOpen = useConfigModalStore((state) => state.isOpen);
  const closeModal = useConfigModalStore((state) => state.close);
  const currentSection = useConfigModalStore((state) => state.currentSection);

  function close() {
    closeModal();
  }

  return (
    <Modal
      className="w-full max-w-2xl h-[500px] p-0"
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
        <section className="col-span-4 flex flex-col overflow-y-auto relative">
          <header className="flex justify-between items-center w-full p-2 sticky top-0 left-0 bg-neutral-800 border-b border-neutral-700/60">
            <h1 className="dark:text-neutral-200 font-semibold">
              {currentSection.split("")[0].toUpperCase() +
                currentSection.split("").slice(1).join("")}
            </h1>
            <Button variant="button-icon" size="icon" onClick={close}>
              <X />
            </Button>
          </header>
          <main className="w-full grid p-3 overflow-y-auto h-[calc(500px-53px)] will-change-scroll">
            <ModalSectionViews
              onClose={close}
              profile={profile}
              section={currentSection}
            />
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
