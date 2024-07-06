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

export function NewProjectBtn() {
  return (
    <Drawer>
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
          <NewProjectForm />
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
  );
}
