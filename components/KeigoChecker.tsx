"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { checkKeigo, type Severity } from "@/content/keigo-rules";

const SAMPLE =
  "先日お送りした資料をお読みになられましたでしょうか。ご不明な点がございましたら、お名前様とご所属をお伺いいたしますので、ご連絡ください。内容は拝見させていただきました。了解しました。";

const SEVERITY: Record<Severity, { label: string; dot: string; chip: string }> = {
  error: { label: "誤り", dot: "bg-[#C0392B]", chip: "bg-[#FDF3F2] text-[#C0392B]" },
  warn: { label: "要注意", dot: "bg-[#D68910]", chip: "bg-[#FEF8EC] text-[#96650B]" },
  info: { label: "参考", dot: "bg-[#5B4BA8]", chip: "bg-[#F1EEFC] text-[#5B4BA8]" },
};

export function KeigoChecker() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const findings = useMemo(() => (checked && text.trim() ? checkKeigo(text) : []), [checked, text]);

  const counts = useMemo(() => {
    const base: Record<Severity, number> = { error: 0, warn: 0, info: 0 };
    for (const finding of findings) base[finding.rule.severity] += finding.hits.length;
    return base;
  }, [findings]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_70px_-45px_rgba(24,24,26,0.4)]">
      <div className="p-5 lg:p-7">
        <label htmlFor="check-input" className="block text-[13px] font-bold text-black">
          チェックしたい文章を貼り付けてください
        </label>
        <p className="mt-1 text-[12.5px] leading-6 text-black/45">
          判定はこのページの中だけで行われます。文章は送信されません。
        </p>

        <textarea
          id="check-input"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (checked) setChecked(false);
          }}
          rows={6}
          placeholder={SAMPLE}
          className="mt-4 w-full resize-y rounded-2xl border border-black/12 bg-white px-4 py-3.5 text-[15px] leading-[1.85] text-black outline-none transition-colors placeholder:text-black/25 focus:border-[#A996F0] focus:ring-4 focus:ring-[#C8BCFA]/25"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[12px]">
            <span className="text-black/40">{text.length} 文字</span>
            <button
              type="button"
              onClick={() => {
                setText(SAMPLE);
                setChecked(false);
              }}
              className="font-semibold text-black/45 underline decoration-black/20 underline-offset-2 hover:text-black"
            >
              例文を入れる
            </button>
          </div>
          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={text.trim().length === 0}
            className="rounded-xl bg-[#18181A] px-6 py-3 text-[14px] font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-black/20"
          >
            チェックする
          </button>
        </div>

        {checked ? (
          <div className="mt-7 border-t border-black/[0.07] pt-6">
            {findings.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-[#F5FBF6] p-5">
                <p className="text-[14px] font-bold text-[#1E7A42]">
                  登録されている二重敬語・誤用は見つかりませんでした。
                </p>
                <p className="mt-2 text-[13px] leading-7 text-black/55">
                  このチェックは決まった言い回しの誤りだけを見ます。「誰の動作か」で変わる誤り（社外に自社の上司を尊敬語で言う、相手の動作に謙譲語を使う等）は判定できません。文章全体を整えたい場合は
                  <Link href="/keigo-henkan" className="font-semibold underline decoration-black/25 underline-offset-2">
                    敬語変換ツール
                  </Link>
                  をお使いください。
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">検出結果</span>
                  {(["error", "warn", "info"] as Severity[])
                    .filter((severity) => counts[severity] > 0)
                    .map((severity) => (
                      <span
                        key={severity}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${SEVERITY[severity].chip}`}
                      >
                        {SEVERITY[severity].label} {counts[severity]}
                      </span>
                    ))}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {findings.map(({ rule, hits }) => (
                    <div key={rule.id} className="rounded-2xl border border-black/10 bg-[#FAFAFB] p-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 shrink-0 rounded-full ${SEVERITY[rule.severity].dot}`}
                        />
                        <span className="text-[14.5px] font-bold text-black">{rule.label}</span>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black/45 ring-1 ring-black/10">
                          {rule.category}
                        </span>
                        {hits.length > 1 ? (
                          <span className="text-[11.5px] text-black/40">{hits.length}箇所</span>
                        ) : null}
                      </div>

                      <p className="mt-2.5 text-[13.5px] leading-[1.9] text-black/65">{rule.why}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[11.5px] font-bold text-black/40">言い換え候補</span>
                        {rule.suggest.map((suggestion) => (
                          <span
                            key={suggestion}
                            className="rounded-lg bg-white px-2.5 py-1.5 text-[12.5px] font-bold text-black ring-1 ring-black/10"
                          >
                            {suggestion}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-[#18181A] p-5 text-white">
                  <p className="text-[14px] font-bold leading-[1.7]">
                    指摘を反映した文にまとめて書き直すこともできます。
                  </p>
                  <p className="mt-2 text-[12.5px] leading-7 text-white/55">
                    このチェックは決まった言い回しだけを見ます。文全体の丁寧さや、誰の動作かで変わる敬語を直したい場合は、AIによる書き直しのほうが確実です。
                  </p>
                  <Link
                    href="/keigo-henkan"
                    className="mt-4 inline-block rounded-xl bg-[#C8BCFA] px-5 py-2.5 text-[13px] font-bold text-black"
                  >
                    敬語変換ツールで書き直す
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
