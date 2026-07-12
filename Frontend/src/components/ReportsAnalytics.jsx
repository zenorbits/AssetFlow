import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Activity,
  Download,
  FileDown,
  Calendar,
  ChevronDown,
  Laptop,
  DoorOpen,
  Presentation,
  Camera,
  Armchair,
  Car,
  Truck,
  Printer,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

/* ────────────────────────────────────────────────────────────────────────
 * AssetFlow — Reports & Analytics
 * Frontend-only page. No backend, no API calls — all data below is
 * realistic placeholder data. Self-contained in this one file (matches the
 * design tokens used across the rest of AssetFlow: steel / signal / ink /
 * slate / mist / line colors, Sora + Inter + IBM Plex Mono type, rounded-2xl
 * cards) so it can be dropped into src/pages/ without touching any other
 * existing file.
 * ──────────────────────────────────────────────────────────────────────── */

const DATE_RANGES = ['Last 7 Days', 'Last 30 Days', 'This Month'];

const UTILIZATION_DATA = [
  { department: 'Engineering', utilization: 82 },
  { department: 'HR', utilization: 54 },
  { department: 'Finance', utilization: 67 },
  { department: 'Operations', utilization: 88 },
  { department: 'Sales', utilization: 61 },
  { department: 'IT', utilization: 74 },
];

const MAINTENANCE_TREND = [
  { month: 'Jan', requests: 12 },
  { month: 'Feb', requests: 18 },
  { month: 'Mar', requests: 9 },
  { month: 'Apr', requests: 15 },
  { month: 'May', requests: 22 },
  { month: 'Jun', requests: 14 },
];

const MOST_USED_ASSETS = [
  { icon: Laptop, name: 'Dell Laptop AF-1034', detail: 'Used 92% this month', percent: 92 },
  { icon: DoorOpen, name: 'Conference Room B2', detail: 'Booked 86%', percent: 86 },
  { icon: Presentation, name: 'Projector AF-2051', detail: 'Used 81%', percent: 81 },
  { icon: Printer, name: 'Office Printer AF-1210', detail: 'Used 74%', percent: 74 },
];

const IDLE_ASSETS = [
  { icon: Camera, name: 'Camera AF-3001', idleDays: 58 },
  { icon: Armchair, name: 'Office Chair AF-1021', idleDays: 44 },
  { icon: Car, name: 'Vehicle AF-2204', idleDays: 29 },
];

const MAINTENANCE_REMINDERS = [
  { icon: Truck, name: 'Forklift AF-0401', message: 'Service due in 4 days' },
  { icon: Laptop, name: 'Laptop AF-2020', message: 'Warranty expires in 2 weeks' },
  { icon: Printer, name: 'Printer AF-1098', message: 'Recommended for replacement' },
];

/* ── Local building blocks (kept in-file to stay drop-in / dependency-free) ─ */

function SectionCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      className={`rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ icon: Icon, title, iconColor = 'text-steel-700', iconBg = 'bg-mist' }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
      </div>
      <h3 className="font-display text-base font-semibold tracking-tight text-ink">{title}</h3>
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-mist">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full bg-steel-700"
      />
    </div>
  );
}

function WarningBadge({ children }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}

function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-xs shadow-cardLg">
      <p className="mb-1 font-medium text-ink">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {unit}
        </p>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState(DATE_RANGES[1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full space-y-6 bg-mist p-6 sm:p-8 lg:p-10"
    >
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            Reports &amp; Analytics
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate">
            Monitor asset utilization, maintenance trends, department allocation, and
            operational insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date range selector */}
          <div className="relative flex items-center rounded-lg border border-line bg-white transition-colors duration-150 focus-within:border-steel-600">
            <Calendar className="pointer-events-none absolute left-3 h-4 w-4 text-slate-light" aria-hidden="true" />
            <select
              aria-label="Select date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none rounded-lg bg-transparent py-2.5 pl-9 pr-9 text-sm text-ink focus:outline-none"
            >
              {DATE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-light" aria-hidden="true" />
          </div>

          {/* Export Report (header) */}
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-lg bg-steel-800 px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors duration-150 hover:bg-steel-700"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Analytics charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard delay={0.05}>
          <CardHeader icon={BarChart3} title="Asset Utilization by Department" />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILIZATION_DATA} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 12, fill: '#5B6472' }}
                  axisLine={{ stroke: '#E4E7EC' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12, fill: '#5B6472' }}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                />
                <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: 'rgba(21,59,84,0.05)' }} />
                <Legend
                  formatter={() => 'Utilization %'}
                  wrapperStyle={{ fontSize: 12, color: '#5B6472', paddingTop: 8 }}
                />
                <Bar
                  dataKey="utilization"
                  name="Utilization"
                  fill="#153B54"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard delay={0.1}>
          <CardHeader icon={Activity} title="Maintenance Frequency" />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MAINTENANCE_TREND} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#5B6472' }}
                  axisLine={{ stroke: '#E4E7EC' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#5B6472' }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip unit=" requests" />} cursor={{ stroke: '#E4E7EC' }} />
                <Legend
                  formatter={() => 'Maintenance Requests'}
                  wrapperStyle={{ fontSize: 12, color: '#5B6472', paddingTop: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  name="Requests"
                  stroke="#F0A202"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#F0A202', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Most used / idle assets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard delay={0.15}>
          <CardHeader
            icon={BarChart3}
            title="Most Used Assets"
            iconBg="bg-steel-800/5"
            iconColor="text-steel-700"
          />
          <ul className="space-y-4">
            {MOST_USED_ASSETS.map((asset) => (
              <li key={asset.name} className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist">
                  <asset.icon className="h-4 w-4 text-steel-700" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-ink">{asset.name}</p>
                    <span className="shrink-0 font-mono text-xs text-slate">{asset.percent}%</span>
                  </div>
                  <p className="mb-1.5 text-xs text-slate-light">{asset.detail}</p>
                  <ProgressBar percent={asset.percent} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard delay={0.2}>
          <CardHeader
            icon={Clock}
            title="Idle Assets"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <ul className="space-y-3.5">
            {IDLE_ASSETS.map((asset) => (
              <li
                key={asset.name}
                className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist">
                    <asset.icon className="h-4 w-4 text-slate" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{asset.name}</p>
                    <p className="text-xs text-slate-light">Unused for {asset.idleDays} days</p>
                  </div>
                </div>
                {asset.idleDays > 30 ? (
                  <WarningBadge>Idle {asset.idleDays}d</WarningBadge>
                ) : (
                  <span className="shrink-0 rounded-full border border-line bg-mist px-2.5 py-1 text-xs font-medium text-slate">
                    Monitor
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Maintenance reminders — full width */}
      <SectionCard delay={0.25}>
        <CardHeader
          icon={AlertTriangle}
          title="Assets Due for Maintenance / Nearing Retirement"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <ul className="divide-y divide-line">
          {MAINTENANCE_REMINDERS.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist">
                  <item.icon className="h-4 w-4 text-steel-700" aria-hidden="true" />
                </div>
                <p className="truncate text-sm font-medium text-ink">{item.name}</p>
              </div>
              <WarningBadge>{item.message}</WarningBadge>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Export section */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-steel-600 hover:text-steel-800 sm:order-1"
        >
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-steel-800 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors duration-150 hover:bg-steel-700 sm:order-2"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export Report
        </motion.button>
      </div>
    </motion.div>
  );
}
