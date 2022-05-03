const callback: IntersectionObserverCallback = (entries) => {
  entries.forEach((item) => {
    // isIntersecting是一个Boolean值，判断目标元素当前是否可见
    if (item.isIntersecting) {
      // 到了可见区域,需要img节点的data-src改为src,并且停止监听这个img节点
      const src = item.target.getAttribute("data-src") || "";
      item.target.setAttribute("src", src);
      item.target.removeAttribute("data-src");
      //停止监听特定目标元素
      intersectionObserver.unobserve(item.target);
    }
  });
};

const intersectionObserver = new IntersectionObserver(callback);

export default function lazyImage(parentEl: HTMLElement): void {
  // 获取到父节点下的所有带data-src的img标签
  const imgs = parentEl.querySelectorAll("img[data-src]");
  imgs.forEach((item) => {
    //开始监听一个目标元素
    intersectionObserver.observe(item);
  });
}
