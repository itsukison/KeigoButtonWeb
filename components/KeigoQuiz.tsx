"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QUIZ, scoreBand } from "@/content/quiz";
import { APP_STORE_URL } from "@/lib/site";

export function KeigoQuiz() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = QUIZ[index];
  const correct = useMemo(
    () => answers.filter((choice, i) => choice === QUIZ[i].answer).length,
    [answers],
  );

  const weakTags = useMemo(() => {
    if (!finished) return [];
    const missed = new Map<string, number>();
    answers.forEach((choice, i) => {
      if (choice !== QUIZ[i].answer) {
        missed.set(QUIZ[i].tag, (missed.get(QUIZ[i].tag) ?? 0) + 1);
      }
    });
    return [...missed.entries()].sort((a, b) => b[1] - a[1]);
  }, [answers, finished]);

  function next() {
    if (picked === null) return;
    const updated = [...answers, picked];
    setAnswers(updated);
    setPicked(null);
    if (index + 1 >= QUIZ.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const band = scoreBand(correct);
    return (
      <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_70px_-45px_rgba(24,24,26,0.4)]">
        <div className="bg-[#18181A] p-7 text-center text-white lg:p-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C8BCFA]">結果</span>
          <p className="mt-4 font-display text-[52px] font-bold leading-none lg:text-[68px]">
            {correct}
            <span className="text-[26px] font-semibold text-white/40 lg:text-[32px]">/{QUIZ.length}</span>
          </p>
          <p className="mt-4 font-display text-[20px] font-semibold lg:text-[24px]">{band.label}</p>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-[1.9] text-white/60">{band.note}</p>
        </div>

        <div className="p-5 lg:p-7">
          {weakTags.length > 0 ? (
            <div className="rounded-2xl border border-black/10 bg-[#FAFAFB] p-5">
              <span className="text-[12px] font-bold text-black/45">間違いが多かった分野</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {weakTags.map(([tag, count]) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-[12.5px] font-bold text-black ring-1 ring-black/10">
                    {tag} {count}問
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-[#F5FBF6] p-5">
              <p className="text-[14px] font-bold text-[#1E7A42]">全問正解です。</p>
              <p className="mt-2 text-[13px] leading-7 text-black/55">
                尊敬語と謙譲語の切り替え、二重敬語、身内敬語のすべてを判別できています。
              </p>
            </div>
          )}

          <h3 className="mt-8 font-display text-[17px] font-semibold text-black">全問の解説</h3>
          <div className="mt-4 flex flex-col gap-3">
            {QUIZ.map((item, i) => {
              const chosen = answers[i];
              const right = chosen === item.answer;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 ${
                    right ? "border-black/10 bg-white" : "border-[#C0392B]/20 bg-[#FDF3F2]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                        right ? "bg-[#1E7A42]" : "bg-[#C0392B]"
                      }`}
                      aria-label={right ? "正解" : "不正解"}
                    >
                      {right ? "○" : "×"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-black/40">
                        Q{i + 1}・{item.scene}
                      </p>
                      <p className="mt-1 text-[14px] font-bold leading-[1.7] text-black">{item.prompt}</p>
                      <p className="mt-2 text-[13.5px] leading-[1.8] text-black/70">
                        <span className="font-bold text-black">正解：</span>
                        {item.choices[item.answer]}
                      </p>
                      {!right && typeof chosen === "number" ? (
                        <p className="mt-1 text-[13px] leading-[1.8] text-[#C0392B]">
                          あなたの回答：{item.choices[chosen]}
                        </p>
                      ) : null}
                      <p className="mt-2 text-[13px] leading-[1.9] text-black/55">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-[#18181A] p-5 text-white">
            <p className="text-[15px] font-bold leading-[1.7]">覚えなくても、送る前に整えられます。</p>
            <p className="mt-2 text-[12.5px] leading-7 text-white/55">
              敬語ボタンはiPhoneのキーボードアプリです。LINE・メール・Slackの入力欄でボタンを押すと、書いた文章をAIが自然な敬語に書き直します。
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href={APP_STORE_URL} className="rounded-xl bg-[#C8BCFA] px-5 py-2.5 text-[13px] font-bold text-black">
                App Storeで無料ダウンロード
              </a>
              <Link
                href="/keigo-henkan"
                className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/65 ring-1 ring-white/15"
              >
                ブラウザで試す
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={restart}
            className="mt-5 w-full rounded-xl border border-black/12 py-3 text-[13.5px] font-bold text-black/60 transition-colors hover:text-black"
          >
            もう一度挑戦する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_70px_-45px_rgba(24,24,26,0.4)]">
      <div className="border-b border-black/[0.07] bg-[#FAFAFB] px-5 py-4 lg:px-7">
        <div className="flex items-center justify-between text-[12px] font-bold">
          <span className="text-black/45">
            第 {index + 1} 問 / {QUIZ.length}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] text-black/45 ring-1 ring-black/10">
            {question.tag}
          </span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/[0.08]">
          <div
            className="h-full rounded-full bg-[#C8BCFA] transition-[width] duration-300"
            style={{ width: `${(index / QUIZ.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 lg:p-7">
        <p className="text-[12.5px] font-semibold leading-6 text-[#5B4BA8]">{question.scene}</p>
        <h2 className="mt-2.5 font-display text-[19px] font-semibold leading-[1.55] text-black lg:text-[22px]">
          {question.prompt}
        </h2>

        <div className="mt-6 flex flex-col gap-2.5">
          {question.choices.map((choice, choiceIndex) => (
            <button
              key={choiceIndex}
              type="button"
              onClick={() => setPicked(choiceIndex)}
              aria-pressed={picked === choiceIndex}
              className={`rounded-2xl border px-4 py-3.5 text-left text-[14.5px] leading-[1.75] transition-colors ${
                picked === choiceIndex
                  ? "border-[#18181A] bg-[#18181A] font-bold text-white"
                  : "border-black/12 bg-white font-medium text-black/75 hover:border-black/30"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={picked === null}
          className="mt-6 w-full rounded-xl bg-[#18181A] py-3.5 text-[14px] font-bold text-white transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-black/20"
        >
          {index + 1 >= QUIZ.length ? "結果を見る" : "次の問題へ"}
        </button>
        <p className="mt-3 text-center text-[11.5px] text-black/35">
          解説は最後にまとめて表示されます
        </p>
      </div>
    </div>
  );
}
