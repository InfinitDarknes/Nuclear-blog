//Desktop
function GenerateDesktopDropDownMenus() {
  GenerateAllPostsDropDown();
  GenerateCategoriesDropDown();
}
function GenerateAllPostsDropDown() {
  const AllPostsDropDownBtn = document.querySelector(".all-posts-drop-down-btn");
  // Categories drop down
  const AllPostsDropDown = document.createElement("ul");
  AllPostsDropDown.className = `drop-down-wrapper invisiable pointer-events-none grid opacity-0 grid-cols-2 gap-2 bg-zinc-900 shadow-lg shadow-white/40 absolute p-3 
  min-w-96 max-h-96 overflow-y-scroll border-t-transparent transition-all duration-500 group-hover:visiable group-hover:opacity-100 group-hover:pointer-events-auto`;
  AllPostsDropDown.setAttribute("data-drop-down", "");
  for (n in Tags) {
    if (!Tags[n].CountOfPosts) continue;
    const DropDownItem = document.createElement("li");
    DropDownItem.href = "";
    DropDownItem.className =
      "drop-down-item min-w-32 flex items-center justify-between p-2 rounded-md bg-zinc-800 transition duration-300 hover:scale-x-105";
    const DropDownText = document.createElement("a");
    DropDownText.className = "drop-down-text p-1 text-blue-600 transition duration-300";
    const DropDownCount = document.createElement("span");
    DropDownCount.className = "p-1 text-orange-600";
    DropDownText.innerText = Tags[n].DisplayName;
    DropDownCount.innerText = PlacePersianNumbers(Tags[n].CountOfPosts);
    DropDownItem.append(DropDownText, DropDownCount);
    AllPostsDropDown.append(DropDownItem);
  }
  AllPostsDropDownBtn.append(AllPostsDropDown);
}
function GenerateCategoriesDropDown() {
  const CategoriesDropDownBtn = document.querySelector(".categories-drop-down-btn");
  // Categories drop down
  const CategoriesDropDown = document.createElement("ul");
  CategoriesDropDown.className = `drop-down-wrapper invisiable pointer-events-none grid opacity-0 grid-cols-1 gap-2 bg-zinc-900 shadow-lg shadow-white/40 absolute p-3 
  min-w-96 max-h-96 overflow-y-scroll border-t-transparent transition-all duration-500 group-hover:visiable group-hover:opacity-100 group-hover:pointer-events-auto`;
  CategoriesDropDown.setAttribute("data-drop-down", "");
  for (n in CategoriesArray) {
    const DropDownItem = document.createElement("li");
    DropDownItem.className =
      "drop-down-item min-w-32 flex items-center justify-between p-2 rounded-md bg-zinc-800 transition duration-300 hover:scale-x-105";
    const DropDownText = document.createElement("a");
    DropDownText.className = "drop-down-text p-1 text-blue-600 transition duration-300";
    DropDownText.href = `#category-${CategoriesArray[n].KeyName}`;
    const DropDownCount = document.createElement("span");
    DropDownCount.className = "p-1 text-orange-600";
    DropDownText.innerText = CategoriesArray[n].DisplayName;
    DropDownItem.append(DropDownText, DropDownCount);
    CategoriesDropDown.append(DropDownItem);
  }
  CategoriesDropDownBtn.append(CategoriesDropDown);
}
document.addEventListener("click", (Event) => {
  let IsTargetDropDownBtn = Event.target.matches("[data-drop-down-btn]");
  let IsTargetDropDown = Event.target.closest("[data-drop-down]");
  if (IsTargetDropDown) return;
  if (IsTargetDropDownBtn) {
    const CurrentDropDown = Event.target.children[1];
    if (CurrentDropDown.className.includes("visible")) {
      HideDropDowns();
      return;
    }
    HideDropDowns();
    CurrentDropDown.classList.replace("invisiable", "visible");
    CurrentDropDown.classList.replace("pointer-events-none", "pointer-events-auto");
    CurrentDropDown.classList.replace("opacity-0", "opacity-100");
  } else {
    HideDropDowns();
  }
});
function HideDropDowns() {
  const AllDropDowns = document.querySelectorAll("[data-drop-down].visible");
  AllDropDowns.forEach((DropDown) => {
    DropDown.classList.replace("visible", "invisiable");
    DropDown.classList.replace("pointer-events-auto", "pointer-events-none");
    DropDown.classList.replace("opacity-100", "opacity-0");
  });
}
//Mobile
