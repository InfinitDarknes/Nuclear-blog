function ScrollBar() {
  const ScrollBarElement = document.getElementById("scrollbar");
  let Height = document.body.clientHeight - window.innerHeight;
  let CurrentPosition = window.scrollY;
  let Precentage = ((CurrentPosition / Height) * 100).toFixed(0);
  ScrollBarElement.style.width = `${Precentage}%`;
}
window.addEventListener("scroll", () => {
  ScrollBar();
  console.log(window.screenTop);
  if (window.scrollY > 0) {
    document.getElementById("first-header-row").style.display = "none";
    document.getElementById("header-menu-container").style.marginTop = "0";
  }
  if (window.scrollY === 0) {
    document.getElementById("first-header-row").style.display = "flex";
    document.getElementById("header-menu-container").style.marginTop = "3px";
  }
});
