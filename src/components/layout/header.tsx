import { component$ } from "@builder.io/qwik";
import { headerConfig } from "../../core/config/headerConfig";
import { SearchIcon, SettingsIcon } from "~/components/icons";

export default component$(() => {
  return (
    <header class="bg-bg p-4 flex justify-between items-center ">
      <div class="flex items-center">
        <span class="font-semibold mr-4 text-white">{headerConfig.demoText}</span>
        <button class="bg-border text-white px-3 py-1 rounded-md text-sm">
          Get started
        </button>
        <button class="bg-border text-white px-3 py-1 rounded-md text-sm ml-2">
          New
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <input
          type="text"
          placeholder={headerConfig.searchPlaceholder}
          class="bg-border text-white px-4 py-2 rounded-md"
        />
        <button class="text-text-gray hover:text-white">
          <SearchIcon />
        </button>
        <button class="text-text-gray hover:text-white">
          <SettingsIcon />
        </button>
        <button class="bg-text-gray w-8 h-8 rounded-full text-center text-white font-bold">
          {headerConfig.userInitials}
        </button>
      </div>
    </header>
  );
});
