function GenerateAllTagsSidebarItem() {
  // right sidebar second item with title of "فهرست پست ها"
  if (document.querySelector(".right-sidebar")) document.querySelector(".right-sidebar").remove();
  const RightColumn = document.querySelector(".righ-column");
  const RightSidebar = document.createElement("aside");
  RightSidebar.className = "right-sidebar flex flex-col w-full lg:mr-2 lg:rounded-md lg:w-1/5 order-2 lg:order-1";
  const AllTagsSection = document.createElement("section");
  AllTagsSection.className = "bg-zinc-800 mb-3 p-3 rounded-md";
  AllTagsSection.id = "all-tags-section";
  const AllTagsSectionTitleContainer = document.createElement("section");
  const AllTagsSectionTitleIcon = document.createElement("img");
  AllTagsSectionTitleContainer.className =
    "flex items-center justify-center w-full p-3 mb-4 mx-auto text-center rounded-md font-Sepahbod text-xl bg-zinc-900 text-yellow-500";
  AllTagsSectionTitleIcon.className = "w-8 h-8 mx-2";
  AllTagsSectionTitleIcon.src = "../Icons/ContentsIcon.png";
  const AllTagsSectionTitle = document.createElement("span");
  AllTagsSectionTitle.innerText = "فهرست پست ها";
  AllTagsSectionTitleContainer.append(AllTagsSectionTitleIcon, AllTagsSectionTitle);
  const AllTagsSectionList = document.createElement("ul");
  AllTagsSectionList.className = "flex flex-col items-center w-full";
  for (n in Tags) {
    if (!Tags[n].CountOfPosts) continue;
    const ListItem = document.createElement("li");
    ListItem.className = "flex justify-between w-11/12 my-1";
    const TagCount = document.createElement("span");
    TagCount.className = "font-Dirooz text-orange-600";
    TagCount.innerText = Tags[n].CountOfPosts;
    const TagLink = document.createElement("a");
    TagLink.className = "text-blue-600 text-lg";
    TagLink.href = Tags[n].Href;
    TagLink.innerText = Tags[n].DisplayName;
    ListItem.append(TagLink, TagCount);
    AllTagsSectionList.append(ListItem);
  }
  AllTagsSectionTitleContainer.append(AllTagsSectionTitleIcon, AllTagsSectionTitle);
  AllTagsSection.append(AllTagsSectionTitleContainer, AllTagsSectionList);
  RightSidebar.append(AllTagsSection);
  RightColumn.append(RightSidebar);
}
