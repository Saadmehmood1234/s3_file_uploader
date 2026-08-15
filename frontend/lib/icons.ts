import {
  LayoutDashboard,
  Files,
  Upload,
  Share2,
  Settings,
  LogOut,
  User,
  Download,
  Trash2,
  Copy,
  Lock,
  Globe2,
  MoreVertical,
  Search,
  File,
  FolderOpen,
  HardDrive,
  Clock3,
  Star,
} from "lucide-react";
import { ComponentType } from "react";

export const ICONS = [
  LayoutDashboard,
  Files,
  Upload,
  Share2,
  Settings,
  LogOut,
  User,
  Download,
  Trash2,
  Copy,
  Lock,
  Globe2,
  MoreVertical,
  Search,
  File,
  FolderOpen,
  HardDrive,
  Clock3,
  Star,
];

export const getIcon = (icon: ComponentType) => {
  return ICONS.filter((ic) => ic == icon);
};
