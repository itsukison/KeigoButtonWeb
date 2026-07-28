"use client";

import { useState } from "react";

/**
 * A 例文 block with a copy button. The whole point of these pages is that the
 * visitor leaves with a sendable message, so copying has to be one tap — not a
 * manual text selection across a multi-line email body on a phone.
 */
export function CopyableExample({
  to,
  body,
  note,
}: {
  to: string;
  body: string;
  note?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the text stays selectable */
    }
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] bg-[#FAFAFB] px-4 py-3">
        <span className="text-[12.5px] font-bold text-black">{to}</span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[11.5px] font-bold text-black ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white"
        >
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <div className="px-4 py-4">
        <p className="whitespace-pre-wrap text-[14.5px] leading-[1.95] text-black">{body}</p>
        {note ? (
          <p className="mt-4 border-t border-black/[0.07] pt-3.5 text-[12.5px] leading-7 text-black/50">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}
