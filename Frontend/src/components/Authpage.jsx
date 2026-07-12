import { useState, useId, useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes,
  ShieldCheck,
  PackageSearch,
  CalendarClock,
  Wrench,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Info,
  ChevronDown,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 * AssetFlow — Login & Signup
 * Frontend-only UI. No backend, auth, database or API calls are wired up.
 * Everything (UI primitives, brand panel, forms, modal) lives in this one
 * file by request; each section is commented as its own "component".
 * ──────────────────────────────────────────────────────────────────────── */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEPARTMENTS = [
  'Information Technology',
  'Facilities',
  'Human Resources',
  'Finance',
  'Operations',
  'Procurement',
];

/* ── UI primitive: Button ─────────────────────────────────────────────── */

const BUTTON_VARIANTS = {
  primary:
    'bg-steel-800 text-white shadow-card hover:bg-steel-700 disabled:bg-steel-800/50',
  secondary:
    'bg-white text-ink border border-line hover:border-steel-600 hover:text-steel-800 disabled:text-slate-light disabled:border-line',
};

function Button({
  children,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={!isDisabled ? { y: -1 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      aria-busy={isLoading}
      className={`relative inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold font-body transition-colors duration-150 disabled:cursor-not-allowed ${BUTTON_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      <span>{isLoading ? 'Please wait…' : children}</span>
    </motion.button>
  );
}

/* ── UI primitive: Input ──────────────────────────────────────────────── */

const Input = forwardRef(function Input(
  { label, id, error, helperText, icon: Icon, rightElement, className = '', ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = error || helperText ? `${inputId}-description` : undefined;

  const stateStyles = error
    ? 'border-red-300 focus-within:border-red-500 bg-red-50/40'
    : 'border-line focus-within:border-steel-600 bg-white';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 transition-colors duration-150 ${stateStyles} ${className}`}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0 text-slate-light" aria-hidden="true" />}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedById}
          className="w-full border-none bg-transparent p-0 text-sm text-ink placeholder:text-slate-light focus:outline-none focus:ring-0"
          {...props}
        />
        {rightElement}
        {error && !rightElement && (
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
        )}
      </div>
      {(error || helperText) && (
        <p id={describedById} className={`mt-1.5 text-xs ${error ? 'text-red-600' : 'text-slate'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

/* ── UI primitive: Select ─────────────────────────────────────────────── */

const Select = forwardRef(function Select(
  { label, id, error, helperText, options = [], placeholder = 'Select…', className = '', ...props },
  ref
) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const describedById = error || helperText ? `${selectId}-description` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div
        className={`relative flex items-center rounded-lg border bg-white transition-colors duration-150 ${
          error ? 'border-red-300' : 'border-line focus-within:border-steel-600'
        } ${className}`}
      >
        <select
          id={selectId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedById}
          defaultValue=""
          className="w-full appearance-none bg-transparent px-3.5 py-2.5 pr-9 text-sm text-ink focus:outline-none focus:ring-0"
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 h-4 w-4 text-slate-light"
          aria-hidden="true"
        />
      </div>
      {(error || helperText) && (
        <p id={describedById} className={`mt-1.5 text-xs ${error ? 'text-red-600' : 'text-slate'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

/* ── UI primitive: Checkbox ───────────────────────────────────────────── */

function Checkbox({ label, checked, onChange, id, ...props }) {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex select-none items-center gap-2 text-sm text-slate cursor-pointer"
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-4 w-4 cursor-pointer appearance-none rounded border border-line bg-white checked:border-steel-700 checked:bg-steel-700 focus-visible:outline-2 focus-visible:outline-steel-600"
          {...props}
        />
        <Check
          className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>
      {label}
    </label>
  );
}

/* ── UI primitive: Divider ────────────────────────────────────────────── */

function Divider({ label }) {
  if (!label) return <hr className="border-line" />;

  return (
    <div className="flex items-center gap-3" role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium uppercase tracking-wider text-slate-light">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/* ── UI primitive: Card ───────────────────────────────────────────────── */

function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-line bg-white p-8 shadow-cardLg sm:p-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── UI primitive: Alert ──────────────────────────────────────────────── */

const ALERT_VARIANTS = {
  success: {
    icon: CheckCircle2,
    styles: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    iconColor: 'text-emerald-600',
  },
  error: {
    icon: AlertTriangle,
    styles: 'border-red-200 bg-red-50 text-red-700',
    iconColor: 'text-red-500',
  },
};

function Alert({ variant = 'error', children }) {
  const config = ALERT_VARIANTS[variant];
  const Icon = config.icon;

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${config.styles}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <span>{children}</span>
    </motion.div>
  );
}

/* ── UI primitive: Modal ──────────────────────────────────────────────── */

function Modal({ isOpen, onClose, title, description, children }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      const onKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();

      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = '';
        triggerRef.current?.focus?.();
      };
    }
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? 'modal-description' : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-white p-7 shadow-cardLg focus:outline-none sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="modal-title" className="font-display text-xl font-semibold text-ink">
                  {title}
                </h2>
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-slate">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-slate-light transition-colors hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Brand panel: feature highlight item ──────────────────────────────── */

function FeatureHighlight({ code, icon: Icon, label }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
        <Icon className="h-4 w-4 text-signal" aria-hidden="true" />
      </div>
      <div>
        <span className="block font-mono text-[10px] tracking-wider text-white/40">{code}</span>
        <span className="block text-sm font-medium text-white/90">{label}</span>
      </div>
    </div>
  );
}

const FEATURES = [
  { code: 'AST-01', icon: ShieldCheck, label: 'Secure Role-Based Access' },
  { code: 'AST-02', icon: PackageSearch, label: 'Asset Lifecycle Tracking' },
  { code: 'AST-03', icon: CalendarClock, label: 'Resource Booking' },
  { code: 'AST-04', icon: Wrench, label: 'Maintenance Workflow' },
];

// Node coordinates for the abstract "asset network" illustration signature.
const NODES = [
  { x: 60, y: 40, r: 5 },
  { x: 150, y: 20, r: 7 },
  { x: 230, y: 70, r: 4 },
  { x: 110, y: 110, r: 6 },
  { x: 210, y: 150, r: 5 },
  { x: 40, y: 150, r: 4 },
  { x: 170, y: 190, r: 6 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 0],
  [3, 5],
  [3, 4],
  [4, 2],
  [4, 6],
];

/* ── Brand panel (left, ~45% width, hidden on mobile) ─────────────────── */

function BrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-steel-gradient px-10 py-12 text-white lg:flex xl:px-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
          <Boxes className="h-5 w-5 text-signal" aria-hidden="true" />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">AssetFlow</span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-10 py-10">
        <div className="max-w-md">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-wide text-white/70">
            ENTERPRISE PLATFORM
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight xl:text-[2.75rem]">
            Track every asset.
            <br />
            Trust every record.
          </h1>
          <p className="mt-4 text-base text-white/70">
            Enterprise Asset &amp; Resource Management System
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
            One workspace for issuing, tracking and maintaining company assets — so
            department heads spend less time chasing spreadsheets and more time
            keeping resources moving.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full max-w-sm"
          aria-hidden="true"
        >
          <svg viewBox="0 0 260 210" className="h-auto w-full" fill="none">
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />
            ))}
            {NODES.map((node, i) => (
              <circle
                key={i}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={i === 3 ? '#F0A202' : 'rgba(255,255,255,0.85)'}
                className={i === 3 ? 'animate-pulseDot' : ''}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      <div className="relative grid grid-cols-2 gap-x-6 gap-y-4">
        {FEATURES.map((feature) => (
          <FeatureHighlight key={feature.code} {...feature} />
        ))}
      </div>
    </div>
  );
}

/* ── Login form ────────────────────────────────────────────────────────
 * Presentational only. Field checks exist purely to demonstrate validation
 * UI states (empty / invalid / mismatch) — there is no real auth call.
 * ──────────────────────────────────────────────────────────────────────── */

const loginInitialTouched = { email: false, password: false };

function LoginForm({ onOpenSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState(loginInitialTouched);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const emailError = touched.email && !email
    ? 'Email address is required.'
    : touched.email && !EMAIL_PATTERN.test(email)
    ? 'Enter a valid email address.'
    : '';

  const passwordError = touched.password && !password ? 'Password is required.' : '';

  const handleBlur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setStatus(null);

    if (!email || !password || !EMAIL_PATTERN.test(email)) {
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
    }, 1400);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <Alert variant="error">Check your email and password and try again.</Alert>
      )}
      {status === 'success' && (
        <Alert variant="success">
          Credentials look good — this is a UI placeholder, no session was created.
        </Alert>
      )}

      <Input
        label="Email Address"
        id="login-email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur('email')}
        error={emailError}
      />

      <Input
        label="Password"
        id="login-password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="Enter your password"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handleBlur('password')}
        error={passwordError}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="shrink-0 text-slate-light transition-colors hover:text-ink"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <Checkbox
          id="remember-me"
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <button
          type="button"
          className="text-sm font-medium text-steel-700 transition-colors hover:text-steel-800 hover:underline underline-offset-2"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" isLoading={isLoading}>
        Log In
      </Button>

      <Divider label="OR" />

      <Button type="button" variant="secondary" onClick={onOpenSignup}>
        Create Employee Account
      </Button>

      <p className="pt-1 text-center text-xs leading-relaxed text-slate-light">
        Employee accounts are created here. Administrative roles are assigned
        only by the Administrator.
      </p>
    </form>
  );
}

/* ── Signup modal ─────────────────────────────────────────────────────── */

const signupInitialForm = {
  fullName: '',
  email: '',
  department: '',
  password: '',
  confirmPassword: '',
};
const signupInitialTouched = {
  fullName: false,
  email: false,
  department: false,
  password: false,
  confirmPassword: false,
};

function SignupModal({ isOpen, onClose }) {
  const [form, setForm] = useState(signupInitialForm);
  const [touched, setTouched] = useState(signupInitialTouched);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBlur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const errors = {
    fullName: touched.fullName && !form.fullName ? 'Full name is required.' : '',
    email:
      touched.email && !form.email
        ? 'Email address is required.'
        : touched.email && !EMAIL_PATTERN.test(form.email)
        ? 'Enter a valid email address.'
        : '',
    department: touched.department && !form.department ? 'Select a department.' : '',
    password: touched.password && !form.password ? 'Password is required.' : '',
    confirmPassword:
      touched.confirmPassword && form.confirmPassword !== form.password
        ? 'Passwords do not match.'
        : '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      department: true,
      password: true,
      confirmPassword: true,
    });
    setStatus(null);

    const hasError =
      !form.fullName ||
      !form.email ||
      !EMAIL_PATTERN.test(form.email) ||
      !form.department ||
      !form.password ||
      form.confirmPassword !== form.password;

    if (hasError) {
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
    }, 1400);
  };

  const handleClose = () => {
    onClose();
    setForm(signupInitialForm);
    setTouched(signupInitialTouched);
    setStatus(null);
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Employee Account"
      description="Set up access for a new team member."
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {status === 'error' && (
          <Alert variant="error">Please resolve the highlighted fields.</Alert>
        )}
        {status === 'success' && (
          <Alert variant="success">
            Details captured — this is a UI placeholder, no account was created.
          </Alert>
        )}

        <Input
          label="Full Name"
          id="signup-fullname"
          autoComplete="name"
          placeholder="Jordan Miles"
          icon={User}
          value={form.fullName}
          onChange={updateField('fullName')}
          onBlur={handleBlur('fullName')}
          error={errors.fullName}
        />

        <Input
          label="Email Address"
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          icon={Mail}
          value={form.email}
          onChange={updateField('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
        />

        <Select
          label="Department"
          id="signup-department"
          options={DEPARTMENTS}
          value={form.department}
          onChange={updateField('department')}
          onBlur={handleBlur('department')}
          error={errors.department}
        />

        <Input
          label="Password"
          id="signup-password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Create a password"
          icon={Lock}
          value={form.password}
          onChange={updateField('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="shrink-0 text-slate-light transition-colors hover:text-ink"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <Input
          label="Confirm Password"
          id="signup-confirm-password"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={updateField('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              aria-pressed={showConfirm}
              className="shrink-0 text-slate-light transition-colors hover:text-ink"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-start gap-2 rounded-lg bg-mist px-3.5 py-3 text-xs leading-relaxed text-slate">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-steel-600" aria-hidden="true" />
          <span>
            Department Head and Asset Manager roles cannot be selected during
            signup.
          </span>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Create Account
        </Button>
      </form>
    </Modal>
  );
}

/* ── Page: AuthPage (default export) ─────────────────────────────────── */

export default function AuthPage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex min-h-screen w-full bg-mist"
    >
      {/* Left: brand / illustration panel — hidden below lg */}
      <div className="w-full lg:w-[45%]">
        <BrandPanel />
      </div>

      {/* Right: authentication card */}
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-steel-800">
            <Boxes className="h-5 w-5 text-signal" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            AssetFlow
          </span>
        </div>

        <div className="w-full max-w-[420px]">
          <Card>
            <div className="mb-7">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate">
                SESSION · SECURE
              </span>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Welcome Back
              </h2>
              <p className="mt-1.5 text-sm text-slate">
                Sign in with your employee credentials to continue.
              </p>
            </div>

            <LoginForm onOpenSignup={() => setIsSignupOpen(true)} />
          </Card>

          <p className="mt-6 text-center text-xs text-slate-light">
            AssetFlow © {new Date().getFullYear()} — Internal enterprise use only.
          </p>
        </div>
      </div>

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </motion.div>
  );
}
