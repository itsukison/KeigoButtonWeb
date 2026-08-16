/**
 * The product spine in three languages: 日本語, English, 简体中文.
 *
 * **Scope is deliberate and is not "the whole site".** `/keigo-henkan`,
 * `/keigo-check`, `/keigo-test`, `/reibun/*` and `/blog/*` exist to rank for
 * Japanese queries — 「敬語 例文」 has no English search behind it — so they stay
 * Japanese-only and carry no `hreflang`. What is translated is what a non-Japanese
 * user of the product actually needs: the Mac and iPhone pages, the three billing
 * return screens, support, and the legal pages.
 *
 * **Runtime, not build time.** The Vite prototype this was ported from fixed the
 * locale with `VITE_LOCALE` and shipped three separate bundles. Next.js renders all
 * three from one deployment, so the language is a route segment (`/`, `/en`, `/zh`)
 * and the dictionary is chosen per request. `dict(lang)` is that choice; nothing
 * reads a module-level "current locale" here.
 *
 * Chinese is the app's own split (laptop/AGENTS.md §17): the interface is Chinese
 * and the buttons still write Japanese, because the reader is assumed to be a
 * Chinese speaker working in Japan.
 */

export type Lang = "ja" | "en" | "zh";

export const LOCALES = [
  { code: "ja", endonym: "日本語", htmlLang: "ja", ogLocale: "ja_JP", prefix: "" },
  { code: "en", endonym: "English", htmlLang: "en", ogLocale: "en_US", prefix: "/en" },
  { code: "zh", endonym: "简体中文", htmlLang: "zh-Hans", ogLocale: "zh_CN", prefix: "/zh" },
] as const;

/** The two that live under a prefix. `/` is Japanese and is never `/ja`. */
export const PREFIXED_LANGS = ["en", "zh"] as const;

export const DEFAULT_LANG: Lang = "ja";

export function localeMeta(lang: Lang) {
  return LOCALES.find((l) => l.code === lang)!;
}

/**
 * Prefixes an in-site path for a language. Japanese keeps the bare path, which is
 * what makes `/` canonical and keeps every existing indexed URL untouched.
 */
export function href(lang: Lang, path: string): string {
  const prefix = localeMeta(lang).prefix;
  if (!prefix) return path;
  // No trailing slash on the language root. `next.config.ts` leaves `trailingSlash`
  // at its default, so `/en` is the canonical form and `/en/` 308-redirects to it —
  // and a canonical or hreflang pointing at a redirect is a defect in the one set of
  // tags whose whole job is to be unambiguous.
  return path === "/" ? prefix : `${prefix}${path}`;
}

