import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useT } from "../i18n";
import "./DownloadModal.css";

/** Native modal dialog owns focus trapping, Escape, and background inertness. */
export default function DownloadModal({ downloadUrl, onClose }) {
  const t = useT();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (opener instanceof HTMLElement && opener.isConnected)
        opener.focus({ preventScroll: true });
    };
  }, []);
  if (typeof document === "undefined") return null;
  return createPortal(
    <dialog
      ref={dialogRef}
      className="aside-download"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const targets = [
          ...e.currentTarget.querySelectorAll(
            'a[href],button:not([disabled]),[tabindex="0"]',
          ),
        ].filter((el) => el.getClientRects().length);
        const first = targets[0],
          last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onClose();
      }}
    >
      <div className="aside-download__head">
        <img src="/icons/aside/icon.png" alt="" width="52" height="52" />
        <button
          className="aside-download__close"
          ref={closeRef}
          onClick={onClose}
          aria-label={t.modal.close}
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 id={titleId}>{downloadUrl ? t.modal.title : t.modal.titleSoon}</h2>
        <p>
          {downloadUrl ? (
            <>
              {t.modal.lead[0]}
              <a href={downloadUrl}>{t.modal.lead[1]}</a>
              {t.modal.lead[2]}
            </>
          ) : (
            t.modal.bodySoon
          )}
        </p>
      </div>
      <ol className="aside-download__steps">
        {t.modal.steps.map((step, i) => (
          <li key={step.label}>
            <div
              className={`aside-download__art aside-download__art--${i}`}
              aria-hidden="true"
            >
              <span className="aside-download__number">0{i + 1}</span>
              <StepArt index={i} />
            </div>
            <div className="aside-download__instruction">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="aside-download__note">{t.modal.note}</p>
    </dialog>,
    document.body,
  );
}

/* Quiet, bounded installation scenes. Filled surfaces keep every line distinct. */
function StepArt({ index }) {
  const icon = (x, y, size) => (
    <image
      href="/icons/aside/icon.png"
      x={x}
      y={y}
      width={size}
      height={size}
    />
  );
  const windowFrame = (
    <>
      <rect
        x="20"
        y="18"
        width="240"
        height="144"
        rx="12"
        fill="#fff"
        stroke="#d6dfe3"
      />
      <path d="M20 48H260" stroke="#e6ecef" />
      {[34, 44, 54].map((x) => (
        <circle key={x} cx={x} cy="33" r="2.5" fill="#cbd4d9" />
      ))}
    </>
  );
  return (
    <svg className="art" viewBox="0 0 280 180" fill="none" aria-hidden="true">
      {windowFrame}
      {index === 0 && (
        <>
          <rect x="38" y="70" width="204" height="65" rx="8" fill="#f4f7f8" />
          {icon(48, 82, 40)}
          <text
            x="100"
            y="97"
            fill="#30383d"
            fontSize="12"
            fontFamily="system-ui"
          >
            KeigoButton.dmg
          </text>
          <path
            d="M100 111H170"
            stroke="#cbd4d9"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M219 93v17m-5-5 5 5 5-5"
            stroke="#606a70"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {index === 1 && (
        <>
          {icon(48, 74, 54)}
          <path
            d="M120 101H158m-6-6 6 6-6 6"
            stroke="#86959d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M177 83v-7h20l7 7h28v43h-55Z"
            fill="#e5f0f5"
            stroke="#b6ccd7"
            strokeLinejoin="round"
          />
          <text
            x="204"
            y="114"
            textAnchor="middle"
            fontSize="25"
            fontFamily="system-ui"
            fill="#607d8b"
          >
            A
          </text>
        </>
      )}
      {index === 2 && (
        <>
          {[48, 111, 174].map((x, i) =>
            i === 1 ? (
              <g key={x}>{icon(x, 75, 54)}</g>
            ) : (
              <rect
                key={x}
                x={x}
                y="75"
                width="54"
                height="54"
                rx="12"
                fill="#eff3f5"
              />
            ),
          )}
          <circle
            cx="151"
            cy="126"
            r="12"
            fill="#171919"
            stroke="#fff"
            strokeWidth="3"
          />
          <path d="m148 121 7 5-7 5Z" fill="#fff" />
        </>
      )}
      {index === 3 && (
        <>
          <rect x="21" y="49" width="55" height="101" fill="#f4f7f8" />
          {[70, 86, 102, 118].map((y) => (
            <path
              key={y}
              d={`M33 ${y}h30`}
              stroke="#d5dfe4"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
          {icon(90, 82, 40)}
          <path
            d="M141 94h37m-37 13h25"
            stroke="#aebdc5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect x="205" y="91" width="34" height="20" rx="10" fill="#006fc9" />
          <circle cx="229" cy="101" r="7" fill="#fff" />
        </>
      )}
    </svg>
  );
}
