"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import WaitlistModal from "../../components/WaitlistModal";

/* ─── Icon helper ─────────────────────────────────────────── */
function Icon({
  name,
  fill = false,
  className = "",
}: {
  name: string;
  fill?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined select-none leading-none ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0},'wght' 400,'GRAD' 0,'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}

const TAB_OPTIONS = [
  "All Skills",
  "Home Services",
  "Education",
  "Personal Care",
  "Tech Support",
];

const POPULAR_TAGS = [
  "Calculus Tutor",
  "Plumbing",
  "Sushi Chef",
  "Dog Training",
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Skills");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const handlePopularTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div
      className="min-h-screen font-[Manrope,sans-serif] text-brand-primary-dark"
      style={{ backgroundColor: "var(--color-brand-white)" }}
    >
      {/* ══════ NAVBAR ══════════════════════════════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
        style={{ backgroundColor: "var(--color-brand-white)" }}
      >
        <nav className="mx-auto flex h-[64px] max-w-[1140px] items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-brand-primary)" }}
            >
              <Icon name="check" fill className="text-sm text-white" />
            </div>
            <span className="text-[15px] font-bold text-brand-primary">
              LocalSkill
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#skills"
              className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
            >
              Find Skills
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-semibold text-brand-primary hover:opacity-70 transition-opacity"
            >
              Sign In
            </Link>
            <button
              onClick={() => openModal()}
              className="text-sm font-bold text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--color-brand-primary)" }}
            >
              Join as Provider
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-[64px]">
        {/* ══════ HERO SECTION ══════════════════════════════════ */}
        <section
          className="py-16 text-center"
          style={{ backgroundColor: "var(--color-brand-bg-light)" }}
        >
          <div className="mx-auto max-w-[800px] px-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm mb-6">
              <Icon name="verified_user" fill className="text-xs text-brand-primary" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary">
                TRUSTED LOCAL WORKERS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.15] text-brand-primary mb-4">
              Professional local skills,
              <br />
              delivered at home.
            </h1>

            {/* Subheading */}
            <p className="text-[14px] text-slate-600 leading-6 mb-8 max-w-[560px] mx-auto">
              Skip the wait times and high agency fees. Connect directly with
              verified experts in your immediate neighborhood.
            </p>

            {/* Search Bar */}
            <div className="flex items-stretch gap-0 max-w-[560px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-5">
              <label className="flex flex-1 items-center gap-2.5 px-4.5 py-3.5 cursor-text">
                <Icon name="search" className="text-xl text-slate-400 shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What skill do you need today?"
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </label>
              <button
                onClick={() => openModal()}
                className="shrink-0 text-white font-bold text-sm px-7 hover:opacity-90 active:scale-95 transition-all"
                style={{ backgroundColor: "var(--color-brand-primary)" }}
              >
                Find Experts
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-400">
                POPULAR:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handlePopularTagClick(tag)}
                  className="text-brand-primary font-medium hover:underline px-1 py-0.5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ FILTERS & CATEGORIES GRID ════════════════════ */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1140px] px-6">
            {/* Filter Pills Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                {TAB_OPTIONS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                      activeTab === tab
                        ? "text-white border-brand-primary bg-brand-primary"
                        : "text-slate-500 border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 border border-slate-200 bg-white px-4 py-2 rounded-full hover:border-slate-300 active:scale-95"
              >
                <Icon name="filter_list" className="text-base text-slate-500" />
                Filters
              </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured Card (Spans 2 columns) */}
              <div
                className="md:col-span-2 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[340px]"
                style={{ backgroundColor: "var(--color-brand-primary)" }}
              >
                {/* Background decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <div>
                  {/* Top line with Icon & Chip */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Icon name="school" className="text-2xl text-white" />
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      TOP PERFORMING CATEGORY
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                    Academic Tutoring
                  </h2>
                  <p className="text-[14px] text-brand-primary-muted max-w-[480px] leading-6 mb-6">
                    Personalized learning with certified local educators. From
                    K-12 to advanced PhD-level support.
                  </p>
                </div>

                {/* Bottom line: Stats & Button */}
                <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[9px] font-bold text-brand-primary-muted uppercase tracking-wider mb-0.5">
                        TOTAL EXPERTS
                      </p>
                      <p className="text-lg font-extrabold">120+</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-brand-primary-muted uppercase tracking-wider mb-0.5">
                        AVERAGE RATING
                      </p>
                      <p className="text-lg font-extrabold flex items-center gap-1">
                        4.9 <span className="text-amber-400 text-sm">★</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="bg-white text-brand-primary font-bold text-xs px-5 py-3 rounded-xl shadow-md hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    Browse Tutoring
                  </button>
                </div>
              </div>

              {/* Card 2: Gourmet Cooking */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between min-h-[340px] group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg-light flex items-center justify-center mb-6">
                    <Icon name="restaurant" className="text-2xl text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-2">
                    Gourmet Cooking
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-5">
                    Private dining, event catering, and specialized meal prep
                    from local culinary artists.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>85+ Experts</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      ★ 4.8
                    </span>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full text-center py-2.5 text-xs font-bold text-brand-primary border border-brand-primary-light hover:bg-brand-bg-light rounded-xl transition-all"
                  >
                    View Category
                  </button>
                </div>
              </div>

              {/* Card 3: Eco-Cleaning */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between min-h-[340px] group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg-light flex items-center justify-center mb-6">
                    <Icon name="mop" className="text-2xl text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-2">
                    Eco-Cleaning
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-5">
                    Eco-friendly home and office cleaning services using
                    certified non-toxic products.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>150+ Experts</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      ★ 4.7
                    </span>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full text-center py-2.5 text-xs font-bold text-brand-primary border border-brand-primary-light hover:bg-brand-bg-light rounded-xl transition-all"
                  >
                    View Category
                  </button>
                </div>
              </div>

              {/* Card 4: Handyman */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between min-h-[340px] group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg-light flex items-center justify-center mb-6">
                    <Icon name="handyman" className="text-2xl text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-2">
                    Handyman
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-5">
                    Reliable local help for smart home setup, repairs, and
                    furniture assembly.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>200+ Experts</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      ★ 4.9
                    </span>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full text-center py-2.5 text-xs font-bold text-brand-primary border border-brand-primary-light hover:bg-brand-bg-light rounded-xl transition-all"
                  >
                    View Category
                  </button>
                </div>
              </div>

              {/* Card 5: Landscaping */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between min-h-[340px] group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg-light flex items-center justify-center mb-6">
                    <Icon name="yard" className="text-2xl text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-2">
                    Landscaping
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-5">
                    Professional garden maintenance, seasonal care, and
                    landscape design.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>50+ Experts</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      ★ 4.8
                    </span>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full text-center py-2.5 text-xs font-bold text-brand-primary border border-brand-primary-light hover:bg-brand-bg-light rounded-xl transition-all"
                  >
                    View Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ SPOTLIGHT / TESTIMONIAL ══════════════════════ */}
        <section
          className="py-20"
          style={{ backgroundColor: "var(--color-brand-bg-light)" }}
        >
          <div className="mx-auto max-w-[1140px] px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Spotlight Card - 4/12 cols) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-[320px] text-center border border-slate-100">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                  <Icon name="person" className="text-4xl text-slate-400" />
                </div>

                {/* Pill */}
                <span className="inline-block bg-brand-primary text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  EXPERT SPOTLIGHT
                </span>

                {/* Info */}
                <h4 className="text-base font-extrabold text-brand-primary">
                  Sarah J.
                </h4>
                <p className="text-xs text-slate-500 mb-3 font-semibold">
                  Math &amp; Science Tutor
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-0.5 text-amber-500 text-sm mb-6">
                  ★ ★ ★ ★ ★
                </div>

                {/* View profile button */}
                <button
                  onClick={() => openModal()}
                  className="w-full text-center bg-slate-50 hover:bg-slate-100 text-brand-primary text-xs font-bold py-3 rounded-xl transition-all border border-slate-200/60"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Right Column (Testimonial Details - 8/12 cols) */}
            <div className="lg:col-span-8">
              {/* Large quote mark */}
              <div className="text-brand-primary-light text-7xl font-serif leading-none mb-2 pointer-events-none select-none">
                “
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-2xl font-extrabold text-brand-primary leading-relaxed mb-8">
                &ldquo;LocalSkill Connect helped me grow my tutoring business by
                300% in six months. The platform handles the trust, so I can
                focus on teaching.&rdquo;
              </blockquote>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-primary-light/40">
                <div>
                  <p className="text-2xl font-extrabold text-brand-primary mb-1">
                    500+
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    Successful Sessions
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-primary mb-1">
                    150
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    Happy Families
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-primary mb-1">
                    100%
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    Completion Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CTA BLOCK ════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1140px] px-6">
            <div
              className="rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden"
              style={{ backgroundColor: "var(--color-brand-primary)" }}
            >
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold mb-3 leading-tight">
                Can&apos;t find exactly what
                <br />
                you&apos;re looking for?
              </h2>
              <p className="text-brand-primary-muted text-sm leading-6 mb-8 max-w-[460px] mx-auto">
                Our neighborhood network is growing every day. Tell us what
                skill you need and we&apos;ll recruit the best.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => openModal()}
                  className="text-sm font-bold text-brand-primary bg-white px-7 py-3.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all"
                >
                  Request a Skill
                </button>
                <button
                  onClick={() => openModal()}
                  className="text-sm font-bold text-white border border-white/40 px-7 py-3.5 rounded-full hover:bg-white/10 active:scale-95 transition-all"
                >
                  Partner with Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══════ FOOTER ══════════════════════════════════════════ */}
      <footer className="bg-white border-t border-slate-100 py-7">
        <div className="mx-auto max-w-[1140px] px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-brand-primary)" }}
              >
                <Icon name="check" fill className="text-xs text-white" />
              </div>
              <span className="text-sm font-bold text-brand-primary">
                LocalSkill
              </span>
            </div>
            <p className="text-[12px] text-slate-400">
              © 2024 LocalSkill Connect. Bridging community expertise.
            </p>
          </div>

          {/* Center links */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Help Center",
              "Community Guidelines",
            ].map((l) => (
              <a
                key={l}
                href="#"
                onClick={() => openModal()}
                className="text-[12px] text-slate-500 hover:text-brand-primary transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal()}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Icon name="share" className="text-base text-slate-500" />
            </button>
            <button
              onClick={() => openModal()}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Icon name="language" className="text-base text-slate-500" />
            </button>
          </div>
        </div>
      </footer>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId="kaamao"
        projectName="Kaamao Connect"
      />
    </div>
  );
}
