"use client";

import { useState } from "react";
import { APP_STORE_URL } from "@/lib/site";

const ENDPOINT =
  process.env.NEXT_PUBLIC_WEB_REWRITE_URL ??
  "https://eercsucvxnszqletxued.supabase.co/functions/v1/web-rewrite";

const MAX_CHARS = 300;

const MODES = [
  { id: "keigo", label: "敬語にする", hint: "上司・取引先に送れる丁寧な文に" },
  { id: "mail", label: "メール文にする", hint: "ビジネスメールの本文の形に" },
  { id: "natural", label: "自然な言い方", hint: "かたすぎない、ちょうどいい丁寧さに" },
  { id: "reply", label: "返信文を作る", hint: "受け取ったメッセージへの返信を作成" },
] as const;

type ModeId = (typeof MODES)[number]["id"];

const SAMPLES: Record<ModeId, string> = {
  keigo: "明日の打ち合わせ、時間変えてもらえませんか。あと資料まだできてないです。",
  mail: "先週送った見積もりの返事がまだ来ていない。今週金曜までに返事がほしい。",
  natural: "その件、了解です。あとでやっておきます。",
  reply: "お疲れ様です。先日お願いしていた資料、進捗はいかがでしょうか？",
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; candidates: string[]; remaining: number }
  | { status: "error"; message: string; capped: boolean };

export function KeigoConverter({ initialMode = "keigo" }: { initialMode?: ModeId }) {
  const [mode, setMode] = useState<ModeId>(initialMode);
  const [text, setText] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const [copied, setCopied] = useState<number | null>(null);

  const over = text.length > MAX_CHARS;
  const canSubmit = text.trim().length > 0 && !over && state.status !== "loading";

  async function submit() {
    if (!canSubmit) return;
    setState({ status: "loading" });
    setCopied(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), mode }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setState({
          status: "error",
          message: payload?.error ?? "変換できませんでした。少し待ってからもう一度お試しください。",
          capped: payload?.code === "rate_limited",
        });
        return;
      }

      setState({
        status: "done",
        candidates: Array.isArray(payload?.candidates) ? payload.candidates : [],
        remaining: typeof payload?.remaining === "number" ? payload.remaining : 0,
      });
    } catch {
      setState({
        status: "error",
        message: "通信に失敗しました。接続を確認してもう一度お試しください。",
        capped: false,
      });
    }
  }

  async function copy(value: string, index: number) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(index);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable (http, older Safari) — the text stays selectable */
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_70px_-45px_rgba(24,24,26,0.4)]">
      {/* Mode picker */}
      <div className="flex gap-2 overflow-x-auto border-b border-black/[0.07] bg-[#FAFAFB] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setMode(m.id);
              setState({ status: "idle" });
            }}
            aria-pressed={mode === m.id}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
              mode === m.id
                ? "bg-[#18181A] text-white"
                : "bg-white text-black/55 ring-1 ring-black/10 hover:text-black"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="p-5 lg:p-7">
        <label htmlFor="keigo-input" className="block text-[13px] font-bold text-black">
          {mode === "reply" ? "受け取ったメッセージを貼り付けてください" : "書き直したい文章を入力してください"}
        </label>
        <p className="mt-1 text-[12.5px] leading-6 text-black/45">{MODES.find((m) => m.id === mode)?.hint}</p>

        <textarea
          id="keigo-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") submit();
          }}
          rows={5}
          placeholder={SAMPLES[mode]}
          className="mt-4 w-full resize-y rounded-2xl border border-black/12 bg-white px-4 py-3.5 text-[15px] leading-[1.85] text-black outline-none transition-colors placeholder:text-black/25 focus:border-[#A996F0] focus:ring-4 focus:ring-[#C8BCFA]/25"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[12px]">
            <span className={over ? "font-bold text-[#C0392B]" : "text-black/40"}>
              {text.length} / {MAX_CHARS}
            </span>
            <button
              type="button"
              onClick={() => {
                setText(SAMPLES[mode]);
                setState({ status: "idle" });
              }}
              className="font-semibold text-black/45 underline decoration-black/20 underline-offset-2 hover:text-black"
            >
              例文を入れる
            </button>
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            className="rounded-xl bg-[#18181A] px-6 py-3 text-[14px] font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-black/20"
          >
            {state.status === "loading" ? "変換中…" : "変換する（無料）"}
          </button>
        </div>

        {over ? (
          <p className="mt-3 text-[12.5px] font-semibold text-[#C0392B]">
            Web版は{MAX_CHARS}文字までです。長い文章はアプリでお試しください。
          </p>
        ) : null}

        {/* Results */}
        {state.status === "done" ? (
          <div className="mt-7">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">変換結果</span>
              <span className="text-[12px] text-black/40">本日の残り {state.remaining} 回</span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {state.candidates.map((candidate, index) => (
                <div key={index} className="rounded-2xl border border-black/10 bg-[#FAFAFB] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-[#5B4BA8]">
                      {index === 0 ? "候補1・標準" : "候補2・もう一段ていねい"}
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(candidate, index)}
                      className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-bold text-black ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white"
                    >
                      {copied === index ? "コピーしました" : "コピー"}
                    </button>
                  </div>
                  <p className="mt-2.5 whitespace-pre-wrap text-[15px] font-medium leading-[1.9] text-black">
                    {candidate}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#18181A] p-5 text-white">
              <p className="text-[14px] font-bold leading-[1.7]">
                コピーして貼り戻すのが手間だと感じたら、キーボードごと入れ替えられます。
              </p>
              <p className="mt-2 text-[12.5px] leading-7 text-white/55">
                敬語ボタンはiPhoneのキーボードアプリです。LINE・メール・Slackの入力欄でボタンを押すだけ。回数制限もコピペもありません。
              </p>
              <a
                href={APP_STORE_URL}
                className="mt-4 inline-block rounded-xl bg-[#C8BCFA] px-5 py-2.5 text-[13px] font-bold text-black"
              >
                App Storeで無料ダウンロード
              </a>
            </div>
          </div>
        ) : null}

        {state.status === "error" ? (
          <div
            className={`mt-6 rounded-2xl p-5 ${
              state.capped ? "bg-[#18181A] text-white" : "border border-[#C0392B]/25 bg-[#FDF3F2]"
            }`}
          >
            <p className={`text-[14px] font-bold leading-[1.7] ${state.capped ? "" : "text-[#C0392B]"}`}>
              {state.message}
            </p>
            {state.capped ? (
              <>
                <p className="mt-2 text-[12.5px] leading-7 text-white/55">
                  アプリ版のAI変換は回数制限がありません。キーボードに追加すれば、入力欄からそのまま使えます。
                </p>
                <a
                  href={APP_STORE_URL}
                  className="mt-4 inline-block rounded-xl bg-[#C8BCFA] px-5 py-2.5 text-[13px] font-bold text-black"
                >
                  App Storeで無料ダウンロード
                </a>
              </>
            ) : null}
          </div>
        ) : null}

        <p className="mt-6 border-t border-black/[0.07] pt-4 text-[11.5px] leading-6 text-black/40">
          入力した文章は変換のためにサーバーへ送信され、処理後は保存されません。無料枠は1日5回・300文字までです。生成結果は必ずご自身で確認してから送信してください。
        </p>
      </div>
    </div>
  );
}
