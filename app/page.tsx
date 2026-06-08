import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-24 md:pt-32 pb-20 md:pb-28">
        <p className="text-[12px] tracking-[0.2em] text-[var(--muted)] uppercase mb-6">
          For iOS
        </p>
        <h1 className="text-[44px] md:text-[64px] leading-[1.08] font-semibold tracking-tight">
          書くを、整える。
          <br />
          打つは、自由に。
        </h1>
        <p className="mt-8 max-w-xl text-[16px] md:text-[17px] text-[var(--muted)] leading-[1.9]">
          AIキーボードは、日本語入力のための iOS キーボードアプリです。
          AI ボタンをタップした時だけ文章を整え、それ以外の入力は記録しません。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border-y border-[var(--border)]">
        <FeatureCell
          label="01"
          title="ネイティブな日本語入力"
          body="ローマ字・かな変換、学習機能、候補表示。違和感のない標準キーボード体験。"
        />
        <FeatureCell
          label="02"
          title="必要な時だけ AI"
          body="敬語・メール・要約・翻訳。ボタンをタップした文章だけが処理されます。"
        />
        <FeatureCell
          label="03"
          title="プライバシー第一"
          body="すべての打鍵を記録することはありません。送信されるのは選択した文章のみ。"
        />
      </section>

      <section className="py-24 md:py-32">
        <h2 className="text-[22px] md:text-[24px] font-semibold tracking-tight mb-10">
          サポート情報
        </h2>
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <LegalLink href="/privacy" label="プライバシーポリシー" />
          <LegalLink href="/terms" label="利用規約" />
          <LegalLink href="/support" label="サポート・よくある質問" />
        </ul>
      </section>
    </div>
  );
}

function FeatureCell({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white p-8 md:p-10">
      <div className="text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase mb-6">
        {label}
      </div>
      <h3 className="text-[17px] font-semibold mb-3 tracking-tight">{title}</h3>
      <p className="text-[14px] text-[var(--muted)] leading-[1.9]">{body}</p>
    </div>
  );
}

function LegalLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between py-6 group"
      >
        <span className="text-[16px]">{label}</span>
        <span
          aria-hidden
          className="text-[var(--muted)] group-hover:text-black transition-colors"
        >
          →
        </span>
      </Link>
    </li>
  );
}
