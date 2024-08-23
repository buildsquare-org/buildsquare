"use client";

import { TextInput } from "@/components/ui/text-input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState("");

  const [searchQuery] = useDebounce({ state: searchBarValue, delay: 250 });

  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    router.push(`${pathName}?query=${searchQuery.trim().toLowerCase()}`);
  }, [searchQuery]);

  return (
    <TextInput
      type="text"
      onChange={(e) => {
        setSearchBarValue(e.target.value);
      }}
      placeholder="obsidian"
    />
  );
}
