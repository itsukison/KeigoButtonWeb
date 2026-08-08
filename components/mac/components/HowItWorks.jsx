import { Reveal } from '../hooks/useReveal.jsx'
import { AppWindow, OverlayBar } from './product/Product.jsx'

/**
 * Willow's 01/02/03 storyboard (content.md R10). This is the section that
 * decides whether anyone downloads: if "hover, press, replaced in place" isn't
 * understood here, nothing later matters.
 *
 * All three frames hold the same window at the same size on purpose — that's
 * what makes them read as consecutive frames rather than three screenshots.
 */

const STEPS = [
  {
    n: '01',
    title: '書く（選んでも、選ばなくても）',
    body: 'いつも通りアプリで文章を書きます。直したい部分を選んでも、何も選ばなくても構いません。',
  },
  {
    n: '02',
    title: 'バーにホバーする',
    body: '画面の下のバーにカーソルを乗せると、自分のボタンが横に並びます。',
  },
  {
    n: '03',
    title: '押すと、その場で置き換わる',
    body: '押した瞬間に書き換えが始まり、元の文章と入れ替わります。貼り付ける操作はありません。',
  },
]

export default function HowItWorks() {
  return (
    <section className="section section--band" id="how">
      <Reveal className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">使い方</p>
        <h2 className="h-heading center">3秒で終わります。</h2>
        <p className="body center" style={{ marginTop: 'var(--space-16)' }}>
          覚えることは、ホバーして押すことだけ。
        </p>

        <div className="steps" style={{ textAlign: 'left' }}>
          {STEPS.map((s, i) => (
            <div className="step" key={s.n}>
              <div className="step__frame">
                <StepArt index={i} />
              </div>
              <div className="step__head">
                <span className="step__num">{s.n}</span>
                <span className="step__title">{s.title}</span>
              </div>
              <p className="body-sm step__body">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="caption center" style={{ marginTop: 'var(--space-40)' }}>
          ボタンにない指示は ✎ から自由に入力できます。
        </p>
      </Reveal>
    </section>
  )
}

/** Three frames of one continuous scene, at a scale that fits the card. */
function StepArt({ index }) {
  const before = '明日の定例、15時からに変更してもらえませんか。'
  const after = '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。'

  return (
    <div
      className="pv pv--xs"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <AppWindow title="Slack — スレッド" metaLines={2}>
          <div className="win__field win__field--focus" style={{ fontSize: 11 }}>
            {index === 2 ? (
              <span className="win__sel">{after}</span>
            ) : (
              <>
                {before}
                <span className="win__caret" />
              </>
            )}
          </div>
        </AppWindow>
      </div>

      {/* Frames 1 and 3 both show the collapsed bar — the difference between
          them is the text, which is exactly the before/after being sold. */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <OverlayBar collapsed={index !== 1} hot={index === 1 ? '敬語' : null} />
      </div>
    </div>
  )
}
