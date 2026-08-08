import { Reveal } from '../hooks/useReveal.jsx'
import { AppWindow, GeneratingCapsule, ResultPanel } from './product/Product.jsx'

/**
 * Poke's numbered alternating rows (content.md R3/R4), separated by hairlines
 * rather than whitespace — design.md uses that border 54 times and calls it
 * the preferred separator.
 *
 * Dive (2) is the real differentiator and the one competitors can't copy: a
 * clipboard-based tool physically cannot capture an unselected field, because
 * ⌘C with nothing selected copies nothing. Said here without the jargon.
 *
 * Dive (3) is where the generating capsule's rainbow sweep appears — the only
 * colour on the page — but the copy talks about what the result panel does
 * (review, regenerate, insert), not about the page's own colour budget.
 */

export default function DeepDives() {
  return (
    <section id="features">
      <div className="shell">
        <hr className="rule" />

        <Reveal className="dive">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(1)</p>
            <h3 className="h-heading-sm">ボタンは、あなたが決める。</h3>
            <p className="body dive__body measure">
              「敬語に」「短く」「英訳」——よく使う直し方をボタンにしておけます。
              iPhone版で作ったボタンは、そのままMacにも並びます。
              どちらで編集しても、両方に反映されます。
            </p>
            <a className="dive__link" href="#how">
              使い方を見る <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="dive__stage">
            <ButtonEditor />
          </div>
        </Reveal>

        <hr className="rule" />

        <Reveal className="dive dive--reverse">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(2)</p>
            <h3 className="h-heading-sm">選択しなくても、書き換えられる。</h3>
            <p className="body dive__body measure">
              一部を選べば、その部分だけ。何も選ばなければ、入力欄の文章まるごと。
              どちらにするかを指定する操作はありません。カーソルがある場所を見ています。
            </p>
          </div>
          <div className="dive__stage" style={{ flexDirection: 'column', gap: 20 }}>
            <SelectionCompare />
          </div>
        </Reveal>

        <hr className="rule" />

        <Reveal className="dive">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(3)</p>
            <h3 className="h-heading-sm">置き換わる前に、確認できる。</h3>
            <p className="body dive__body measure">
              生成中はバーが細いキャプセルに変わり、終わるとその場に結果が表示されます。
              気に入らなければ再生成、良ければそのまま挿入するだけです。
            </p>
            <p className="mono" style={{ marginTop: 'var(--space-20)' }}>
              挿入は Enter だけ
            </p>
          </div>
          <div className="dive__stage" style={{ flexDirection: 'column', gap: 28 }}>
            <div className="pv pv--lg">
              <GeneratingCapsule />
            </div>
            <div className="pv pv--sm">
              <ResultPanel />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** The settings window is eggshell — the light half of AGENTS.md §8's two ramps. */
function ButtonEditor() {
  const rows = [
    { name: '敬語', desc: '取引先に送れる文章に整える', on: true },
    { name: '要約', desc: '要点だけを短くまとめる', on: true },
    { name: '英訳', desc: '自然な英語に訳す', on: true },
    { name: '丁寧に', desc: 'やわらかい言い回しにする', on: true },
    { name: 'カジュアル', desc: '社内向けにくだけた調子へ', on: false },
  ]

  return (
    <div className="editor">
      <div className="editor__head">ボタン</div>
      {rows.map((r) => (
        <div className="editor__row" key={r.name}>
          <span className="editor__grip" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="4" cy="2.5" r="1" /><circle cx="8" cy="2.5" r="1" />
              <circle cx="4" cy="6" r="1" /><circle cx="8" cy="6" r="1" />
              <circle cx="4" cy="9.5" r="1" /><circle cx="8" cy="9.5" r="1" />
            </svg>
          </span>
          <span>
            <span className="editor__name">{r.name}</span>
            <span className="editor__desc" style={{ display: 'block' }}>{r.desc}</span>
          </span>
          <span className="editor__switch" data-on={String(r.on)} aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

function SelectionCompare() {
  return (
    <>
      <Case
        label="一部を選んだとき"
        note="選んだところだけが変わります"
        field={
          <>
            お世話になっております。
            <span className="win__sel">この件、明日までにお願いします。</span>
            よろしくお願いいたします。
          </>
        }
      />
      <Case
        label="何も選ばないとき"
        note="入力欄の文章がまるごと対象になります"
        field={
          <>
            お世話になっております。この件、明日までにお願いします。よろしくお願いいたします。
            <span className="win__caret" />
          </>
        }
      />
    </>
  )
}

function Case({ label, note, field }) {
  return (
    <div className="pv" style={{ width: '100%', maxWidth: 420 }}>
      <p className="mono" style={{ marginBottom: 8 }}>{label}</p>
      {/* .win is height:100%, so it needs a sized parent to render at all. */}
      <div style={{ height: 148 }}>
        <AppWindow title="Gmail — 作成" metaLines={1}>
          <div className="win__field win__field--focus" style={{ fontSize: 11 }}>
            {field}
          </div>
        </AppWindow>
      </div>
      <p className="caption" style={{ marginTop: 8 }}>{note}</p>
    </div>
  )
}
