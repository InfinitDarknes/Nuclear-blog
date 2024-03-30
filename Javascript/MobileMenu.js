const ShowMobileMenuBtn = document.querySelector(".show-menu-btn");
const MobileMenu = document.querySelector(".mobile-menu");
const HideMobileMenuBtn = document.querySelector(".close-mobile-menu-btn");
let MobileMenuArray = [
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
  { Text: "", Icon: "", Href: "" },
];
function GenerateMobileMenu() {
  const MobileMenu = document.createElement("section");
  const CloseMobileMenuBtn = document.createElement("button");
  const MobileMenuUl = document.createElement("ul");
  // const MobileMenu = document.createElement("section");
  // const MobileMenu = document.createElement("section");
  // const MobileMenu = document.createElement("section");
}
function HideMobileMenu() {
  MobileMenu.style.right = "-100%";
}
function ShowMobileMenu() {
  MobileMenu.style.right = "0";
}
ShowMobileMenuBtn.addEventListener("click", ShowMobileMenu);
HideMobileMenuBtn.addEventListener("click", HideMobileMenu);
