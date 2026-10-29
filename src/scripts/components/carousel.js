const INTERVAL_MS = 3000;

export function init(root) {
  const track = root.querySelector(".c-carousel__track");
  if (!track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = [...track.children];
  const offset = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  let timer = null;

  const next = () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const target = atEnd
      ? items[0]
      : items.find((item) => item.offsetLeft - offset > track.scrollLeft + 1);
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - offset, behavior: "smooth" });
  };

  const start = () => {
    if (timer === null) timer = setInterval(next, INTERVAL_MS);
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  root.addEventListener("pointerenter", stop);
  root.addEventListener("pointerleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  root.addEventListener("touchstart", stop, { passive: true });
  root.addEventListener("touchend", start, { passive: true });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  start();
}
