import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Bus,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  FileCheck2,
  Home,
  LifeBuoy,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Soup,
  Star,
  Store,
  TriangleAlert,
  Truck,
  UserRound,
  UsersRound,
  Utensils,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";

type Role = "Parent" | "Operations" | "Driver" | "School" | "Vendor" | "Fleet";
type ParentView = "Home" | "Children" | "Transport" | "Meals" | "Account";
type Modal = "booking" | "meal" | "trip" | "notifications" | null;

// Respect Vite base paths so local previews and the /Karrygo/ Pages URL both load images.
const mealImage = `${import.meta.env.BASE_URL}images/rice-chicken.jpg`;
const secondMealImage = `${import.meta.env.BASE_URL}images/beans-plantain.jpg`;

const roleOptions: { role: Role; label: string; icon: LucideIcon }[] = [
  { role: "Parent", label: "Parent app", icon: CircleUserRound },
  { role: "Operations", label: "Karrygo operations", icon: ShieldCheck },
  { role: "Driver", label: "Driver app", icon: Navigation },
  { role: "School", label: "School portal", icon: Building2 },
  { role: "Vendor", label: "Food vendor", icon: Store },
  { role: "Fleet", label: "Fleet partner", icon: Truck },
];

function Button({
  children,
  onClick,
  variant = "primary",
  icon: Icon,
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "amber";
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}

function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "gray";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span className={`avatar avatar-${size}`} aria-label={name}>
      {initials}
    </span>
  );
}

