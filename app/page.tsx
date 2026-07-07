"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const APP_ICON_SRC = "/iconbgremoved copy.png";

const BrandIcon = ({
  className = "h-10 w-10",
  alt = "敬語ボタン",
  sizes = "40px",
}: {
  className?: string;
  alt?: string;
  sizes?: string;
}) => (
  <Image
    src={APP_ICON_SRC}
    alt={alt}
    width={1200}
    height={1200}
    sizes={sizes}
    className={`object-contain ${className}`}
  />
);

const AppleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const GuideIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Starburst = ({ className }: { className?: string }) => {
  const points = [];
  const rays = 12;
  const outerRadius = 100;
  const innerRadius = 35;
  const cx = 100;
  const cy = 100;

  for (let i = 0; i < rays * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / rays;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x.toFixed(4)},${y.toFixed(4)}`);
  }

  return (
    <svg className={className} viewBox="0 0 200 200" fill="currentColor">
      <polygon points={points.join(" ")} />
    </svg>
  );
};

// Real screenshot — the prompt list, where conversion menus are customized.
const ResultDetailPhone = () => (
  <div className="relative w-[280px] h-[580px] rounded-[40px] border-[6px] border-[#2C2C2E] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
    <Image
      src="/prompts.png"
      alt="敬語ボタンの変換メニュー一覧"
      fill
      sizes="280px"
      className="object-cover object-top"
    />
  </div>
);

// Real screenshot — the settings screen (profile, privacy note, keyboard options).
const ComposePhone = () => (
  <div className="relative w-[280px] h-[580px] rounded-[40px] border-[6px] border-[#2C2C2E] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
    <Image
      src="/settings.png"
      alt="敬語ボタンの設定画面"
      fill
      sizes="280px"
      className="object-cover object-top"
    />
  </div>
);

// Real screenshot — the home screen, the hero centerpiece.
const PhoneMockup = () => (
  <div className="relative z-10 w-[280px] h-[580px] rounded-[40px] border-[6px] border-[#2C2C2E] overflow-hidden bg-white shadow-2xl">
    <Image
      src="/home.png"
      alt="敬語ボタンのホーム画面"
      fill
      sizes="280px"
      priority
      className="object-cover object-top"
    />
  </div>
);

const HeroRewriteDemo = () => (
  <div data-reveal-float className="flex w-[310px] flex-col items-stretch gap-2.5">
    <div className="rounded-[18px] border border-white/45 bg-[#EFEAFD]/80 px-4 py-3.5 shadow-[0_18px_40px_-26px_rgba(24,24,26,0.65)] backdrop-blur-xl">
      <span className="block text-[13px] font-semibold leading-[1.55] text-[#18181A]/55">
        資料の確認、今日中にお願いできますか？修正あれば教えてください。
      </span>
    </div>

    <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[#18181A]/70 shadow-[0_12px_26px_-18px_rgba(24,24,26,0.7)]">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>

    <div className="rounded-[20px] border border-[#18181A]/10 bg-white px-4 py-3.5 shadow-[0_24px_50px_-28px_rgba(24,24,26,0.7)]">
      <span className="block text-[13px] font-bold leading-[1.55] text-[#18181A]">
        本日中に資料をご確認いただけますでしょうか。修正点がございましたら、お知らせいただけますと幸いです。
      </span>
    </div>
  </div>
);

const MobileStoreButton = ({
  href,
  icon,
  eyebrow,
  label,
  className = "",
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  label: string;
  className?: string;
}) => (
  <a
    href={href}
    className={`flex min-h-12 items-center justify-center gap-2.5 rounded-2xl px-4 py-3 text-left shadow-[0_18px_34px_-24px_rgba(0,0,0,0.55)] transition-transform active:scale-[0.98] ${className}`}
  >
    {icon}
    <span className="flex min-w-0 flex-col leading-none">
      <span className="text-[9px] font-semibold opacity-70">{eyebrow}</span>
      <span className="mt-1 text-[13px] font-bold leading-none">{label}</span>
    </span>
  </a>
);

const MobilePhone = ({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) => (
  <div className="relative h-[520px] w-[239px] overflow-hidden rounded-[34px] border-[5px] border-[#252529] bg-white shadow-[0_30px_60px_-22px_rgba(0,0,0,0.58)]">
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="239px"
      className="object-cover object-top"
    />
  </div>
);

const MobileLines = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute inset-0 h-full w-full pointer-events-none opacity-[0.14] ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="-12%" y1="68%" x2="78%" y2="18%" stroke="currentColor" strokeWidth="0.7" />
    <line x1="-8%" y1="80%" x2="110%" y2="44%" stroke="currentColor" strokeWidth="0.7" />
    <line x1="12%" y1="-10%" x2="88%" y2="108%" stroke="currentColor" strokeWidth="0.7" />
    <line x1="48%" y1="118%" x2="104%" y2="8%" stroke="currentColor" strokeWidth="0.7" />
  </svg>
);

const MobileHeroSection = () => (
  <section
    data-anim-section="mobile-hero"
    className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#18181A] text-white"
  >
    <MobileLines className="text-white" />

    <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-5 max-[380px]:px-4 max-[700px]:pb-4 max-[700px]:pt-4">
      <header data-reveal className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BrandIcon className="h-9 w-9 drop-shadow-[0_8px_18px_rgba(200,188,250,0.35)]" sizes="36px" />
          <span className="font-display text-[19px] font-bold leading-none">敬語ボタン</span>
        </div>
        <Link
          href="/support"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80"
        >
          使い方
        </Link>
      </header>

      <div className="relative z-20 mt-8 max-w-[330px] max-[700px]:mt-5">
        <p
          data-reveal
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8BCFA]"
        >
          AI keyboard for polite Japanese
        </p>
        <h1
          data-reveal
          className="font-display text-[40px] font-semibold leading-[1.04] tracking-tight text-white max-[380px]:text-[36px] max-[700px]:text-[34px]"
        >
          送る前に、
          <br />
          その一文を
          <br />
          敬語に。
        </h1>
        <p
          data-reveal
          className="mt-4 max-w-[310px] text-[13px] font-medium leading-[1.7] text-white/62 max-[700px]:mt-3 max-[700px]:text-[12px] max-[700px]:leading-[1.55]"
        >
          LINE・メール・DMの文面を、キーボード上で自然な敬語へ。AIに送るのは、ボタンをタップした文章だけです。
        </p>
      </div>

      <div data-reveal className="relative z-20 mt-5 grid grid-cols-2 gap-2.5 max-[700px]:mt-4">
        <MobileStoreButton
          href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
          icon={<AppleIcon className="h-5 w-5 shrink-0" />}
          eyebrow="ダウンロードは"
          label="App Store"
          className="bg-white text-black"
        />
        <MobileStoreButton
          href="/support"
          icon={<GuideIcon className="h-5 w-5 shrink-0" />}
          eyebrow="はじめての方へ"
          label="使い方を見る"
          className="bg-white/10 text-white ring-1 ring-white/12"
        />
      </div>

      <div className="relative mt-auto h-[42svh] min-h-[270px] max-[700px]:h-[36svh] max-[700px]:min-h-[220px]">
        <div className="absolute inset-x-[-20px] bottom-[-6px] top-8 overflow-hidden rounded-t-[36px] bg-[#C8BCFA] shadow-[0_-24px_70px_-42px_rgba(200,188,250,0.8)]">
          <Starburst className="absolute -right-28 -top-28 h-[360px] w-[360px] animate-[spin_60s_linear_infinite] text-white/75" />
        </div>
        <div
          data-reveal-scale
          className="absolute bottom-[-166px] left-1/2 z-10 -translate-x-1/2 rotate-[5deg] scale-[0.72] max-[700px]:bottom-[-205px] max-[700px]:scale-[0.6]"
        >
          <MobilePhone src="/home.png" alt="敬語ボタンのホーム画面" priority />
        </div>
        <div
          data-reveal-float
          className="absolute left-0 right-0 top-0 z-20 mx-auto w-[286px] rounded-[18px] border border-white/50 bg-white/88 px-3.5 py-3 shadow-[0_22px_44px_-26px_rgba(24,24,26,0.72)] backdrop-blur-xl max-[700px]:top-2 max-[700px]:w-[260px]"
        >
          <span className="block text-[12px] font-semibold leading-[1.55] text-[#18181A]/55 max-[700px]:text-[11px]">
            明日いけますか
          </span>
          <span className="mt-1 block text-[13px] font-bold leading-[1.45] text-[#18181A] max-[700px]:text-[12px]">
            明日ご都合いかがでしょうか
          </span>
        </div>
      </div>
    </div>
  </section>
);

const MobileAboutSection = () => (
  <section
    data-anim-section="mobile-about"
    className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#18181A] px-5 pb-5 pt-8 text-white"
  >
    <div data-reveal className="relative z-10">
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
        アプリについて
      </span>
      <h2 className="font-display text-[34px] font-semibold leading-[1.08] max-[700px]:text-[30px]">
        いつもの言葉を、
        <br />
        きちんと伝わる
        <br />
        敬語へ。
      </h2>
      <p className="mt-4 max-w-[315px] text-[13px] font-medium leading-[1.75] text-white/60 max-[700px]:mt-3 max-[700px]:text-[12px] max-[700px]:leading-[1.6]">
        お願い、お詫び、取引先へのDMまで。思いついた文章をその場で整えて、言い回しに悩む時間を減らします。
      </p>
    </div>

    <div
      data-reveal-scale
      className="relative mt-auto h-[58svh] min-h-[380px] overflow-hidden rounded-[34px] bg-[#C8BCFA] max-[700px]:h-[53svh] max-[700px]:min-h-[310px]"
    >
      <Starburst className="absolute -right-24 -top-20 h-[310px] w-[310px] text-white/55" />
      <div className="absolute -left-7 bottom-[-148px] z-20 -rotate-6 scale-[0.65] max-[700px]:bottom-[-190px] max-[700px]:scale-[0.55]">
        <MobilePhone src="/prompts.png" alt="敬語ボタンの変換メニュー一覧" />
      </div>
      <div className="absolute -right-8 bottom-[-164px] z-10 rotate-[8deg] scale-[0.6] opacity-95 max-[700px]:bottom-[-205px] max-[700px]:scale-[0.52]">
        <MobilePhone src="/settings.png" alt="敬語ボタンの設定画面" />
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-30 rounded-[22px] border border-white/45 bg-white/82 px-4 py-3 shadow-[0_22px_44px_-28px_rgba(24,24,26,0.72)] backdrop-blur-xl">
        <span className="text-[11px] font-bold text-[#7D68D8]">ボタンをタップした時だけ</span>
        <p className="mt-1 text-[14px] font-bold leading-[1.45] text-[#18181A]">
          通常入力は端末内。AIに送る文だけ、自分で選べます。
        </p>
      </div>
    </div>
  </section>
);

const MobileFeaturesSection = () => (
  <section
    id="features-mobile"
    data-anim-section="mobile-features"
    className="relative flex h-[100svh] w-full flex-col overflow-hidden rounded-t-[36px] bg-white px-5 pb-5 pt-8 text-black"
  >
    <div data-reveal>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
        機能
      </span>
      <h2 className="font-display text-[32px] font-semibold leading-[1.1] max-[700px]:text-[28px]">
        伝わる文章を
        <br />
        つくる機能を、
        <br />
        ひとつのボタンに。
      </h2>
    </div>

    <div data-reveal className="mt-5 grid grid-cols-2 gap-2.5 max-[700px]:mt-4">
      {["敬語", "メール文", "お詫び", "翻訳"].map((label, index) => (
        <div
          key={label}
          className={`rounded-2xl px-4 py-3 text-sm font-bold shadow-[0_16px_34px_-28px_rgba(24,24,26,0.72)] ${
            index === 0 ? "bg-[#18181A] text-white" : "bg-[#F4F2FB] text-black/72"
          }`}
        >
          {label}
        </div>
      ))}
    </div>

    <div
      data-reveal-scale
      className="relative mt-auto h-[52svh] min-h-[350px] overflow-hidden rounded-[34px] bg-[#F7F7F8] max-[700px]:h-[48svh] max-[700px]:min-h-[300px]"
    >
      <Starburst className="absolute -right-24 -top-24 h-[300px] w-[300px] text-[#C8BCFA]" />
      <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 scale-[0.62] max-[700px]:top-0 max-[700px]:scale-[0.54]">
        <MobilePhone src="/prompts.png" alt="敬語ボタンのプロンプト画面" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[22px] bg-white px-4 py-3 shadow-[0_20px_44px_-28px_rgba(24,24,26,0.6)]">
        <span className="block text-[11px] font-bold text-[#7D68D8]">場面に合わせる</span>
        <p className="mt-1 text-[14px] font-bold leading-[1.45] text-[#18181A]">
          よく使う変換メニューを自分の言葉で追加できます。
        </p>
      </div>
    </div>
  </section>
);

const MobileKeyboardSection = () => (
  <section
    data-anim-section="mobile-keyboard"
    className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#C8BCFA] px-5 pb-5 pt-8 text-black"
  >
    <div data-reveal>
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-black/42">
        Keyboard
      </span>
      <h2 className="font-display text-[32px] font-semibold leading-[1.1] max-[700px]:text-[28px]">
        いつもの
        <br />
        キーボードから、
        <br />
        すぐ変換。
      </h2>
      <p className="mt-4 max-w-[315px] text-[13px] font-semibold leading-[1.7] text-black/58 max-[700px]:mt-3 max-[700px]:text-[12px]">
        アプリを切り替えず、入力している場所で敬語ボタンをタップ。チャットもメールも流れを止めません。
      </p>
    </div>

    <div
      data-reveal-scale
      className="relative mt-auto h-[46svh] min-h-[310px] overflow-hidden rounded-[34px] bg-[#18181A] shadow-[0_30px_70px_-38px_rgba(24,24,26,0.62)] max-[700px]:h-[42svh] max-[700px]:min-h-[250px]"
    >
      <MobileLines className="text-white" />
      <div className="absolute left-5 right-5 top-5 rounded-[22px] bg-white px-4 py-4">
        <span className="block text-[13px] font-semibold leading-[1.55] text-black/48">
          資料の確認お願いします
        </span>
        <span className="mt-2 block text-[15px] font-bold leading-[1.45] text-black">
          資料をご確認いただけますでしょうか
        </span>
      </div>
      <div className="absolute bottom-[-4px] left-1/2 w-[390px] -translate-x-1/2 overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#C9CBD1] shadow-[0_-18px_48px_-34px_rgba(255,255,255,0.7)] max-[380px]:w-[350px]">
        <Image
          src="/keyboard.jpg"
          alt="敬語ボタン付きキーボード"
          width={1170}
          height={1014}
          sizes="390px"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  </section>
);

const MobileCtaSection = () => (
  <section
    data-anim-section="mobile-cta"
    className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#18181A] px-5 pb-6 pt-7 text-white"
  >
    <MobileLines className="text-white" />
    <div data-reveal className="relative z-10 flex items-center justify-between">
      <BrandIcon className="h-10 w-10 drop-shadow-[0_8px_18px_rgba(200,188,250,0.35)]" sizes="40px" />
      <span className="rounded-full bg-[#C8BCFA] px-4 py-2 text-xs font-bold text-black">
        2026年6月更新
      </span>
    </div>

    <div data-reveal className="relative z-10 mt-12 max-[700px]:mt-8">
      <h2 className="font-display text-[36px] font-semibold leading-[1.06] max-[700px]:text-[32px]">
        今すぐ、
        <br />
        最初の一通から
        <br />
        敬語ボタンを。
      </h2>
      <p className="mt-4 max-w-[310px] text-[13px] font-medium leading-[1.75] text-white/62 max-[700px]:text-[12px]">
        App Storeからインストールして、キーボードに追加するだけ。いつでも、どのアプリでも使えます。
      </p>
    </div>

    <div
      data-reveal-scale
      className="relative z-10 mt-auto rounded-[30px] bg-[#C8BCFA] p-4 text-black shadow-[0_30px_70px_-38px_rgba(200,188,250,0.86)]"
    >
      <div className="rounded-[22px] bg-[#18181A] p-5 text-white shadow-2xl">
        <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white/38">
          敬語ボタンより
        </span>
        <p className="mt-4 text-[18px] font-semibold leading-[1.6] text-white/92 max-[700px]:text-[16px]">
          言葉を整えることは、相手への敬意です。毎日のやりとりが、すこし軽くなりますように。
        </p>
      </div>

      <a
        href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
        className="mt-4 flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 font-bold text-black"
      >
        <AppleIcon className="h-5 w-5" />
        App Storeでダウンロード
      </a>
    </div>

    <div
      data-reveal
      className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-white/52"
    >
      <Link href="/support">サポート</Link>
      <Link href="/terms">利用規約</Link>
      <Link href="/privacy">プライバシー</Link>
    </div>
  </section>
);

const MobileLanding = () => (
  <div className="w-full overflow-hidden bg-[#18181A] lg:hidden">
    <MobileHeroSection />
    <MobileAboutSection />
    <MobileFeaturesSection />
    <MobileKeyboardSection />
    <MobileCtaSection />
  </div>
);

const DarkToLightTransition = () => (
  <div
    data-anim-section="transition"
    className="relative h-[140px] w-full shrink-0 overflow-hidden bg-[#18181A]"
  >
    <div className="absolute inset-x-0 bottom-[-1px] h-[140px] rounded-t-[44px] bg-white lg:rounded-t-[64px]" />
  </div>
);

const AboutSection = () => (
  <div
    data-anim-section="about"
    className="w-full min-h-screen lg:h-screen lg:min-h-[760px] bg-[#18181A] relative flex justify-center lg:overflow-hidden shrink-0"
  >
    <div className="w-full max-w-[1400px] relative flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 relative h-[500px] lg:h-full flex items-center justify-center px-6 lg:pl-16 lg:pr-0 lg:py-16 z-10">
        <div
          data-reveal-scale
          className="w-full h-full bg-[#C8BCFA] rounded-[32px] lg:rounded-[48px] relative overflow-hidden flex items-center justify-center"
        >
          <div className="relative w-full h-[600px] flex items-center justify-center mt-32 lg:mt-12 scale-[0.7] sm:scale-90 lg:scale-100 origin-top lg:origin-center">
            <div className="absolute top-2 right-6 transform rotate-[10deg] scale-[0.85] opacity-95">
              <ComposePhone />
            </div>
            <div className="absolute top-16 left-6 transform -rotate-3 scale-95 shadow-2xl z-20">
              <ResultDetailPhone />
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-[22%] right-0 z-30 translate-x-1/2">
          <div className="relative w-24 h-24 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-[-12px] rounded-full border border-white opacity-40 transition-transform group-hover:scale-110"></div>
            <button className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="black" className="ml-1">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-6 pt-16 pb-8 lg:pl-24 lg:pr-16 z-10">
        <span
          data-reveal
          className="text-white/50 text-xs font-bold tracking-[0.15em] uppercase mb-4 block"
        >
          アプリについて
        </span>
        <h2
          data-reveal
          className="font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-semibold lg:leading-[1.1] text-white mb-6"
        >
          いつもの言葉を、
          <br />
          きちんと伝わる
          <br />
          敬語へ。
        </h2>
        <p
          data-reveal
          className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 lg:mb-10 font-sans max-w-lg"
        >
          敬語ボタンは、思いついたまま入力した文章を、相手や場面にふさわしい敬語へとその場で整えます。お願いやお詫び、取引先へのDM、目上の方へのメッセージも、言い回しに悩む時間を減らせます。送るのは、ボタンをタップした文章だけです。
        </p>
        <div data-reveal>
          <a
            href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
            className="inline-block bg-white text-black font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/90 transition-all"
          >
            無料で使ってみる
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div
    id="features"
    data-anim-section="features"
    className="w-full min-h-screen lg:h-screen lg:min-h-[760px] bg-white relative flex justify-center py-16 lg:py-20 lg:overflow-hidden shrink-0"
  >
    <div className="w-full max-w-[1400px] relative flex flex-col h-full px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row lg:justify-between w-full relative z-10">
        <div className="max-w-[700px] relative z-20">
          <span
            data-reveal
            className="text-black/40 text-[11px] font-bold tracking-[0.15em] uppercase mb-4 lg:mb-5 block"
          >
            機能
          </span>
          <h2
            data-reveal
            className="font-display text-[32px] sm:text-4xl lg:text-[3.25rem] font-semibold leading-[1.15] text-black mb-8 lg:mb-10"
          >
            敬語ボタンには、伝わる文章を
            <br className="hidden lg:block" />
            つくるための機能が
            <br className="hidden lg:block" />
            そろっています。
          </h2>
          <div data-reveal className="flex gap-4">
            <button className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-[#18181A] flex items-center justify-center text-white hover:bg-black transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div
          data-speed="0.82"
          className="absolute top-0 right-[-100px] lg:right-16 opacity-30 lg:opacity-100 pointer-events-none"
        >
          <Starburst className="w-[200px] h-[200px] lg:w-[320px] lg:h-[320px] text-[#C8BCFA]" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-12 lg:mt-auto relative z-10">
        {/* Card 1 — conversion menu */}
        <div
          data-reveal
          className="bg-[#F9F9F9] rounded-[32px] p-8 lg:p-10 flex flex-col-reverse lg:flex-row w-full lg:w-[65%] min-h-[340px] lg:min-h-[280px] relative overflow-hidden shrink-0"
        >
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-6 lg:mt-0">
            <h3 className="font-display text-[22px] lg:text-[26px] font-semibold text-black mb-3 lg:mb-4 pr-0 lg:pr-4">
              場面に合わせた変換メニュー
            </h3>
            <p className="text-black/50 text-[14px] lg:text-[15px] leading-relaxed pr-0 lg:pr-6">
              敬語・メール文・お詫び・依頼・要約・翻訳・言い換え。送りたい相手と場面に合わせて、ワンタップで文章を整えられます。
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative h-[180px] lg:h-full flex justify-center lg:block">
            <div className="relative w-full max-w-[280px] lg:max-w-none h-full transform scale-90 lg:scale-100 origin-top">
              <div className="absolute top-0 lg:top-10 left-0 lg:left-10 w-full lg:w-[280px] bg-[#404040] rounded-xl px-4 py-3.5 flex justify-between items-center shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] transform rotate-2 z-20">
                <span className="text-white/80 text-xs font-medium">変換メニューを選ぶ</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><path d="M6 9l6 6 6-6" /></svg>
              </div>

              <div className="absolute top-[65px] lg:top-[105px] left-[-10px] lg:left-8 bg-[#C8BCFA] rounded-full pl-4 pr-3 py-2 flex items-center gap-2 shadow-md transform -rotate-1 z-10">
                <span className="text-[11px] font-bold text-black">敬語にする</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black ml-1"><polyline points="20 6 9 17 4 12" /></svg>
              </div>

              <div className="absolute top-[65px] lg:top-[105px] left-[120px] lg:left-[170px] bg-white border border-black/5 rounded-full px-4 py-2 flex items-center shadow-md z-10">
                <span className="text-[11px] font-semibold text-black/70">メール文</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — privacy */}
        <div
          data-reveal
          className="bg-[#F9F9F9] rounded-[32px] p-8 lg:p-10 flex flex-col w-full lg:w-[40%] min-h-[280px] shrink-0 justify-center"
        >
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-[26px] font-semibold text-black mb-4">
              プライバシー第一
            </h3>
            <p className="text-black/50 text-[15px] leading-relaxed">
              ふだんの入力は端末内で完結します。AIに送られるのは、ボタンをタップした文章だけ。すべての打鍵を記録することはありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CtaSection = () => (
  <div
    data-anim-section="cta"
    className="w-full min-h-screen lg:h-screen lg:min-h-[800px] bg-[#18181A] relative flex justify-center pt-24 lg:pt-32 overflow-hidden shrink-0"
  >
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="-10%" y1="60%" x2="50%" y2="20%" stroke="white" strokeWidth="0.5" />
      <line x1="-10%" y1="70%" x2="100%" y2="40%" stroke="white" strokeWidth="0.5" />
      <line x1="20%" y1="110%" x2="60%" y2="50%" stroke="white" strokeWidth="0.5" />
      <line x1="10%" y1="-10%" x2="80%" y2="100%" stroke="white" strokeWidth="0.5" />
      <line x1="40%" y1="120%" x2="90%" y2="10%" stroke="white" strokeWidth="0.5" />
    </svg>

    <div className="w-full max-w-[1400px] relative flex flex-col items-center h-full">
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
        <h2
          data-reveal
          className="font-display text-[32px] leading-[1.1] sm:text-4xl lg:text-[3.25rem] font-semibold lg:leading-[1.15] text-white mb-6 lg:mb-8"
        >
          今すぐ、最初の一通から
          <br />
          敬語ボタンを。
        </h2>
        <p
          data-reveal
          className="text-white/60 text-sm md:text-base leading-relaxed mb-8 lg:mb-10 font-sans max-w-[580px]"
        >
          App Storeから敬語ボタンをインストールし、キーボードに追加するだけ。あとは文章を入力してボタンをタップすれば、自然な敬語の候補が表示されます。いつでも、どのアプリでも。
        </p>
        <a
          data-reveal
          href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
          className="inline-block bg-[#C8BCFA] text-black font-semibold text-sm px-10 py-4 rounded-xl hover:bg-[#b8aafa] transition-all"
        >
          App Storeでダウンロード
        </a>
      </div>

      <div
        data-reveal-scale
        className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-10 translate-y-[150px] sm:translate-y-[200px] lg:translate-y-[220px] scale-[0.6] sm:scale-[0.75] lg:scale-100 origin-bottom"
      >
        <Starburst className="absolute bottom-[200px] sm:bottom-[300px] lg:bottom-[400px] left-10 lg:left-[15%] w-[160px] lg:w-[240px] h-[160px] lg:h-[240px] text-white z-0 opacity-50 lg:opacity-100" />

        <div className="hidden sm:block relative z-10 transform scale-95 translate-x-12 translate-y-16">
          <ResultDetailPhone />
        </div>
        <div className="relative z-20 transform scale-[1.05] shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.4)]">
          <PhoneMockup />
        </div>
        <div className="hidden sm:block relative z-10 transform scale-95 -translate-x-12 translate-y-16">
          <ComposePhone />
        </div>
      </div>
    </div>
  </div>
);

const FooterSection = () => (
  <div
    data-anim-section="footer"
    className="w-full min-h-screen lg:min-h-[760px] bg-[#C8BCFA] relative flex justify-center pt-16 lg:pt-24 pb-40 lg:pb-24 overflow-hidden shrink-0 mt-[-88px] lg:mt-[-120px] rounded-t-[40px] z-20"
  >
    <div className="w-full max-w-[1400px] relative flex flex-col items-center px-6 lg:px-20 h-full">
      <div
        data-reveal
        className="lg:absolute lg:top-0 lg:left-20 flex flex-col items-center lg:items-start mb-6 lg:mb-0 w-full lg:w-auto"
      >
        <span className="text-black/50 text-[11px] font-bold tracking-[0.15em] uppercase mb-1">
          最終更新
        </span>
        <span className="text-black font-semibold text-sm">2026年6月</span>
      </div>

      <div
        data-reveal
        className="lg:absolute lg:top-0 lg:right-20 flex flex-col items-center lg:items-end mb-12 lg:mb-0 w-full lg:w-auto"
      >
        <span className="text-black/50 text-[11px] font-bold tracking-[0.15em] uppercase mb-1">
          所在地
        </span>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span className="text-black font-semibold text-sm">東京, Japan</span>
        </div>
      </div>

      <div className="relative mt-8 lg:mt-12 mb-44 lg:mb-0 w-full max-w-[480px] z-10 flex-1 flex flex-col justify-center">
        <div
          data-reveal-scale
          className="bg-[#18181A] rounded-2xl p-8 lg:p-10 transform -translate-y-4 lg:-translate-y-8 -rotate-2 shadow-2xl"
        >
          <span className="text-white/40 text-[11px] font-mono tracking-[0.15em] uppercase mb-6 lg:mb-8 block">
            敬語ボタンより
          </span>

          <div className="flex flex-col gap-4 lg:gap-6 font-serif text-[18px] lg:text-[20px] text-white/90">
            <div className="relative pb-2 border-b border-white/10">
              ここまで見てくださって、ありがとうございます。
            </div>
            <div className="relative pb-2 border-b border-white/10">
              言葉を整えることは、相手への敬意です。
            </div>
            <div className="relative pb-2 border-b border-white/10">
              毎日のやりとりが、すこし軽くなりますように。
            </div>
            <div className="relative pb-2 border-b border-white/10">
              ご感想は keigobutton@gmail.com まで。
            </div>
          </div>
        </div>

        <div className="absolute -bottom-36 sm:-bottom-44 lg:-bottom-52 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 w-[440px] sm:w-[560px] lg:w-[700px] h-[168px] sm:h-[200px] lg:h-[230px] scale-[0.72] sm:scale-90 lg:scale-100 origin-bottom">
            <div className="absolute left-0 top-4 w-[148px] h-[148px] sm:w-[168px] sm:h-[168px] lg:w-[190px] lg:h-[190px] bg-[#C8BCFA] rounded-[34px] sm:rounded-[38px] lg:rounded-[44px] border-[7px] lg:border-[9px] border-white flex items-center justify-center transform -rotate-12 shadow-[0_18px_32px_rgba(0,0,0,0.12)] z-10 hover:z-50 hover:scale-105 transition-all cursor-pointer group">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:scale-110 transition-transform"><path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" /></svg>
          </div>
          <div className="absolute left-[96px] sm:left-[126px] lg:left-[170px] top-8 w-[148px] h-[148px] sm:w-[168px] sm:h-[168px] lg:w-[190px] lg:h-[190px] bg-[#C8BCFA] rounded-[34px] sm:rounded-[38px] lg:rounded-[44px] border-[7px] lg:border-[9px] border-white flex items-center justify-center transform -rotate-3 shadow-[0_18px_32px_rgba(0,0,0,0.12)] z-20 hover:z-50 hover:scale-105 transition-all cursor-pointer group">
            <svg width="68" height="68" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:scale-110 transition-transform"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </div>
          <div className="absolute left-[192px] sm:left-[252px] lg:left-[340px] top-4 w-[148px] h-[148px] sm:w-[168px] sm:h-[168px] lg:w-[190px] lg:h-[190px] bg-[#C8BCFA] rounded-[34px] sm:rounded-[38px] lg:rounded-[44px] border-[7px] lg:border-[9px] border-white flex items-center justify-center transform rotate-6 shadow-[0_18px_32px_rgba(0,0,0,0.12)] z-30 hover:z-50 hover:scale-105 transition-all cursor-pointer group">
            <svg width="76" height="76" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:scale-110 transition-transform"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" /></svg>
          </div>
          <div className="absolute left-[288px] sm:left-[378px] lg:left-[510px] top-8 w-[148px] h-[148px] sm:w-[168px] sm:h-[168px] lg:w-[190px] lg:h-[190px] bg-[#C8BCFA] rounded-[34px] sm:rounded-[38px] lg:rounded-[44px] border-[7px] lg:border-[9px] border-white flex items-center justify-center transform rotate-12 shadow-[0_18px_32px_rgba(0,0,0,0.12)] z-40 hover:z-50 hover:scale-105 transition-all cursor-pointer group">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </div>
        </div>
      </div>

      {/* Legal links */}
      <div
        data-reveal
        className="lg:absolute lg:right-20 lg:bottom-12 flex flex-wrap lg:flex-col items-center lg:items-end justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-black/60 z-30"
      >
        <Link href="/support" className="hover:text-black transition-colors">サポート</Link>
        <Link href="/terms" className="hover:text-black transition-colors">利用規約</Link>
        <Link href="/privacy" className="hover:text-black transition-colors">プライバシー</Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const ease = "power3.out";

      // Full experience for anyone who hasn't asked for reduced motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) Momentum scrolling — the single biggest "premium feel" upgrade.
        //    A higher `smooth` value means a silkier, slower catch-up.
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.4,
          effects: true, // enables data-speed parallax
          smoothTouch: false, // keep native scrolling on touch devices
        });

        // 2) Hero intro on load — layered so the eye lands on the headline
        //    first, then the copy, then the device, then the floating hints.
        ["hero", "mobile-hero"].forEach((section) => {
          const root = `[data-anim-section="${section}"]`;

          gsap
            .timeline({ defaults: { ease } })
            .fromTo(
              `${root} [data-reveal]`,
              { y: 42, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.09 }
            )
            .fromTo(
              `${root} [data-reveal-scale]`,
              { y: 64, opacity: 0, scale: 0.96 },
              { y: 0, opacity: 1, scale: 1, duration: 1.3 },
              "-=0.85"
            )
            .fromTo(
              `${root} [data-reveal-float]`,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
              "-=0.6"
            );
        });

        // 3) Scroll reveals — each section's content rises and fades in as it
        //    enters view. Short travel + a soft ease reads as considered,
        //    not flashy. ScrollTriggers created after the smoother inherit it.
        [
          "about",
          "transition",
          "features",
          "cta",
          "footer",
          "mobile-about",
          "mobile-features",
          "mobile-keyboard",
          "mobile-cta",
        ].forEach((section) => {
          const root = `[data-anim-section="${section}"]`;

          const items = gsap.utils.toArray<HTMLElement>(`${root} [data-reveal]`);
          if (items.length) {
            gsap.fromTo(
              items,
              { y: 48, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease,
                stagger: 0.1,
                scrollTrigger: { trigger: root, start: "top 75%" },
              }
            );
          }

          const visuals = gsap.utils.toArray<HTMLElement>(
            `${root} [data-reveal-scale]`
          );
          if (visuals.length) {
            gsap.fromTo(
              visuals,
              { y: 72, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease,
                stagger: 0.12,
                scrollTrigger: { trigger: root, start: "top 70%" },
              }
            );
          }
        });

        // 4) Route in-page anchors through the smoother so they glide with the
        //    same momentum instead of teleporting.
        const anchors = gsap.utils.toArray<HTMLAnchorElement>('a[href^="#"]');
        const cleanups: Array<() => void> = [];
        anchors.forEach((a) => {
          const href = a.getAttribute("href");
          if (!href || href.length < 2) return; // skip bare "#"
          const onClick = (e: Event) => {
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            smoother.scrollTo(target, true, "top top");
          };
          a.addEventListener("click", onClick);
          cleanups.push(() => a.removeEventListener("click", onClick));
        });

        return () => {
          cleanups.forEach((fn) => fn());
          smoother.kill();
        };
      });

      // Reduced motion: never hide, never hijack the scroll.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-reveal-scale], [data-reveal-float]", {
          clearProps: "opacity,transform",
        });
      });
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">
        <div className="w-full bg-[#18181A] flex flex-col items-center overflow-x-hidden">
          <MobileLanding />

          <div className="hidden lg:contents">
          {/* Hero Section */}
      <div
        data-anim-section="hero"
        className="w-full min-h-screen lg:h-screen lg:min-h-[760px] bg-[#18181A] relative flex flex-col lg:flex-row justify-center lg:overflow-hidden shrink-0"
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="-10%" y1="60%" x2="50%" y2="20%" stroke="white" strokeWidth="0.5" />
          <line x1="-10%" y1="70%" x2="100%" y2="40%" stroke="white" strokeWidth="0.5" />
          <line x1="20%" y1="110%" x2="60%" y2="50%" stroke="white" strokeWidth="0.5" />
          <line x1="10%" y1="-10%" x2="80%" y2="100%" stroke="white" strokeWidth="0.5" />
          <line x1="40%" y1="120%" x2="90%" y2="10%" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="w-full max-w-[1400px] h-full relative flex flex-col lg:flex-row z-10 flex-1">
          <div className="w-full lg:w-[55%] lg:h-full flex flex-col justify-between pt-6 lg:pt-12 pb-10 lg:pb-14 px-6 lg:px-20 z-10 flex-shrink-0">
            <header
              data-reveal
              className="flex items-center justify-between lg:justify-start lg:gap-12 w-full"
            >
              <div className="flex items-center gap-2.5">
                <BrandIcon className="h-10 w-10 drop-shadow-[0_8px_18px_rgba(200,188,250,0.35)]" sizes="40px" />
                <span className="font-display font-bold text-2xl tracking-tight hidden lg:block">
                  敬語ボタン
                </span>
              </div>

              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
                <Link href="/" className="text-white hover:text-white transition-colors">ホーム</Link>
                <a href="#features" className="hover:text-white transition-colors">機能</a>
                <Link href="/privacy" className="hover:text-white transition-colors">プライバシー</Link>
                <Link href="/support" className="hover:text-white transition-colors">サポート</Link>
              </nav>

              <div className="flex lg:hidden items-center gap-4">
                <Link
                  href="/support"
                  className="border border-white/20 text-white px-5 py-2 rounded-[14px] text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  サポート
                </Link>
                <button className="text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="8" x2="21" y2="8"></line>
                    <line x1="3" y1="16" x2="21" y2="16"></line>
                  </svg>
                </button>
              </div>
            </header>

            <div className="flex flex-col gap-5 lg:gap-6 max-w-xl mt-12 lg:mt-12">
              <h1
                data-reveal
                className="font-display font-semibold text-[42px] leading-[1.05] sm:text-5xl lg:text-[4.5rem] tracking-tight text-white"
              >
                送る前に、その一文を敬語に。
              </h1>
              <p
                data-reveal
                className="text-white/60 text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-md font-sans"
              >
                敬語ボタンは、LINE・メール・DMの文面をその場で自然な敬語に整える日本語キーボードです。ボタンをタップした文章だけがAIに送られ、ふだんの入力が記録されることはありません。
              </p>

              <div
                data-reveal
                className="grid grid-cols-2 sm:flex sm:items-center gap-3 lg:gap-4 mt-6"
              >
                <a
                  href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
                  className="bg-white text-black rounded-2xl px-4 lg:px-6 py-3.5 lg:py-3.5 flex items-center justify-center sm:justify-start gap-2 lg:gap-3 hover:bg-white/90 transition-all w-full sm:w-auto"
                >
                  <AppleIcon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                  <div className="flex flex-col items-start leading-none lg:leading-tight">
                    <span className="text-[9px] lg:text-[10px] font-medium opacity-80 mb-0.5 lg:mb-0">ダウンロードは</span>
                    <span className="text-[13px] lg:text-base font-bold font-display -mt-0.5">App Store</span>
                  </div>
                </a>

                <Link
                  href="/support"
                  className="bg-white text-black rounded-2xl px-4 lg:px-6 py-3.5 lg:py-3.5 flex items-center justify-center sm:justify-start gap-2 lg:gap-3 hover:bg-white/90 transition-all w-full sm:w-auto"
                >
                  <GuideIcon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                  <div className="flex flex-col items-start leading-none lg:leading-tight">
                    <span className="text-[9px] lg:text-[10px] font-medium opacity-80 mb-0.5 lg:mb-0">はじめての方へ</span>
                    <span className="text-[13px] lg:text-base font-bold font-display -mt-0.5">使い方を見る</span>
                  </div>
                </Link>
              </div>
            </div>

            <div data-reveal className="hidden lg:flex items-end gap-12 mt-auto">
              <div>
                <div className="font-display font-bold text-6xl text-[#E5DFFF] tracking-tighter leading-none mb-1">
                  5000+
                </div>
                <div className="text-white/60 text-sm max-w-[140px] leading-tight">
                  ダウンロードを突破しました
                </div>
              </div>

              <div className="flex items-center bg-[#C8BCFA] rounded-full p-2 pl-6 gap-5 shadow-lg shadow-[#C8BCFA]/10">
                <div className="text-black">
                  <div className="font-display font-bold text-3xl leading-none tracking-tight">
                    20,000+
                  </div>
                  <div className="text-black/70 text-xs font-medium mt-1">
                    敬語への書き直し
                  </div>
                </div>
                <a
                  href="https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723"
                  className="w-14 h-14 bg-[#18181A] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors shrink-0"
                  aria-label="App Storeを見る"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:absolute lg:right-6 lg:top-10 lg:bottom-10 w-full lg:w-[43%] lg:max-w-[640px] flex items-center justify-center z-20 relative pt-16 lg:pt-0 mt-8 lg:mt-0 flex-1 overflow-hidden lg:overflow-visible">
            <div className="absolute inset-x-0 bottom-0 top-24 lg:top-0 lg:inset-0 bg-[#C8BCFA] rounded-t-[40px] lg:rounded-[48px] overflow-hidden shadow-2xl mx-0 lg:mx-0">
              <Starburst className="absolute -top-16 lg:-top-32 right-[-100px] lg:-right-10 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] text-white opacity-80 animate-[spin_60s_linear_infinite]" />
            </div>

            <div
              data-reveal-scale
              className="relative z-10 flex w-full items-center justify-center px-6 pb-8 pt-4 sm:scale-100 lg:h-full lg:px-8 lg:py-14"
            >
              <div className="relative flex w-full max-w-[520px] flex-col items-center justify-center">
                <div className="relative z-20 mb-[-36px] translate-y-8 lg:absolute lg:left-0 lg:top-1/2 lg:mb-0 lg:translate-x-0 lg:-translate-y-[-28%]">
                  <HeroRewriteDemo />
                </div>
                <div className="relative z-10 origin-bottom scale-[0.84] sm:scale-90 lg:origin-center lg:scale-[0.96] xl:scale-100 lg:rotate-[5deg] ml-18 mt-10">
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

          <AboutSection />
          <DarkToLightTransition />
          <FeaturesSection />
          <CtaSection />
          <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
}
