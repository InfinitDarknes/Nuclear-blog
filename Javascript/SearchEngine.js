const ShowSearchOverlayBtn = document.querySelector(".show-search-overlay-btn");
const SearchOverlay = document.querySelector(".search-overlay");
const SearchInput = document.querySelector(".search-input");
const SearchBtn = document.querySelector(".search");
const SearchPreviewContainer = document.querySelector(".search-preview-container");
const SearchInputContainer = document.querySelector(".search-input-container");
const SearchSomething = document.querySelector(".search-something");
const NoResultBox = document.querySelector(".no-result-box");
const Header = document.querySelector("header");
const Footer = document.querySelector("footer");
const Row = document.querySelector("#row");
// Flag
let SearchMode = false;
// Functions
function FetchPreviews() {
  let SearchValue = SearchInput.value.trim();
  if (SearchValue === "") {
    SearchPreviewContainer.innerHTML = "";
    NoResultBox.classList.replace("flex", "hidden");
    SearchSomething.classList.replace("hidden", "flex");
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
  let MixedResults = SearchInTitles.concat(SearchInParagraphs);
  MixedResults = MixedResults.filter((Item, Index) => {
    return MixedResults.indexOf(Item) === Index;
  });
  if (MixedResults.length === 0) {
    SearchPreviewContainer.innerHTML = "";
    NoResultBox.classList.replace("hidden", "flex");
    SearchSomething.classList.replace("flex", "hidden");
    return;
  }
  SearchSomething.classList.replace("flex", "hidden");
  NoResultBox.classList.replace("flex", "hidden");
  CreateSearchPreviews(MixedResults);
}
function CreateSearchPreviews(Array) {
  SearchPreviewContainer.style.display = "flex";
  SearchPreviewContainer.innerHTML = "";
  let ItemsFragment = document.createDocumentFragment();
  Array.forEach((Post) => {
    const PostPreviewContainer = document.createElement("div");
    PostPreviewContainer.className = "search-preview-item bg-zinc-900 rounded-lg w-full";
    const Image = document.createElement("img");
    Image.className = "search-preview-image";
    Image.src = Post.ThumbnailSrc;
    const Title = document.createElement("a");
    Title.className = "search-preview-title text-blue-600";
    Title.innerText = Post.Title;
    Title.href = `#${Post.Path}`;
    PostPreviewContainer.append(Image, Title);
    ItemsFragment.append(PostPreviewContainer);
  });
  SearchPreviewContainer.append(ItemsFragment);
}
function ResetSearchBar() {
  SearchOverlay.style.display = "none";
  SearchPreviewContainer.style.display = "none";
  SearchPreviewContainer.innerHTML = "";
  NoResultBox.classList.replace("flex", "hidden");
  SearchSomething.classList.replace("hidden", "flex");
  SearchInput.value = "";
  SearchMode = false;
  Header.classList.remove("blur");
  Footer.classList.remove("blur");
  Row.classList.remove("blur");
}
// Event listeners
ShowSearchOverlayBtn.addEventListener("click", () => {
  SearchOverlay.style.display = "flex";
  SearchInput.value = "";
  Header.classList.add("blur");
  Footer.classList.add("blur");
  Row.classList.add("blur");
  SearchMode = true;
});
document.body.addEventListener("click", (event) => {
  const TargetClassName = event.target.className;
  if (TargetClassName.includes("show-search-overlay-btn")) return;
  if (SearchMode && !TargetClassName.includes("search-input") && !TargetClassName.includes("search")) {
    ResetSearchBar();
  }
});
SearchInput.addEventListener("input", FetchPreviews);
