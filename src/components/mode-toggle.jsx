import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { SettingsButton } from "./SettingsButton";
import { SettingsLabel } from "./SettingsLabel";

export function ModeToggle() {
  const { setTheme } = useTheme();

  // Note: Attempted to use SettingsItem, but Dropdown Menu stopped triggering, so just copied contents from Settings Item
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex flex-col items-center">
          <SettingsLabel label={"Appearance"} />
          <SettingsButton variant="outline" size="icon" className="w-full flex-row">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </SettingsButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
