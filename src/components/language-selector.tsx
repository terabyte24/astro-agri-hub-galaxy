
import { useState } from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/lib/language-context";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "bn", label: "বাংলা (Bengali)" },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find((l) => l.value === language) || languages[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between border-accent/20 bg-background/50 backdrop-blur-sm"
        >
          <Globe className="mr-2 h-4 w-4" />
          {currentLanguage.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-card/95 backdrop-blur-md">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((lang) => (
              <CommandItem
                key={lang.value}
                value={lang.value}
                onSelect={() => {
                  setLanguage(lang.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    language === lang.value ? "opacity-100" : "opacity-0"
                  }`}
                />
                {lang.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
