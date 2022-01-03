import { Directive } from "vue";
const loading: Directive = {
  beforeUpdate(el, { value }) {
    el.style.opacity = value ? "0.5" : "1";
  },
};
export default loading;
