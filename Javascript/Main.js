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
  GalleryTitle.className =
    "gallery-title w-full h-14 flex items-center justify-center bg-zinc-900 text-xl text-yellow-500 font-Sepahbod lg:rounded-md";
  GalleryTitle.innerText = "پست هایی که باید بخوانید";
  const PostBannersContainer = document.createElement("section");
  PostBannersContainer.className = "post-banners-container flex flex-col mt-2 lg:mt-3";
  Main.append(GalleryTitle, PostBannersContainer);
  Pagination();
}
function CheckLocationHash() {
  let Hash = location.hash.slice(1);
  if (!Hash) {
    LoadHomePage();
    return;
  }
  if (Hash.includes("category-")) {
    LoadCategoryPage();
    return;
  }
  let FetchedPost = Posts.find((Post) => {
    return Post.Path === Hash;
  });
  if (!FetchedPost) {
    return;
  }
  GeneratePost(FetchedPost);
  window.scrollTo(0, 0);
}
function ToggleBackgroundBlur() {
  const Header = document.querySelector("header");
  const Footer = document.querySelector("footer");
  const Row = document.querySelector("#row");
  Header.classList.toggle("blur");
  Footer.classList.toggle("blur");
  Row.classList.toggle("blur");
}
function PlacePersianNumbers(Input) {
  let String = Input.toString();
  const PersianNumbers = [
    { English: "0", Persian: "۰" },
    { English: "1", Persian: "۱" },
    { English: "2", Persian: "۲" },
    { English: "3", Persian: "۳" },
    { English: "4", Persian: "۴" },
    { English: "5", Persian: "۵" },
    { English: "6", Persian: "۶" },
    { English: "7", Persian: "۷" },
    { English: "8", Persian: "۸" },
    { English: "9", Persian: "۹" },
  ];
  for (n = 0; n < PersianNumbers.length; n++) {
    if (String.includes(PersianNumbers[n].English)) {
      String = String.replaceAll(new RegExp(PersianNumbers[n].English, "g"), PersianNumbers[n].Persian);
    }
  }
  return String;
}
function LoadCategoryPage() {
  let Hash = location.hash.slice(1);
  let TargetCategoryName = Hash.slice(9);
  let TargetCategory = CategoriesArray[TargetCategoryName];
  let CategoryTags = TargetCategory.Tags.map((TagObj) => {
    return TagObj.KeyValue;
  });
  let CategorisedPosts = Posts.filter((Post) => {
    let PostTags = Post.Tags.map((TagObj) => {
      return TagObj.KeyValue;
    });
    return PostTags.includes(...CategoryTags);
  });
  // DOM
  const Main = document.querySelector("main");
  Main.innerHTML = "";
  const GalleryTitle = document.createElement("span");
  GalleryTitle.className =
    "gallery-title w-full h-14 flex items-center justify-center bg-zinc-900 text-xl text-yellow-500 font-Sepahbod lg:rounded-md";
  GalleryTitle.innerText = `دسته بندی : ${TargetCategory.DisplayName}`;
  const PostBannersContainer = document.createElement("section");
  PostBannersContainer.className = "post-banners-container flex flex-col mt-2 lg:mt-3";
  Main.append(GalleryTitle, PostBannersContainer);
  // Generate some post banner on window load
  if (CategorisedPosts.length > 0) {
    Pagination(CategorisedPosts, 1);
  }
}
window.onload = function () {
  UpdateTags();
  CheckLocationHash();
  GenerateDesktopDropDownMenus();
  GenerateAllTagsSidebarItem();
};
window.addEventListener("hashchange", () => {
  CheckLocationHash();
  ResetSearchBar();
  HideDropDowns();
});
window.addEventListener("scroll", () => {
  const FirstHeaderRow = document.querySelector(".first-header-row");
  const HeaderMenuContainer = document.querySelector(".header-menu-container");
  const Row = document.querySelector("#row");
  ScrollBar();
  if (window.innerWidth >= 1000) {
    if (window.scrollY > 0) {
      FirstHeaderRow.style.display = "none";
      HeaderMenuContainer.style.marginTop = "0";
      Row.style.marginTop = "180px";
    }
    if (window.scrollY === 0) {
      FirstHeaderRow.style.display = "flex";
      HeaderMenuContainer.style.marginTop = "2px";
      Row.style.marginTop = "230px";
    }
  }
});
