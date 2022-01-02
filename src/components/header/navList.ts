interface INavItem {
  name: string;
  icon: string;
  path: string;
}
const NavList: INavItem[] = [
  {
    name: "主页",
    icon: "",
    path: "/",
  },
  {
    name: "标签",
    icon: "",
    path: "/tags",
  },
  {
    name: "归档",
    icon: "",
    path: "/archive",
  },
  {
    name: "项目",
    icon: "",
    path: "/demo",
  },
  {
    name: "关于",
    icon: "",
    path: "/about",
  },
];
export default NavList;
