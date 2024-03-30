function GeneratePost(Post) {
  console.log(Post);
  const Main = document.querySelector(`main`);
  Main.innerHTML = ``;
  //
  const Content = document.createElement(`section`);
  const ArticleHeader = document.createElement(`section`);
  const ArticleInfoContainer = document.createElement(`section`);
  const ArticleTitle = document.createElement(`h2`);
  const ArticleDate = document.createElement(`span`);
  const Category = document.createElement(`section`);
  const ArticleThumbnail = document.createElement(`img`);
  const TextArea = document.createElement(`section`);
  const ArticleBottom = document.createElement(`section`);
  const PostTags = document.createElement(`section`);
  const PostTagsTitle = document.createElement(`span`);
  const TagsContainer = document.createElement(`section`);
  const AuthorSection = document.createElement(`section`);
  const AuthorInfoContainer = document.createElement(`section`);
  const AuthorSectionTitle = document.createElement(`span`);
  const AuthorProfile = document.createElement(`section`);
  const AuthorImage = document.createElement(`img`);
  const AuthorName = document.createElement(`span`);
  const AuthorBiography = document.createElement(`p`);
  const SocialMedias = document.createElement(`section`);
  const SocialMediasTitle = document.createElement(`section`);
  const SocialMediasNav = document.createElement(`section`);
  const SocialMediasUl = document.createElement(`section`);
  // Class
  Content.className = `content bg-zinc-800 flex flex-col items-center w-full mb-0 lg:rounded-md`;
  ArticleHeader.className = `article-header bg-zinc-900 flex flex-col items-start mb-5 p-3 w-full lg:rounded-tl-md lg:rounded-tr-md`;
  ArticleInfoContainer.className = `article-info-container`;
  ArticleTitle.className = `article-title text-yellow-500 font-Sepahbod w-full text-xl lg:text-2xl`;
  ArticleDate.className = `article-date text-orange-600 text-base font-Sepahbod`;
  Category.className = `category`;
  ArticleThumbnail.className = `article-thumbnail w-11/12 sm:w-9/12 lg:w-7/12 2xl:w-6/12 rounded-md my-0 mx-auto object-fill`;
  TextArea.className = `textarea flex flex-col items-center w-full h-fit my-5 lg:my-12`;
  ArticleBottom.className = `article-bottom flex flex-row flex-wrap w-full mb-4 lg:mb-12 mx-auto`;
  PostTags.className = `post-tags bg-zinc-900 flex flex-col items-start mx-5 mb-6 pb-3 w-full lg:w-fit h-fit rounded-md overflow-hidden`;
  TagsContainer.className = `tags-container flex justify-start flex-wrap m-3`;
  AuthorSection.className = `author-section bg-zinc-900 w-full flex flex-col mx-5 mb-6 pb-3 overflow-hidden rounded-md`;
  AuthorInfoContainer.className = `author-info-container flex flex-row items-center justify-between w-full px-5`;
  AuthorProfile.className = `author-profile ml-5`;
  AuthorImage.className = `author-image w-20 h-20 rounded-full object-fill`;
  AuthorName.className = `author-name text-lg font-Sepahbod text-center text-yellow-500`;
  AuthorBiography.className = `author-biography w-full p-5 rounded-md font-lg font-Dirooz text-white bg-zinc-800`;
  SocialMedias.className = `social-medias bg-zinc-900 flex flex-col items-center mx-5 mb-6 pb-3 w-full lg:w-fit overflow-hidden rounded-md`;
  SocialMediasNav.className = `social-medias-nav`;
  SocialMediasUl.className = `social-medias-ul flex list-none`;
  PostTagsTitle.className = `w-full p-3 mb-4 font-Sepahbod text-lg bg-stone-700 text-yellow-500`;
  AuthorSectionTitle.className = `w-full p-3 mb-4 font-Sepahbod text-lg bg-stone-700 text-yellow-500`;
  SocialMediasTitle.className = `w-full p-3 mb-4 font-Sepahbod text-lg bg-stone-700 text-yellow-500`;
  // InnerText and Src
  ArticleTitle.innerText = Post.Title;
  ArticleDate.innerText = Post.Date;
  ArticleThumbnail.src = Post.ThumbnailSrc;
  ArticleThumbnail.alt = Post.ThumbnailAlt;
  ArticleThumbnail.title = Post.ThumbnailTitle;
  PostTagsTitle.innerText = `برچسب ها`;
  AuthorSectionTitle.innerText = `نویسنده`;
  SocialMediasTitle.innerText = `ما را دنبال کنید`;
  AuthorName.innerText = Post.Author.DisplayName;
  AuthorBiography.innerText = Post.Author.Biography;
  AuthorImage.src = Post.Author.ProfilePicture;
  // Article sections and their paragraphs
  Post.ArticleSections.forEach((Section) => {
    const ArticleSection = document.createElement(`section`);
    ArticleSection.className = `article-section w-11/12`;
    const ArticleSectionTitle = document.createElement(`h3`);
    ArticleSectionTitle.className = `sub-title bg-zinc-900 text-yellow-500 w-full p-3 mb-4 rounded-md font-Sepahbod text-lg md:text-xl`;
    ArticleSectionTitle.innerText = Section.SectionTitle;
    ArticleSection.append(ArticleSectionTitle);
    Section.Paragraphs.forEach((Paragraph) => {
      const ArticleSectionParagraph = document.createElement(`p`);
      ArticleSectionParagraph.className = `article-text text-white font-normal font-Dirooz my-4 text-justify text-base md:text-lg w-full`;
      ArticleSectionParagraph.innerText = Paragraph;
      ArticleSection.append(ArticleSectionParagraph);
    });
    TextArea.append(ArticleSection);
  });
  Post.Tags.forEach((Tag) => {
    const TagElement = document.createElement(`h4`);
    TagElement.className = `tag bg-zinc-800 flex justify-center items-center rounded-md p-1.5 m-1 text-lg`;
    const TagLink = document.createElement(`a`);
    TagLink.className = `tag-link text-blue-600`;
    TagLink.innerText = Tag.DisplayName;
    TagElement.append(TagLink);
    TagsContainer.append(TagElement);
  });
  SocialMediasArray.forEach((Social) => {
    const ListItem = document.createElement(`li`);
    const ListItemLink = document.createElement(`a`);
    const ListItemIcon = document.createElement(`img`);
    ListItem.className = `social-media-li mx-3`;
    ListItemIcon.className = `social-media-icon w-10 h-10`;
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
  const ArticleGallery = document.createElement(`section`);
  const SliderID = `slider-${GenerateUniqeID(9)}`;
  ArticleGallery.id = SliderID;
  ArticleGallery.className = `image-slider`;
  ArticleGallery.setAttribute(`data-index`, `0`);
  // Buttons
  const PrevImageBtn = document.createElement(`button`);
  const NextImageBtn = document.createElement(`button`);
  const PrevImageBtnIcon = document.createElement(`img`);
  const NextImageBtnIcon = document.createElement(`img`);
  PrevImageBtn.className = `image-slider-button prev-image-button`;
  NextImageBtn.className = `image-slider-button next-image-button`;
  PrevImageBtnIcon.className = `slider-button-icon`;
  NextImageBtnIcon.className = `slider-button-icon`;
  PrevImageBtnIcon.src = `../Icons/LeftArrowIcon.png`;
  NextImageBtnIcon.src = `../Icons/RightArrowIcon.png`;
  // Slider top bar (download/share image + close maximised image viewer) it is display `none` by defualt unless image viewr is activated
  const SliderTopBar = document.createElement(`div`);
  const DownloadImageBtn = document.createElement(`button`);
  const ShareImageBtn = document.createElement(`button`);
  const CloseImageViewerBtn = document.createElement(`button`);
  const DownloadImageBtnIcon = document.createElement(`img`);
  const ShareImageBtnIcon = document.createElement(`img`);
  const CloseImageViewerBtnIcon = document.createElement(`img`);
  // Classname
  DownloadImageBtnIcon.src = `Icons/DownloadIcon.png`;
  ShareImageBtnIcon.src = `Icons/LinkIcon.png`;
  CloseImageViewerBtnIcon.src = `Icons/CloseIcon.png`;
  SliderTopBar.className = `slider-top-bar`;
  DownloadImageBtn.className = `slider-top-bar-btn download-image-btn`;
  ShareImageBtn.className = `slider-top-bar-btn share-image-btn`;
  CloseImageViewerBtn.className = `slider-top-bar-btn close-image-viewer-btn`;
  // Append
  DownloadImageBtn.append(DownloadImageBtnIcon);
  ShareImageBtn.append(ShareImageBtnIcon);
  CloseImageViewerBtn.append(CloseImageViewerBtnIcon);
  SliderTopBar.append(DownloadImageBtn, ShareImageBtn, CloseImageViewerBtn);
  // Slider track
  const SliderTrack = document.createElement(`div`);
  SliderTrack.className = `slider-track`;
  for (n = 0; n < Images.length; n++) {
    const SliderCircle = document.createElement(`span`);
    SliderCircle.className = `slider-circle`;
    SliderCircle.dataset.index = n.toString();
    SliderCircle.addEventListener(`click`, () => {
      SelectImage(SliderID, SliderCircle.dataset.index, ArticleGallery.dataset.index);
    });
    SliderTrack.append(SliderCircle);
    if (n === 0) SliderCircle.classList.add(`active-slider-circle`);
  }
  // Images
  for (n = 0; n < Images.length; n++) {
    const ImageItem = document.createElement(`img`);
    ImageItem.src = Images[n];
    ImageItem.className = `slider-image page-break`;
    ImageItem.draggable = true;
    ImageItem.addEventListener(`click`, () => {
      ToggleImageViewer(SliderID);
    });
    ArticleGallery.append(ImageItem);
    if (n === 0) ImageItem.classList.add(`active-image`);
    // Sliding with mouse or finger events
    let IsDragging = false;
    let EndPosition = 0;
    ImageItem.addEventListener(`dragstart`, (Event) => {
      IsDragging = true;
      StartPosition = Event.clientX;
    });
    ImageItem.addEventListener(`dragend`, (Event) => {
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
    ImageItem.addEventListener(`touchstart`, (Event) => {
      const Touch = Event.touches;
      if (Touch.length === 1) {
        IsDragging = true;
        StartPosition = Event.touches[0].clientX;
      }
    });
    ImageItem.addEventListener(`touchend`, (Event) => {
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
  PrevImageBtn.addEventListener(`click`, () => {
    PreviousImg(SliderID);
  });
  NextImageBtn.addEventListener(`click`, () => {
    NextImg(SliderID);
  });
  CloseImageViewerBtn.addEventListener(`click`, () => {
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
