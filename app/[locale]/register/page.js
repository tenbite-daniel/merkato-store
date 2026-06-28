'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Icon } from '@/components/Icon';

export default function RegisterPage() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [agreed, setAgreed] = useState(false);

  const passwordsMatch = form.confirm === '' || form.password === form.confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
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
            <h1 className="text-2xl font-extrabold text-ink">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join Merkato and start shopping today</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink" htmlFor="name">Full name</label>
              <div className="flex items-center rounded-xl border border-border bg-surface-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all h-11 px-3 gap-2">
                <Icon name="person" className="text-muted-foreground !text-[18px] shrink-0" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

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
              <label className="text-sm font-semibold text-ink" htmlFor="password">Password</label>
              <div className="flex items-center rounded-xl border border-border bg-surface-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all h-11 px-3 gap-2">
                <Icon name="lock" className="text-muted-foreground !text-[18px] shrink-0" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
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

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink" htmlFor="confirm">Confirm password</label>
              <div className={`flex items-center rounded-xl border bg-surface-soft focus-within:ring-2 transition-all h-11 px-3 gap-2 ${
                !passwordsMatch ? 'border-error focus-within:ring-error/15' : 'border-border focus-within:border-primary focus-within:ring-primary/15'
              }`}>
                <Icon name="lock" className="text-muted-foreground !text-[18px] shrink-0" />
                <input
                  id="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <Icon name={showConfirm ? 'visibility_off' : 'visibility'} className="!text-[18px]" />
                </button>
              </div>
              {!passwordsMatch && (
                <p className="text-xs text-error flex items-center gap-1">
                  <Icon name="error" className="!text-[14px]" /> Passwords do not match
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-muted-foreground leading-snug">
                I agree to the{' '}
                <Link href={`/${locale}/terms`} className="text-primary font-semibold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href={`/${locale}/privacy`} className="text-primary font-semibold hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={!passwordsMatch}
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or sign up with</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          {/* Social */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface h-11 text-sm font-semibold text-ink hover:bg-surface-soft transition-colors cursor-pointer">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="h-4 w-4" />
            Google
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href={`/${locale}/login`} className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
