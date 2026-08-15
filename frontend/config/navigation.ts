import {
  LayoutDashboard,
  Share2,
  Clock3,
  Star,
  LucideIcon,
} from "lucide-react";
export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAVIGATION: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
    {
    label: "Shared Files",
    path: "/shared",
    icon: Share2,
  },
    {
    label: "Favorites",
    path: "/favorites",
    icon: Star,
  },
    {
    label: "Recent",
    path: "/recent",
    icon: Clock3,
  }
];

