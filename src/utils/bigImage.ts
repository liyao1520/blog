import bigImgae from "@/components/bigImage";

export default function (parentEl: HTMLElement): void {
  parentEl.addEventListener("click", handleClick);
}
function handleClick(e: MouseEvent) {
  const el = e.target as HTMLImageElement;
  if (el && el.tagName === "IMG") {
    bigImgae.open(el.src);
  }
}
