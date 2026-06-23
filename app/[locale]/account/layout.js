import { AccountSidebar } from '@/components/AccountSidebar';

export default function AccountLayout({ children }) {
  return (
    <div className="account-layout flex flex-col md:flex-row md:items-start">
      <AccountSidebar />
      <div className="flex-1 min-w-0 px-4 md:px-8 py-6 md:py-8">{children}</div>
    </div>
  );
}