const ja = {
  chrome: {
    tagline: 'Macでは入力中の場所からそのまま、iPhoneではキーボードから。文章を自然な敬語へ書き直せるAIアプリです。',
    appStore: 'iPhone版を無料で入手',
    appStoreLong: 'iPhone版をApp Storeで入手',
    tools: '無料ツール',
    company: '運営情報',
    language: '言語',
    viewJapanese: '日本語版を見る',
    mac: 'Mac版',
    mobile: 'iPhone版',
    support: 'サポート・使い方',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    legal: '特定商取引法に基づく表記',
    copyright: '敬語ボタンはMacとiPhoneで使える日本語AI文章作成アプリです。',
  },
  billing: {
    backToApp: '敬語ボタンに戻る',
    success: {
      metaTitle: 'お手続きが完了しました',
      metaDescription: '敬語ボタン Pro のお申し込みが完了しました。',
      eyebrow: 'お支払い完了',
      title: 'Pro のご利用を開始できます',
      body1: 'ありがとうございます。お支払いが完了し、月1,000回までの書き換えがご利用いただけます。',
      body2: 'アプリに戻ると、プランが自動的に切り替わります。',
      note1: '領収書はご登録のメールアドレス宛にStripeからお送りします。プランの確認・お支払い方法の変更・解約は、アプリの「プラン」画面からいつでも行えます。',
      note2: '反映まで数秒かかる場合があります。プランが変わらない場合は、少し待ってからアプリを開き直してください。',
    },
    cancelled: {
      metaTitle: 'お手続きを中断しました',
      metaDescription: 'お支払い手続きは完了していません。',
      eyebrow: 'お手続き中断',
      title: 'お支払いは行われていません',
      body1: 'お手続きを中断しました。料金は請求されていません。',
      body2: '無料プランは引き続きそのままご利用いただけます。月50回まで書き換えできます。',
      note1: 'あらためてお申し込みいただく場合は、アプリの「プラン」画面からいつでもお手続きいただけます。',
    },
    portal: {
      metaTitle: 'お手続きが完了しました',
      metaDescription: 'お支払い管理からお戻りいただきました。',
      eyebrow: 'お支払い管理',
      title: '変更内容を保存しました',
      body1: 'お支払い管理での操作は完了しています。現在のプランはアプリの「プラン」画面でご確認いただけます。',
      body2: '解約された場合も、お支払い済みの期間が終了するまでは Pro をそのままご利用いただけます。',
      note1: '変更が反映されるまで数秒かかる場合があります。表示が変わらない場合は、少し待ってからアプリを開き直してください。',
    },
  },
  // Page metadata. Kept beside the copy rather than in the route files so a title
  // and the H1 under it cannot drift apart, and so adding a language means adding
  // one block rather than editing five `generateMetadata`s.
  // Page metadata for `/`, which is **the brand root, not the Mac product page**.
  // The body it renders is the Mac landing, but the URL is the one that ranks for
  // the brand query 「敬語ボタン」 — 5,000+ of those searchers are on a phone looking
  // for the iPhone keyboard. Titling it 「敬語ボタン Mac版」 answered a query nobody
  // typed: position went 4.0 → 7.7 and clicks to zero in the week after 2026-08-08
  // (Search Console, measured 2026-08-16). Brand first, both platforms named, and
  // the Mac promise kept in the description where the page can actually deliver it.
  seo: {
    mac: {
      title: '敬語ボタン｜Mac・iPhoneで文章をその場で敬語に',
      description:
        'Macでは入力中の場所からそのまま、iPhoneではキーボードから。文章を自然な敬語や目的に合う表現へ書き直せるAIアプリです。Mac版はmacOS 14以降、無料で使いはじめられます。',
      ogTitle: '敬語ボタン',
      ogDescription: 'Mac・iPhoneで、いま書いている場所のまま敬語に。',
    },
  },
  // The product name. Japanese and Chinese readers both know it by its Japanese
  // name — a 简体中文 user is writing Japanese (AGENTS.md §17) — so only English
  // spells it out.
  brand: '敬語ボタン',
  nav: {
    aria: 'メイン',
    how: '使い方',
    features: 'できること',
    pricing: '料金',
    faq: 'よくある質問',
    download: 'Mac版をダウンロード',
    language: '言語',
    // Production-only, and not in the Vite prototype: this site also sells the
    // iPhone app, so the Mac page links across to it.
    mobile: 'iPhone版',
  },
  banner: {
    // `{lang}` is the endonym of the language being offered, never translated.
    text: 'このページは{lang}でも読めます。',
    action: '{lang}で見る',
    dismiss: '閉じる',
  },
  hero: {
    badge: ['iPhone版「敬語ボタン」は ', '5,000人以上', ' に使われています'],
    // 21字。旧「いま書いている場所で、そのまま整える。」は19字で、ブランド名が
    // h1に一度も出てこなかった。左カラムは1280pxグリッドの約1fr（≒610px）、
    // --text-display は48pxなので1行あたり約13字——19字も21字も2行に収まる。
    // 3行に落ちるのは26字を超えたあたりからで、そこは越えていない。
    title: '敬語ボタンは、書く場所で、そのまま整える。',
    lede: '画面下のバーにホバーして、自分のボタンを押すだけ。',
    download: 'Mac版をダウンロード',
    secondary: 'iPhone版を入手',
    meta: 'macOS 14 以降 · 無料で使えます · iPhone版と同じアカウント',
    draft: '明日の定例、15時からに変更してもらえませんか。あと資料の最終版も送ります。',
    rewritten:
      '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。',
    hotButton: '敬語',
    windowTitle: 'メール — 新規メッセージ',
  },
  product: {
    buttons: ['敬語', '要約', '英訳', '丁寧に'],
    barIdleAria: '画面下のバー（待機中）',
    barExpandedAria: 'バーを展開した状態。自分のボタンが並んでいます',
    generating: '書き換えています',
    generatingAria: '書き換え中。バーがキャプセルに変わります',
    resultPrompt: '敬語',
    resultBody:
      '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。',
    resultAria: '書き換え結果のパネル',
    insert: '挿入',
    windowTitle: 'メール — 新規メッセージ',
  },
  everywhere: {
    title: 'テキストを打てる場所なら、どこでも。',
    body: 'アプリごとの拡張機能も、プラグインも、設定もありません。カーソルが置ける入力欄なら、そこが作業場所になります。',
    note: 'ブラウザやSlackのように少し特殊な入力欄を持つアプリでも、読み取り方法を自動で切り替えて対応します。',
    apps: { mail: 'メール', notes: 'メモ' },
  },
  how: {
    eyebrow: '使い方',
    title: '3秒で終わります。',
    lede: '覚えることは、ホバーして押すことだけ。',
    note: 'ボタンにない指示は ✎ から自由に入力できます。',
    windowTitle: 'Slack — スレッド',
    before: '明日の定例、15時からに変更してもらえませんか。',
    after: '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。',
    steps: [
      {
        title: '書く（選んでも、選ばなくても）',
        body: 'いつも通りアプリで文章を書きます。直したい部分を選んでも、何も選ばなくても構いません。',
      },
      {
        title: 'バーにホバーする',
        body: '画面の下のバーにカーソルを乗せると、自分のボタンが横に並びます。',
      },
      {
        title: '押すと、その場で置き換わる',
        body: '押した瞬間に書き換えが始まり、元の文章と入れ替わります。貼り付ける操作はありません。',
      },
    ],
  },
  dives: {
    one: {
      title: 'ボタンは、あなたが決める。',
      body: '「敬語に」「短く」「英訳」——よく使う直し方をボタンにしておけます。iPhone版で作ったボタンは、そのままMacにも並びます。どちらで編集しても、両方に反映されます。',
      link: '使い方を見る',
    },
    two: {
      title: '選択しなくても、書き換えられる。',
      body: '一部を選べば、その部分だけ。何も選ばなければ、入力欄の文章まるごと。どちらにするかを指定する操作はありません。カーソルがある場所を見ています。',
      selectedLabel: '一部を選んだとき',
      selectedNote: '選んだところだけが変わります',
      wholeLabel: '何も選ばないとき',
      wholeNote: '入力欄の文章がまるごと対象になります',
      windowTitle: 'Gmail — 作成',
      fieldLead: 'お世話になっております。',
      fieldSelected: 'この件、明日までにお願いします。',
      fieldTail: 'よろしくお願いいたします。',
    },
    three: {
      title: '置き換わる前に、確認できる。',
      body: '生成中はバーが細いキャプセルに変わり、終わるとその場に結果が表示されます。気に入らなければ再生成、良ければそのまま挿入するだけです。',
      mono: '挿入は Enter だけ',
    },
    editorHead: 'ボタン',
    editorRows: [
      { name: '敬語', desc: '取引先に送れる文章に整える' },
      { name: '要約', desc: '要点だけを短くまとめる' },
      { name: '英訳', desc: '自然な英語に訳す' },
      { name: '丁寧に', desc: 'やわらかい言い回しにする' },
      { name: 'カジュアル', desc: '社内向けにくだけた調子へ', off: true },
    ],
  },
  pricing: {
    eyebrow: '料金',
    title: 'まずは無料で。',
    lede: '毎日使うようになったら、月1,000回のProへ。iPhone版はこれからも無料です。',
    cycleAria: '支払い周期',
    monthly: '月払い',
    yearly: '年払い',
    save: '2ヶ月分以上お得',
    recommended: 'おすすめ',
    taxNote: '表示価格が実際にご請求される金額です。',
    perMonth: '/ 月',
    perYear: '/ 年',
    yearlyNote: '年払い {total}',
    monthlyNote: '月払い',
    free: {
      name: '無料',
      blurb: 'まず試す',
      features: ['月{free}回まで書き換え', 'ボタンは全種類使える', 'iPhone版とボタンが同期', 'クレジットカード不要'],
      cta: 'Mac版をダウンロード',
      foot: 'そのまま使い続けられます',
    },
    pro: {
      name: 'Pro',
      blurb: '毎日書く人へ',
      features: ['無料プランのすべて', '月{pro}回まで書き換え', 'Apple Pay対応', 'いつでもワンクリックで解約'],
      cta: 'この価格ではじめる',
      foot: 'いつでも解約できます',
    },
  },
  faq: {
    title: 'よくある質問',
    items: [
      {
        q: 'なぜアクセシビリティの許可が必要ですか？',
        a: 'いま入力している文章を読み取り、書き換えた文章をそのままの場所に書き戻すためです。macOSでは、他のアプリの入力欄を扱うのにこの許可が必要です。画面の撮影やキー入力の記録は行いません。許可はシステム設定からいつでも取り消せます。',
      },
      {
        q: '書いた文章はどこかに保存されますか？',
        a: '書き換えのために送信しますが、処理が終わればサーバー側には残りません。AIの改善に使うかどうかは設定でいつでも切り替えられ、オフにしても書き換え機能はそのまま使えます。',
      },
      {
        q: 'iPhone版のアプリは必要ですか？',
        a: '必要ありません。Mac版だけでも使えます。iPhone版「敬語ボタン」で作ったボタンをそのままMacでも使いたい場合は、同じアカウントでログインするだけです。',
      },
      {
        q: 'どのアプリで使えますか？使えないアプリはありますか？',
        a: 'メール、Slack、Gmail、Notion、Chrome、Wordなど、カーソルを置ける入力欄であれば使えます。ブラウザやSlackのように少し特殊な入力欄を持つアプリでも、読み取り方法を自動で切り替えて対応します。',
      },
      {
        q: '対応しているmacOSのバージョンは？',
        a: 'macOS 14 以降です。Appleシリコン、Intel のどちらでも動作します。',
      },
      {
        q: '「開発元が未確認」と表示されたときは？',
        a: 'Appleの公証を受けたアプリなので通常は表示されません。表示された場合は、アプリを右クリックして「開く」を選んでください。',
      },
      {
        q: 'アンインストールはどうしますか？',
        a: 'アプリケーションフォルダから削除するだけです。あわせて、システム設定 › プライバシーとセキュリティ › アクセシビリティ から許可を外してください。',
      },
    ],
  },
  footer: {
    navAria: 'フッターナビゲーション',
    navHeading: 'ナビゲーション',
    downloadHeading: 'Macでも、敬語ボタン。',
    downloadCopy: ['いま書いている場所で、', 'そのまま文章を整えます。'],
    downloadButton: '無料でダウンロード',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    contact: 'お問い合わせ',
    mobile: 'iPhone版',
    // The five links below are the site's internal hub (seo-geo.md §設計方針5). They
    // were on the old homepage, and the 2026-08-08 desktop merge left only two of
    // them — /keigo-check, the largest impression driver on the property (139
    // impressions, pos 9.1 / 28d), lost its only link from the one page Google
    // actually crawls. Any styling or placement is fine; keep them reachable.
    converter: '無料の敬語変換',
    checker: '敬語チェック',
    test: '敬語テスト20問',
    reibun: '場面別 例文集',
    articles: '敬語の記事',
    copyright: '© 2026 株式会社Core7',
    toTop: 'ページ上部へ戻る',
  },
  modal: {
    title: 'インストールして、許可する',
    lead: ['ダウンロードが始まります。始まらない場合は ', '手動でダウンロード', ' できます。'],
    close: '閉じる',
    note: 'macOS 14 以降が必要です。うまくいかない場合はお問い合わせください。',
    // The pre-release branch, which the prototype never had.
    titleSoon: 'Mac版はまもなく公開します',
    bodySoon: '署名・公証済みの配布版を準備中です。公開後、このページからダウンロードできるようになります。',
    steps: [
      { label: 'ステップ1', title: '開く', body: 'ダウンロードフォルダの KeigoButton.dmg を開きます。' },
      { label: 'ステップ2', title: 'インストール', body: 'アプリケーションフォルダにドラッグ&ドロップします。' },
      { label: 'ステップ3', title: '起動', body: 'Launchpad またはアプリケーションフォルダから起動します。' },
      {
        label: 'ステップ4',
        title: '許可する',
        body: 'システム設定 › アクセシビリティ で 敬語ボタン をオンにします。この許可がないと文章を読み取れません。',
      },
    ],
  },
}

