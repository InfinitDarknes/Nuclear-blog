function GenerateAllTagsSidebarItem() {
  // right sidebar second item with title of "فهرست پست ها"
  if (document.getElementById("all-tags-section")) document.getElementById("all-tags-section").remove();
  const AllTagsSection = document.createElement("section");
  AllTagsSection.className = "sidebar bg-zinc-800";
  AllTagsSection.id = "all-tags-section";
  const AllTagsSectionTitleContainer = document.createElement("section");
  const AllTagsSectionTitleIcon = document.createElement("img");
  AllTagsSectionTitleContainer.className = "sidebar-title bg-zinc-900 text-yellow-500";
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
    ListItem.className = "all-tags-ul-li my-2";
    const TagCount = document.createElement("span");
    TagCount.className = "tag-count text-orange-600";
    TagCount.innerText = Tags[n].CountOfPosts;
    const TagLink = document.createElement("a");
    TagLink.className = "text-blue-600";
    TagLink.href = Tags[n].Href;
    TagLink.innerText = Tags[n].DisplayName;
    ListItem.append(TagLink, TagCount);
    AllTagsSectionList.append(ListItem);
  }
  AllTagsSectionTitleContainer.append(AllTagsSectionTitleIcon, AllTagsSectionTitle);
  AllTagsSection.append(AllTagsSectionTitleContainer, AllTagsSectionList);
  document.getElementById("right-sidebar").append(AllTagsSection);
}
