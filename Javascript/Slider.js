let Index = 0;
function PreviousImg(SliderID) {
  const Slider = document.getElementById(SliderID);
  const SliderItems = document.querySelectorAll(`#${SliderID} .slider-image`);
  const SliderCircles = document.querySelectorAll(`#${SliderID} .slider-circle`);
  let Index = Slider.dataset.index;
  SliderItems[Index].classList.remove("active-image");
  SliderCircles[Index].classList.remove("active-slider-circle");
  Index--;
  if (Index < 0) {
    Index = SliderItems.length - 1;
  }
  SliderItems[Index].classList.add("active-image");
  SliderCircles[Index].classList.add("active-slider-circle");
  Slider.dataset.index = Index.toString();
}
function NextImg(SliderID) {
  const Slider = document.getElementById(SliderID);
  const SliderItems = document.querySelectorAll(`#${SliderID} .slider-image`);
  const SliderCircles = document.querySelectorAll(`#${SliderID} .slider-circle`);
  let Index = Slider.dataset.index;
  SliderItems[Index].classList.remove("active-image");
  SliderCircles[Index].classList.remove("active-slider-circle");
  Index++;
  if (Index > SliderItems.length - 1) {
    Index = 0;
  }
  SliderItems[Index].classList.add("active-image");
  SliderCircles[Index].classList.add("active-slider-circle");
  Slider.dataset.index = Index.toString();
}
function SelectImage(SliderID, NewIndex, OldIndex) {
  const Slider = document.getElementById(SliderID);
  const SliderItems = document.querySelectorAll(`#${SliderID} .slider-image`);
  const SliderCircles = document.querySelectorAll(`#${SliderID} .slider-circle`);
  SliderItems[OldIndex].classList.remove("active-image");
  SliderCircles[OldIndex].classList.remove("active-slider-circle");
  SliderItems[NewIndex].classList.add("active-image");
  SliderCircles[NewIndex].classList.add("active-slider-circle");
  Slider.dataset.index = NewIndex.toString();
}
function ToggleImageViewer(SliderID) {
  const Slider = document.getElementById(SliderID);
  Slider.classList.toggle("big-slider");
}
