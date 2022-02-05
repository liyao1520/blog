/* eslint-disable @typescript-eslint/no-non-null-assertion */
import themes from "./index";
import hljsMap from "./hljs";
import { Ref, ref, watch } from "vue";
export default function (): Ref<string> {
  const hljsStyle = document.getElementById("hljs");
  const markdownBodyStyle = document.getElementById("markdown-body");
  const currentTheme = localStorage.getItem("markdown-theme") || "default";
  const theme = ref(currentTheme);
  watch(
    theme,
    (newTheme) => {
      markdownBodyStyle!.innerHTML = themes[newTheme].style;
      const hljs = themes[newTheme].highlight || "atom-one-dark";
      hljsStyle!.innerHTML = hljsMap[hljs];
      localStorage.setItem("markdown-theme", newTheme);
    },
    { immediate: true }
  );

  return theme;
}