const en = {
  chrome: {
    tagline: 'On the Mac it works where you are already typing; on iPhone it works from the keyboard. An AI app that rewrites what you write.',
    appStore: 'Get it free for iPhone',
    appStoreLong: 'Get it on the App Store',
    tools: 'Free tools',
    company: 'Company',
    language: 'Language',
    viewJapanese: 'Read the Japanese original',
    mac: 'For Mac',
    mobile: 'For iPhone',
    support: 'Support',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    legal: 'Legal notice (Japan)',
    // Was "a Japanese-language AI writing app", which is false in this interface:
    // English buttons write English (`AppLanguage.writesJapanese`).
    copyright: 'KeigoButton is an AI writing app for Mac and iPhone that rewrites your text where you already write it.',
  },
  billing: {
    backToApp: 'Back to KeigoButton',
    success: {
      metaTitle: 'Your purchase is complete',
      metaDescription: 'Your KeigoButton Pro subscription is active.',
      eyebrow: 'Payment complete',
      title: 'Pro is ready to use',
      body1: 'Thank you. Your payment went through, and you now have 1,000 rewrites a month.',
      body2: 'Your plan switches over automatically when you go back to the app.',
      note1: 'Stripe emails your receipt to the address you signed up with. You can check your plan, change your payment method or cancel any time from the Plan screen in the app.',
      note2: 'It can take a few seconds to apply. If your plan still looks unchanged, wait a moment and reopen the app.',
    },
    cancelled: {
      metaTitle: 'Checkout was not completed',
      metaDescription: 'No payment was taken.',
      eyebrow: 'Checkout stopped',
      title: 'You have not been charged',
      body1: 'You left the payment form, so nothing was charged.',
      body2: 'Your free plan continues exactly as before, with 50 rewrites a month.',
      note1: 'If you want to subscribe later, you can start again from the Plan screen in the app at any time.',
    },
    portal: {
      metaTitle: 'Your changes are saved',
      metaDescription: 'You have returned from billing management.',
      eyebrow: 'Billing',
      title: 'Your changes are saved',
      body1: 'Whatever you changed in billing has been saved. Your current plan is shown on the Plan screen in the app.',
      body2: 'If you cancelled, Pro stays active until the end of the period you have already paid for.',
      note1: 'It can take a few seconds to apply. If nothing looks different, wait a moment and reopen the app.',
    },
  },
  // **The English product is not a Japanese product.** `AppLanguage.writesJapanese`
  // is `self != .english`: an English user's buttons read and write English, and the
  // English preset packs are Starter / Work / Outreach / Polish / Social — grammar,
  // tone, cold email, "read like a native writer". 敬語 is the name of the wedge that
  // opened the Japanese market, not a description of the category.
  //
  // So the English metadata targets the category, not the wedge: one-click AI
  // rewriting anywhere on macOS, against Grammarly / Apple Intelligence Writing
  // Tools / copy-paste-into-ChatGPT. Titling this page around "keigo" would have
  // aimed it at Japanese learners, who are not the buyer and never were.
  seo: {
    mac: {
      title: 'KeigoButton — one-click AI rewriting in every Mac app',
      description:
        'Press one of your own buttons and the text you are writing is rewritten in place — grammar, tone, length, translation, a follow-up. Works in Mail, Slack, Gmail, Notion, Word and anywhere else you can put a cursor, with no copying into ChatGPT and pasting back. Free on macOS 14 and later.',
      ogTitle: 'KeigoButton',
      ogDescription: 'One-click AI rewriting, in every app on your Mac.',
    },
  },
  brand: 'KeigoButton',
  nav: {
    aria: 'Main',
    how: 'How it works',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    download: 'Download for Mac',
    language: 'Language',
    mobile: 'For iPhone',
  },
  banner: {
    text: 'This page is also available in {lang}.',
    action: 'Read in {lang}',
    dismiss: 'Dismiss',
  },
  hero: {
    badge: ['The iPhone app is used by ', 'more than 5,000 people', ''],
    // "Polish" named the wrong category: it reads as a proofreader, and proofreading
    // is the one thing this is not — Apple Intelligence and Grammarly both do that
    // already and for less. What the product actually is, is your own saved
    // instructions applied in place, anywhere. Same line count and near-identical
    // measure, so the hero's layout is unchanged.
    title: 'Your own AI rewrite buttons, in every app.',
    lede: 'Hover the bar at the bottom of the screen and press one. Your text is rewritten where it stands.',
    download: 'Download for Mac',
    secondary: 'Get it for iPhone',
    meta: 'macOS 14 or later · Free to use · The same account as the iPhone app',
    draft: 'hey can we push tomorrows standup to 3, ill send the final deck too',
    rewritten:
      'Could we move tomorrow’s standup to 3pm? I’ll send over the final deck as well.',
    hotButton: 'Polite',
    windowTitle: 'Mail — New Message',
  },
  product: {
    buttons: ['Polite', 'Shorten', 'Translate', 'Soften'],
    barIdleAria: 'The bar at the bottom of the screen, idle',
    barExpandedAria: 'The expanded bar showing your rewrite buttons',
    generating: 'Rewriting',
    generatingAria: 'Rewriting in progress. The bar becomes a capsule.',
    resultPrompt: 'Polite',
    resultBody: 'Could we move tomorrow’s standup to 3pm? I’ll send over the final deck as well.',
    resultAria: 'Rewrite result panel',
    insert: 'Insert',
    windowTitle: 'Mail — New Message',
  },
  everywhere: {
    title: 'Anywhere you can type.',
    body: 'No per-app extension, no plugin, no setup. If you can put a cursor in it, it works there.',
    note: 'Apps with unusual text fields — browsers, Slack — are handled by switching how the text is read, automatically.',
    apps: { mail: 'Mail', notes: 'Notes' },
  },
  how: {
    eyebrow: 'How it works',
    title: 'It takes three seconds.',
    lede: 'There are two things to learn: hover, and press.',
    note: 'Anything your buttons don’t cover, type into ✎ instead.',
    windowTitle: 'Slack — Thread',
    before: 'hey can we push tomorrows standup to 3',
    after: 'Could we move tomorrow’s standup to 3pm?',
    steps: [
      {
        title: 'Write, with or without selecting',
        body: 'Write in your app as usual. Select the part you want changed, or select nothing at all.',
      },
      {
        title: 'Hover the bar',
        body: 'Put the pointer on the bar at the bottom of the screen and your buttons fan out.',
      },
      {
        title: 'Press, and it changes in place',
        body: 'The rewrite starts on the press and replaces your text where it stands. There is nothing to paste.',
      },
    ],
  },
  dives: {
    one: {
      title: 'You decide what the buttons do.',
      body: '“Make it polite”, “shorter”, “translate” — the edits you make constantly become buttons. Buttons made on the iPhone appear on the Mac, and editing either updates both.',
      link: 'See how it works',
    },
    two: {
      title: 'You don’t have to select anything.',
      body: 'Select part of it and only that part changes. Select nothing and the whole field is the target. There is no mode to set — it follows your cursor.',
      selectedLabel: 'With a selection',
      selectedNote: 'Only the selected part changes',
      wholeLabel: 'With nothing selected',
      wholeNote: 'The whole field is the target',
      windowTitle: 'Gmail — Compose',
      fieldLead: 'Hi Dana, ',
      fieldSelected: 'need this back by tomorrow.',
      fieldTail: ' Thanks!',
    },
    three: {
      title: 'You see it before it replaces anything.',
      body: 'While it works the bar becomes a thin capsule, and the result appears in the same place. Regenerate if it’s wrong, insert it if it’s right.',
      mono: 'Insert is one Enter',
    },
    editorHead: 'Buttons',
    editorRows: [
      { name: 'Polite', desc: 'Warm and professional, ready to send' },
      { name: 'Shorten', desc: 'The same thing in fewer words' },
      { name: 'Proofread', desc: 'Fix the mistakes, keep the voice' },
      { name: 'Client', desc: 'Clear and courteous for people outside' },
      { name: 'Casual', desc: 'Relaxed, for a teammate', off: true },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Start free.',
    lede: 'When it becomes part of your day, Pro raises it to 1,000 rewrites a month. The iPhone app stays free.',
    cycleAria: 'Billing period',
    monthly: 'Monthly',
    yearly: 'Yearly',
    // Not "over". The yen plan saves 2.27 months, so 「2ヶ月分以上お得」 is a floor and
    // needs the 以上; $144 − $120 is EXACTLY two months, and claiming more than that
    // of a number a reader can check in one step is the wrong kind of wrong.
    save: '2 months free',
    recommended: 'Recommended',
    taxNote: 'The price shown is the amount you are charged.',
    perMonth: '/ month',
    perYear: '/ year',
    yearlyNote: '{total} per year',
    monthlyNote: 'Billed monthly',
    free: {
      name: 'Free',
      blurb: 'Try it out',
      features: ['{free} rewrites a month', 'Every kind of button', 'Buttons sync with the iPhone app', 'No card required'],
      cta: 'Download for Mac',
      foot: 'Yours to keep using',
    },
    pro: {
      name: 'Pro',
      blurb: 'For people who write all day',
      features: ['Everything in Free', '{pro} rewrites a month', 'Apple Pay', 'Cancel any time, in one click'],
      cta: 'Start at this price',
      foot: 'Cancel whenever you like',
    },
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Why does it need Accessibility access?',
        a: 'To read the text you are typing and write the rewrite back into the same place. macOS requires this permission to work with another app’s text field. It does not record your screen or your keystrokes, and you can revoke it in System Settings at any time.',
      },
      {
        q: 'Is my writing stored anywhere?',
        a: 'It is sent so the rewrite can be produced, and nothing is kept on the server once it finishes. Whether your text may be used to improve the AI is a setting you can change at any time; turning it off leaves rewriting fully working.',
      },
      {
        q: 'Do I need the iPhone app?',
        a: 'No. The Mac app works on its own. If you want the buttons you made on the iPhone to appear here too, sign in with the same account.',
      },
      {
        q: 'Which apps does it work in?',
        a: 'Mail, Slack, Gmail, Notion, Chrome, Word — anything with a text field you can put a cursor in. Apps with unusual fields, like browsers and Slack, are handled by switching how the text is read.',
      },
      {
        q: 'Which versions of macOS are supported?',
        a: 'macOS 14 and later, on both Apple silicon and Intel.',
      },
      {
        q: 'What if macOS says the developer can’t be verified?',
        a: 'The app is notarized by Apple, so this normally doesn’t appear. If it does, right-click the app and choose Open.',
      },
      {
        q: 'How do I uninstall it?',
        a: 'Delete it from your Applications folder, then remove its entry under System Settings › Privacy & Security › Accessibility.',
      },
    ],
  },
  footer: {
    navAria: 'Footer navigation',
    navHeading: 'Navigation',
    downloadHeading: 'KeigoButton, on your Mac.',
    downloadCopy: ['Polish what you are writing,', 'where you are writing it.'],
    downloadButton: 'Download free',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    mobile: 'For iPhone',
    // These five point at Japanese-only pages, as they already did. An English
    // reader of this site is someone writing Japanese, so a Japanese tool is a
    // useful destination for them — the label says which language they will land in.
    converter: 'Free keigo converter (JA)',
    checker: 'Keigo mistake checker (JA)',
    test: 'Keigo test, 20 questions (JA)',
    reibun: 'Japanese email templates (JA)',
    articles: 'Japanese writing guides (JA)',
    copyright: '© 2026 Core7, Inc.',
    toTop: 'Back to top',
  },
  modal: {
    title: 'Install it, then allow it',
    lead: ['Your download is starting. If it doesn’t, ', 'download it manually', '.'],
    close: 'Close',
    note: 'Requires macOS 14 or later. Get in touch if anything goes wrong.',
    titleSoon: 'The Mac app is coming soon',
    bodySoon: 'A signed and notarized build is on its way. You will be able to download it from this page once it ships.',
    steps: [
      { label: 'Step 1', title: 'Open', body: 'Open KeigoButton.dmg in your Downloads folder.' },
      { label: 'Step 2', title: 'Install', body: 'Drag it into your Applications folder.' },
      { label: 'Step 3', title: 'Launch', body: 'Open it from Launchpad or Applications.' },
      {
        label: 'Step 4',
        title: 'Allow',
        body: 'Turn KeigoButton on under System Settings › Accessibility. Without it the app cannot read your text.',
      },
    ],
  },
}

