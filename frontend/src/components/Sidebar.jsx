import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, CloudSun, Plane, Utensils,
  Store, MapPin, Bus, Bot, Mic, Languages,
  User, Settings, ShieldCheck, Users,
  Activity, FileText
} from "lucide-react";

import useAuth from "../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Weather", path: "/weather", icon: CloudSun },
    { name: "Travel", path: "/travel", icon: Plane },
    { name: "Food", path: "/food", icon: Utensils },
    { name: "Restaurants", path: "/restaurants", icon: Store },
    { name: "Maps", path: "/maps", icon: MapPin },
    { name: "Transport", path: "/transport", icon: Bus },
    { name: "AI Chat", path: "/ai-chat", icon: Bot },
    { name: "Voice Assistant", path: "/voice", icon: Mic },
    { name: "Image Translator", path: "/image-translation", icon: Languages },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings }
  ];

  const adminItems = [
    { name: "Admin Dashboard", path: "/admin", icon: ShieldCheck },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "API Status", path: "/admin/api-status", icon: Activity },
    { name: "Request Logs", path: "/admin/request-logs", icon: FileText }
  ];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-heading">MAIN MENU</h3>

      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <Icon size={19} />
            <span>{item.name}</span>
          </NavLink>
        );
      })}

      {user?.role === "admin" && (
        <>
          <h3 className="sidebar-heading">ADMINISTRATION</h3>

          {adminItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </>
      )}
    </aside>
  );
}

export default Sidebar;
