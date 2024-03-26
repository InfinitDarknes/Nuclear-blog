function ScrollBar() {
  const ScrollBarElement = document.getElementById("scrollbar");
  let Height = document.body.clientHeight - window.innerHeight;
  let CurrentPosition = window.scrollY;
  let Precentage = ((CurrentPosition / Height) * 100).toFixed(0);
  ScrollBarElement.style.width = `${Precentage}%`;
}
function LoadHomePage() {
  const Main = document.querySelector("main");
  Main.innerHTML = "";
  const GalleryTitle = document.createElement("span");
  GalleryTitle.className = "gallery-title";
  GalleryTitle.innerText = "پست هایی که باید بخوانید";
  const PostBannersContainer = document.createElement("section");
  PostBannersContainer.id = "post-banners-container";
  Main.append(GalleryTitle, PostBannersContainer);
  // Generate some post banner on window load
  let Page = CurrentPage;
  let Start = (Page - 1) * LayoutSettings.BannerPerPage;
  let End = Page * LayoutSettings.BannerPerPage;
  BannerGenerator(Start, End);
  Pagination();
}
function CheckLocationHash() {
  if (!location.hash) {
    LoadHomePage();
    GenerateAllTagsSidebarItem();
  } else {
    let FetchedPost = Posts.find((Post) => {
      return Post.Path === location.hash.slice(1);
    });
    GeneratePost(FetchedPost);
    GenerateAllTagsSidebarItem();
    window.scrollTo(0, 0);
  }
}
function ToggleBackgroundBlur() {
  const Header = document.querySelector("header");
  const Footer = document.querySelector("footer");
  const Row = document.querySelector("#row");
  Header.classList.toggle("blur");
  Footer.classList.toggle("blur");
  Row.classList.toggle("blur");
}
window.onload = function () {
  UpdateTags();
  CheckLocationHash();
};
window.addEventListener("hashchange", () => {
  CheckLocationHash();
  ResetSearchBar();
});
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
