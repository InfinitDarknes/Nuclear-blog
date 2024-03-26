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
  Content.className = "content bg-zinc-800";
  ArticleHeader.className = "article-header bg-zinc-900";
  ArticleInfoContainer.className = "article-info-container";
  ArticleTitle.className = "article-title text-yellow-500";
  ArticleDate.className = "date text-orange-600";
  Category.className = "category";
  ArticleThumbnail.className = "article-thumbnail";
  TextArea.className = "textarea";
  ArticleBottom.className = "article-bottom";
  PostTags.className = "article-bottom-item post-tags bg-zinc-900";
  TagsContainer.className = "tags-container";
  AuthorSection.className = "article-bottom-item author-section bg-zinc-900";
  AuthorInfoContainer.className = "author-info-container";
  AuthorProfile.className = "author-profile";
  AuthorImage.className = "author-image";
  AuthorName.className = "author-name";
  AuthorBiography.className = "author-biography";
  SocialMedias.className = "article-bottom-item bg-zinc-900";
  SocialMediasNav.className = "social-medias-nav";
  SocialMediasUl.className = "social-medias-ul";
  // Class
  PostTagsTitle.className = "article-bottom-title bg-stone-800 text-yellow-500";
  AuthorSectionTitle.className = "article-bottom-title bg-stone-800 text-yellow-500";
  SocialMediasTitle.className = "article-bottom-title bg-stone-800 text-yellow-500";
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
    ArticleSectionTitle.className = "sub-title bg-zinc-900 text-yellow-500";
    ArticleSectionTitle.innerText = Section.SectionTitle;
    ArticleSection.append(ArticleSectionTitle);
    Section.Paragraphs.forEach((Paragraph) => {
      const ArticleSectionParagraph = document.createElement("p");
      ArticleSectionParagraph.className = "article-text text-stone-300";
      ArticleSectionParagraph.innerText = Paragraph;
      ArticleSection.append(ArticleSectionParagraph);
    });
    TextArea.append(ArticleSection);
  });
  Post.Tags.forEach((Tag) => {
    const TagElement = document.createElement("h4");
    TagElement.className = "tag bg-zinc-800";
    const TagLink = document.createElement("a");
    TagLink.className = "tag-link text-blue-600";
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
    ImageItem.className = "slider-image page-break";
    ImageItem.draggable = true;
    ImageItem.addEventListener("click", () => {
      ToggleImageViewer(SliderID);
    });
    ArticleGallery.append(ImageItem);
    if (n === 0) ImageItem.classList.add("active-image");
    // Sliding with mouse or finger events
    let IsDragging = false;
    let EndPosition = 0;
    ImageItem.addEventListener("dragstart", (Event) => {
      IsDragging = true;
      StartPosition = Event.clientX;
    });
    ImageItem.addEventListener("dragend", (Event) => {
      let DistanceTraveled = Math.abs(EndPosition - StartPosition);
      if (IsDragging) {
        EndPosition = Event.clientX;
        IsDragging = false;
      }
      if (EndPosition > StartPosition && DistanceTraveled > ImageItem.clientWidth * 0.1) {
        PreviousImg(SliderID);
      }
      if (EndPosition < StartPosition && DistanceTraveled > ImageItem.clientWidth * 0.1) {
        NextImg(SliderID);
      }
    });
    ImageItem.addEventListener("touchstart", (Event) => {
      const Touch = Event.touches;
      if (Touch.length === 1) {
        IsDragging = true;
        StartPosition = Event.touches[0].clientX;
      }
    });
    ImageItem.addEventListener("touchend", (Event) => {
      let DistanceTraveled = Math.abs(EndPosition - StartPosition);
      if (IsDragging) {
        EndPosition = Event.changedTouches[0].clientX;
        IsDragging = false;
        if (EndPosition > StartPosition && DistanceTraveled > ImageItem.clientWidth * 0.1) {
          PreviousImg(SliderID);
        } else if (EndPosition < StartPosition && DistanceTraveled > ImageItem.clientWidth * 0.1) {
          NextImg(SliderID);
        }
      }
    });
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
