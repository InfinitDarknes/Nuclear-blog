function ScrollBar() {
  const ScrollBarElement = document.getElementById("scrollbar");
  let Height = document.body.clientHeight - window.innerHeight;
  let CurrentPosition = window.scrollY;
  let Precentage = ((CurrentPosition / Height) * 100).toFixed(0);
  ScrollBarElement.style.width = `${Precentage}%`;
}
window.addEventListener(
  "scroll",
  () => {
    ScrollBar();
    if (window.innerWidth >= 1000) {
      if (window.scrollY > 0) {
        document.getElementById("first-header-row").style.display = "none";
        document.getElementById("header-menu-container").style.marginTop = "0";
        document.getElementById("row").style.marginTop = "180px";
      }
      if (window.scrollY === 0) {
        document.getElementById("first-header-row").style.display = "flex";
        document.getElementById("header-menu-container").style.marginTop = "2px";
        document.getElementById("row").style.marginTop = "230px";
      }
    } else {
      document.getElementById("first-header-row").style.display = "none";
    }
  },
  true
);
