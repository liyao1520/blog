const callback: IntersectionObserverCallback = (entries) => {
  entries.forEach((item) => {
    if (item.isIntersecting) {
      const src = item.target.getAttribute("data-src") || "";
      item.target.setAttribute("src", src);
      item.target.removeAttribute("data-src");
      intersectionObserver.unobserve(item.target);
    }
  });
};
const intersectionObserver = new IntersectionObserver(callback);

export default function lazyImage(parentEl: HTMLElement): void {
  const imgs = parentEl.querySelectorAll("img[data-src]");
  imgs.forEach((item) => {
    intersectionObserver.observe(item);
  });
}