const zh = {
  chrome: {
    tagline: '在 Mac 上就在你正在输入的地方，在 iPhone 上则从键盘中使用。把文字改写成自然日语的 AI 应用。',
    appStore: '免费获取 iPhone 版',
    appStoreLong: '在 App Store 获取',
    tools: '免费工具',
    company: '公司信息',
    language: '语言',
    viewJapanese: '查看日语原文',
    mac: 'Mac 版',
    mobile: 'iPhone 版',
    support: '支持与使用方法',
    terms: '使用条款',
    privacy: '隐私政策',
    legal: '特定商取引法标示（日本）',
    copyright: '敬語ボタン 是可在 Mac 和 iPhone 上使用的日语 AI 写作应用。',
  },
  billing: {
    backToApp: '返回敬語ボタン',
    success: {
      metaTitle: '手续已完成',
      metaDescription: '敬語ボタン Pro 订阅已开通。',
      eyebrow: '支付完成',
      title: '现在可以开始使用 Pro',
      body1: '感谢你的支持。付款已完成，现在每月可改写 1,000 次。',
      body2: '回到应用后，套餐会自动切换。',
      note1: 'Stripe 会将收据发送到你注册时使用的邮箱。查看套餐、更改付款方式或取消订阅，都可以随时在应用的「プラン」页面进行。',
      note2: '生效可能需要几秒钟。如果套餐没有变化，请稍等片刻后重新打开应用。',
    },
    cancelled: {
      metaTitle: '手续已中断',
      metaDescription: '支付尚未完成。',
      eyebrow: '手续中断',
      title: '未进行任何扣款',
      body1: '你已离开支付页面，没有产生任何费用。',
      body2: '免费套餐可继续照常使用，每月可改写 50 次。',
      note1: '如果之后想订阅，随时可以从应用的「プラン」页面重新开始。',
    },
    portal: {
      metaTitle: '更改已保存',
      metaDescription: '你已从付款管理返回。',
      eyebrow: '付款管理',
      title: '更改已保存',
      body1: '你在付款管理中的操作已保存。当前套餐可在应用的「プラン」页面确认。',
      body2: '即使已取消，在已支付的周期结束前仍可继续使用 Pro。',
      note1: '生效可能需要几秒钟。如果显示没有变化，请稍等片刻后重新打开应用。',
    },
  },
  seo: {
    mac: {
      title: '敬語ボタン｜在 Mac 和 iPhone 上把日语文章改写成敬语',
      description:
        '在 Mac 上就从你正在输入的地方，在 iPhone 上则从键盘中，把日语文章改写成自然的敬语和商务用语的 AI 应用。Mac 版支持 macOS 14 及以上，可免费开始使用。',
      ogTitle: '敬語ボタン',
      ogDescription: '在 Mac 和 iPhone 上，就地把文章改写成敬语。',
    },
  },
  brand: '敬語ボタン',
  nav: {
    aria: '主导航',
    how: '使用方法',
    features: '功能',
    pricing: '价格',
    faq: '常见问题',
    download: '下载 Mac 版',
    language: '语言',
    mobile: 'iPhone 版',
  },
  banner: {
    text: '本页也有{lang}版本。',
    action: '用{lang}阅读',
    dismiss: '关闭',
  },
  hero: {
    badge: ['iPhone 版「敬語ボタン」已有 ', '5,000 多人', ' 在使用'],
    title: '就在你正在写字的地方，直接整理好。',
    lede: '把光标移到画面下方的工具栏上，按下自己的按钮即可。',
    download: '下载 Mac 版',
    secondary: '获取 iPhone 版',
    meta: 'macOS 14 及以上 · 免费使用 · 与 iPhone 版同一账户',
    draft: '明日の定例、15時からに変更してもらえませんか。あと資料の最終版も送ります。',
    rewritten:
      '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。',
    hotButton: '敬語',
    windowTitle: '邮件 — 新邮件',
  },
  // Chinese readers use the product to write Japanese, so the simulated app
  // itself stays Japanese even though the surrounding explanation is Chinese.
  product: {
    buttons: ['敬語', '要約', '英訳', '丁寧に'],
    barIdleAria: '画面下のバー（待機中）',
    barExpandedAria: 'バーを展開した状態。自分のボタンが並んでいます',
    generating: '書き換えています',
    generatingAria: '書き換え中。バーがキャプセルに変わります',
    resultPrompt: '敬語',
    resultBody:
      '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。',
    resultAria: '書き換え結果のパネル',
    insert: '挿入',
    windowTitle: 'メール — 新規メッセージ',
  },
  everywhere: {
    title: '只要能打字的地方，都能用。',
    body: '不需要为每个应用安装扩展或插件，也不需要设置。只要能放下光标的输入框，就是你的工作场所。',
    note: '像浏览器和 Slack 这类输入框比较特殊的应用，也会自动切换读取方式来支持。',
    apps: { mail: '邮件', notes: '备忘录' },
  },
  how: {
    eyebrow: '使用方法',
    title: '三秒就能完成。',
    lede: '需要记住的只有两件事：悬停，然后按下。',
    note: '按钮里没有的指令，可以从 ✎ 自由输入。',
    windowTitle: 'Slack — 话题',
    before: '明日の定例、15時からに変更してもらえませんか。',
    after: '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。',
    steps: [
      {
        title: '写（选中与否都可以）',
        body: '像平时一样在应用里写文字。可以选中想修改的部分，也可以什么都不选。',
      },
      {
        title: '将光标移到工具栏上',
        body: '把光标放到画面下方的工具栏上，你的按钮就会横向展开。',
      },
      {
        title: '按下后，当场替换',
        body: '按下的瞬间开始改写，并直接替换原文。不需要任何粘贴操作。',
      },
    ],
  },
  dives: {
    one: {
      title: '按钮由你来决定。',
      body: '「改成敬语」「更短」「英译」——把常用的修改方式做成按钮。在 iPhone 版创建的按钮会直接出现在 Mac 上，在任意一端修改都会同步到两端。',
      link: '查看使用方法',
    },
    two: {
      title: '不选中也能改写。',
      body: '选中一部分，就只改那一部分；什么都不选，就以整个输入框的文字为对象。无需切换模式，它看的是光标所在的位置。',
      selectedLabel: '选中一部分时',
      selectedNote: '只有选中的部分会改变',
      wholeLabel: '什么都不选时',
      wholeNote: '整个输入框的文字都是对象',
      windowTitle: 'Gmail — 撰写',
      fieldLead: 'お世話になっております。',
      fieldSelected: 'この件、明日までにお願いします。',
      fieldTail: 'よろしくお願いいたします。',
    },
    three: {
      title: '替换之前，可以先确认。',
      body: '生成时工具栏会变成细长的胶囊，完成后结果就显示在原处。不满意就重新生成，满意就直接插入。',
      mono: '插入只需按 Enter',
    },
    editorHead: '按钮',
    editorRows: [
      { name: '敬語', desc: '整理成可以发给客户的文字' },
      { name: '要約', desc: '只把要点简短归纳' },
      { name: '英訳', desc: '翻译成自然的英语' },
      { name: '丁寧に', desc: '换成更柔和的表达' },
      { name: 'カジュアル', desc: '改成适合公司内部的轻松语气', off: true },
    ],
  },
  pricing: {
    eyebrow: '价格',
    title: '先免费使用。',
    lede: '当它成为日常之后，可升级到每月 1,000 次的 Pro。iPhone 版将持续免费。',
    cycleAria: '付款周期',
    monthly: '月付',
    yearly: '年付',
    save: '省下 2 个月以上',
    recommended: '推荐',
    taxNote: '所示价格即为实际收费金额。',
    perMonth: '/ 月',
    perYear: '/ 年',
    yearlyNote: '年付 {total}',
    monthlyNote: '月付',
    free: {
      name: '免费',
      blurb: '先试试看',
      features: ['每月 {free} 次改写', '全部类型的按钮都能用', '与 iPhone 版同步按钮', '无需信用卡'],
      cta: '下载 Mac 版',
      foot: '可以一直这样用下去',
    },
    pro: {
      name: 'Pro',
      blurb: '给每天都要写字的人',
      features: ['包含免费版全部功能', '每月 {pro} 次改写', '支持 Apple Pay', '随时一键取消'],
      cta: '以此价格开始',
      foot: '随时可以取消',
    },
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: '为什么需要辅助功能权限？',
        a: '用于读取你正在输入的文字，并把改写后的文字写回原来的位置。在 macOS 上，处理其他应用的输入框需要这个权限。不会录屏，也不会记录键盘输入。你可以随时在系统设置中撤销。',
      },
      {
        q: '写的文字会被保存在什么地方吗？',
        a: '为了完成改写会发送内容，处理结束后服务器上不会保留。是否用于改进 AI 可以随时在设置中切换，关闭后改写功能仍可正常使用。',
      },
      {
        q: '需要 iPhone 版的应用吗？',
        a: '不需要，只用 Mac 版也可以。如果想把在 iPhone 版「敬語ボタン」创建的按钮也用在 Mac 上，用同一个账户登录即可。',
      },
      {
        q: '可以在哪些应用中使用？',
        a: '邮件、Slack、Gmail、Notion、Chrome、Word 等，只要是能放下光标的输入框都能使用。像浏览器和 Slack 这类输入框比较特殊的应用，也会自动切换读取方式来支持。',
      },
      {
        q: '支持哪些 macOS 版本？',
        a: 'macOS 14 及以上，Apple 芯片和 Intel 都能运行。',
      },
      {
        q: '提示「无法验证开发者」时怎么办？',
        a: '本应用已通过 Apple 公证，通常不会出现该提示。如果出现，请右键点击应用并选择「打开」。',
      },
      {
        q: '如何卸载？',
        a: '从「应用程序」文件夹中删除即可。同时请在系统设置 › 隐私与安全性 › 辅助功能 中移除授权。',
      },
    ],
  },
  footer: {
    navAria: '页脚导航',
    navHeading: '导航',
    downloadHeading: 'Mac 上也有敬語ボタン。',
    downloadCopy: ['就在你正在写字的地方，', '直接把文章整理好。'],
    downloadButton: '免费下载',
    terms: '使用条款',
    privacy: '隐私政策',
    contact: '联系我们',
    mobile: 'iPhone版',
    converter: '無料の敬語変換',
    checker: '敬語チェック',
    test: '敬語テスト20問',
    reibun: '場面別 例文集',
    articles: '敬語の記事',
    copyright: '© 2026 株式会社Core7',
    toTop: '返回页面顶部',
  },
  modal: {
    title: '先安装，再授权',
    lead: ['下载即将开始。如果没有开始，可以 ', '手动下载', '。'],
    close: '关闭',
    note: '需要 macOS 14 及以上版本。如果遇到问题请联系我们。',
    titleSoon: 'Mac 版即将发布',
    bodySoon: '已签名并通过公证的版本正在准备中。发布后即可从本页下载。',
    steps: [
      { label: '步骤 1', title: '打开', body: '打开下载文件夹中的 KeigoButton.dmg。' },
      { label: '步骤 2', title: '安装', body: '拖放到「应用程序」文件夹中。' },
      { label: '步骤 3', title: '启动', body: '从 Launchpad 或「应用程序」文件夹启动。' },
      {
        label: '步骤 4',
        title: '授权',
        body: '在系统设置 › 辅助功能 中打开敬語ボタン。没有这个权限就无法读取文字。',
      },
    ],
  },
}

const DICTS = { ja, en, zh };

export type Dict = typeof ja;

export function dict(lang: Lang): Dict {
  return DICTS[lang] as Dict;
}

export function isLang(value: string): value is Lang {
  return value === "ja" || value === "en" || value === "zh";
}

/** `{name}` placeholders, so a sentence's word order stays the translator's. */
export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce<string>(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
