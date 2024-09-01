import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LogoIcon } from "~/components/icons";

export default component$(() => {
  return (
    <div class="min-h-screen bg-bg text-white flex flex-col">
      {/* Header */}
      <header class="p-4 flex justify-between items-center border-b border-border">
        <div class="flex items-center space-x-2">
          <span class="font-bold text-xl"><LogoIcon /></span>
        </div>
        <nav class="hidden md:flex space-x-4">
          <a href="#" class="hover:text-text-gray">Store</a>
          <a href="#" class="hover:text-text-gray">Pro</a>
          <a href="#" class="hover:text-text-gray">Teams</a>
          <a href="#" class="hover:text-text-gray">Developers</a>
          <a href="#" class="hover:text-text-gray">Changelog</a>
          <a href="#" class="hover:text-text-gray">Blog</a>
          <a href="#" class="hover:text-text-gray">Pricing</a>
        </nav>
        <div class="flex items-center space-x-4">
          <Link href="/auth/signup" class="hover:text-text-gray">Sign up</Link>
          <button class="bg-btn-bg text-white px-4 py-2 rounded-md hover:bg-bg-active">Download</button>
        </div>
      </header>

      {/* Main Content */}
      <main class="flex-grow flex items-center justify-center">
        <div class="w-full max-w-md ">
          <Slot />
        </div>
      </main>
    </div>
  );
});
