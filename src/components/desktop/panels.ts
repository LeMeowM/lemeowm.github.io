// Titles and taskbar labels for the three canonical panels. The prompt identity
// comes from content/profile.ts — edit it there.
//
// Keyed by id so a window looks up its own metadata; iterate PANEL_LIST where
// order matters (taskbar buttons, Start menu entries).
import { profile } from "@content/profile";
import { PanelId } from "./windowManager";

export type PanelMeta = {
  id: PanelId;
  title: string;
  taskLabel: string;
  icon: string;
};

export const PANELS: Record<PanelId, PanelMeta> = {
  terminal: {
    id: "terminal",
    title: `${profile.user}@${profile.host} — Terminal`,
    taskLabel: "Terminal",
    icon: "🖥",
  },
  profile: {
    id: "profile",
    title: "Profile.webp — Image Viewer",
    taskLabel: "Profile.webp",
    icon: "🖼",
  },
  settings: {
    id: "settings",
    title: "Display Properties",
    taskLabel: "Display Properties",
    icon: "⚙",
  },
};

/** Panels in the order they appear on the taskbar and in the Start menu. */
export const PANEL_LIST: PanelMeta[] = Object.values(PANELS);
