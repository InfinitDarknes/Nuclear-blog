const ShowSearchOverlayBtn = document.querySelector(".show-search-overlay-btn");
const SearchOverlay = document.querySelector(".search-overlay");
const SearchInput = document.querySelector(".search-input");
const SearchBtn = document.querySelector(".search");
const SearchPreviewContainer = document.querySelector(
  ".search-preview-container",
);
const SearchInputContainer = document.querySelector(".search-input-container");
const SearchSomething = document.querySelector(".search-something");
const NoResultBox = document.querySelector(".no-result-box");
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
    console.log(MixedResults.indexOf(Item), "vs", Index);
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
    PostPreviewContainer.className =
      "search-preview-item flex w-full p-2 my-1.5 bg-zinc-900 rounded-lg w-full";
    const Image = document.createElement("img");
    Image.className = "search-preview-image w-16 h-16 ml-4";
    Image.src = Post.ThumbnailSrc;
    const Title = document.createElement("a");
    Title.className = "search-preview-title text-base font-Title text-blue-600";
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
}
// Event listeners
ShowSearchOverlayBtn.addEventListener("click", () => {
  SearchOverlay.style.display = "flex";
  SearchInput.value = "";
  SearchMode = true;
});
document.body.addEventListener("click", (event) => {
  const TargetClassName = event.target.className;
  if (TargetClassName.includes("show-search-overlay-btn")) return;
  if (SearchMode && TargetClassName.includes("search-overlay"))
    ResetSearchBar();
});
SearchInput.addEventListener("input", FetchPreviews);
