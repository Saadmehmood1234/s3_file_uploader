import {
  LayoutDashboard,
  Clock3,
  CircleAlert,
  LucideIcon,
  Globe,
} from "lucide-react";
export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAVIGATION: NavItem[] = [
  {
    label: "Overvue",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
    {
    label: "Shared Files",
    path: "/shared",
    icon: Globe,
  },
    {
    label: "Important Files",
    path: "/important",
    icon: CircleAlert,
  },
    {
    label: "Recent Files",
    path: "/recent",
    icon: Clock3,
  }
];

