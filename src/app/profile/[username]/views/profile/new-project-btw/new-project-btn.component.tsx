"use client";

import { PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NewProjectForm } from "./form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useNewProjectDrawerSheetStore } from "./store";

export function NewProjectBtn() {
  const shouldShowModals = useNewProjectDrawerSheetStore(
    (state) => state.visible,
  );
  const setShowModals = useNewProjectDrawerSheetStore(
    (state) => state.setVisible,
  );

  const router = useRouter();

  function onSubmittSuccess() {
    router.refresh();
    setShowModals(false);

    if (window.innerWidth < 640) {
      setTimeout(() => {
        setShowModals(true);
      }, 200);
    }
  }

  return (
    <>
      <div className="sm:block hidden">
        <Sheet open={shouldShowModals ? undefined : false}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="bg-neutral-800 font-medium border border-dashed border-neutral-700 rounded-sm w-full gap-1 dark:text-neutral-300 hover:brightness-110"
            >
              <PackagePlus className="w-4 h-4" /> Add project
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Project</SheetTitle>
            </SheetHeader>
            <main className="flex flex-col h-full">
              <NewProjectForm onSubmitSuccess={onSubmittSuccess} />
            </main>
          </SheetContent>
        </Sheet>
      </div>
      <div className="sm:hidden">
        <Drawer open={shouldShowModals ? undefined : false}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="border border-dashed border-neutral-700 rounded-sm w-full gap-1 dark:text-neutral-300 hover:brightness-110"
            >
              <PackagePlus className="w-4 h-4" /> Add project
            </Button>
          </DrawerTrigger>
          <DrawerContent className="after:hidden max-h-screen overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>New Project</DrawerTitle>
            </DrawerHeader>
            <main className="flex flex-col px-4 h-full">
              <NewProjectForm onSubmitSuccess={onSubmittSuccess} />
            </main>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
