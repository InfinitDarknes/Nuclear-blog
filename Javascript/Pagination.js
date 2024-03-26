const PostBannersContainer = document.getElementById("post-banners-container");
let LayoutSettings = {
  BannerPerPage: 10,
  MaxPaginationButtons: 5,
};
let CurrentPage = 1;
function BannerGenerator(Start, End) {
  const PostBannersContainer = document.getElementById("post-banners-container");
  PostBannersContainer.innerHTML = "";
  let SlicedPosts = Posts.slice(Start, End);
  let BannerFragments = document.createDocumentFragment();
  SlicedPosts.forEach((Post) => {
    const PostBanner = document.createElement("article");
    PostBanner.className = "post-banner";
    const PostBannerImageContainer = document.createElement("section");
    PostBannerImageContainer.className = "post-banner-image-container";
    //
    const PostBannerInfoSection = document.createElement("section");
    PostBannerInfoSection.className = "post-banner-info-section";
    //
    const PostBannerImage = document.createElement("img");
    PostBannerImage.className = "post-banner-image";
    PostBannerImage.src = Post.ThumbnailSrc;
    PostBannerImage.alt = Post.ThumbnailAlt;
    PostBannerImage.title = Post.ThumbnailTitle;
    //
    const BannerTitleContainer = document.createElement("section");
    BannerTitleContainer.className = "banner-title-container";
    //
    const BannerTitleLinkTag = document.createElement("a");
    BannerTitleLinkTag.href = `#${Post.Path}`;
    //
    const BannerTitle = document.createElement("h2");
    BannerTitle.className = "banner-title";
    BannerTitle.innerText = Post.Title;
    //
    const BannerDate = document.createElement("span");
    BannerDate.className = "date text-orange-600";
    BannerDate.innerText = Post.Date;
    //
    const BannerDescription = document.createElement("p");
    BannerDescription.className = "banner-description";
    let Description = Post.ArticleSections[0].Paragraphs[0].substring(0, 400);
    BannerDescription.innerText = Description;
    //
    const ViewPostLink = document.createElement("a");
    ViewPostLink.className = "view-post-link text-blue-600";
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
function Pagination() {
  const Pagination = document.getElementById("pagination");
  if (Pagination) Pagination.remove();
  let PageCount = Math.ceil(Posts.length / LayoutSettings.BannerPerPage);
  const PaginationContainer = document.createElement("section");
  PaginationContainer.id = "pagination";
  //
  const PaginationBtnsContainer = document.createElement("section");
  PaginationBtnsContainer.id = "pagination-buttons";
  //
  const NextPageBtn = document.createElement("button");
  NextPageBtn.className = "pagination-btn";
  NextPageBtn.id = "next-page-btn";
  const NextPageBtnIcon = document.createElement("img");
  NextPageBtnIcon.className = "pagination-btn-icon";
  NextPageBtnIcon.src = "../Icons/RightArrowIcon.png";
  NextPageBtn.addEventListener("click", () => {
    if (CurrentPage >= PageCount) return;
    CurrentPage++;
    let Start = (CurrentPage - 1) * LayoutSettings.BannerPerPage;
    let End = CurrentPage * LayoutSettings.BannerPerPage;
    window.scrollTo(0, 0);
    BannerGenerator(Start, End);
    Pagination();
  });
  NextPageBtn.append(NextPageBtnIcon);
  //
  const PrevPageBtn = document.createElement("button");
  PrevPageBtn.className = "pagination-btn";
  PrevPageBtn.id = "prev-page-btn";
  const PrevPageBtnIcon = document.createElement("img");
  PrevPageBtnIcon.className = "pagination-btn-icon";
  PrevPageBtnIcon.src = "../Icons/LeftArrowIcon.png";
  PrevPageBtn.addEventListener("click", () => {
    if (CurrentPage <= 1) return;
    CurrentPage--;
    let Start = (CurrentPage - 1) * LayoutSettings.BannerPerPage;
    let End = CurrentPage * LayoutSettings.BannerPerPage;
    window.scrollTo(0, 0);
    BannerGenerator(Start, End);
    Pagination();
  });
  PrevPageBtn.append(PrevPageBtnIcon);
  //
  const FirstPageBtn = document.createElement("button");
  FirstPageBtn.className = "pagination-btn";
  FirstPageBtn.id = "first-page-btn";
  FirstPageBtn.innerText = "1";
  FirstPageBtn.dataset.page = "1";
  FirstPageBtn.addEventListener("click", () => {
    let Start = (1 - 1) * LayoutSettings.BannerPerPage;
    let End = 1 * LayoutSettings.BannerPerPage;
    CurrentPage = 1;
    window.scrollTo(0, 0);
    BannerGenerator(Start, End);
    Pagination();
  });
  //
  const LastPageBtn = document.createElement("button");
  LastPageBtn.className = "pagination-btn";
  LastPageBtn.id = "last-page-btn";
  LastPageBtn.innerText = PageCount;
  LastPageBtn.dataset.page = PageCount;
  LastPageBtn.addEventListener("click", () => {
    let Start = (PageCount - 1) * LayoutSettings.BannerPerPage;
    let End = PageCount * LayoutSettings.BannerPerPage;
    CurrentPage = PageCount;
    window.scrollTo(0, 0);
    BannerGenerator(Start, End);
    Pagination();
  });
  //
  const RightEtcBtn = document.createElement("button");
  RightEtcBtn.className = "pagination-btn";
  RightEtcBtn.id = "right-etc-btn";
  RightEtcBtn.innerText = "....";
  RightEtcBtn.setAttribute("inert", "");
  //
  const leftEtcBtn = document.createElement("button");
  leftEtcBtn.className = "pagination-btn";
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
    PaginationBtnsContainer.append(FirstPageBtn, leftEtcBtn);
  }
  // Append the pagination button
  for (let i = RangeStart; i < RangeEnd; i++) {
    const PaginationBtn = document.createElement("button");
    PaginationBtn.className = "pagination-btn";
    PaginationBtn.setAttribute("data-page", i);
    PaginationBtn.innerText = i;
    PaginationBtn.addEventListener("click", () => {
      let Page = Number(PaginationBtn.dataset.page);
      Start = (Page - 1) * LayoutSettings.BannerPerPage;
      End = Page * LayoutSettings.BannerPerPage;
      CurrentPage = Page;
      window.scrollTo(0, 0);
      BannerGenerator(Start, End);
      Pagination();
    });
    PaginationBtnsContainer.append(PaginationBtn);
  }
  // if we are at early buttons we are gonna append last page button for easy access
  if (CurrentPage !== PageCount - 1 && CurrentPage !== PageCount) {
    PaginationBtnsContainer.append(RightEtcBtn, LastPageBtn);
  }
  // Highlight current page
  const PaginationButtons = document.querySelectorAll(".pagination-btn");
  PaginationButtons.forEach((Button) => {
    if (Number(Button.dataset.page) === CurrentPage) Button.style.backgroundColor = "orangered";
  });
}
