'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Icon } from '@/components/Icon';

export default function LoginPage() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate auth
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">

          {/* Logo / heading */}
          <div className="mb-8 text-center">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 group mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white font-extrabold text-base">M</div>
              <span className="text-2xl font-extrabold tracking-tight text-primary-deep group-hover:text-primary transition-colors">
                Merkato<span className="text-primary font-black">.</span>
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold text-ink">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your Merkato account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink" htmlFor="email">Email address</label>
              <div className="flex items-center rounded-xl border border-border bg-surface-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all h-11 px-3 gap-2">
                <Icon name="mail" className="text-muted-foreground !text-[18px] shrink-0" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink" htmlFor="password">Password</label>
                <Link href={`/${locale}/forgot-password`} className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center rounded-xl border border-border bg-surface-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all h-11 px-3 gap-2">
                <Icon name="lock" className="text-muted-foreground !text-[18px] shrink-0" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="!text-[18px]" />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or sign in with</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          {/* Social */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface h-11 text-sm font-semibold text-ink hover:bg-surface-soft transition-colors cursor-pointer">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="h-4 w-4" />
            Google
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href={`/${locale}/register`} className="font-semibold text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
