export function init(root) {
  const track = root.querySelector(".c-carousel__track");
  if (!track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (const item of [...track.children]) {
    const copy = item.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    copy.querySelector("img")?.setAttribute("alt", "");
    copy.querySelector("img")?.setAttribute("loading", "eager");
    track.append(copy);
  }

  root.classList.add("c-carousel--marquee");
}
