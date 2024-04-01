let LayoutSettings = {
  BannerPerPage: 6,
  MaxPaginationButtons: 5,
};
let CurrentPage = 1;
function BannerGenerator(PostsArray = Posts) {
  const PostBannersContainer = document.querySelector(".post-banners-container");
  PostBannersContainer.innerHTML = "";
  let BannerFragments = document.createDocumentFragment();
  PostsArray.forEach((Post) => {
    const PostBanner = document.createElement("article");
    PostBanner.className = "post-banner flex flex-col items-center lg:flex-row  p-4 w-full bg-zinc-900 lg:rounded-md mb-2 overflow-hidden";
    const PostBannerImageContainer = document.createElement("section");
    PostBannerImageContainer.className = "post-banner-image-container w-72 lg:w-48 h-48 lg:h-36 ";
    //
    const PostBannerInfoSection = document.createElement("section");
    PostBannerInfoSection.className = "post-banner-info-section relative flex flex-col lg:mr-4 items-center lg:items-start w-full mt-4 lg:mt-0";
    //
    const PostBannerImage = document.createElement("img");
    PostBannerImage.className = "post-banner-image object-fill w-full h-full";
    PostBannerImage.src = Post.ThumbnailSrc;
    PostBannerImage.alt = Post.ThumbnailAlt;
    PostBannerImage.title = Post.ThumbnailTitle;
    //
    const BannerTitleContainer = document.createElement("section");
    BannerTitleContainer.className = "banner-title-container";
    //
    const BannerTitleLinkTag = document.createElement("a");
    BannerTitleLinkTag.href = `#${Post.Path}`;
    BannerTitleLinkTag.className = "text-blue-600 text-xl";
    //
    const BannerTitle = document.createElement("h2");
    BannerTitle.className = "banner-title";
    BannerTitle.innerText = Post.Title;
    //
    const BannerDate = document.createElement("span");
    BannerDate.className = "article-date text-orange-600 text-base font-Sepahbod";
    BannerDate.innerText = Post.Date;
    //
    const BannerDescription = document.createElement("p");
    BannerDescription.className = "banner-description text-justify text-base text-white font-Dirooz mb-9";
    let Description = Post.ArticleSections[0].Paragraphs[0].substring(0, 400);
    BannerDescription.innerText = Description;
    //
    const ViewPostLink = document.createElement("a");
    ViewPostLink.className =
      "view-post-link flex items-center absolute -bottom-4 -left-4 w-fit p-1.5 text-lg font-Dirooz bg-zinc-800  text-blue-600 hover:text-yellow-500 transition duration-300 rounded-tr-md";
    ViewPostLink.href = `#${Post.Path}`;
    ViewPostLink.innerText = "ادامه مطلب";
    //
    PostBanner.append(PostBannerImageContainer, PostBannerInfoSection);
    PostBannerImageContainer.append(PostBannerImage);
    BannerTitleContainer.append(BannerTitleLinkTag);
    BannerTitleLinkTag.append(BannerTitle);
    PostBannerInfoSection.append(BannerTitleContainer, BannerDate, BannerDescription, ViewPostLink);
    BannerFragments.append(PostBanner);
  });
  PostBannersContainer.append(BannerFragments);
}
function Pagination(TargetPosts = Posts, Page = 1) {
  // Initial pagination
  let Start = (Page - 1) * LayoutSettings.BannerPerPage;
  let End = Page * LayoutSettings.BannerPerPage;
  CurrentPage = Page;
  let SlicedPosts = Array.from(TargetPosts.slice(Start, End));
  BannerGenerator(SlicedPosts);
  GeneratePaginationBar(TargetPosts);
}
function GeneratePaginationBar(TargetPosts = Posts) {
  let PageCount = Math.ceil(TargetPosts.length / LayoutSettings.BannerPerPage);
  //
  const PaginationElem = document.querySelector(".pagination");
  if (PaginationElem) PaginationElem.remove();
  //
  const PaginationContainer = document.createElement("section");
  PaginationContainer.className = "pagination w-full h-16 p-3 flex flex-row-reverse justify-center items-center bg-zinc-900 lg:rounded-md";
  //
  const PaginationBtnsContainer = document.createElement("section");
  PaginationBtnsContainer.className = "pagination-buttons order-4 flex flex-row-reverse";
  //
  const NextPageBtn = document.createElement("button");
  NextPageBtn.className =
    "pagination-btn flex order-7 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  NextPageBtn.id = "next-page-btn";
  const NextPageBtnIcon = document.createElement("img");
  NextPageBtnIcon.className = "pagination-btn-icon w-8 h-8";
  NextPageBtnIcon.src = "../Icons/RightArrowIcon.png";
  NextPageBtn.addEventListener("click", () => {
    if (CurrentPage >= PageCount) return;
    CurrentPage++;
    Pagination(TargetPosts, CurrentPage);
    window.scrollTo(0, 0);
  });
  NextPageBtn.append(NextPageBtnIcon);
  //
  const PrevPageBtn = document.createElement("button");
  PrevPageBtn.className =
    "pagination-btn flex order-1 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  PrevPageBtn.id = "prev-page-btn";
  const PrevPageBtnIcon = document.createElement("img");
  PrevPageBtnIcon.className = "pagination-btn-icon w-8 h-8";
  PrevPageBtnIcon.src = "../Icons/LeftArrowIcon.png";
  PrevPageBtn.addEventListener("click", () => {
    if (CurrentPage <= 1) return;
    CurrentPage--;
    Pagination(TargetPosts, CurrentPage);
    window.scrollTo(0, 0);
  });
  PrevPageBtn.append(PrevPageBtnIcon);
  //
  const FirstPageBtn = document.createElement("button");
  FirstPageBtn.className =
    "pagination-btn flex order-2 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  FirstPageBtn.id = "first-page-btn";
  FirstPageBtn.innerText = "1";
  FirstPageBtn.dataset.page = "1";
  FirstPageBtn.addEventListener("click", () => {
    CurrentPage = 1;
    Pagination(TargetPosts, CurrentPage);
    window.scrollTo(0, 0);
  });
  //
  const LastPageBtn = document.createElement("button");
  LastPageBtn.className =
    "pagination-btn flex order-6 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  LastPageBtn.id = "last-page-btn";
  LastPageBtn.innerText = PageCount;
  LastPageBtn.dataset.page = PageCount;
  LastPageBtn.addEventListener("click", () => {
    CurrentPage = PageCount;
    Pagination(TargetPosts, CurrentPage);
    window.scrollTo(0, 0);
  });
  //
  const RightEtcBtn = document.createElement("button");
  RightEtcBtn.className =
    "pagination-btn flex order-5 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  RightEtcBtn.id = "right-etc-btn";
  RightEtcBtn.innerText = "....";
  RightEtcBtn.setAttribute("inert", "");
  //
  const leftEtcBtn = document.createElement("button");
  leftEtcBtn.className = "pagination-btn flex order-3 justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
  leftEtcBtn.id = "left-etc-btn";
  leftEtcBtn.innerText = "....";
  leftEtcBtn.setAttribute("inert", "");
  //
  PaginationContainer.append(NextPageBtn, PaginationBtnsContainer, PrevPageBtn);
  document.querySelector("main").append(PaginationContainer);
  // Figure out how many buttons we need for pagination
  let RangeStart = Math.max(1, CurrentPage - Math.floor(LayoutSettings.MaxPaginationButtons / 2));
  let RangeEnd = Math.min(Posts.length, RangeStart + LayoutSettings.MaxPaginationButtons - 1);
  if (RangeEnd > PageCount) {
    RangeEnd = PageCount + 1;
  }
  // if we go to far so the first page button gets hidden we are gonna append one for easy access
  if (CurrentPage >= LayoutSettings.MaxPaginationButtons - 1) {
    PaginationContainer.append(FirstPageBtn, leftEtcBtn);
  }
  // Append the pagination button
  for (let i = RangeStart; i < RangeEnd; i++) {
    const PaginationBtn = document.createElement("button");
    PaginationBtn.className = "pagination-btn flex justify-center items-center w-12 h-12 border-0 mx-2 rounded-md text-xl bg-stone-700 text-white";
    PaginationBtn.setAttribute("data-page", i);
    PaginationBtn.innerText = i;
    PaginationBtn.addEventListener("click", () => {
      CurrentPage = Number(PaginationBtn.dataset.page);
      Pagination(TargetPosts, CurrentPage);
      window.scrollTo(0, 0);
    });
    PaginationBtnsContainer.append(PaginationBtn);
  }
  // if we are at early buttons we are gonna append last page button for easy access
  if (RangeEnd <= PageCount) {
    PaginationContainer.append(LastPageBtn);
  }
  if (CurrentPage < PageCount - 2) {
    PaginationContainer.append(RightEtcBtn);
  }
  // Highlight current page
  const PaginationButtons = document.querySelectorAll(".pagination-btn");
  PaginationButtons.forEach((Button) => {
    if (Number(Button.dataset.page) === CurrentPage) Button.style.backgroundColor = "orangered";
  });
}
