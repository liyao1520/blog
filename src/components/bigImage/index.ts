import BigImageComponent from "./BigImage.vue";
import { h, render } from "vue";

const bigImageEl = document.createElement("div");

document.body.appendChild(bigImageEl);
const overflow = document.body.style.overflow || "auto";
const bodyElement = document.body;
const bigImgae = {
  open(src: string): void {
    bigImageEl.style.display = "block";
    bodyElement.style.overflow = "hidden";
    const vnode = h(BigImageComponent, {
      src,
      onClose() {
        bigImageEl.style.display = "none";
        bodyElement.style.overflow = overflow;
      },
    });

    render(vnode, bigImageEl);
  },
};

export default bigImgae;
