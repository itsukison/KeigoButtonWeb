import { useState } from 'react'
import { Reveal } from '../hooks/useReveal.jsx'

/**
 * Ordered by how likely each question is to stop a download, not by topic.
 * The permission question is first because it is the one that kills installs.
 */
const ITEMS = [
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
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq-section" id="faq">
      <Reveal className="shell">
        <h2 className="h-heading center">よくある質問</h2>

        <div className="faq">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="faq__item" key={item.q} data-open={String(isOpen)}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span className="faq__sign" aria-hidden="true">+</span>
                  </button>
                </h3>
                {isOpen && (
                  <p className="body faq__a" id={`faq-a-${i}`}>
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
