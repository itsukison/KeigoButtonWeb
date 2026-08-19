import type { Block } from "@/lib/blocks";

export type MacUseCaseLang = "ja" | "en";

export type LocalizedMacUseCase = {
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  published: string;
  updated: string;
  lead: string;
  category: string;
  minutes: number;
  relatedLinks: readonly { href: string; title: string; note: string }[];
  blocks: readonly Block[];
  faq: readonly { q: string; a: string }[];
};

export type MacUseCase = {
  slug: "reply-assistant" | "custom-rewrite-prompts";
  ja: LocalizedMacUseCase;
  en: LocalizedMacUseCase;
};

export const MAC_USE_CASES: readonly MacUseCase[] = [
  {
    slug: "reply-assistant",
    ja: {
      title: "Macで受信メッセージから返信文を作るAIアシスタント",
      metaTitle: "MacのAI返信アシスタント｜メール・Slackの返信をその場で作成",
      description:
        "受信メッセージを明示的にコピーし、Mail・Slack・Gmailなどの返信欄で内容に沿った返事を作成。画面を読み取らず、返信文を別のAIチャットからコピーし直す必要もありません。",
      keywords: [
        "Mac AI 返信",
        "メール 返信 AI",
        "Slack 返信 AI",
        "AI 返信アシスタント",
      ],
      published: "2026-08-19",
      updated: "2026-08-19",
      category: "Macの使い方",
      minutes: 6,
      relatedLinks: [
        {
          href: "/keigo-henkan",
          title: "無料の敬語変換ツール",
          note: "登録不要のブラウザツール",
        },
        {
          href: "/blog/chatgpt-keigo-henkan",
          title: "ChatGPTで敬語を自然に直す方法",
          note: "AIチャットでの書き換え方",
        },
      ],
      lead:
        "敬語ボタン Mac版は、コピーした受信メッセージを文脈にして、いま開いている返信欄へ返事を作るAI返信アシスタントです。受信文は自分でコピーするため、アプリが画面全体や受信箱を勝手に読むことはありません。",
      blocks: [
        {
          type: "h2",
          id: "answer",
          text: "何ができるのか",
        },
        {
          type: "p",
          text:
            "Mail、Slack、Gmail、LinkedInなどで届いた短いメッセージに返すとき、受信文をコピーして返信欄へカーソルを置きます。必要なら「来週火曜を提案」「断るが代案を出す」のような方針を入力し、画面下のバーを使うと、受信内容と方針を踏まえた返信文が作られます。結果を確認してから同じ入力欄へ挿入できます。",
        },
        {
          type: "callout",
          title: "先に結論",
          text:
            "向いているのは、返す内容は決まっているものの、言葉遣い・英語・断り方・日程調整で毎回手が止まる人です。長い相談をAIと何往復もして考えたい場合は、ChatGPTのような対話型ツールのほうが適しています。",
        },
        {
          type: "h2",
          id: "steps",
          text: "返信を作る3つの手順",
        },
        {
          type: "ol",
          items: [
            "**受信メッセージをコピーする。** コピーが「この文への返信を作る」という明示的な合図になります。",
            "**返信欄にカーソルを置く。** 空欄のままでも、短い方針を先に書いても構いません。",
            "**画面下のバーから返信を作る。** 候補を確認し、挿入できる入力欄ならその場へ入れます。挿入できない欄ではコピーを選べます。",
          ],
        },
        {
          type: "p",
          text:
            "返信のために受信文をコピーする操作は残ります。ただし、ChatGPTを開き、依頼文を書き、生成結果をもう一度コピーして元のアプリへ戻る往復は不要です。返信文が必要な場所を作業場所のままにできます。",
        },
        {
          type: "h2",
          id: "examples",
          text: "仕事での返信例",
        },
        {
          type: "h3",
          text: "取引先からの日程変更",
        },
        {
          type: "rewrite",
          before:
            "明日の打ち合わせですが、16時に変更できますでしょうか。難しければ来週でも構いません。",
          after:
            "ご連絡ありがとうございます。明日16時で問題ございません。こちらで予定を変更いたしますので、どうぞよろしくお願いいたします。",
          note:
            "受信文をコピーし、返信欄で「16時で了承」とだけ方針を入れた場合の例です。実際の候補は文脈や指示によって変わります。",
        },
        {
          type: "h3",
          text: "Slackで進捗を確認されたとき",
        },
        {
          type: "rewrite",
          before:
            "このタスク、今日中にレビューへ出せそうですか？ ブロッカーがあれば教えてください。",
          after:
            "はい、本日17時までにレビューへ出す予定です。現時点でブロッカーはありません。遅れが見込まれる場合は早めに共有します。",
          note:
            "返信欄に「17時まで、ブロッカーなし」と書いてから作成した例です。AIに任せきらず、事実は自分で与えて確認します。",
        },
        {
          type: "h2",
          id: "context",
          text: "使う文脈と、使わない情報",
        },
        {
          type: "table",
          head: ["情報", "返信に使うか", "扱い"],
          rows: [
            ["自分でコピーした受信文", "使う", "返信対象として明示的に渡した文脈"],
            ["返信欄に書いた方針", "使う", "日程、可否、トーンなど返信へ反映"],
            ["画面上のほかの文章", "使わない", "画面全体を読み取らない"],
            ["ほかのメールやスレッド", "使わない", "受信箱や履歴を自動で巡回しない"],
          ],
          caption:
            "必要な文脈をユーザーが選ぶ仕組みです。コピーする前に機密情報や不要な署名が含まれていないか確認してください。",
        },
        {
          type: "h2",
          id: "comparison",
          text: "ChatGPTやメール専用AIとの違い",
        },
        {
          type: "p",
          text:
            "ChatGPTは、背景を説明しながら長い文章を一緒に組み立てたり、複数案を対話で詰めたりする作業に向いています。敬語ボタンは、返信する場所と意図がすでに決まっていて、短い返事をその場で完成させたい場面に向いています。目的はAIチャットを置き換えることではなく、毎回のアプリ切り替えを減らすことです。",
        },
        {
          type: "p",
          text:
            "メールサービスに組み込まれたAIは、そのサービス内では受信文を自動で参照できる場合があります。一方、敬語ボタンは特定の受信箱へ接続せず、コピーした文を使うため、Mail、ブラウザ、Slackなど異なる入力欄で同じ流れを使えます。その代わり、返信対象を一度コピーする必要があります。",
        },
        {
          type: "h2",
          id: "fit",
          text: "向いている人と、導入前に知ること",
        },
        {
          type: "ul",
          items: [
            "営業、カスタマーサポート、採用、PM、業務担当など、短い仕事の返信を何度も書く",
            "日本語の敬語だけでなく、自然な英語、やわらかい断り方、簡潔な返事を繰り返し整える",
            "Mail、Slack、Gmail、ブラウザなど複数のアプリをまたいで返信する",
            "macOS 14以降を使い、ほかのアプリの入力欄を扱うためのアクセシビリティ権限を許可できる",
          ],
        },
        {
          type: "p",
          text:
            "管理された会社支給Macでは、アクセシビリティ権限が禁止されていることがあります。また、Windows版、端末内だけで完結するモード、BYOK（自分のAPIキーを使う方式）はありません。送信前には、日付・金額・約束・固有名詞を必ず自分で確認してください。",
        },
        {
          type: "tool",
          href: "/mac/custom-rewrite-prompts",
          label: "自分の書き換えボタンと自由な指示の使い方",
          note: "返信以外の文章を、選択範囲・入力欄全体・空欄から扱う方法です。",
        },
      ],
      faq: [
        {
          q: "敬語ボタンは画面や受信箱を自動で読み取りますか？",
          a: "いいえ。返信の文脈になるのは、ユーザーが明示的にコピーした受信メッセージです。画面全体、受信箱、別のスレッドを自動で読み取る仕組みではありません。",
        },
        {
          q: "返信するときもコピー＆ペーストは必要ですか？",
          a: "受信メッセージを文脈として渡すため、最初のコピーは必要です。生成した返信は結果を確認したあと、対応する入力欄ならその場へ挿入できるため、AIチャットから結果をコピーして戻る往復は省けます。",
        },
        {
          q: "空の返信欄でも使えますか？",
          a: "使えます。受信文をコピーして返信欄へカーソルを置けば返信を作れます。返信に必ず含めたい日程や可否があれば、短い方針を先に書いてください。",
        },
        {
          q: "どのMacで使えますか？",
          a: "macOS 14以降のAppleシリコン搭載MacとIntel Macに対応します。ほかのアプリのテキストを読み書きするため、macOSのアクセシビリティ権限が必要です。",
        },
        {
          q: "無料で試せますか？",
          a: "Mac版は月50回まで無料で試せます。Proは月1,000回までです。無料利用にカード登録は必要ありません。",
        },
      ],
    },
    en: {
      title: "AI Reply Assistant for Mac — Draft Replies in Any App",
      metaTitle: "AI Reply Assistant for Mac | Draft Replies in Mail, Slack and More",
      description:
        "Copy an incoming message, focus the reply field, and draft a context-aware response in Mail, Slack, Gmail or another Mac app. KeigoButton does not read your screen.",
      keywords: [
        "AI reply assistant Mac",
        "AI email reply Mac",
        "Slack reply assistant",
        "draft replies any app Mac",
      ],
      published: "2026-08-19",
      updated: "2026-08-19",
      category: "Mac workflows",
      minutes: 6,
      relatedLinks: [
        {
          href: "/en/rewrite-text-any-app-mac",
          title: "How to rewrite text in any Mac app",
          note: "Mac workflow guide",
        },
        {
          href: "/en/ai-writing-apps-mac",
          title: "AI writing apps for Mac compared",
          note: "Category guide",
        },
      ],
      lead:
        "KeigoButton for Mac turns an incoming message you explicitly copy into a complete reply in the field where you need it. It uses the copied message as context; it does not scan your screen or connect to your inbox.",
      blocks: [
        { type: "h2", id: "answer", text: "What the Mac reply assistant does" },
        {
          type: "p",
          text:
            "When a short message arrives in Mail, Slack, Gmail, LinkedIn, or another app, copy it and focus the reply field. You can leave the field empty or add guidance such as “accept and suggest Tuesday” or “decline politely with an alternative.” Use the bar at the bottom of the screen, review the result, and insert it into the same field when that field supports insertion.",
        },
        {
          type: "callout",
          title: "The short answer",
          text:
            "It is for people who already know the substance of their reply but repeatedly pause over tone, grammar, brevity, or natural English. If you want to plan a long document through an extended conversation, a chat assistant is the better tool.",
        },
        { type: "h2", id: "steps", text: "The three-step reply workflow" },
        {
          type: "ol",
          items: [
            "**Copy the incoming message.** Copying is the explicit signal that this is the context for a reply.",
            "**Focus the reply field.** Leave it empty, or type a few facts and constraints the response must follow.",
            "**Create the reply from the bottom bar.** Review the draft, then insert it in place. If the field cannot be written to, KeigoButton offers a copy action instead.",
          ],
        },
        {
          type: "p",
          text:
            "There is still one deliberate copy: the incoming message. What disappears is the rest of the round trip—opening ChatGPT, explaining the task, copying its answer, returning to the original app, and pasting. The place where you reply remains the place where you work.",
        },
        { type: "h2", id: "examples", text: "Examples from everyday work" },
        { type: "h3", text: "A client asks to move a meeting" },
        {
          type: "rewrite",
          before:
            "Would it be possible to move tomorrow’s call to 4pm? If not, next week works for me too.",
          after:
            "Thanks for letting me know. Tomorrow at 4pm works for me, and I’ve updated the calendar invite. Speak then.",
          note:
            "Example after copying the message and adding “accept 4pm” in the reply field. Actual drafts vary with your context and instruction.",
        },
        { type: "h3", text: "A teammate asks for a status update" },
        {
          type: "rewrite",
          before:
            "Do you think this will be ready for review today? Let me know if anything is blocked.",
          after:
            "Yes—I’m on track to send it for review by 5pm today. There are no blockers at the moment, and I’ll flag any change early.",
          note:
            "Example after adding the facts “by 5pm, no blockers.” The user—not the model—must supply and verify commitments.",
        },
        { type: "h2", id: "context", text: "What context it uses—and what it does not" },
        {
          type: "table",
          head: ["Information", "Used?", "How it is handled"],
          rows: [
            ["Incoming message you copy", "Yes", "Explicit context for the reply"],
            ["Guidance in the reply field", "Yes", "Facts, decision and tone for the response"],
            ["Other text visible on screen", "No", "KeigoButton does not scan the screen"],
            ["Other emails or threads", "No", "It does not crawl an inbox or conversation history"],
          ],
          caption:
            "You choose the context. Before copying, check whether the message contains confidential details or an irrelevant signature you should remove.",
        },
        { type: "h2", id: "comparison", text: "How it differs from ChatGPT and inbox AI" },
        {
          type: "p",
          text:
            "ChatGPT is better when you need to explain broad background, explore several directions, and refine a long answer through conversation. KeigoButton is designed for the narrower moment when the destination and intent are already clear and you want to finish a short reply without leaving that destination. It complements a chat assistant rather than replacing one.",
        },
        {
          type: "p",
          text:
            "AI built into an email service may be able to read message context automatically inside that service. KeigoButton does not connect to an inbox. Its copied-context workflow is more deliberate and works across Mail, a browser, Slack, and other text fields, but it requires you to copy the message first.",
        },
        { type: "h2", id: "fit", text: "Who it fits and what to know first" },
        {
          type: "ul",
          items: [
            "Sales, support, recruiting, operations, founders, and product teams writing many short replies",
            "Non-native English professionals who know the intended answer but repeatedly polish its tone and phrasing",
            "People replying across Mail, Slack, Gmail, browsers, and other Mac apps",
            "Mac users on macOS 14 or later who can grant Accessibility permission",
          ],
        },
        {
          type: "p",
          text:
            "Some managed work Macs block Accessibility permission. There is no Windows version, local-only mode, or bring-your-own-key option. Always verify names, dates, prices, legal statements, and commitments before sending an AI-generated reply.",
        },
        {
          type: "tool",
          href: "/en/mac/custom-rewrite-prompts",
          label: "Run custom rewrite instructions in any Mac app",
          note: "Use saved buttons or a one-off instruction with a selection, a whole field, or an empty field.",
        },
      ],
      faq: [
        {
          q: "Does KeigoButton read my screen or inbox?",
          a: "No. Reply context comes from the incoming message you explicitly copy. KeigoButton does not scan the screen, connect to an inbox, or automatically read other threads.",
        },
        {
          q: "Do I still need to copy and paste for a reply?",
          a: "You copy the incoming message once to provide explicit context. After generation, the reply can be inserted into a compatible field, so you avoid copying an answer out of an AI chat and pasting it back into the original app.",
        },
        {
          q: "Can it draft into an empty reply field?",
          a: "Yes. Copy the incoming message, focus the empty reply field, and create a reply. If the response must include a particular date, decision, or constraint, type that guidance first.",
        },
        {
          q: "Which Macs does it support?",
          a: "KeigoButton supports Apple silicon and Intel Macs running macOS 14 or later. Accessibility permission is required to read and replace text in other apps.",
        },
        {
          q: "Can I try it free?",
          a: "Yes. The Mac app includes 50 rewrites a month at no charge and does not require a card. Pro includes up to 1,000 rewrites a month.",
        },
      ],
    },
  },
  {
    slug: "custom-rewrite-prompts",
    ja: {
      title: "Macのどのアプリでも自分のAI指示で文章を書き換える",
      metaTitle: "MacでカスタムAI指示を実行｜自分のボタンで文章を書き換え",
      description:
        "「短く」「取引先向けに」「自然な英語に」など、よく使う指示を自分のボタンとして保存。今回だけの自由な指示や、空欄からの文章作成にも対応します。",
      keywords: [
        "Mac AI 書き換え",
        "カスタムプロンプト Mac",
        "選択テキスト AI 書き換え",
        "文章 リライト Mac",
      ],
      published: "2026-08-19",
      updated: "2026-08-19",
      category: "Macの使い方",
      minutes: 7,
      relatedLinks: [
        {
          href: "/keigo-henkan",
          title: "無料の敬語変換ツール",
          note: "登録不要のブラウザツール",
        },
        {
          href: "/blog/chatgpt-keigo-henkan",
          title: "ChatGPTで敬語を自然に直す方法",
          note: "AIチャットでの書き換え方",
        },
      ],
      lead:
        "敬語ボタン Mac版は、何度も使う文章の直し方を自分のボタンとして保存し、Mail・Slack・ブラウザ・Notionなどの入力欄で実行できるAIリライトアシスタントです。保存していない依頼は、✎から今回だけの自由な指示として使えます。",
      blocks: [
        { type: "h2", id: "answer", text: "カスタム書き換えとは" },
        {
          type: "p",
          text:
            "「取引先に送れる敬語へ」「意味を変えず半分の長さに」「自然な英語へ」「断定を避ける」のように、自分が繰り返す編集をボタンへ登録します。文章を書いている場所でバーに触れ、そのボタンを押すと、選択部分または入力欄全体へ指示が適用されます。結果を確認してから同じ場所へ挿入します。",
        },
        {
          type: "callout",
          title: "保存する基準",
          text:
            "同じ説明をAIへ2回以上書いた指示は、ボタンにする候補です。今後ほとんど使わない細かな依頼は保存せず、✎から自由に入力するほうがボタン一覧をシンプルに保てます。",
        },
        { type: "h2", id: "two-modes", text: "保存したボタンと、今回だけの✎指示" },
        {
          type: "table",
          head: ["使い方", "向いている依頼", "例"],
          rows: [
            ["保存したボタン", "同じ直し方を繰り返す", "取引先向け／短く／自然な英語に"],
            ["✎ の自由な指示", "今回だけの条件がある", "3つの論点を残して100字以内に"],
          ],
          caption:
            "ボタン名は短くし、実際の指示には対象、守る条件、望む出力を具体的に書くと再利用しやすくなります。",
        },
        { type: "h2", id: "scope", text: "選択範囲・入力欄全体・空欄を使い分ける" },
        {
          type: "ul",
          items: [
            "**一部分だけ直す:** 直したい文を選択してからボタンを押します。前後の文章を残したまま、選択部分を置き換えます。",
            "**入力欄全体を直す:** 何も選択しなければ、フォーカス中の入力欄全体が対象になります。",
            "**空欄から書く:** 空の入力欄で✎を開き、「欠席連絡。理由は体調不良。明日の資料は共有済み」のように指示すると、新しい文章を作れます。",
          ],
        },
        {
          type: "p",
          text:
            "入力欄によってmacOSから読み書きできる範囲が異なるため、結果パネルには「挿入」「ここに挿入」「コピー」のうち、その場所で安全に使える操作が表示されます。生成結果は自動送信されず、確認してから反映します。",
        },
        { type: "h2", id: "examples", text: "保存ボタンの具体例" },
        { type: "h3", text: "取引先向け" },
        {
          type: "rewrite",
          before: "資料見ました。ここだけ直して、今日中にまた送ってください。",
          after:
            "資料を拝見しました。恐れ入りますが、該当箇所をご修正のうえ、本日中に再送いただけますでしょうか。",
          note:
            "指示例: 内容と期限は変えず、取引先へ送れる自然な敬語にする。過剰な謝罪は加えない。",
        },
        { type: "h3", text: "自然な英語に" },
        {
          type: "rewrite",
          before: "I checked the document. I want you to fix this part and send again today.",
          after: "I reviewed the document. Could you update this section and resend it today?",
          note:
            "指示例: 意味を変えず、仕事で使う自然で簡潔な英語にする。難しい表現は使わない。",
        },
        { type: "h3", text: "短くする" },
        {
          type: "rewrite",
          before:
            "現時点で確認できている範囲においては、スケジュールに大きな影響を与えるような問題は特に発生していない状況です。",
          after: "現時点で、スケジュールに影響する問題はありません。",
          note: "指示例: 事実と慎重さを残し、重複表現を削って半分程度にする。",
        },
        { type: "h2", id: "instructions", text: "再利用しやすい指示の書き方" },
        {
          type: "ol",
          items: [
            "**誰に・どこで使うかを書く。** 「丁寧に」より「初めて連絡する取引先向け」のほうが判断基準が明確です。",
            "**変えてはいけないものを書く。** 日付、固有名詞、結論、箇条書きの数など、残す条件を指定します。",
            "**出力の形を決める。** 「本文だけ」「100字以内」「件名を1つ付ける」のように、戻してほしい形を示します。",
            "**一度に役割を詰め込みすぎない。** 翻訳、要約、敬語化、追加調査を一つのボタンにすると、結果の基準が曖昧になります。",
          ],
        },
        { type: "h2", id: "comparison", text: "ChatGPTへ毎回頼む方法との違い" },
        {
          type: "p",
          text:
            "ChatGPTでは、文章をコピーし、チャットを開き、指示を書き、結果をコピーして元のアプリへ戻します。敬語ボタンでは、繰り返す指示を一度保存し、文章がある入力欄から実行します。短い定型編集ほど移動が減ります。一方、資料全体の構成、調査、長い推敲を対話しながら進めるならChatGPTが適しています。",
        },
        { type: "h2", id: "limits", text: "対応環境と制約" },
        {
          type: "p",
          text:
            "macOS 14以降のAppleシリコン搭載MacとIntel Macに対応します。ほかのアプリの入力欄を扱うためアクセシビリティ権限が必要で、会社の管理設定によっては許可できません。Windows版、端末内だけで動くモード、自分のAPIキーを使う方式はありません。AIの結果には誤りがあり得るため、送信前に必ず確認してください。",
        },
        {
          type: "tool",
          href: "/mac/reply-assistant",
          label: "コピーした受信メッセージから返信を作る方法",
          note: "自分の文章を直すだけでなく、受信内容を明示的な文脈にして返事を作れます。",
        },
      ],
      faq: [
        {
          q: "カスタムボタンにはどんな指示を保存できますか？",
          a: "敬語化、自然な英語、短縮、やわらかい表現、箇条書き化、フォローアップなど、文章へ適用できる指示を自分の言葉で保存できます。事実確認や長い調査より、繰り返す編集ルールに向いています。",
        },
        {
          q: "文章の一部分だけ書き換えられますか？",
          a: "はい。対象部分を選択してから実行します。何も選択しない場合は、フォーカス中の入力欄全体が対象になります。",
        },
        {
          q: "空の入力欄から文章を作れますか？",
          a: "はい。空欄で✎を開き、目的、事実、トーンなどを自由な指示として入力すると、新しい文章を作成できます。保存ボタンは既存文の繰り返し編集、✎は単発の作成や特殊な条件に向いています。",
        },
        {
          q: "生成結果は自動で送信されますか？",
          a: "いいえ。結果パネルで内容を確認し、挿入またはコピーを選びます。メールやメッセージの送信操作はユーザーが行います。",
        },
        {
          q: "料金はいくらですか？",
          a: "Mac版は月50回まで無料です。Proは月1,000回までで、月額1,480円または年額14,400円です。料金は日本語ページ向けの税込表示です。",
        },
      ],
    },
    en: {
      title: "Run Custom AI Rewrite Prompts in Any Mac App",
      metaTitle: "Custom AI Rewrite Prompts for Mac | Rewrite Text in Any App",
      description:
        "Save recurring edits as your own AI rewrite buttons, or type a one-off instruction. Rewrite selected text, a whole field, or compose into an empty field on macOS.",
      keywords: [
        "custom AI prompts Mac",
        "rewrite selected text Mac",
        "AI rewrite any app Mac",
        "custom rewrite buttons",
      ],
      published: "2026-08-19",
      updated: "2026-08-19",
      category: "Mac workflows",
      minutes: 7,
      relatedLinks: [
        {
          href: "/en/rewrite-text-any-app-mac",
          title: "How to rewrite text in any Mac app",
          note: "Mac workflow guide",
        },
        {
          href: "/en/ai-writing-apps-mac",
          title: "AI writing apps for Mac compared",
          note: "Category guide",
        },
      ],
      lead:
        "KeigoButton for Mac saves the edits you repeat as custom buttons and runs them in the text field you are already using. For an instruction you do not want to save, open ✎ and type it once.",
      blocks: [
        { type: "h2", id: "answer", text: "What a custom rewrite does" },
        {
          type: "p",
          text:
            "Create buttons for instructions such as “client-ready,” “keep the meaning but cut the length in half,” “natural English,” or “less absolute.” While writing in Mail, Slack, a browser, Notion, or another Mac app, hover over the bottom bar and press the relevant button. KeigoButton applies it to the selection or focused field, shows the result, and lets you insert it back in place.",
        },
        {
          type: "callout",
          title: "A practical rule",
          text:
            "If you have typed essentially the same request to an AI twice, it may deserve a saved button. Keep rare, highly specific requests out of the button list and use the one-off ✎ instruction instead.",
        },
        { type: "h2", id: "two-modes", text: "Saved buttons versus a one-off instruction" },
        {
          type: "table",
          head: ["Method", "Best for", "Example"],
          rows: [
            ["Saved button", "An edit you repeat", "Client-ready / Shorter / Natural English"],
            ["One-off ✎ instruction", "Unique constraints this time", "Keep three points and stay under 80 words"],
          ],
          caption:
            "Use a short button name. In the underlying instruction, state the audience, constraints, and exact output you want.",
        },
        { type: "h2", id: "scope", text: "Use a selection, the whole field, or an empty field" },
        {
          type: "ul",
          items: [
            "**Rewrite one passage:** Select the exact text before pressing a button. The rest of the field stays in place.",
            "**Rewrite the whole field:** With no selection, KeigoButton uses the text in the focused field.",
            "**Compose from empty:** In an empty field, open ✎ and enter a brief such as “decline the meeting, health reason, notes already shared.” KeigoButton drafts new text from those facts.",
          ],
        },
        {
          type: "p",
          text:
            "Mac apps expose text fields in different ways. The result panel therefore shows the safe action available for the current destination: Insert, Insert here, or Copy. KeigoButton never sends the email or message automatically; you review and submit it yourself.",
        },
        { type: "h2", id: "examples", text: "Examples of useful saved buttons" },
        { type: "h3", text: "Client-ready" },
        {
          type: "rewrite",
          before: "I saw the deck. Fix this section and send it again today.",
          after: "I reviewed the deck. Could you update this section and resend it today?",
          note:
            "Instruction: Make this appropriate for a client. Preserve the request and deadline; do not add an apology.",
        },
        { type: "h3", text: "Natural English" },
        {
          type: "rewrite",
          before: "I want to confirm if you already could check the new contract.",
          after: "I wanted to check whether you’ve had a chance to review the new contract.",
          note:
            "Instruction: Rewrite as concise, natural workplace English. Keep the meaning and avoid advanced vocabulary.",
        },
        { type: "h3", text: "Shorter" },
        {
          type: "rewrite",
          before:
            "Based on everything we have been able to confirm at this point in time, there do not appear to be any issues that would have a significant impact on the schedule.",
          after: "At this point, we have found no issues that would affect the schedule.",
          note:
            "Instruction: Keep the factual caution, remove repetition, and reduce the length by about half.",
        },
        { type: "h2", id: "instructions", text: "How to write a reusable instruction" },
        {
          type: "ol",
          items: [
            "**Name the audience and situation.** “For a first email to a client” gives the model a clearer standard than “make it better.”",
            "**State what must not change.** Preserve dates, names, the decision, number of bullets, or other facts that matter.",
            "**Define the output.** Ask for body text only, one subject line, fewer than 100 words, or another concrete shape.",
            "**Do not combine unrelated jobs.** Translation, summarization, research, and tone correction in one button create an unclear success criterion.",
          ],
        },
        { type: "h2", id: "comparison", text: "How it differs from prompting ChatGPT every time" },
        {
          type: "p",
          text:
            "The normal chat workflow is to copy text, open a chat, type the instruction, copy the answer, return, and paste. KeigoButton stores the recurring instruction once and runs it from the field containing the text. The benefit is greatest for short, repeated edits. ChatGPT remains better for research, planning an entire document, or refining a complex answer through conversation.",
        },
        { type: "h2", id: "limits", text: "Compatibility and limitations" },
        {
          type: "p",
          text:
            "KeigoButton supports Apple silicon and Intel Macs on macOS 14 or later. It needs Accessibility permission to read and replace text in other apps, which some managed work Macs do not allow. There is no Windows version, local-only mode, or bring-your-own-key option. AI output can be wrong, so verify it before sending.",
        },
        {
          type: "tool",
          href: "/en/mac/reply-assistant",
          label: "Draft a reply from an incoming message you copy",
          note: "Use explicit copied context to create a complete response without letting the app read your screen.",
        },
      ],
      faq: [
        {
          q: "What can I save as a custom rewrite button?",
          a: "You can save instructions for tone, grammar, brevity, natural English, translation, formatting, follow-ups, and other text transformations. Saved buttons work best for repeatable editing rules, not open-ended research.",
        },
        {
          q: "Can I rewrite only selected text?",
          a: "Yes. Select the passage before running the instruction. If nothing is selected, KeigoButton uses the whole focused field instead.",
        },
        {
          q: "Can it write into an empty field?",
          a: "Yes. Open ✎ in an empty field and enter the purpose, facts, and tone as a one-off instruction. Saved buttons are best for repeated edits; ✎ is best for unique drafting constraints.",
        },
        {
          q: "Does it send the generated message automatically?",
          a: "No. KeigoButton shows the result for review and lets you insert or copy it. You remain responsible for the final send action.",
        },
        {
          q: "How much does the Mac app cost?",
          a: "The free plan includes 50 rewrites a month. Pro includes up to 1,000 rewrites and costs $12 a month or $120 a year on the English interface.",
        },
      ],
    },
  },
] as const;

export const macUseCase = (slug: string) =>
  MAC_USE_CASES.find((entry) => entry.slug === slug);

export const macUseCasePath = (lang: MacUseCaseLang, slug: MacUseCase["slug"]) =>
  lang === "ja" ? `/mac/${slug}` : `/en/mac/${slug}`;
