# Tabam Store — E-Commerce Admin Dashboard

A full-stack admin dashboard for managing products, categories, and inventory, built for the Frontend Lead technical assessment.

- **Live demo:** https://tabam-assesment-three.vercel.app
- **Repository:** https://github.com/Rengkat/tabam-assesment.git 

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Required by the brief; used for both UI and API via Server Components/Server Actions |
| Database | MongoDB (Atlas) | Chosen for flexibility with evolving product schemas; no prior Prisma experience, so avoided adding a second new tool under time pressure |
| ORM | Mongoose | Familiar from prior Node/Express projects; schema validation at the model layer |
| Auth | NextAuth.js (Credentials provider) + bcrypt | JWT session strategy; no OAuth, since email/password matches the brief and avoids unnecessary third-party config |
| Validation | Zod | Shared schemas between client-side forms (react-hook-form) and server-side Server Actions — one source of truth for validation rules |
| Forms | React Hook Form + @hookform/resolvers | Minimal re-renders, clean integration with Zod |
| Styling | Tailwind CSS | Utility-first, fast iteration, no separate CSS files to maintain |
| Charts | Recharts | Single, well-supported charting library for the one real chart on the dashboard |
| File storage | Vercel Blob | Zero-config public file hosting for product images, no separate account needed when deployed to Vercel |
| Icons | lucide-react | Consistent icon set throughout |
| Notifications | Sonner | Lightweight toast notifications for user feedback on all mutations |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (free tier is sufficient) with your current IP whitelisted under **Network Access**

### 1. Clone and install
```bash
git clone <your-repo-url>
cd tabam-assessment
npm install
```

### 2. Environment variables
Create a `.env.local` file in the project root:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ecommerce-admin
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=<from Vercel dashboard, if using image upload>
```

### 3. Run the dev server
```bash
npm run dev
```
Visit `http://localhost:3000`.

### 4. Create your first account
Since there's no seed script, register your first admin user directly through the UI:
1. Go to `/register` and create an account
2. Log in at `/login`
3. Add at least one category before adding products (products require a category reference)

---

## Project Structure

```
app/
├── (auth)/                  # Login, register — no shared dashboard chrome
│   ├── login/
│   └── register/
├── (dashboard)/              # All authenticated routes, shares layout/sidebar/header
│   ├── _components/         # Sidebar, Header, MobileNav
│   ├── dashboard/            # Overview: stats, stock chart, recent products
│   ├── products/             # List, create, edit — plus actions.ts (Server Actions)
│   ├── categories/           # List, create/edit modal — plus actions.ts
│   └── inventory/            # Stock view + adjustment — plus actions.ts
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/   # NextAuth handler (sign-in, session, callback)
│   │   └── register/         # Custom route — NextAuth only handles sign-in, not sign-up
│   └── upload/                # Image upload to Vercel Blob
├── layout.tsx
└── providers.tsx              # NextAuth SessionProvider wrapper

components/
├── auth/                      # PasswordField and related auth-only pieces
├── dashboard/                  # StatCard, StockByCategoryChart, RecentProductsList
├── products/ | categories/ | inventory/   # Feature-scoped components (forms, tables, filters, badges)
└── shared/                     # EmptyState, PaginationControls, ConfirmDeleteDialog — reused across features

lib/
├── db.ts                       # Mongoose connection singleton (cached across hot-reloads)
├── auth.ts                     # NextAuth configuration
├── session.ts                  # requireSession() helper for Server Actions
├── models/                     # Mongoose schemas: User, Product, Category
├── dashboard/stats.ts           # Aggregation queries for the dashboard
└── utils/                      # slugify, upload-image client helper, etc.

validations/                    # Zod schemas shared by forms and Server Actions
types/                          # Shared TypeScript types per domain
```

---

## Architectural Decisions

### Scope: flat categories, no order management
The brief asks for "products, categories, inventory, and related data" — it does not mention orders, customers, or payments. Early drafts of this project (built from AI-scaffolded starting points) included a full order-management system, multi-level category hierarchies, and warehouse/supplier logistics. All of that was deliberately removed. The reasoning: the assessment explicitly states *"we're more interested in how you build than how many features you implement."* Every feature that made the final cut has a real, working backend behind it — nothing here is a decorative stub.

### Inventory is a view over Products, not a separate entity
An early draft modeled `InventoryItem` as its own collection (with its own `stock`, `reserved`, `available` fields) alongside `Product.stock`. This was rejected during development — two collections tracking overlapping stock numbers is a data-integrity risk, since they can drift out of sync. Inventory is instead a dedicated UI (search, low-stock filter, stock-adjustment modal) built entirely on the existing `Product` model. One source of truth for stock, three views onto it (catalog, categorization, stock management).

### Server Actions for mutations, REST routes only where necessary
Product/Category/Inventory create-update-delete all go through Next.js Server Actions (`actions.ts` files colocated with each route), not a hand-rolled REST API. This was a deliberate choice to demonstrate actual use of Next.js's full-stack capabilities rather than treating it as "Express with extra steps." REST routes are used only where they're genuinely the right tool:
- `/api/auth/[...nextauth]` — required by NextAuth's own conventions
- `/api/auth/register` — NextAuth only handles sign-in, not account creation
- `/api/upload` — file uploads via `FormData` are cleaner as a dedicated HTTP endpoint

### Server Components fetch data directly
Product list, category list, and dashboard pages are Server Components that call Mongoose directly (via Server Action-style data-fetching functions) — no client-side `fetch`, no loading spinners for initial page data. `"use client"` is pushed as far down the tree as possible (e.g., only the chart component and interactive forms need it), not applied at the page level by default.

### Deletion safety
Deleting a category checks for products still assigned to it first and blocks the deletion with a clear error rather than allowing orphaned product references — a small detail, but one that avoids a real data-integrity bug under time pressure.

### Currency
All prices are displayed in Naira (₦) rather than USD, reflecting the actual context this store would operate in.

---

## Known Limitations / Would Improve With More Time
- **No automated tests.** Given the 72-hour window, testing time was prioritized toward getting the full CRUD + auth loop working correctly over unit/integration test coverage.
- **No stock-adjustment audit log.** The inventory page supports add/remove/set stock adjustments with a required reason, but that reason isn't currently persisted anywhere beyond the toast confirmation. A `StockAdjustment` collection (productId, previousStock, newStock, reason, timestamp) would be a natural next addition.
- **Product image uploads are single-image only.** Multi-image galleries were considered out of scope for the time available.
- **No role-based access control.** Any authenticated user has full admin access; there's no distinction between roles.
- **Debounced search.** Product/category search currently triggers a navigation on every keystroke rather than being debounced — functional, but could feel smoother with a short debounce added to the search input.

---

## Accessibility Notes
Built with keyboard-only navigation as a first-class requirement throughout (not an afterthought): every interactive element has a visible focus ring, form errors are announced via `role="alert"` and `aria-describedby`, custom dialogs use `role="dialog"`/`aria-modal`, and the dashboard layout includes a skip-to-content link so keyboard users don't have to tab through the full sidebar on every page load.
