import {
  LayoutDashboard,
  Settings,
  Package,
  ArrowRightLeft,
  Calendar,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Organization Setup", icon: Settings },
  { name: "Assets", icon: Package },
  { name: "Allocation & Transfer", icon: ArrowRightLeft },
  { name: "Resource Booking", icon: Calendar },
  { name: "Maintenance", icon: Wrench },
  { name: "Audit", icon: ClipboardCheck },
  { name: "Reports", icon: BarChart3 },
  { name: "Notifications", icon: Bell },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-wide">
          Asset<span className="text-emerald-600">Flow</span>
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                index === 0
                  ? "bg-emerald-700 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
