const PreviousImgBtn = document.querySelectorAll(".prev-image-button");
const NextImgBtn = document.querySelectorAll(".next-image-button");
let SliderItems = document.querySelectorAll(".slider-item ");
let Index = 0;

function PreviousImg(SliderID) {
  let Slider = document.getElementById(SliderID);
  let SliderItems = document.querySelectorAll(`#${SliderID} .slider-item`);
  let Index = Slider.dataset.index;
  SliderItems[Index].classList.remove("active-image");
  Index--;
  if (Index < 0) {
    Index = SliderItems.length - 1;
  }
  SliderItems[Index].classList.add("active-image");
  console.log(Slider);
  Slider.dataset.index = Index.toString();
}
function NextImg(SliderID) {
  let Slider = document.getElementById(SliderID);
  let SliderItems = document.querySelectorAll(`#${SliderID} .slider-item`);
  let Index = Slider.dataset.index;
  console.log(Slider, SliderItems, Index);
  SliderItems[Index].classList.remove("active-image");
  Index++;
  if (Index > SliderItems.length - 1) {
    Index = 0;
  }
  SliderItems[Index].classList.add("active-image");
  console.log(Slider);
  Slider.dataset.index = Index.toString();
}
PreviousImgBtn.forEach((Button) => {
  Button.addEventListener("click", () => {
    let SliderID = Button.parentElement.id;
    PreviousImg(SliderID);
  });
});
NextImgBtn.forEach((Button) => {
  Button.addEventListener("click", () => {
    let SliderID = Button.parentElement.id;
    NextImg(SliderID);
  });
});
