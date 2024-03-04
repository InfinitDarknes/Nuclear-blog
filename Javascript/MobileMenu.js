const ShowMobileMenuBtn = document.getElementById("show-menu-btn");
const MobileMenu = document.getElementById("mobile-menu");
const HideMobileMenuBtn = document.getElementById("close-mobile-menu-btn");

ShowMobileMenuBtn.addEventListener("click", ShowMobileMenu);
HideMobileMenuBtn.addEventListener("click", HideMobileMenu);
function HideMobileMenu() {
  MobileMenu.style.right = "-100%";
}
function ShowMobileMenu() {
  MobileMenu.style.right = "0";
}
