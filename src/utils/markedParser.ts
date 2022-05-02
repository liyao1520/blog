import marked from "marked";
const getSizeReg = /(\d+)\*(\d+)$/;
const renderer = new marked.Renderer();
renderer.image = function (href, title, alt) {
  const res = getSizeReg.exec(alt);
  if (res) {
    const [, naturalWidth, naturalHeight] = res;
    return `<img data-src="${href}" style="aspect-ratio:${naturalWidth} / ${naturalHeight};" alt="${alt}">`;
  } else {
    return `<img data-src="${href}"  alt="${alt}">`;
  }
};
export default renderer;
