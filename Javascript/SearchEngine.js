const ShowSearchOverlayBtn = document.getElementById("show-search-overlay-btn");
const SearchOverlay = document.getElementById("search-overlay");
const SearchInput = document.getElementById("search-input");
const SearchBtn = document.getElementById("search");
const SearchPreviewContainer = document.getElementById("search-preview-container");
const SearchInputContainer = document.getElementById("search-input-container");
let SearchMode = false;
//
function FetchPreviews() {
  let SearchValue = SearchInput.value.trim();
  if (SearchValue === "") {
    return;
  }
  let SearchInTitles = Posts.filter((Post) => {
    return Post.Title.includes(SearchValue);
  });
  let SearchInParagraphs = Posts.filter((Post) => {
    for (let Section of Post.ArticleSections) {
      for (let Paragraph of Section.Paragraphs) {
        if (Paragraph.includes(SearchValue)) {
          return Post;
        }
      }
    }
  });
  if (SearchInTitles.length >= 5) {
    SearchInTitles = SearchInTitles.slice(0, 5);
    CreateSearchPreviews(SearchInTitles);
  } else {
    let MixedResults = SearchInTitles.concat(SearchInParagraphs);
    MixedResults = MixedResults.filter((Item, Index) => {
      return MixedResults.indexOf(Item) === Index;
    });
    if (MixedResults.length > 5) {
      MixedResults = MixedResults.slice(0, 5);
    }
    if (MixedResults.length === 0) {
      SearchPreviewContainer.innerHTML = "";
      const NoPreviewResultBox = document.createElement("div");
      NoPreviewResultBox.id = "no-preview-result-box";
      NoPreviewResultBox.innerText = "هیچ نتیجه ای یافت نشد :(";
      SearchPreviewContainer.append(NoPreviewResultBox);
      return;
    }
    CreateSearchPreviews(MixedResults);
  }
}
function CreateSearchPreviews(Array) {
  console.log(Array);
  SearchPreviewContainer.style.display = "flex";
  SearchPreviewContainer.innerHTML = "";
  let ItemsFragment = document.createDocumentFragment();
  SearchInputContainer.insertBefore(SearchPreviewContainer, SearchInput.nextElementSibling);
  Array.forEach((Post) => {
    const PostPreviewContainer = document.createElement("div");
    PostPreviewContainer.className = "search-preview-item";
    const Image = document.createElement("img");
    Image.className = "search-preview-image";
    Image.src = Post.ThumbnailSrc;
    const Title = document.createElement("a");
    Title.className = "search-preview-title";
    Title.innerText = Post.Title;
    Title.href = `#${Post.Path}`;
    PostPreviewContainer.append(Image, Title);
    ItemsFragment.append(PostPreviewContainer);
  });
  SearchPreviewContainer.append(ItemsFragment);
}
function HideSearchOverlay() {
  document.getElementById("search-overlay").style.display = "none";
}
function ResetSearchBar() {
  HideSearchOverlay();
  SearchInput.value = "";
  SearchMode = false;
}
// Event listeners
ShowSearchOverlayBtn.addEventListener("click", () => {
  SearchOverlay.style.display = "flex";
  SearchMode = true;
});
SearchInput.addEventListener("input", FetchPreviews);
SearchOverlay.addEventListener("wheel", (event) => {
  if (SearchMode) {
    event.preventDefault();
  }
});
document.body.addEventListener("click", (event) => {
  const TargetClassName = event.target.className;
  const TargetID = event.target.id;
  if (TargetID === "show-search-overlay-btn") return;
  if (SearchMode && TargetID !== "search-input" && TargetID !== "search") {
    ResetSearchBar();
    console.log(TargetID);
  }
});
