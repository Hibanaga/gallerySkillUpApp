import itemsCarousel from "./itemSlider.js";

let refs = {
  nextBtn: document.querySelector(".js-btnNext"),
  prevBtn: document.querySelector(".js-btnPrev"),
  slider: document.querySelector(".sliderCarousel"),
  largeImg: document.querySelector(".imgLarge"),
  radioAll: document.querySelector(".radioSelectImg"),
  radioElem: document.querySelector(".radioSelect"),
};

//version 1: before split arr to splitedArr
// let idx = 0;

// const splitedArrItems = reducerSplitArr(itemsCarousel);

// createItemsCarousel(splitedArrItems, idx);
// getLargeImgCarousel();

// function reducerSplitArr(arr) {
//   let newArrSize = 0;
//   if (arr.length % 2 === 0) {
//     newArrSize = 2;
//   } else {
//     newArrSize = 3;
//   }
//   return arr.reduce(
//     (newSplitedArr, item) => {
//       if (newSplitedArr[newSplitedArr.length - 1].length === newArrSize) {
//         newSplitedArr.push([]);
//       }

//       newSplitedArr[newSplitedArr.length - 1].push(item);
//       return newSplitedArr;
//     },
//     [[]]
//   );
// }

// function createItemsCarousel(items, idxSlider = 0) {
//   checkerIndex(idxSlider, items.length);
//   let html = ``;
//   items[idxSlider].map(({ url }, idx) => {
//     html += `<img
//         src="${url}"
//         alt=""
//         class="itemSlider"
//         data-source="${++idx}"
//       />`;
//   });
//   refs.slider.innerHTML = html;
// }

// function checkerIndex(currentIdx, lengthArr) {
//   if (currentIdx === 0) {
//     refs.prevBtn.disabled = true;
//   } else {
//     refs.prevBtn.disabled = false;
//   }

//   if (currentIdx === lengthArr - 1) {
//     refs.nextBtn.disabled = true;
//   } else {
//     refs.nextBtn.disabled = false;
//   }
// }

// refs.nextBtn.addEventListener("click", (event) => {
//   createItemsCarousel(splitedArrItems, ++idx);
// });

// refs.prevBtn.addEventListener("click", (event) => {
//   createItemsCarousel(splitedArrItems, --idx);
// });

// function getLargeImgCarousel() {
//   refs.slider.addEventListener("click", (event) => {
//     if (event.target.nodeName !== "IMG") {
//       return;
//     }
//     refs.largeImg.src = event.target.src;
//   });
// }

//version 2:

createItemsCarousel(itemsCarousel);

selectNextBtn();
selectPrevBtn();
createRadionBtns(itemsCarousel);
selectRadioBtn();
selectImg();
checkerRadioActive();

function createItemsCarousel(items) {
  let html = ``;
  items.map(({ url }, idx) => {
    html += `<img
        src="${url}"
        alt=""
        class="itemSlider"
        data-source="${url}"
      />`;
  });

  refs.slider.innerHTML = html;
}

function createRadionBtns(items) {
  let html = ``;

  items.map(({ url }) => {
    html += `<input type="radio" class="radioSelect"
            name="img" value="${url}">`;
  });
  refs.radioAll.innerHTML = html;
}

function selectNextBtn() {
  refs.nextBtn.addEventListener("click", (e) => {
    refs.slider.scrollLeft += 320;
  });
}

function selectPrevBtn() {
  refs.prevBtn.addEventListener("click", (e) => {
    refs.slider.scrollLeft -= 320;
    //120
  });
}

function selectRadioBtn() {
  refs.radioAll.addEventListener("click", (event) => {
    if (event.target.nodeName !== "input".toUpperCase()) {
      return;
    }
    refs.largeImg.src = event.target.value;
  });
}

function selectImg() {
  refs.slider.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") {
      return;
    }
    refs.largeImg.src = event.target.dataset.source;

    console.log(event.target.dataset.source);
  });
}

function checkerRadioActive() {
  if (
    refs.largeImg.dataset.source ===
    document.querySelector(".radioSelect").value
  ) {
    document.querySelector(".radioSelect").checked = true;
  }
}
