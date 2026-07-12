// src/pages/Dashboard.jsx
//
// AssetFlow — Dashboard page (single file, light mode only).
// Mount inside your existing Sidebar/Navbar layout, e.g.:
//   <AppLayout><Dashboard /></AppLayout>
//
// Requires:
//   npm install framer-motion lucide-react
//
// All data is placeholder only — no API / backend calls.

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Boxes,
  CalendarCheck2,
  Wrench,
  ArrowLeftRight,
  Undo2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  MoreHorizontal,
  History,
  LogOut,
  AlertTriangle,
  Bell,
  AlertCircle,
  Info,
  TriangleAlert,
  Zap,
  PackagePlus,
  CalendarPlus,
  Send,
  ListChecks,
  Check,
  Download,
  Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Placeholder data                                                    */
/* ------------------------------------------------------------------ */

const currentUser = { name: "Ariana Cole", avatarInitials: "AC" };

const kpiData = [
  { id: "available", label: "Assets Available", value: 1284, delta: "+4.2%", trend: "up", icon: PackageCheck, accent: "emerald" },
  { id: "allocated", label: "Assets Allocated", value: 862, delta: "+1.8%", trend: "up", icon: Boxes, accent: "indigo" },
  { id: "bookings", label: "Active Bookings", value: 137, delta: "-2.1%", trend: "down", icon: CalendarCheck2, accent: "sky" },
  { id: "maintenance", label: "Maintenance Today", value: 18, delta: "+3 today", trend: "up", icon: Wrench, accent: "amber" },
  { id: "transfers", label: "Pending Transfers", value: 26, delta: "-5.4%", trend: "down", icon: ArrowLeftRight, accent: "rose" },
  { id: "returns", label: "Upcoming Returns", value: 54, delta: "+9 this week", trend: "up", icon: Undo2, accent: "violet" },
];

const allocationTrend = [
  { label: "Mon", value: 62 },
  { label: "Tue", value: 78 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 91 },
  { label: "Fri", value: 84 },
  { label: "Sat", value: 40 },
  { label: "Sun", value: 33 },
];

const categoryBreakdown = [
  { label: "IT Equipment", value: 38, color: "#6366f1" },
  { label: "Vehicles", value: 22, color: "#0ea5e9" },
  { label: "Furniture", value: 18, color: "#10b981" },
  { label: "Tools", value: 14, color: "#f59e0b" },
  { label: "Other", value: 8, color: "#f43f5e" },
];

const recentActivity = [
  { id: 1, actor: "Marcus Lee", action: "checked out", target: "Dell Latitude 5440 (#IT-2291)", time: "12 min ago", icon: LogOut, wrap: "bg-indigo-50 text-indigo-600" },
  { id: 2, actor: "System", action: "flagged", target: "Forklift Unit 3 for overdue maintenance", time: "48 min ago", icon: AlertTriangle, wrap: "bg-rose-50 text-rose-600" },
  { id: 3, actor: "Priya Nair", action: "approved transfer of", target: "12 office chairs to Floor 4", time: "1 hr ago", icon: ArrowLeftRight, wrap: "bg-amber-50 text-amber-600" },
  { id: 4, actor: "James Ortiz", action: "returned", target: "Canon EOS R5 (#CAM-0087)", time: "2 hr ago", icon: Undo2, wrap: "bg-emerald-50 text-emerald-600" },
  { id: 5, actor: "Sofia Chen", action: "booked", target: "Conference Room A/V Kit", time: "3 hr ago", icon: CalendarCheck2, wrap: "bg-sky-50 text-sky-600" },
];

const notifications = [
  { id: 1, title: "Maintenance overdue", message: "Forklift Unit 3 has missed its scheduled service window.", time: "10 min ago", unread: true, icon: AlertCircle, dot: "bg-rose-500", wrap: "bg-rose-50 text-rose-600" },
  { id: 2, title: "Transfer awaiting approval", message: "Warehouse B requested 5 pallet jacks.", time: "35 min ago", unread: true, icon: TriangleAlert, dot: "bg-amber-500", wrap: "bg-amber-50 text-amber-600" },
  { id: 3, title: "Return reminder", message: "8 laptops are due back tomorrow.", time: "2 hr ago", unread: false, icon: Info, dot: "bg-sky-500", wrap: "bg-sky-50 text-sky-600" },
  { id: 4, title: "New asset registered", message: "MacBook Pro 16\" added to IT inventory.", time: "5 hr ago", unread: false, icon: Info, dot: "bg-sky-500", wrap: "bg-sky-50 text-sky-600" },
];

