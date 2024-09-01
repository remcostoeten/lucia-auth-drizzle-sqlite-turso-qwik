import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { sidebarConfig } from "../../core/config/sidebarConfig";
import { LogoIcon, SidebarIcon } from "~/components/icons";

export default component$(() => {
  return (
    <aside class="mt-[115px] w-64 bg-bg p-4 ">
      <div class="flex items-center mb-8 mt-[-115px]">
        <Link href="/">
        <LogoIcon />
        </Link>
        <span class="ml-2 font-bold text-xl text-white">
        Stoeten</span>
      </div>
      <nav>
        <ul class="space-y-2">
          {sidebarConfig.map((item) => (
            <li key={item.label}>
              <Link
                href={item.url}
                class="flex items-center p-2 rounded hover:bg-border"
              >
                <SidebarIcon path={item.icon} />
                <span class="text-white">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
});