function Heading({
  children,
  level = 1,
  sub,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  sub?: ReactNode;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className="heading-wrap">
      <Tag className={`heading heading-${level}`}>{children}</Tag>
      {sub && <p className="heading-sub">{sub}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  children,
  onChange,
}: {
  label: string;
  value?: string;
  children: ReactNode;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="select-wrap">
        <select value={value} onChange={(event) => onChange?.(event.target.value)}>
          {children}
        </select>
        <ChevronDown size={17} />
      </span>
    </label>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  tone = "",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: string;
}) {
  return (
    <div className="stat-card">
      <span className={`icon-box ${tone}`}>
        <Icon size={20} />
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon size={24} />
      </span>
      <strong>{title}</strong>
      <p>{body}</p>
      {action}
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">
        <ArrowRight size={19} strokeWidth={3} />
      </span>
      {!compact && <span>Karrygo</span>}
    </div>
  );
}

function RoleSwitcher({
  role,
  onRole,
  open,
  setOpen,
}: {
  role: Role;
  onRole: (role: Role) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const active = roleOptions.find((item) => item.role === role)!;
  return (
    <div className="role-switcher">
      <button type="button" className="role-trigger" onClick={() => setOpen(!open)}>
        <active.icon size={17} />
        <span>{active.label}</span>
        <ChevronDown size={15} />
      </button>
      {open && (
        <div className="role-menu">
          <p>Switch demo workspace</p>
          {roleOptions.map((item) => (
            <button
              type="button"
              key={item.role}
              className={role === item.role ? "active" : ""}
              onClick={() => {
                onRole(item.role);
                setOpen(false);
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {role === item.role && <Check size={17} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Topbar({
  role,
  onRole,
  unread,
  onNotifications,
}: {
  role: Role;
  onRole: (role: Role) => void;
  unread: number;
  onNotifications: () => void;
}) {
  const [roleOpen, setRoleOpen] = useState(false);
  return (
    <header className="topbar">
      <Logo />
      <div className="topbar-actions">
        <RoleSwitcher role={role} onRole={onRole} open={roleOpen} setOpen={setRoleOpen} />
        <button
          type="button"
          className="icon-button bell-button"
          onClick={onNotifications}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unread > 0 && <span>{unread}</span>}
        </button>
        <div className="profile-chip">
          <Avatar name={role === "Parent" ? "Amina Yusuf" : "Karrygo Team"} size="sm" />
          <span>{role === "Parent" ? "Amina" : "Demo"}</span>
        </div>
      </div>
    </header>
  );
}

function ParentApp({
  view,
  setView,
  modal,
  setModal,
  bookingSubmitted,
  mealOrdered,
}: {
  view: ParentView;
  setView: (view: ParentView) => void;
  modal: Modal;
  setModal: (modal: Modal) => void;
  bookingSubmitted: boolean;
  mealOrdered: boolean;
}) {
  const content = {
    Home: (
      <ParentHome
        setView={setView}
        setModal={setModal}
        bookingSubmitted={bookingSubmitted}
        mealOrdered={mealOrdered}
      />
    ),
    Children: <ChildrenPage />,
    Transport: <TransportPage setModal={setModal} bookingSubmitted={bookingSubmitted} />,
    Meals: <MealsPage setModal={setModal} mealOrdered={mealOrdered} />,
    Account: <AccountPage />,
  }[view];

  const nav: { label: ParentView; icon: LucideIcon }[] = [
    { label: "Home", icon: Home },
    { label: "Children", icon: UsersRound },
    { label: "Transport", icon: Bus },
    { label: "Meals", icon: Utensils },
    { label: "Account", icon: UserRound },
  ];

  return (
    <>
      <main className="parent-shell">{content}</main>
      <nav className="bottom-nav" aria-label="Parent navigation">
        {nav.map((item) => (
          <button
            type="button"
            key={item.label}
            className={view === item.label ? "active" : ""}
            onClick={() => setView(item.label)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

function ParentHome({
  setView,
  setModal,
  bookingSubmitted,
  mealOrdered,
}: {
  setView: (view: ParentView) => void;
  setModal: (modal: Modal) => void;
  bookingSubmitted: boolean;
  mealOrdered: boolean;
}) {
  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">Wednesday, 18 June</p>
          <Heading sub="Here’s what’s happening with your children today.">
            Good morning, Amina
          </Heading>
        </div>
        <Button variant="secondary" icon={MessageCircle}>
          Support
        </Button>
      </section>

      <section className="trip-hero">
        <div className="trip-hero-top">
          <div className="child-name">
            <Avatar name="Maryam Yusuf" />
            <div>
              <span>Maryam’s school trip</span>
              <strong>
                {bookingSubmitted
                  ? "Booking awaiting assignment"
                  : "En route to Greenfield Academy"}
              </strong>
            </div>
          </div>
          <Badge tone={bookingSubmitted ? "amber" : "green"}>
            {bookingSubmitted ? "Pending review" : "On time"}
          </Badge>
        </div>
        <div className="route-line">
          <span className="route-dot done">
            <Check size={12} />
          </span>
          <span className="route-stroke done" />
          <span className="route-dot current">
            <Bus size={12} />
          </span>
          <span className="route-stroke" />
          <span className="route-dot" />
        </div>
        <div className="route-labels">
          <span>
            <strong>Picked up</strong>
            <small>7:12 AM</small>
          </span>
          <span>
            <strong>In transit</strong>
            <small>8 mins away</small>
          </span>
          <span>
            <strong>At school</strong>
            <small>Expected 7:48 AM</small>
          </span>
        </div>
        <div className="trip-driver">
          <div>
            <Avatar name="Musa Abdullahi" size="sm" />
            <p>
              <strong>Musa Abdullahi</strong>
              <span>Toyota Hiace · KAD-123-XY</span>
            </p>
          </div>
          <Button variant="secondary" onClick={() => setModal("trip")}>
            View live trip
          </Button>
        </div>
      </section>

      <section>
        <div className="section-head">
          <Heading level={2}>Quick actions</Heading>
        </div>
        <div className="quick-grid">
          <button type="button" onClick={() => setModal("booking")}>
            <span className="quick-icon navy">
              <Bus size={21} />
            </span>
            <strong>Book transport</strong>
            <small>Arrange a school journey</small>
          </button>
          <button type="button" onClick={() => setView("Meals")}>
            <span className="quick-icon orange">
              <Soup size={21} />
            </span>
            <strong>Order a meal</strong>
            <small>Breakfast and lunch</small>
          </button>
          <button type="button" onClick={() => setView("Children")}>
            <span className="quick-icon blue">
              <Plus size={21} />
            </span>
            <strong>Add a child</strong>
            <small>Create a child profile</small>
          </button>
          <button type="button" onClick={() => setModal("trip")}>
            <span className="quick-icon green">
              <Navigation size={21} />
            </span>
            <strong>Current trip</strong>
            <small>See pickup progress</small>
          </button>
        </div>
      </section>

      <section className="two-columns">
        <div>
          <div className="section-head">
            <Heading level={2}>Coming up</Heading>
            <button type="button" className="text-button" onClick={() => setView("Transport")}>
              View all
            </button>
          </div>
          <div className="card schedule-card">
            <span className="date-tile">
              <strong>19</strong>
              <small>JUN</small>
            </span>
            <div className="grow">
              <strong>Morning school transport</strong>
              <p>Maryam · Home to Greenfield Academy</p>
              <span>
                <Clock3 size={14} /> Pickup from 7:05 AM
              </span>
            </div>
            <Badge tone="blue">Scheduled</Badge>
          </div>
        </div>
        <div>
          <div className="section-head">
            <Heading level={2}>Next meal</Heading>
            <button type="button" className="text-button" onClick={() => setView("Meals")}>
              Meals
            </button>
          </div>
          <div className="card meal-mini">
            <img src={mealImage} alt="Rice and chicken meal" />
            <div>
              <strong>{mealOrdered ? "Rice & grilled chicken" : "No meal ordered yet"}</strong>
              <p>
                {mealOrdered ? "Maryam · Lunch · Thu 19 Jun" : "Choose from approved school meals"}
              </p>
              <span>
                {mealOrdered
                  ? "FreshBite Kitchen · Preparing"
                  : "Dietary details checked at checkout"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="safety-note">
        <ShieldCheck size={21} />
        <div>
          <strong>Pickup and handover are recorded separately</strong>
          <p>Live vehicle location never replaces child-specific safety confirmation.</p>
        </div>
      </section>
    </div>
  );
}

function ChildrenPage() {
  return (
    <div className="page-stack">
      <section className="title-actions">
        <Heading sub="Manage only the information needed to keep each child safe.">
          Your children
        </Heading>
        <Button icon={Plus}>Add a child</Button>
      </section>
      <div className="children-grid">
        {[
          {
            name: "Maryam Yusuf",
            className: "Primary 4",
            services: "Transport + Meals",
            tone: "green" as const,
          },
          {
            name: "Ibrahim Yusuf",
            className: "Primary 1",
            services: "Meals only",
            tone: "blue" as const,
          },
        ].map((child) => (
          <article className="card child-card" key={child.name}>
            <div className="child-card-head">
              <Avatar name={child.name} size="lg" />
              <Badge tone={child.tone}>Profile complete</Badge>
            </div>
            <Heading level={2} sub={`${child.className} · Greenfield Academy`}>
              {child.name}
            </Heading>
            <div className="info-list">
              <span>
                <ShieldCheck size={17} /> 2 authorised collectors
              </span>
              <span>
                <Phone size={17} /> Emergency contact verified
              </span>
              <span>
                <Soup size={17} /> No known food allergies
              </span>
            </div>
            <div className="card-footer">
              <Badge tone="gray">{child.services}</Badge>
              <Button variant="ghost">View profile</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TransportPage({
  setModal,
  bookingSubmitted,
}: {
  setModal: (modal: Modal) => void;
  bookingSubmitted: boolean;
}) {
  return (
    <div className="page-stack">
      <section className="title-actions">
        <Heading sub="Reliable, approved journeys between home and school.">Transport</Heading>
        <Button icon={Plus} onClick={() => setModal("booking")}>
          Book transport
        </Button>
      </section>
      {bookingSubmitted && (
        <div className="alert success">
          <CheckCircle2 size={20} />
          <div>
            <strong>Booking submitted</strong>
            <p>Operations is reviewing route KG-KD-024. We’ll notify you after assignment.</p>
          </div>
        </div>
      )}
      <div className="card active-booking">
        <div className="section-head">
          <div>
            <p className="eyebrow">ACTIVE PLAN · KG-1028</p>
            <Heading level={2} sub="Weekdays · Morning and afternoon">
              Maryam’s shared transport
            </Heading>
          </div>
          <Badge tone="green">Active</Badge>
        </div>
        <div className="transport-route">
          <MapPin size={19} />
          <div>
            <strong>Home</strong>
            <span>Ungwan Rimi, Kaduna</span>
          </div>
          <ArrowRight size={18} />
          <div>
            <strong>Greenfield Academy</strong>
            <span>Ali Akilu Road, Kaduna</span>
          </div>
        </div>
        <div className="split-details">
          <span>
            <small>Next pickup</small>
            <strong>Tomorrow, 7:05 AM</strong>
          </span>
          <span>
            <small>Vehicle</small>
            <strong>KAD-123-XY</strong>
          </span>
          <span>
            <small>Billing</small>
            <strong>Monthly · Paid</strong>
          </span>
        </div>
        <Button variant="secondary" onClick={() => setModal("trip")}>
          View trip details
        </Button>
      </div>
      <section>
        <Heading level={2}>Service history</Heading>
        <div className="simple-list">
          {["18 June · Morning trip", "17 June · Afternoon trip", "17 June · Morning trip"].map(
            (item, index) => (
              <div className="list-row" key={item}>
                <span className="status-check">
                  <Check size={15} />
                </span>
                <div className="grow">
                  <strong>{item}</strong>
                  <p>Greenfield Academy · Musa Abdullahi</p>
                </div>
                <Badge tone="green">{index === 0 ? "In progress" : "Completed"}</Badge>
                <ChevronRight size={18} />
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

function MealsPage({
  setModal,
  mealOrdered,
}: {
  setModal: (modal: Modal) => void;
  mealOrdered: boolean;
}) {
  return (
    <div className="page-stack">
      <section className="title-actions">
        <Heading sub="Approved meals delivered to Greenfield Academy.">Meals for Maryam</Heading>
        <div className="filter-pills">
          <button type="button" className="active">
            All meals
          </button>
          <button type="button">Breakfast</button>
          <button type="button">Lunch</button>
        </div>
      </section>
      <div className="allergy-banner">
        <ShieldCheck size={20} />
        <div>
          <strong>Dietary profile checked</strong>
          <p>No known allergies. Always review ingredients before ordering.</p>
        </div>
        <Button variant="ghost">Edit</Button>
      </div>
      {mealOrdered && (
        <div className="alert success">
          <CheckCircle2 size={20} />
          <div>
            <strong>Your order is confirmed</strong>
            <p>FreshBite Kitchen has started preparing Maryam’s lunch for Thursday.</p>
          </div>
        </div>
      )}
      <div className="meal-grid">
        <article className="meal-card">
          <div className="meal-image">
            <img src={mealImage} alt="Rice and grilled chicken" />
            <Badge tone="green">Available</Badge>
          </div>
          <div className="meal-content">
            <p className="eyebrow">LUNCH · FRESHBITE KITCHEN</p>
            <Heading level={2} sub="Jollof rice, grilled chicken and fresh vegetables">
              Rice & grilled chicken
            </Heading>
            <div className="meal-tags">
              <Badge tone="gray">No peanuts listed</Badge>
              <Badge tone="gray">Halal</Badge>
            </div>
            <div className="price-row">
              <strong>₦2,800</strong>
              <Button onClick={() => setModal("meal")}>Choose meal</Button>
            </div>
          </div>
        </article>
        <article className="meal-card">
          <div className="meal-image">
            <img src={secondMealImage} alt="Beans and plantain meal" />
            <Badge tone="green">Available</Badge>
          </div>
          <div className="meal-content">
            <p className="eyebrow">LUNCH · FRESHBITE KITCHEN</p>
            <Heading level={2} sub="Slow-cooked beans with ripe plantain and vegetables">
              Beans & plantain
            </Heading>
            <div className="meal-tags">
              <Badge tone="gray">Vegetarian</Badge>
              <Badge tone="gray">Dairy-free</Badge>
            </div>
            <div className="price-row">
              <strong>₦2,400</strong>
              <Button variant="secondary">View meal</Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function AccountPage() {
  const rows = [
    { icon: UserRound, label: "Personal information", detail: "Amina Yusuf" },
    { icon: MapPin, label: "Addresses", detail: "1 saved address" },
    { icon: ShieldCheck, label: "Authorised collectors", detail: "2 people" },
    { icon: CreditCard, label: "Payments and receipts", detail: "Visa ending 4092" },
    { icon: Bell, label: "Notification preferences", detail: "SMS and push enabled" },
    { icon: LifeBuoy, label: "Help and support", detail: "We usually reply in 5 minutes" },
  ];
  return (
    <div className="page-stack">
      <Heading sub="Manage your family, privacy, and service preferences.">Account</Heading>
      <div className="profile-card">
        <Avatar name="Amina Yusuf" size="lg" />
        <div>
          <Heading level={2} sub="+234 803 555 0147">
            Amina Yusuf
          </Heading>
          <Badge tone="green">Contact verified</Badge>
        </div>
        <Button variant="secondary">Edit profile</Button>
      </div>
      <div className="simple-list">
        {rows.map((row) => (
          <button type="button" className="list-row clickable" key={row.label}>
            <span className="icon-box">
              <row.icon size={19} />
            </span>
            <div className="grow">
              <strong>{row.label}</strong>
              <p>{row.detail}</p>
            </div>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}

const adminNav = [
  { label: "Dashboard", icon: Home },
  { label: "Transport", icon: Bus },
  { label: "Routes & trips", icon: Navigation },
  { label: "Parents & children", icon: UsersRound },
  { label: "Schools", icon: Building2 },
  { label: "Drivers & vehicles", icon: Truck },
  { label: "Meal operations", icon: Utensils },
  { label: "Partners", icon: Store },
  { label: "Payments", icon: CreditCard },
  { label: "Incidents & support", icon: AlertTriangle },
  { label: "Reports", icon: FileCheck2 },
];

function OperationsDashboard({
  bookingSubmitted,
  mealOrdered,
}: {
  bookingSubmitted: boolean;
  mealOrdered: boolean;
}) {
  const [active, setActive] = useState("Dashboard");
  const [assigned, setAssigned] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className="portal-layout">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button type="button" onClick={() => setMobileNav(false)}>
            <X size={20} />
          </button>
        </div>
        <p className="sidebar-label">OPERATIONS</p>
        <nav>
          {adminNav.map((item) => (
            <button
              type="button"
              className={active === item.label ? "active" : ""}
              onClick={() => setActive(item.label)}
              key={item.label}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.label === "Incidents & support" && <Badge tone="red">3</Badge>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button type="button">
            <Settings size={18} /> Settings
          </button>
          <div>
            <Avatar name="Hauwa Bello" size="sm" />
            <span>
              <strong>Hauwa Bello</strong>
              <small>Operations manager</small>
            </span>
          </div>
        </div>
      </aside>
      <main className="portal-main">
        <div className="mobile-portal-head">
          <button type="button" className="icon-button" onClick={() => setMobileNav(true)}>
            <Menu size={21} />
          </button>
          <Logo />
        </div>
        {active !== "Dashboard" ? (
          <EmptyState
            icon={adminNav.find((item) => item.label === active)?.icon ?? Settings}
            title={`${active} workspace`}
            body="This focused workspace uses the same shared records shown on the operations dashboard."
            action={
              <Button variant="secondary" onClick={() => setActive("Dashboard")}>
                Back to today’s operations
              </Button>
            }
          />
        ) : (
          <div className="page-stack">
            <section className="welcome-row">
              <Heading sub="Live service overview for Wednesday, 18 June.">
                Today’s operations
              </Heading>
              <div className="header-actions">
                <Button variant="secondary" icon={FileCheck2}>
                  Export report
                </Button>
                <Button icon={Plus}>Create trip</Button>
              </div>
            </section>
            <div className="stats-grid">
              <Stat icon={Bus} value="24" label="Trips scheduled today" tone="navy" />
              <Stat icon={Navigation} value="6" label="Trips in progress" tone="blue" />
              <Stat
                icon={Utensils}
                value={mealOrdered ? "58" : "57"}
                label="Meal orders today"
                tone="orange"
              />
              <Stat icon={AlertTriangle} value="3" label="Open incidents" tone="red" />
            </div>
            <div className="ops-grid">
              <section className="card operations-map">
                <div className="section-head">
                  <div>
                    <Heading level={2}>Live transport</Heading>
                    <p>6 active vehicles across Kaduna</p>
                  </div>
                  <Badge tone="green">Live</Badge>
                </div>
                <div className="map-canvas">
                  <div className="road road-a" />
                  <div className="road road-b" />
                  <div className="road road-c" />
                  <span className="map-label school-label">Greenfield Academy</span>
                  <span className="map-pin pin-a">
                    <Bus size={16} />
                  </span>
                  <span className="map-pin pin-b">
                    <Bus size={16} />
                  </span>
                  <span className="map-pin pin-c warning">
                    <TriangleAlert size={16} />
                  </span>
                  <div className="map-legend">
                    <span>
                      <i className="dot green" />
                      On time
                    </span>
                    <span>
                      <i className="dot amber" />
                      Delayed
                    </span>
                  </div>
                </div>
              </section>
              <section className="card attention-card">
                <div className="section-head">
                  <Heading level={2}>Needs attention</Heading>
                  <Badge tone="red">5 items</Badge>
                </div>
                <div className="attention-list">
                  <button type="button">
                    <span className="icon-box red">
                      <AlertTriangle size={18} />
                    </span>
                    <span>
                      <strong>Vehicle KAD-442-JK delayed</strong>
                      <small>Route KD-08 · 18 mins late</small>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                  <button type="button">
                    <span className="icon-box amber">
                      <ShieldCheck size={18} />
                    </span>
                    <span>
                      <strong>2 driver verifications</strong>
                      <small>Awaiting review since yesterday</small>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                  <button type="button">
                    <span className="icon-box blue">
                      <CreditCard size={18} />
                    </span>
                    <span>
                      <strong>Failed parent payment</strong>
                      <small>KG-PAY-1182 · ₦38,000</small>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </section>
            </div>
            <section>
              <div className="section-head">
                <div>
                  <Heading level={2}>Transport assignments</Heading>
                  <p>Bookings that need an approved vehicle and driver.</p>
                </div>
                <div className="search-box">
                  <Search size={17} />
                  <input placeholder="Search booking" />
                </div>
              </div>
              <div className="data-table">
                <div className="table-head">
                  <span>Booking</span>
                  <span>Route</span>
                  <span>Schedule</span>
                  <span>Assignment</span>
                  <span>Status</span>
                  <span />
                </div>
                <div className="table-row">
                  <span>
                    <strong>Maryam Yusuf</strong>
                    <small>KG-1028 · Greenfield Academy</small>
                  </span>
                  <span>
                    <strong>Ungwan Rimi → School</strong>
                    <small>5.8 km · Shared</small>
                  </span>
                  <span>
                    <strong>Weekdays</strong>
                    <small>Pickup 7:05 AM</small>
                  </span>
                  <span>
                    <strong>{assigned ? "Musa · KAD-123-XY" : "Not assigned"}</strong>
                    <small>{assigned ? "9 of 14 seats used" : "Capacity check required"}</small>
                  </span>
                  <span>
                    <Badge tone={assigned ? "green" : "amber"}>
                      {assigned ? "Assigned" : "Needs assignment"}
                    </Badge>
                  </span>
                  <span>
                    <Button
                      variant={assigned ? "ghost" : "secondary"}
                      onClick={() => setAssigned(true)}
                    >
                      {assigned ? "Review" : "Assign"}
                    </Button>
                  </span>
                </div>
                {bookingSubmitted && (
                  <div className="table-row">
                    <span>
                      <strong>Ibrahim Yusuf</strong>
                      <small>KG-1091 · Greenfield Academy</small>
                    </span>
                    <span>
                      <strong>Malali → School</strong>
                      <small>7.1 km · Shared</small>
                    </span>
                    <span>
                      <strong>Weekdays</strong>
                      <small>Pickup 6:55 AM</small>
                    </span>
                    <span>
                      <strong>Not assigned</strong>
                      <small>New parent booking</small>
                    </span>
                    <span>
                      <Badge tone="amber">New</Badge>
                    </span>
                    <span>
                      <Button variant="secondary">Assign</Button>
                    </span>
                  </div>
                )}
              </div>
            </section>
            <section className="ops-lower">
              <div className="card">
                <div className="section-head">
                  <Heading level={2}>School capacity review</Heading>
                  <Button variant="ghost">View all</Button>
                </div>
                <div className="capacity-row">
                  <span className="icon-box navy">
                    <Bus size={19} />
                  </span>
                  <div className="grow">
                    <strong>Greenfield Academy · Bus GF-02</strong>
                    <p>Route: Kaduna North · Weekdays</p>
                  </div>
                  <div className="capacity-meter">
                    <span>
                      <i style={{ width: "73%" }} />
                    </span>
                    <small>22 of 30 seats occupied</small>
                  </div>
                  <Badge tone="amber">Review 8 seats</Badge>
                </div>
              </div>
              <div className="card">
                <div className="section-head">
                  <Heading level={2}>Recent incidents</Heading>
                  <Button variant="ghost">Open queue</Button>
                </div>
                <div className="incident-row">
                  <Badge tone="red">HIGH</Badge>
                  <div>
                    <strong>KG-INC-204 · Parent unavailable</strong>
                    <p>Route KD-06 · Reported by Musa Abdullahi</p>
                  </div>
                  <Badge tone="amber">Under review</Badge>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function DriverApp() {
  const [tripStarted, setTripStarted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const passengers = ["Maryam Yusuf", "Fatima Bello", "David Okafor"];
  return (
    <main className="driver-shell">
      <section className="driver-greeting">
        <div>
          <p className="eyebrow">WEDNESDAY, 18 JUNE</p>
          <Heading sub="Your next trip is ready to review.">Good morning, Musa</Heading>
        </div>
        <Badge tone="green">
          <ShieldCheck size={14} /> Approved driver
        </Badge>
      </section>
      <div className="driver-alert">
        <AlertTriangle size={19} />
        <span>
          <strong>Only use Karrygo while safely stopped.</strong> Never update a trip while driving.
        </span>
      </div>
      <section className="driver-trip">
        <div className="driver-trip-head">
          <span className="icon-box navy">
            <Bus size={23} />
          </span>
          <div className="grow">
            <p className="eyebrow">NEXT TRIP · KD-04</p>
            <Heading level={2} sub="Pickup begins in 24 minutes">
              Morning school route
            </Heading>
          </div>
          <Badge tone={tripStarted ? "green" : "blue"}>
            {tripStarted ? "In progress" : "Ready"}
          </Badge>
        </div>
        <div className="driver-route">
          <div>
            <span className="route-index">1</span>
            <p>
              <strong>Ungwan Rimi pickup zone</strong>
              <small>First pickup · 7:05 AM</small>
            </p>
          </div>
          <div>
            <span className="route-index">2</span>
            <p>
              <strong>Greenfield Academy</strong>
              <small>Expected arrival · 7:48 AM</small>
            </p>
          </div>
        </div>
        <div className="driver-trip-meta">
          <span>
            <UsersRound size={18} />
            <strong>9 children</strong>
          </span>
          <span>
            <Truck size={18} />
            <strong>KAD-123-XY</strong>
          </span>
          <span>
            <Clock3 size={18} />
            <strong>43 mins</strong>
          </span>
        </div>
        <Button className="button-large" icon={Navigation} onClick={() => setTripStarted(true)}>
          {tripStarted ? "Trip in progress" : "Start trip"}
        </Button>
      </section>
      <section>
        <div className="section-head">
          <Heading level={2}>Passenger manifest</Heading>
          <Badge tone="gray">{picked.length}/9 picked up</Badge>
        </div>
        <div className="manifest-list">
          {passengers.map((passenger, index) => {
            const isPicked = picked.includes(passenger);
            return (
              <div className="manifest-card" key={passenger}>
                <Avatar name={passenger} />
                <div className="grow">
                  <strong>{passenger}</strong>
                  <p>
                    {index === 0 ? "5 Independence Way" : `Pickup point ${index + 1}`} · Stop{" "}
                    {index + 1}
                  </p>
                </div>
                {isPicked ? (
                  <Badge tone="green">
                    <Check size={13} /> Picked up
                  </Badge>
                ) : (
                  <Button
                    variant="secondary"
                    disabled={!tripStarted}
                    onClick={() => setPicked([...picked, passenger])}
                  >
                    Mark picked up
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <Button variant="danger" icon={Phone} className="emergency-button">
        Report an emergency
      </Button>
    </main>
  );
}

function SchoolPortal() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PortalFrame
      title="Greenfield Academy"
      subtitle="School coordination portal"
      nav={["Overview", "Students", "Transport", "Meal coordination", "Incidents"]}
    >
      <section className="welcome-row">
        <Heading sub="Transport, capacity, and meal activity for today.">School overview</Heading>
        <Button icon={Plus}>Register vehicle</Button>
      </section>
      <div className="stats-grid">
        <Stat icon={UsersRound} value="86" label="Participating students" />
        <Stat icon={Bus} value="5" label="Vehicles arriving today" />
        <Stat icon={Utensils} value="42" label="Meals expected" />
        <Stat icon={AlertTriangle} value="1" label="Open incident" />
      </div>
      <div className="portal-two">
        <section className="card">
          <div className="section-head">
            <Heading level={2}>Vehicle arrivals</Heading>
            <Badge tone="green">Live</Badge>
          </div>
          <div className="simple-list compact">
            <div className="list-row">
              <span className="icon-box navy">
                <Bus size={18} />
              </span>
              <div className="grow">
                <strong>KAD-123-XY · Musa Abdullahi</strong>
                <p>9 students · Expected 7:48 AM</p>
              </div>
              <Badge tone="green">8 mins away</Badge>
            </div>
            <div className="list-row">
              <span className="icon-box">
                <Bus size={18} />
              </span>
              <div className="grow">
                <strong>KAD-550-ZA · Yakubu Sani</strong>
                <p>12 students · Expected 7:55 AM</p>
              </div>
              <Badge tone="blue">On route</Badge>
            </div>
          </div>
        </section>
        <section className="card capacity-card">
          <div className="section-head">
            <Heading level={2}>Declare spare bus capacity</Heading>
            <Badge tone={submitted ? "green" : "gray"}>{submitted ? "Submitted" : "Draft"}</Badge>
          </div>
          <p>Capacity is reviewed by Karrygo. Empty seats are never assigned automatically.</p>
          <div className="form-grid">
            <Field label="Vehicle" value="Bus GF-02 · KAD-907-GF" />
            <Field label="Approved legal capacity" value="30" />
            <Field label="Existing passengers" value="22" />
            <Field label="Available seats" value="8" />
          </div>
          <div className="alert warning">
            <TriangleAlert size={19} />
            <p>
              Route, school approval, insurance, driver, and parent consent will be checked before
              assignment.
            </p>
          </div>
          <Button onClick={() => setSubmitted(true)} disabled={submitted}>
            {submitted ? "Submitted for review" : "Submit 8 seats for review"}
          </Button>
        </section>
      </div>
    </PortalFrame>
  );
}

function VendorPortal({ mealOrdered }: { mealOrdered: boolean }) {
  const [status, setStatus] = useState<"New" | "Accepted" | "Preparing" | "Ready">("New");
  const nextStatus = {
    New: "Accepted",
    Accepted: "Preparing",
    Preparing: "Ready",
    Ready: "Ready",
  } as const;
  const nextLabel = {
    New: "Accept order",
    Accepted: "Start preparation",
    Preparing: "Mark ready",
    Ready: "Ready for collection",
  };
  return (
    <PortalFrame
      title="FreshBite Kitchen"
      subtitle="Food vendor portal"
      nav={["Overview", "Orders", "Menu", "Availability", "Earnings"]}
    >
      <section className="welcome-row">
        <Heading sub="Prioritise orders that need action now.">Good morning, FreshBite</Heading>
        <Button icon={Plus}>Add meal</Button>
      </section>
      <div className="stats-grid">
        <Stat icon={Bell} value={mealOrdered ? "9" : "8"} label="New orders" tone="orange" />
        <Stat icon={Soup} value="14" label="Preparing" />
        <Stat icon={CheckCircle2} value="7" label="Ready" />
        <Stat icon={WalletCards} value="₦146k" label="Today’s gross orders" />
      </div>
      <section className="card order-focus">
        <div className="section-head">
          <div>
            <p className="eyebrow">ORDER KG-M-2084 · DELIVER BY 11:45 AM</p>
            <Heading level={2}>Rice & grilled chicken</Heading>
          </div>
          <Badge tone={status === "Ready" ? "green" : status === "New" ? "amber" : "blue"}>
            {status}
          </Badge>
        </div>
        <div className="order-layout">
          <img src={mealImage} alt="Rice and grilled chicken" />
          <div className="order-details">
            <span>
              <small>School</small>
              <strong>Greenfield Academy</strong>
            </span>
            <span>
              <small>Student reference</small>
              <strong>Maryam Y. · Primary 4</strong>
            </span>
            <span>
              <small>Quantity</small>
              <strong>1 lunch</strong>
            </span>
            <span>
              <small>Payment</small>
              <strong>Successful</strong>
            </span>
          </div>
          <div className="allergy-card">
            <ShieldCheck size={20} />
            <div>
              <strong>Dietary profile reviewed</strong>
              <p>No known allergies. No substitutions without parent approval.</p>
            </div>
          </div>
        </div>
        <div className="order-actions">
          <Button variant="secondary">Report an issue</Button>
          <Button disabled={status === "Ready"} onClick={() => setStatus(nextStatus[status])}>
            {nextLabel[status]}
          </Button>
        </div>
      </section>
    </PortalFrame>
  );
}

function FleetPortal() {
  const [accepted, setAccepted] = useState(false);
  return (
    <PortalFrame
      title="NorthStar Transport"
      subtitle="Fleet partner portal"
      nav={["Overview", "Assignments", "Vehicles", "Drivers", "Settlements"]}
    >
      <section className="welcome-row">
        <Heading sub="Keep your approved vehicles, drivers, and assignments moving.">
          Fleet overview
        </Heading>
        <Button icon={Plus}>Register vehicle</Button>
      </section>
      <div className="stats-grid">
        <Stat icon={Truck} value="8" label="Approved vehicles" />
        <Stat icon={UserRound} value="11" label="Approved drivers" />
        <Stat icon={Navigation} value="5" label="Assigned trips" />
        <Stat icon={WalletCards} value="₦284k" label="Pending settlement" />
      </div>
      <section className="card assignment-card">
        <div className="section-head">
          <div>
            <p className="eyebrow">PROPOSED ASSIGNMENT · KD-04</p>
            <Heading level={2} sub="Weekdays · 7:05 AM pickup">
              Ungwan Rimi to Greenfield Academy
            </Heading>
          </div>
          <Badge tone={accepted ? "green" : "amber"}>
            {accepted ? "Accepted" : "Response needed"}
          </Badge>
        </div>
        <div className="assignment-grid">
          <span>
            <MapPin size={18} />
            <small>Route</small>
            <strong>5.8 km · 43 mins</strong>
          </span>
          <span>
            <UsersRound size={18} />
            <small>Passengers</small>
            <strong>9 children</strong>
          </span>
          <span>
            <CalendarDays size={18} />
            <small>Start date</small>
            <strong>19 June</strong>
          </span>
        </div>
        <div className="form-grid">
          <SelectField label="Approved vehicle" value="hiace">
            <option value="hiace">Toyota Hiace · KAD-123-XY · 14 seats</option>
          </SelectField>
          <SelectField label="Approved driver" value="musa">
            <option value="musa">Musa Abdullahi · Available</option>
          </SelectField>
        </div>
        <div className="capacity-confirm">
          <CheckCircle2 size={20} />
          <span>
            <strong>Capacity check passed</strong> · 9 passengers assigned to 14 approved seats.
          </span>
        </div>
        <div className="order-actions">
          <Button variant="secondary">Decline</Button>
          <Button disabled={accepted} onClick={() => setAccepted(true)}>
            {accepted ? "Assignment accepted" : "Accept assignment"}
          </Button>
        </div>
      </section>
    </PortalFrame>
  );
}

function PortalFrame({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle: string;
  nav: string[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(nav[0]);
  return (
    <div className="partner-shell">
      <aside className="partner-sidebar">
        <Logo />
        <div className="org-card">
          <Avatar name={title} />
          <span>
            <strong>{title}</strong>
            <small>{subtitle}</small>
          </span>
        </div>
        <nav>
          {nav.map((item, index) => (
            <button
              type="button"
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
              key={item}
            >
              {[Home, Bell, Truck, UsersRound, WalletCards][index] &&
                (() => {
                  const Icon = [Home, Bell, Truck, UsersRound, WalletCards][index];
                  return <Icon size={18} />;
                })()}
              <span>{item}</span>
            </button>
          ))}
        </nav>
        <button type="button" className="support-link">
          <LifeBuoy size={18} /> Contact Karrygo support
        </button>
      </aside>
      <main className="partner-main">
        {active === nav[0] ? (
          children
        ) : (
          <EmptyState
            icon={Settings}
            title={active}
            body={`The ${active.toLowerCase()} workspace is connected to the same live service records.`}
            action={
              <Button variant="secondary" onClick={() => setActive(nav[0])}>
                Return to overview
              </Button>
            }
          />
        )}
      </main>
    </div>
  );
}

function BookingModal({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [option, setOption] = useState("shared");
  return (
    <ModalShell onClose={onClose}>
      <div className="modal-progress">
        <span>Book school transport</span>
        <strong>Step {step} of 3</strong>
      </div>
      <div className="progress-track">
        <i style={{ width: `${(step / 3) * 100}%` }} />
      </div>
      {step === 1 && (
        <div className="modal-body">
          <Heading level={2} sub="We’ll only show approved options available for this route.">
            Who is travelling?
          </Heading>
          <SelectField label="Child" value="maryam">
            <option value="maryam">Maryam Yusuf · Primary 4</option>
            <option value="ibrahim">Ibrahim Yusuf · Primary 1</option>
          </SelectField>
          <Field label="Pickup address" value="5 Independence Way, Ungwan Rimi" />
          <Field label="School" value="Greenfield Academy, Kaduna" />
          <div className="form-grid">
            <SelectField label="Service" value="return">
              <option value="return">Morning and afternoon</option>
            </SelectField>
            <SelectField label="Schedule" value="weekdays">
              <option value="weekdays">Weekdays during term</option>
            </SelectField>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="modal-body">
          <Heading level={2} sub="These options match Maryam’s route and school schedule.">
            Choose a transport option
          </Heading>
          <button
            type="button"
            className={`option-card ${option === "shared" ? "selected" : ""}`}
            onClick={() => setOption("shared")}
          >
            <span className="radio-dot" />
            <span className="icon-box navy">
              <UsersRound size={20} />
            </span>
            <span className="grow">
              <strong>Shared transport</strong>
              <small>Approved shared route · Up to 12 children</small>
            </span>
            <span>
              <strong>Price shown at review</strong>
              <small>Monthly billing</small>
            </span>
          </button>
          <button
            type="button"
            className={`option-card ${option === "school" ? "selected" : ""}`}
            onClick={() => setOption("school")}
          >
            <span className="radio-dot" />
            <span className="icon-box orange">
              <Bus size={20} />
            </span>
            <span className="grow">
              <strong>School bus seat</strong>
              <small>Pending school and route approval</small>
            </span>
            <Badge tone="amber">Limited</Badge>
          </button>
          <div className="safety-note">
            <ShieldCheck size={20} />
            <p>
              Every confirmed assignment requires an approved driver, approved vehicle, available
              legal capacity, and a compatible schedule.
            </p>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="modal-body">
          <Heading level={2} sub="Review the service details before submitting.">
            Booking summary
          </Heading>
          <div className="review-list">
            <span>
              <small>Child</small>
              <strong>Maryam Yusuf</strong>
            </span>
            <span>
              <small>School</small>
              <strong>Greenfield Academy</strong>
            </span>
            <span>
              <small>Service</small>
              <strong>{option === "shared" ? "Shared transport" : "School bus seat"}</strong>
            </span>
            <span>
              <small>Schedule</small>
              <strong>Weekdays · Return</strong>
            </span>
            <span className="full">
              <small>Route</small>
              <strong>Ungwan Rimi ↔ Greenfield Academy</strong>
            </span>
          </div>
          <div className="price-summary">
            <span>
              <strong>Pricing</strong>
              <small>Final price will be shown after route and capacity review.</small>
            </span>
            <Badge tone="blue">No charge today</Badge>
          </div>
          <label className="check-row">
            <input type="checkbox" defaultChecked />
            <span>
              I confirm these details and consent to Karrygo reviewing this route for availability.
            </span>
          </label>
        </div>
      )}
      <div className="modal-footer">
        <Button
          variant="ghost"
          onClick={step === 1 ? onClose : () => setStep(step - 1)}
          icon={step === 1 ? X : ArrowLeft}
        >
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <Button onClick={() => (step === 3 ? onComplete() : setStep(step + 1))}>
          {step === 3 ? "Submit booking" : "Continue"}
        </Button>
      </div>
    </ModalShell>
  );
}

function MealModal({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [date, setDate] = useState("2025-06-19");
  return (
    <ModalShell onClose={onClose}>
      <div className="meal-modal-hero">
        <img src={mealImage} alt="Rice and grilled chicken" />
        <button type="button" className="modal-close floating" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="modal-body">
        <p className="eyebrow">FRESHBITE KITCHEN · LUNCH</p>
        <Heading level={2} sub="Jollof rice, grilled chicken and a portion of fresh vegetables.">
          Rice & grilled chicken
        </Heading>
        <div className="meal-tags">
          <Badge tone="gray">Halal</Badge>
          <Badge tone="gray">No peanuts listed</Badge>
        </div>
        <div className="allergy-card">
          <TriangleAlert size={20} />
          <div>
            <strong>Review ingredients carefully</strong>
            <p>
              Chicken, rice, tomatoes, peppers, vegetable oil, spices. Vendor information is not an
              allergy-safety guarantee.
            </p>
          </div>
        </div>
        <Field label="Delivery date" type="date" value={date} onChange={setDate} />
        <div className="review-list">
          <span>
            <small>For</small>
            <strong>Maryam Yusuf</strong>
          </span>
          <span>
            <small>Deliver to</small>
            <strong>Greenfield Academy</strong>
          </span>
        </div>
        <div className="price-summary">
          <span>
            <strong>Total</strong>
            <small>Payment will be simulated for this prototype</small>
          </span>
          <strong>₦2,800</strong>
        </div>
      </div>
      <div className="modal-footer">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onComplete}>Confirm and simulate payment</Button>
      </div>
    </ModalShell>
  );
}

function TripModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} wide>
      <div className="modal-header">
        <div>
          <p className="eyebrow">LIVE TRIP · KD-04</p>
          <Heading level={2} sub="Maryam Yusuf · Morning school journey">
            En route to Greenfield Academy
          </Heading>
        </div>
        <button type="button" className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="trip-map">
        <div className="road road-a" />
        <div className="road road-b" />
        <span className="home-pin">
          <Home size={17} />
        </span>
        <span className="vehicle-pin">
          <Bus size={19} />
        </span>
        <span className="school-pin">
          <Building2 size={17} />
        </span>
        <div className="eta-card">
          <Navigation size={18} />
          <span>
            <strong>8 mins away</strong>
            <small>Expected 7:48 AM</small>
          </span>
        </div>
      </div>
      <div className="modal-body">
        <div className="trip-driver expanded">
          <div>
            <Avatar name="Musa Abdullahi" />
            <p>
              <strong>Musa Abdullahi</strong>
              <span>Approved driver · Toyota Hiace · KAD-123-XY</span>
            </p>
          </div>
          <Button variant="secondary" icon={Phone}>
            Call driver
          </Button>
        </div>
        <div className="timeline">
          <div className="done">
            <span>
              <Check size={13} />
            </span>
            <p>
              <strong>Driver arrived at pickup</strong>
              <small>7:09 AM · GPS event</small>
            </p>
          </div>
          <div className="done">
            <span>
              <Check size={13} />
            </span>
            <p>
              <strong>Maryam picked up</strong>
              <small>7:12 AM · Confirmed by driver</small>
            </p>
          </div>
          <div className="current">
            <span>
              <Bus size={13} />
            </span>
            <p>
              <strong>En route to school</strong>
              <small>Live vehicle position available</small>
            </p>
          </div>
          <div>
            <span />
            <p>
              <strong>School arrival and handover</strong>
              <small>Not yet recorded</small>
            </p>
          </div>
        </div>
        <div className="safety-note">
          <ShieldCheck size={20} />
          <p>
            Vehicle location is not proof of boarding or handover. Child-specific events are
            recorded separately above.
          </p>
        </div>
      </div>
    </ModalShell>
  );
}

function NotificationsModal({
  onClose,
  mealOrdered,
  bookingSubmitted,
}: {
  onClose: () => void;
  mealOrdered: boolean;
  bookingSubmitted: boolean;
}) {
  const items = useMemo(() => {
    const base = [
      {
        icon: Bus,
        title: "Maryam was picked up",
        body: "Musa confirmed pickup at 7:12 AM.",
        time: "18 min ago",
        tone: "green",
      },
      {
        icon: Navigation,
        title: "Vehicle approaching school",
        body: "Expected arrival in about 8 minutes.",
        time: "Now",
        tone: "blue",
      },
      {
        icon: CreditCard,
        title: "Payment successful",
        body: "Your June transport receipt is ready.",
        time: "Yesterday",
        tone: "gray",
      },
    ];
    if (mealOrdered)
      base.unshift({
        icon: Soup,
        title: "Meal order accepted",
        body: "FreshBite Kitchen is preparing Maryam’s lunch.",
        time: "Now",
        tone: "orange",
      });
    if (bookingSubmitted)
      base.unshift({
        icon: CheckCircle2,
        title: "Booking submitted",
        body: "Operations is checking route and capacity.",
        time: "Now",
        tone: "blue",
      });
    return base;
  }, [mealOrdered, bookingSubmitted]);
  return (
    <ModalShell onClose={onClose} narrow>
      <div className="modal-header">
        <Heading level={2} sub="Updates from across your Karrygo services.">
          Notifications
        </Heading>
        <button type="button" className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="notification-list">
        {items.map((item) => (
          <div className="notification-item" key={item.title}>
            <span className={`icon-box ${item.tone}`}>
              <item.icon size={18} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              <small>{item.time}</small>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

function ModalShell({
  children,
  onClose,
  wide = false,
  narrow = false,
}: {
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  narrow?: boolean;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={`modal ${wide ? "modal-wide" : ""} ${narrow ? "modal-narrow" : ""}`}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>("Parent");
  const [view, setView] = useState<ParentView>("Home");
  const [modal, setModal] = useState<Modal>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [mealOrdered, setMealOrdered] = useState(false);
  const unread = 2 + (bookingSubmitted ? 1 : 0) + (mealOrdered ? 1 : 0);

  return (
    <div className={`app role-${role.toLowerCase()}`}>
      {role !== "Operations" && (
        <Topbar
          role={role}
          onRole={setRole}
          unread={unread}
          onNotifications={() => setModal("notifications")}
        />
      )}
      {role === "Parent" && (
        <ParentApp
          view={view}
          setView={setView}
          modal={modal}
          setModal={setModal}
          bookingSubmitted={bookingSubmitted}
          mealOrdered={mealOrdered}
        />
      )}
      {role === "Operations" && (
        <OperationsDashboard bookingSubmitted={bookingSubmitted} mealOrdered={mealOrdered} />
      )}
      {role === "Driver" && <DriverApp />}
      {role === "School" && <SchoolPortal />}
      {role === "Vendor" && <VendorPortal mealOrdered={mealOrdered} />}
      {role === "Fleet" && <FleetPortal />}

      {role === "Operations" && (
        <div className="ops-role-switch">
          <RoleSwitcher
            role={role}
            onRole={setRole}
            open={false}
            setOpen={() => setRole("Parent")}
          />
        </div>
      )}

      {modal === "booking" && (
        <BookingModal
          onClose={() => setModal(null)}
          onComplete={() => {
            setBookingSubmitted(true);
            setModal(null);
            setView("Transport");
          }}
        />
      )}
      {modal === "meal" && (
        <MealModal
          onClose={() => setModal(null)}
          onComplete={() => {
            setMealOrdered(true);
            setModal(null);
            setView("Home");
          }}
        />
      )}
      {modal === "trip" && <TripModal onClose={() => setModal(null)} />}
      {modal === "notifications" && (
        <NotificationsModal
          onClose={() => setModal(null)}
          mealOrdered={mealOrdered}
          bookingSubmitted={bookingSubmitted}
        />
      )}
    </div>
  );
}
