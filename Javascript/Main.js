function AssignTextToWindowTitle() {
  const MainTitle = document.querySelector(".main-title");
  const HeadTitleTag = document.querySelector("title");
  if (!MainTitle) HeadTitleTag.innerText = "وبلاگ ایرانیوم - مقالات علمی و هسته ای";
  else HeadTitleTag.innerText = `وبلاگ ایرانیوم - ${MainTitle.innerHTML}`;
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
  if (!Input) return "This functions needs an string as input to operate";
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
function SetMarginForRow() {
  const Row = document.querySelector("#row");
  const Header = document.querySelector("header");
  const HeaderHeight = Header.getBoundingClientRect().height;
  Row.style.marginTop = `${HeaderHeight + 35}px`;
}
// Loading content based on user location (window.location)
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
function LoadHomePage() {
  const Main = document.querySelector("main");
  Main.innerHTML = "";
  const GalleryTitle = document.createElement("span");
  GalleryTitle.className =
    "main-title gallery-title w-full h-14 flex items-center justify-center bg-zinc-900 text-xl text-yellow-500 font-Sepahbod lg:rounded-md";
  GalleryTitle.innerText = "صفحه اصلی";
  const PostBannersContainer = document.createElement("section");
  PostBannersContainer.className = "post-banners-container flex flex-col mt-1 lg:mt-2";
  Main.append(GalleryTitle, PostBannersContainer);
  Pagination();
}
function LoadCategoryPage() {
  let Hash = location.hash.slice(1);
  let TargetCategoryName = Hash.slice(9);
  let TargetCategoryInfo = GetCategoryInfoByName(TargetCategoryName);
  // DOM
  const Main = document.querySelector("main");
  Main.innerHTML = "";
  const GalleryTitle = document.createElement("span");
  const GalleryTitleLabel = document.createElement("span");
  const GalleryTitleText = document.createElement("h2");
  const PostBannersContainer = document.createElement("section");
  PostBannersContainer.className = "post-banners-container flex flex-col mt-2 lg:mt-3";
  GalleryTitle.className =
    "gallery-title w-full h-14 flex items-center justify-center bg-zinc-900 text-xl text-yellow-500 font-Sepahbod lg:rounded-md";
  GalleryTitleLabel.className = "gallery-title-label text-xl text-yellow-500 font-Sepahbod ml-2";
  GalleryTitleText.className = "gallery-title-text main-title text-xl text-yellow-500 font-Sepahbod";
  GalleryTitleText.innerText = `${TargetCategoryInfo.DisplayName}`;
  GalleryTitleLabel.innerText = "دسته بندی :";
  GalleryTitle.append(GalleryTitleLabel, GalleryTitleText);
  Main.append(GalleryTitle, PostBannersContainer);
  // Generate some post banner on window load
  if (TargetCategoryInfo.PostsCount > 0) {
    Pagination(TargetCategoryInfo.Posts, 1);
  }
}
function GetCategoryInfoByName(Name) {
  let TargetCategory = CategoriesArray[Name];
  let CategoryTags = TargetCategory.Tags.map((TagObj) => {
    return TagObj.KeyValue;
  });
  let CategorisedPosts = Posts.filter((Post) => {
    let PostTags = Post.Tags.map((TagObj) => {
      return TagObj.KeyValue;
    });
    return PostTags.includes(...CategoryTags);
  });
  return {
    Name: Name,
    DisplayName: TargetCategory.DisplayName,
    Tags: CategoryTags,
    Posts: CategorisedPosts,
    PostsCount: CategorisedPosts.length,
  };
}
// Managing user scrolling
function StickySidebar() {
  const ViewPortHeight = window.innerHeight;
  const HeaderHeight = document.querySelector("header").clientHeight;
  const LeftSidebar = document.querySelector("#left-sidebar");
  const RightSidebar = document.querySelector(".right-sidebar");
  const MainElem = document.querySelector("main");
  const LeftSidebarHeight = LeftSidebar.clientHeight;
  const RightSidebarHeight = RightSidebar.clientHeight;
  if (window.scrollY >= LeftSidebarHeight - ViewPortHeight) {
    LeftSidebar.style.position = "sticky";
    LeftSidebar.style.top = `${HeaderHeight + 20}px`;
  } else {
    LeftSidebar.style.position = "";
  }
  if (window.scrollY >= RightSidebarHeight - ViewPortHeight) {
    RightSidebar.style.position = "sticky";
    RightSidebar.style.top = `${HeaderHeight + 20}px`;
  } else {
    RightSidebar.style.position = "";
  }
}
function MinimizeHeaderOnScroll() {
  const FirstHeaderRow = document.querySelector(".first-header-row");
  const HeaderMenuContainer = document.querySelector(".header-menu-container");
  if (window.innerWidth >= 1000) {
    if (window.scrollY > 0) {
      FirstHeaderRow.style.display = "none";
      HeaderMenuContainer.style.marginTop = "0";
      SetMarginForRow();
    }
    if (window.scrollY === 0) {
      FirstHeaderRow.style.display = "flex";
      HeaderMenuContainer.style.marginTop = "2px";
      SetMarginForRow();
    }
  }
}
function ScrollBar() {
  const ScrollBarElement = document.getElementById("scrollbar");
  let Height = document.body.clientHeight - window.innerHeight;
  let CurrentPosition = window.scrollY;
  let Precentage = ((CurrentPosition / Height) * 100).toFixed(0);
  ScrollBarElement.style.width = `${Precentage}%`;
}
// Window events
window.onload = function () {
  UpdateTags();
  CheckLocationHash();
  AssignTextToWindowTitle();
  GenerateDesktopDropDownMenus();
  GenerateAllTagsSidebarItem();
  SetMarginForRow();
};
window.addEventListener("hashchange", () => {
  CheckLocationHash();
  AssignTextToWindowTitle();
  ResetSearchBar();
  HideDropDowns();
  SetMarginForRow();
});
window.addEventListener("scroll", () => {
  ScrollBar();
  StickySidebar();
  MinimizeHeaderOnScroll();
});