const quickActions = [
  { id: "add-asset", label: "Add Asset", description: "Register a new asset", icon: PackagePlus, accent: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" },
  { id: "new-booking", label: "New Booking", description: "Reserve an asset", icon: CalendarPlus, accent: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white" },
  { id: "request-transfer", label: "Request Transfer", description: "Move assets between sites", icon: Send, accent: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" },
  { id: "schedule-maintenance", label: "Schedule Maintenance", description: "Plan service work", icon: Wrench, accent: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" },
];

const initialTasks = [
  { id: 1, title: "Inspect HVAC unit — Building C", due: "Today, 4:00 PM", priority: "high", done: false },
  { id: 2, title: "Approve pending transfer requests", due: "Today, 6:00 PM", priority: "medium", done: false },
  { id: 3, title: "Reconcile Q3 asset audit report", due: "Tomorrow", priority: "medium", done: false },
  { id: 4, title: "Onboard 6 new laptops to inventory", due: "Wed, Jul 15", priority: "low", done: true },
  { id: 5, title: "Renew fleet insurance documentation", due: "Fri, Jul 17", priority: "high", done: false },
];

const kpiAccent = {
  emerald: "bg-emerald-50 text-emerald-600 group-hover:ring-emerald-200",
  indigo: "bg-indigo-50 text-indigo-600 group-hover:ring-indigo-200",
  sky: "bg-sky-50 text-sky-600 group-hover:ring-sky-200",
  amber: "bg-amber-50 text-amber-600 group-hover:ring-amber-200",
  rose: "bg-rose-50 text-rose-600 group-hover:ring-rose-200",
  violet: "bg-violet-50 text-violet-600 group-hover:ring-violet-200",
};

const priorityStyles = {
  high: "bg-rose-50 text-rose-600",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-slate-100 text-slate-600",
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const maxTrend = Math.max(...allocationTrend.map((d) => d.value));
  const total = categoryBreakdown.reduce((s, c) => s + c.value, 0);
  let cumulative = 0;
  const conic = categoryBreakdown
    .map((c) => {
      const start = (cumulative / total) * 360;
      cumulative += c.value;
      const end = (cumulative / total) * 360;
      return `${c.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-full w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">

        {/* ---------------- Welcome ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {currentUser.avatarInitials}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                {greeting}, {currentUser.name.split(" ")[0]}
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                {today} · Here&apos;s what&apos;s happening across your assets today.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              Add Asset
            </button>
          </div>
        </motion.div>

        {/* ---------------- KPI cards ---------------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
        >
          {kpiData.map((kpi, i) => {
            const Icon = kpi.icon;
            const isUp = kpi.trend === "up";
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpiAccent[kpi.accent]}`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      isUp
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.delta}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                  {kpi.value.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-slate-500">{kpi.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- Analytics ---------------- */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Weekly trend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BarChart3 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Allocation Activity</h3>
                  <p className="text-xs text-slate-500">Last 7 days · placeholder data</p>
                </div>
              </div>
              <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="More options">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex h-48 items-end gap-3 sm:gap-4">
              {allocationTrend.map((day, i) => (
                <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex h-full w-full items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.value / maxTrend) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: "easeOut" }}
                      className="w-full max-w-9 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400">{day.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <PieChart className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Asset Categories</h3>
                <p className="text-xs text-slate-500">By share of inventory</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-32 w-32 rounded-full"
                style={{ background: `conic-gradient(${conic})` }}
              >
                <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white">
                  <span className="text-sm font-semibold text-slate-900">100%</span>
                </div>
              </motion.div>
            </div>
            <ul className="mt-6 space-y-2.5">
              {categoryBreakdown.map((c) => (
                <li key={c.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.label}
                  </span>
                  <span className="font-medium text-slate-900">{c.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------------- Activity / Notifications / Tasks ---------------- */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <History className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500">Latest asset movements</p>
              </div>
            </div>
            <ul className="mt-5 space-y-1">
              {recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                    className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.wrap}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700">
                        <span className="font-medium text-slate-900">{item.actor}</span>{" "}
                        {item.action}{" "}
                        <span className="font-medium text-slate-900">{item.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            <button className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
              View all activity
            </button>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Bell className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  <p className="text-xs text-slate-500">{unreadCount} unread</p>
                </div>
              </div>
              {unreadCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <ul className="mt-5 space-y-1">
              {notifications.map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                    className="relative flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    {n.unread && <span className={`absolute left-0 top-3.5 h-1.5 w-1.5 rounded-full ${n.dot}`} />}
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${n.wrap}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">{n.title}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{n.message}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            <button className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
              View all notifications
            </button>
          </motion.div>

          {/* Upcoming tasks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <ListChecks className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Tasks</h3>
                <p className="text-xs text-slate-500">
                  {tasks.filter((t) => !t.done).length} pending
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-1">
              {tasks.map((task, i) => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-pressed={task.done}
                    aria-label={task.done ? "Mark task as not done" : "Mark task as done"}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      task.done
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-slate-300"
                    }`}
                  >
                    {task.done && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                      {task.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{task.due}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------------- Quick actions ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
              <p className="text-xs text-slate-500">Common tasks, one click away</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition-colors hover:border-transparent hover:shadow-md"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${action.accent}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{action.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{action.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
