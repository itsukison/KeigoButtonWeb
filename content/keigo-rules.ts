/**
 * Rule-based 敬語 checker patterns.
 *
 * Deliberately not AI: the check runs entirely in the browser so the page can
 * promise the text is never transmitted, it is instant, and it costs nothing to
 * serve. That trade means it only catches *lexical* errors — fixed wordings
 * that are wrong regardless of context. Anything needing to know who performs
 * the action (身内敬語, 尊敬語/謙譲語 mix-ups) cannot be判定 here and is left to
 * the AI rewrite instead. Never widen these patterns into guesswork; a false
 * positive on this page destroys its credibility.
 */
export type Severity = "error" | "warn" | "info";

export type Rule = {
  id: string;
  /** Matched against the raw input. */
  pattern: RegExp;
  label: string;
  severity: Severity;
  category: "二重敬語" | "誤用" | "使い分け" | "表記";
  /** Replacement suggestions, best first. */
  suggest: string[];
  why: string;
};

export const RULES: Rule[] = [
  // ---- 二重敬語（尊敬語の重複）: 「お/ご〜になる」+ られる ----
  {
    id: "oyomi-ninareru",
    pattern: /お読みになられ/g,
    label: "お読みになられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["お読みになる", "読まれる"],
    why: "「お読みになる」で尊敬語が完成しているため、「られる」を重ねると二重敬語になります。",
  },
  {
    id: "goran-ninareru",
    pattern: /ご覧になられ/g,
    label: "ご覧になられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["ご覧になる"],
    why: "「ご覧になる」で尊敬語が完成しています。「られる」は不要です。",
  },
  {
    id: "ossharareru",
    pattern: /おっしゃられ/g,
    label: "おっしゃられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["おっしゃる", "言われる"],
    why: "「おっしゃる」がすでに尊敬語です。「られる」を足すと二重敬語になります。",
  },
  {
    id: "okaeri-ninareru",
    pattern: /お帰りになられ/g,
    label: "お帰りになられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["お帰りになる", "帰られる"],
    why: "「お帰りになる」で尊敬語が完成しています。",
  },
  {
    id: "omie-ninareru",
    pattern: /お見えになられ/g,
    label: "お見えになられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["お見えになる"],
    why: "「お見えになる」で尊敬語が完成しています。",
  },
  {
    id: "omeshiagari-ninaru",
    pattern: /お召し上がりになら?れ/g,
    label: "お召し上がりになられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["召し上がる", "お召し上がりください"],
    why: "「召し上がる」がすでに尊敬語です。「お〜になられる」を重ねると三重になります。",
  },
  {
    id: "goshusseki-ninareru",
    pattern: /ご出席になられ/g,
    label: "ご出席になられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["ご出席になる", "出席される"],
    why: "「ご出席になる」で尊敬語が完成しています。",
  },
  {
    id: "osuwari-ninareru",
    pattern: /お座りになられ/g,
    label: "お座りになられる",
    severity: "error",
    category: "二重敬語",
    suggest: ["お座りになる", "お掛けください"],
    why: "「お座りになる」で尊敬語が完成しています。",
  },

  // ---- 二重敬語（謙譲語の重複）----
  {
    id: "haiken-sasete",
    pattern: /拝見させていただ/g,
    label: "拝見させていただく",
    severity: "warn",
    category: "二重敬語",
    suggest: ["拝見しました", "拝見します"],
    why: "「拝見」はそれだけで謙譲語です。「させていただく」を重ねると冗長になります。",
  },
  {
    id: "haidoku-sasete",
    pattern: /拝読させていただ/g,
    label: "拝読させていただく",
    severity: "warn",
    category: "二重敬語",
    suggest: ["拝読しました"],
    why: "「拝読」がすでに謙譲語です。",
  },
  {
    id: "chodai-sasete",
    pattern: /頂戴させていただ/g,
    label: "頂戴させていただく",
    severity: "warn",
    category: "二重敬語",
    suggest: ["頂戴します", "いただきます"],
    why: "「頂戴する」がすでに謙譲語です。",
  },
  {
    id: "go-haiken",
    pattern: /ご拝見/g,
    label: "ご拝見",
    severity: "error",
    category: "誤用",
    suggest: ["拝見"],
    why: "「拝見」は謙譲語なので、「ご」を付けません。",
  },
  {
    id: "ouagai-itashi",
    pattern: /お伺いいたし/g,
    label: "お伺いいたします",
    severity: "info",
    category: "二重敬語",
    suggest: ["伺います", "お伺いします"],
    why: "厳密には二重敬語ですが、慣用として広く許容されています（文化庁「敬語の指針」）。そのまま使っても差し支えありません。",
  },
  {
    id: "moshiagesasete",
    pattern: /申し上げさせていただ/g,
    label: "申し上げさせていただく",
    severity: "warn",
    category: "二重敬語",
    suggest: ["申し上げます"],
    why: "「申し上げる」がすでに謙譲語です。",
  },

  // ---- 敬称・丁寧語の重複 ----
  {
    id: "onamae-sama",
    pattern: /お名前様/g,
    label: "お名前様",
    severity: "error",
    category: "二重敬語",
    suggest: ["お名前"],
    why: "「お」と「様」で敬語が重複しています。",
  },
  {
    id: "ono-hou",
    pattern: /のほうでございま/g,
    label: "〜のほうでございます",
    severity: "warn",
    category: "誤用",
    suggest: ["でございます"],
    why: "「のほう」は方向や比較を表す語で、丁寧さは加わりません。省くほうが明確です。",
  },
  {
    id: "yoroshikatta",
    pattern: /よろしかったでしょうか/g,
    label: "よろしかったでしょうか",
    severity: "warn",
    category: "誤用",
    suggest: ["よろしいでしょうか"],
    why: "過去のことでなければ現在形が正しい形です。接客敬語として広まった言い方ですが、ビジネス文書では避けます。",
  },
  {
    id: "sama-dono",
    pattern: /様(?:殿|どの)/g,
    label: "様殿",
    severity: "error",
    category: "二重敬語",
    suggest: ["様", "殿"],
    why: "敬称を重ねて使うことはできません。どちらか一方にします。",
  },
  {
    id: "kakuisama",
    pattern: /各位様|各位殿/g,
    label: "各位様／各位殿",
    severity: "error",
    category: "二重敬語",
    suggest: ["各位"],
    why: "「各位」自体に敬意が含まれるため、敬称を重ねません。",
  },

  // ---- ビジネスでの誤用 ----
  {
    id: "ryokai-shimashita",
    pattern: /了解(?:しました|です|いたしました)/g,
    label: "了解しました",
    severity: "info",
    category: "使い分け",
    suggest: ["承知しました", "承知いたしました", "かしこまりました"],
    why: "誤りではありませんが敬意の度合いが弱いため、目上の相手には「承知しました」が一般的です。同僚・後輩には問題ありません。",
  },
  {
    id: "gokurousama",
    pattern: /ご苦労(?:様|さま)/g,
    label: "ご苦労様",
    severity: "warn",
    category: "使い分け",
    suggest: ["お疲れ様です", "ありがとうございます"],
    why: "「ご苦労様」は上位者が下位者に使う言葉です。目上の相手には「お疲れ様です」を使います。",
  },
  {
    id: "tondemogozaimasen",
    pattern: /とんでもございません/g,
    label: "とんでもございません",
    severity: "warn",
    category: "誤用",
    suggest: ["とんでもないことでございます", "恐れ入ります"],
    why: "「とんでもない」は一語の形容詞なので、「ない」だけを「ございません」に置き換えることはできません。ただし慣用として定着しつつある表現です。",
  },
  {
    id: "okagesama-de",
    pattern: /お世話様/g,
    label: "お世話様",
    severity: "warn",
    category: "使い分け",
    suggest: ["お世話になっております", "ありがとうございます"],
    why: "「お世話様」はややくだけた言い方です。ビジネス文書では「お世話になっております」が標準です。",
  },
  {
    id: "shimeshiawase",
    pattern: /させて頂/g,
    label: "させて頂く（漢字表記）",
    severity: "info",
    category: "表記",
    suggest: ["させていただく"],
    why: "補助動詞の「いただく」はひらがな表記が公用文の基準です（「頂く」は本動詞のとき）。",
  },
  {
    id: "shitekudasai-onegai",
    pattern: /ご[一-龯ぁ-ん]+していただけ/g,
    label: "ご〜していただく",
    severity: "warn",
    category: "誤用",
    suggest: ["ご〜いただく"],
    why: "「ご参加していただく」のように「ご」と「して」を併用すると不自然になります。「ご参加いただく」が正しい形です。",
  },
  {
    id: "moshiwakearimasen-de",
    pattern: /すいません/g,
    label: "すいません",
    severity: "warn",
    category: "表記",
    suggest: ["すみません", "申し訳ございません"],
    why: "「すいません」は口語です。文章では「すみません」、ビジネスでは「申し訳ございません」を使います。",
  },
  {
    id: "atamaosage",
    pattern: /大丈夫(?:です|でしょうか)か?[?？]?/g,
    label: "大丈夫です／大丈夫でしょうか",
    severity: "info",
    category: "使い分け",
    suggest: ["問題ございません", "差し支えございません", "よろしいでしょうか"],
    why: "肯定か否定かが曖昧になりやすい表現です。ビジネスでは意味を明確にした言い方が安全です。",
  },
  {
    id: "nanigashika",
    pattern: /取り急ぎ[、。]?$/gm,
    label: "「取り急ぎ」で文が終わっている",
    severity: "info",
    category: "表記",
    suggest: ["取り急ぎご連絡いたします", "取り急ぎご報告まで"],
    why: "「取り急ぎ」は副詞なので、後ろに動作を続けます。",
  },
  {
    id: "hitotsu-yoroshiku",
    pattern: /一つよろしく/g,
    label: "一つよろしく",
    severity: "warn",
    category: "使い分け",
    suggest: ["よろしくお願いいたします", "何卒よろしくお願いいたします"],
    why: "くだけた言い方です。ビジネス文書では避けます。",
  },
];

export type Finding = {
  rule: Rule;
  /** Match offsets so the UI can point at the exact span. */
  hits: { start: number; end: number; text: string }[];
};

export function checkKeigo(text: string): Finding[] {
  const findings: Finding[] = [];

  for (const rule of RULES) {
    const hits: Finding["hits"] = [];
    // Rules carry the global flag; reset lastIndex so repeated calls on the
    // same module-level RegExp objects don't skip early matches.
    rule.pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = rule.pattern.exec(text)) !== null) {
      hits.push({ start: match.index, end: match.index + match[0].length, text: match[0] });
      if (match[0].length === 0) rule.pattern.lastIndex += 1;
    }
    if (hits.length > 0) findings.push({ rule, hits });
  }

  const weight: Record<Severity, number> = { error: 0, warn: 1, info: 2 };
  return findings.sort((a, b) => weight[a.rule.severity] - weight[b.rule.severity]);
}
