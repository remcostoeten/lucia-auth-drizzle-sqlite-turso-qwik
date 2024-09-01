import { siteConfig } from "~/core/config/site-config";

export const sidebarConfig = [
  {
    icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    label: "Tables",
    url: "/tables"
  },
  {
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    label: "Charts",
    url: "/charts"
  },
  {
    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 4.07 1S3 3.5 3 7c0 2.5-1 3-1 4v2.25c0 .55.45 1 1 1 .54 0 1-.45 1-1V11a9.05 9.05 0 0 0 2-.07c3.22-.65 6.5-1.91 6.5-8.09A5.53 5.53 0 0 0 16 3.5 5.33 5.33 0 0 0 13.57 1.84 4.64 4.64 0 0 0 12.08 0C11.35.11 4.46 0 1.25.46A4.49 4.49 0 0 0 0 5.33v.66c0 4.67 2.55 8 6.09 8 .52 0 1.02-.08 1.5-.19v8.45c-.55.17-1 .52-1 1.18 0 1.37.62 2.57 1.52 3.09a11.5 11.5 0 0 0 2.55 2c1.8-.07 3.53-.8 4.84-2.09a4.08 4.08 0 0 0 1.23-2.41 9.37 9.37 0 0 0-.32-1.85 8.86 8.86 0 0 0-1.52-3.18 1.81 1.81 0 0 0-1.7-1.04 12.14 12.14 0 0 0-2.38-.62z",
    label: "Github",
    url: siteConfig.repository
  }
];

// src/config/headerConfig.ts
export const headerConfig = {
  projectName: "Spirit8670",
  demoText: "Demo (Read-Only)",
  searchPlaceholder: "Search",
  userInitials: "AB"
};
