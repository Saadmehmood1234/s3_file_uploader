import {
  LayoutDashboard,
  Share2,
  Clock3,
  CircleAlert,
  LucideIcon,
  Globe2,
  Globe,
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
    icon: Globe,
  },
    {
    label: "Important",
    path: "/important",
    icon: CircleAlert,
  },
    {
    label: "Recent",
    path: "/recent",
    icon: Clock3,
  }
];

