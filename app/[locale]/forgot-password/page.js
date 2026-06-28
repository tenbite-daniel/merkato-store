'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Icon } from '@/components/Icon';

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate password reset
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">

          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 group mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white font-extrabold text-base">M</div>
              <span className="text-2xl font-extrabold tracking-tight text-primary-deep group-hover:text-primary transition-colors">
                Merkato<span className="text-primary font-black">.</span>
              </span>
            </Link>

            {!submitted ? (
              <>
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent text-primary-deep">
                  <Icon name="lock_reset" className="!text-[28px]" />
                </div>
                <h1 className="text-2xl font-extrabold text-ink">Forgot password?</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  No worries — enter your email and we&apos;ll send you a reset link.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#e6f4ea] text-success">
                  <Icon name="mark_email_read" className="!text-[28px]" />
                </div>
                <h1 className="text-2xl font-extrabold text-ink">Check your email</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  We sent a password reset link to <strong className="text-ink">{email}</strong>
                </p>
              </>
            )}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep transition-colors cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-center text-muted-foreground">
                Didn&apos;t receive the email?{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-semibold text-primary hover:underline cursor-pointer"
                >
                  Try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="!text-[16px]" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
