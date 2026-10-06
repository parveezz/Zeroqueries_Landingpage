"use client";

import React from 'react';
import Link from 'next/link';
import { FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

export default function AdminAuthGate({
    password,
    setPassword,
    showPassword,
    setShowPassword,
    passwordError,
    setPasswordError,
    handleUnlock
}) {
    return (
        <main className="relative min-h-screen w-full bg-gray-50 font-sans text-black py-8 sm:py-16 px-4 sm:px-8 lg:px-14 flex items-center justify-center overflow-hidden">
            {/* Background Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="relative z-10 w-full max-w-[440px]">
                {/* Card */}
                <div className="rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white p-5 xs:p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    {/* Brand header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl lg:text-[26px] font-normal tracking-tight text-black">
                            Admin Access
                        </h1>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-black/60 font-light">
                            Enter password to access ZeroQueries Admin Center
                        </p>
                    </div>

                    {/* Password-Only Form */}
                    <form onSubmit={handleUnlock} className="space-y-3.5 sm:space-y-4">
                        <div>
                            <label
                                htmlFor="admin-password"
                                className="block text-xs font-medium text-black/80 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    autoFocus
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (passwordError) setPasswordError('');
                                    }}
                                    placeholder="••••••••••••"
                                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-black/40 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="w-4 h-4" />
                                    ) : (
                                        <FiEye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error banner */}
                        {passwordError && (
                            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5">
                                <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-red-700 font-normal leading-relaxed">
                                    {passwordError}
                                </p>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full mt-2 h-11 sm:h-12 rounded-xl bg-black px-4 text-sm font-medium text-white hover:bg-gray-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm cursor-pointer"
                        >
                            Unlock Admin Panel
                        </button>
                    </form>

                    {/* Return to Website link */}
                    <div className="mt-5 sm:mt-6 text-center text-xs text-black/60 font-light leading-relaxed">
                        <Link
                            href="/"
                            className="font-medium text-black hover:underline underline-offset-4 inline-flex items-center gap-1"
                        >
                            <span>←</span>
                            <span>Return to Website</span>
                        </Link>
                    </div>
                </div>

                {/* Security badge */}
                <p className="mt-5 sm:mt-6 text-center text-[11px] text-black/40 font-light flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                    <FiLock className="w-3 h-3 text-black/40 shrink-0" />
                    <span>ZeroQueries Enterprise Security</span>
                    <span className="hidden xs:inline">·</span>
                    <span>256-bit SSL Encrypted</span>
                </p>
            </div>
        </main>
    );
}
