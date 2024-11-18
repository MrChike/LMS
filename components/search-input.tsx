"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  // Use useMemo to avoid recalculating the URL string unless debouncedValue or categoryId changes
  const url = useMemo(() => {
    return qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
  }, [debouncedValue, currentCategoryId, pathname]);

  useEffect(() => {
    if (debouncedValue) {
      router.push(url); // Only update the URL if the debounced value changes
    }
  }, [debouncedValue, currentCategoryId, router, url]); // Ensure dependencies are accurate

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};
