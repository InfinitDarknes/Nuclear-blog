const PostBannersContainer = document.getElementById("post-banners-container");
let LayoutSettings = {
  BannerPerPage: 4,
  MaxPaginationButtons: 5,
};
let CurrentPage = 1;
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
  }
}
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
    BannerDate.className = "date";
    BannerDate.innerText = Post.Date;
    //
    const BannerDescription = document.createElement("p");
    BannerDescription.className = "banner-description";
    let Description = Post.ArticleSections[0].Paragraphs[0].substring(0, 400);
    BannerDescription.innerText = Description;
    //
    const ViewPostLink = document.createElement("a");
    ViewPostLink.className = "view-post-link";
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
  if (document.getElementById("pagination")) document.getElementById("pagination").remove();
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
    if (CurrentPage < PageCount) {
      CurrentPage++;
      let Start = (CurrentPage - 1) * LayoutSettings.BannerPerPage;
      let End = CurrentPage * LayoutSettings.BannerPerPage;
      window.scrollTo(0, 0);
      BannerGenerator(Start, End);
      Pagination();
    }
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
    if (CurrentPage > 1) {
      CurrentPage--;
      let Start = (CurrentPage - 1) * LayoutSettings.BannerPerPage;
      let End = CurrentPage * LayoutSettings.BannerPerPage;
      window.scrollTo(0, 0);
      BannerGenerator(Start, End);
      Pagination();
    }
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
function ReturnImageSlider(Images) {
  const ArticleGallery = document.createElement("section");
  const SliderID = `slider-${GenerateUniqeID(9)}`;
  ArticleGallery.id = SliderID;
  ArticleGallery.className = "image-slider";
  ArticleGallery.setAttribute("data-index", "0");
  // Buttons
  const PrevImageBtn = document.createElement("button");
  const NextImageBtn = document.createElement("button");
  const PrevImageBtnIcon = document.createElement("img");
  const NextImageBtnIcon = document.createElement("img");
  PrevImageBtn.className = "image-slider-button prev-image-button";
  NextImageBtn.className = "image-slider-button next-image-button";
  PrevImageBtnIcon.className = "slider-button-icon";
  NextImageBtnIcon.className = "slider-button-icon";
  PrevImageBtnIcon.src = "../Icons/LeftArrowIcon.png";
  NextImageBtnIcon.src = "../Icons/RightArrowIcon.png";
  // Slider top bar (download/share image + close maximised image viewer) it is display "none" by defualt unless image viewr is activated
  const SliderTopBar = document.createElement("div");
  const DownloadImageBtn = document.createElement("button");
  const ShareImageBtn = document.createElement("button");
  const CloseImageViewerBtn = document.createElement("button");
  const DownloadImageBtnIcon = document.createElement("img");
  const ShareImageBtnIcon = document.createElement("img");
  const CloseImageViewerBtnIcon = document.createElement("img");
  // Classname
  DownloadImageBtnIcon.src = "Icons/DownloadIcon.png";
  ShareImageBtnIcon.src = "Icons/LinkIcon.png";
  CloseImageViewerBtnIcon.src = "Icons/CloseIcon.png";
  SliderTopBar.className = "slider-top-bar";
  DownloadImageBtn.className = "slider-top-bar-btn download-image-btn";
  ShareImageBtn.className = "slider-top-bar-btn share-image-btn";
  CloseImageViewerBtn.className = "slider-top-bar-btn close-image-viewer-btn";
  // Append
  DownloadImageBtn.append(DownloadImageBtnIcon);
  ShareImageBtn.append(ShareImageBtnIcon);
  CloseImageViewerBtn.append(CloseImageViewerBtnIcon);
  SliderTopBar.append(DownloadImageBtn, ShareImageBtn, CloseImageViewerBtn);
  // Slider track
  const SliderTrack = document.createElement("div");
  SliderTrack.className = "slider-track";
  for (n = 0; n < Images.length; n++) {
    const SliderCircle = document.createElement("span");
    SliderCircle.className = "slider-circle";
    SliderCircle.dataset.index = n.toString();
    SliderCircle.addEventListener("click", () => {
      SelectImage(SliderID, SliderCircle.dataset.index, ArticleGallery.dataset.index);
    });
    SliderTrack.append(SliderCircle);
    if (n === 0) SliderCircle.classList.add("active-slider-circle");
  }
  // Images
  for (n = 0; n < Images.length; n++) {
    const ImageItem = document.createElement("img");
    ImageItem.src = Images[n];
    ImageItem.className = "slider-image";
    ImageItem.addEventListener("click", () => {
      ToggleImageViewer(SliderID);
    });
    ArticleGallery.append(ImageItem);
    if (n === 0) ImageItem.classList.add("active-image");
  }
  //Events
  PrevImageBtn.addEventListener("click", () => {
    PreviousImg(SliderID);
  });
  NextImageBtn.addEventListener("click", () => {
    NextImg(SliderID);
  });
  CloseImageViewerBtn.addEventListener("click", () => {
    ToggleImageViewer(SliderID);
  });
  PrevImageBtn.append(PrevImageBtnIcon);
  NextImageBtn.append(NextImageBtnIcon);
  ArticleGallery.append(NextImageBtn, PrevImageBtn, SliderTrack, SliderTopBar);
  return ArticleGallery;
}
function GenerateUniqeID(Length) {
  const Min = Math.pow(10, Length - 1);
  const Max = Math.pow(10, Length) - 1;
  let ID = Math.abs(Math.round(Math.random() * (Max - Min - 1)) + Min);
  return ID;
}
function GeneratePost(Post) {
  const Main = document.querySelector("main");
  Main.innerHTML = "";
  //
  const Content = document.createElement("section");
  const ArticleHeader = document.createElement("section");
  const ArticleInfoContainer = document.createElement("section");
  const ArticleTitle = document.createElement("h2");
  const ArticleDate = document.createElement("span");
  const Category = document.createElement("section");
  const ArticleThumbnail = document.createElement("img");
  const TextArea = document.createElement("section");
  const ArticleBottom = document.createElement("section");
  const PostTags = document.createElement("section");
  const PostTagsTitle = document.createElement("span");
  const TagsContainer = document.createElement("section");
  const AuthorSection = document.createElement("section");
  const AuthorInfoContainer = document.createElement("section");
  const AuthorSectionTitle = document.createElement("span");
  const AuthorProfile = document.createElement("section");
  const AuthorImage = document.createElement("img");
  const AuthorName = document.createElement("span");
  const AuthorBiography = document.createElement("p");
  const SocialMedias = document.createElement("section");
  const SocialMediasTitle = document.createElement("section");
  const SocialMediasNav = document.createElement("section");
  const SocialMediasUl = document.createElement("section");
  // ID
  Content.id = "content";
  ArticleHeader.id = "article-header";
  ArticleInfoContainer.id = "article-info-container";
  ArticleTitle.id = "article-title";
  ArticleDate.id = "article-date";
  Category.id = "category";
  ArticleDate.id = "article-date";
  ArticleThumbnail.id = "article-thumbnail";
  TextArea.id = "textarea";
  ArticleBottom.id = "article-bottom";
  PostTags.id = "post-tags";
  TagsContainer.id = "tags-container";
  AuthorSection.id = "author-section";
  AuthorInfoContainer.id = "author-info-container";
  AuthorProfile.id = "author-profile";
  AuthorImage.id = "author-image";
  AuthorName.id = "author-name";
  AuthorBiography.id = "author-biography";
  SocialMediasNav.id = "social-medias-nav";
  SocialMediasUl.id = "social-medias-ul";
  // Class
  ArticleDate.className = "date";
  PostTags.className = "article-bottom-item";
  PostTagsTitle.className = "article-bottom-title";
  AuthorSection.className = "article-bottom-item";
  AuthorSectionTitle.className = "article-bottom-title";
  SocialMedias.className = "article-bottom-item";
  SocialMediasTitle.className = "article-bottom-title";
  //
  ArticleTitle.innerText = Post.Title;
  ArticleDate.innerText = Post.Date;
  ArticleThumbnail.src = Post.ThumbnailSrc;
  ArticleThumbnail.alt = Post.ThumbnailAlt;
  ArticleThumbnail.title = Post.ThumbnailTitle;
  PostTagsTitle.innerText = "برچسب ها";
  AuthorSectionTitle.innerText = "نویسنده";
  SocialMediasTitle.innerText = "ما را دنبال کنید";
  AuthorName.innerText = Post.Author.DisplayName;
  AuthorBiography.innerText = Post.Author.Biography;
  AuthorImage.src = Post.Author.ProfilePicture;
  //
  Post.ArticleSections.forEach((Section) => {
    const ArticleSection = document.createElement("section");
    ArticleSection.className = "article-section";
    const ArticleSectionTitle = document.createElement("h3");
    ArticleSectionTitle.className = "sub-title";
    ArticleSectionTitle.innerText = Section.SectionTitle;
    ArticleSection.append(ArticleSectionTitle);
    Section.Paragraphs.forEach((Paragraph) => {
      const ArticleSectionParagraph = document.createElement("p");
      ArticleSectionParagraph.className = "text article-text";
      ArticleSectionParagraph.innerText = Paragraph;
      ArticleSection.append(ArticleSectionParagraph);
    });
    TextArea.append(ArticleSection);
  });
  Post.Tags.forEach((Tag) => {
    const TagElement = document.createElement("h4");
    TagElement.className = "tag";
    const TagLink = document.createElement("a");
    TagLink.className = "tag-link";
    TagLink.innerText = Tag.DisplayName;
    TagElement.append(TagLink);
    TagsContainer.append(TagElement);
  });
  SocialMediasArray.forEach((Social) => {
    const ListItem = document.createElement("li");
    const ListItemLink = document.createElement("a");
    const ListItemIcon = document.createElement("img");
    ListItem.className = "social-media-li";
    ListItemIcon.className = "social-media-icon";
    ListItemIcon.src = Social.Icon;
    ListItemLink.href = Social.Href;
    ListItem.append(ListItemLink);
    ListItemLink.append(ListItemIcon);
    SocialMediasUl.append(ListItem);
  });
  ArticleHeader.append(ArticleTitle, ArticleDate, Category);
  ArticleBottom.append(PostTags, SocialMedias, AuthorSection);
  PostTags.append(PostTagsTitle, TagsContainer);
  SocialMedias.append(SocialMediasTitle, SocialMediasNav);
  SocialMediasNav.append(SocialMediasUl);
  AuthorProfile.append(AuthorImage, AuthorName);
  AuthorSection.append(AuthorSectionTitle, AuthorInfoContainer);
  AuthorInfoContainer.append(AuthorProfile, AuthorBiography);
  if (Post.ImageGalleryArray.length !== 0) {
    Content.append(ArticleHeader, ReturnImageSlider(Post.ImageGalleryArray), TextArea, ArticleBottom);
  } else {
    Content.append(ArticleHeader, ArticleThumbnail, TextArea, ArticleBottom);
  }
  Main.append(Content);
}
function GenerateAllTagsSidebarItem() {
  // right sidebar second item with title of "فهرست پست ها"
  if (document.getElementById("all-tags-section")) document.getElementById("all-tags-section").remove();
  const AllTagsSection = document.createElement("section");
  AllTagsSection.className = "sidebar";
  AllTagsSection.id = "all-tags-section";
  const AllTagsSectionTitleContainer = document.createElement("section");
  const AllTagsSectionTitleIcon = document.createElement("img");
  AllTagsSectionTitleContainer.className = "sidebar-title";
  AllTagsSectionTitleIcon.className = "sidebar-icon";
  AllTagsSectionTitleIcon.src = "../Icons/ContentsIcon.png";
  const AllTagsSectionTitle = document.createElement("span");
  AllTagsSectionTitle.innerText = "فهرست پست ها";
  AllTagsSectionTitleContainer.append(AllTagsSectionTitleIcon, AllTagsSectionTitle);
  const AllTagsSectionList = document.createElement("ul");
  AllTagsSectionList.id = "all-tags-section-ul";
  for (n in Tags) {
    if (!Tags[n].CountOfPosts) continue;
    const ListItem = document.createElement("li");
    ListItem.className = "all-tags-ul-li";
    const TagCount = document.createElement("span");
    TagCount.className = "tag-count";
    TagCount.innerText = Tags[n].CountOfPosts;
    const TagLink = document.createElement("a");
    TagLink.href = Tags[n].Href;
    TagLink.innerText = Tags[n].DisplayName;
    ListItem.append(TagLink, TagCount);
    AllTagsSectionList.append(ListItem);
  }
  AllTagsSectionTitleContainer.append(AllTagsSectionTitleIcon, AllTagsSectionTitle);
  AllTagsSection.append(AllTagsSectionTitleContainer, AllTagsSectionList);
  document.getElementById("right-sidebar").append(AllTagsSection);
}
window.onload = function () {
  UpdateTags();
  CheckLocationHash();
};
window.addEventListener("hashchange", () => {
  CheckLocationHash();
  HideSearchOverlay();
});
