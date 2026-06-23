import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { WishlistCount } from '@/components/WishlistCount';

export const metadata = { title: 'My Account — Merkato Store' };

function Stat({ icon, label, value, href }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:shadow-sm transition-shadow">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary-deep">
        <Icon name={icon} />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-lg font-bold text-ink">{value}</div>
      </div>
    </Link>
  );
}

function Card({ title, action, children }) {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="font-bold text-ink">{title}</div>
        {action}
      </div>
      <div className="p-4 grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

export default async function AccountPage({ params }) {
  const { locale } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold text-ink">My Account</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat icon="shopping_bag" label="Orders" value="12" href={`/${locale}/account/orders`} />
        <Stat icon="favorite" label="Wishlist" value={<WishlistCount />} href={`/${locale}/account/wishlist`} />
        <Stat icon="location_on" label="Addresses" value="2" href={`/${locale}/account/addresses`} />
      </div>
      <Card
        title="Personal Information"
        action={<Link href={`/${locale}/account/profile`} className="text-sm font-semibold text-primary">Edit</Link>}
      >
        <Field label="Full Name" value="John Doe" />
        <Field label="Email" value="john.doe@example.com" />
        <Field label="Phone" value="+234 803 555 1234" />
        <Field label="Country" value="Nigeria" />
      </Card>
      <Card
        title="Recent Orders"
        action={<Link href={`/${locale}/account/orders`} className="text-sm font-semibold text-primary">View all</Link>}
      >
        <Field label="Order #MS-10234" value="Delivered · Mar 12" />
        <Field label="Order #MS-10229" value="In Transit · Mar 9" />
      </Card>
    </div>
  );
}
