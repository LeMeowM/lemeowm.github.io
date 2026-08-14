// Titles and taskbar labels for the three canonical panels. The prompt identity
// comes from content/profile.ts — edit it there.
import { profile } from "@content/profile";
import { PanelId } from "./windowManager";

export type PanelMeta = {
  id: PanelId;
  title: string;
  taskLabel: string;
  icon: string;
};

export const PANELS: PanelMeta[] = [
  {
    id: "terminal",
    title: `${profile.user}@${profile.host} — Terminal`,
    taskLabel: "Terminal",
    icon: "🖥",
  },
  {
    id: "profile",
    title: "Profile.webp — Image Viewer",
    taskLabel: "Profile.webp",
    icon: "🖼",
  },
  {
    id: "settings",
    title: "Display Properties",
    taskLabel: "Display Properties",
    icon: "⚙",
  },
];
