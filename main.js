import galleryItems from "./gallery-items.js";

class Gallery {
  constructor(items, refsObj) {
    this.galleryItems = items;
    this.refs = refsObj;
  }

  createblocksImages() {
    let html = ``;
    this.galleryItems.map(({ description, preview, original }) => {
      html += ` <li class="gallery__item">`;
      html += ` <a class="gallery__link" href="${original}">`;
      html += ` <img class="gallery__image" src="${preview}" 
      data-source="${original}" 
      alt="${description}" />`;
      html += ` </a>`;
      html += ` </li>`;
    });
    return html;
  }

  showItemsGallery(html) {
    let { jsGallery } = this.refs;
    jsGallery.innerHTML = html;
  }

  selectImgGallery() {
    let { jsGallery, lightBoxLargeImg, lightBox } = this.refs;

    jsGallery.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.nodeName !== "IMG") {
        return;
      }
      lightBoxLargeImg.setAttribute("src", event.target.dataset.source);
      lightBoxLargeImg.setAttribute("alt", "alt");
      lightBox.classList.add("is-open");
    });
  }

  closeBtnModal() {
    let { jsCloseBtn, lightBox, lightBoxLargeImg } = this.refs;

    jsCloseBtn.addEventListener("click", (event) => {
      lightBoxLargeImg.setAttribute("src", "");
      lightBox.classList.remove("is-open");
    });
  }

  closeClickOverlay() {
    let { jsOverlay, lightBox, lightBoxLargeImg } = this.refs;
    jsOverlay.addEventListener("click", (event) => {
      if (event.target.nodeName !== "DIV") {
        return;
      }

      lightBox.classList.remove("is-open");
      lightBoxLargeImg.setAttribute("src", "");
    });
  }

  closeKeyWordOverlay() {
    let { lightBox } = this.refs;

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        lightBox.classList.remove("is-open");
      }
    });
  }

  selectNextImg() {
    const imgArr = this.galleryItems.map(({ original }) => original);
    let { lightBox, lightBoxLargeImg } = this.refs;

    // console.log(imgArr.length - 1);

    window.addEventListener("keydown", (event) => {
      if (
        event.code === "ArrowRight" &&
        lightBox.classList.contains("is-open")
      ) {
        let idx = imgArr.indexOf(lightBoxLargeImg.src);
        if (idx >= imgArr.length - 1) {
          idx = -1;
          lightBoxLargeImg.src = imgArr[idx];
        }
        console.log(idx);
        lightBoxLargeImg.src = imgArr[++idx];
      }

      if (
        event.code === "ArrowLeft" &&
        lightBox.classList.contains("is-open")
      ) {
        let idx = imgArr.indexOf(lightBoxLargeImg.src);
        if (idx <= -1 || idx === 0) {
          console.log(imgArr.length - 1);
          idx = imgArr.length - 1;
          lightBoxLargeImg.src = imgArr[idx];
        } else {
          lightBoxLargeImg.src = imgArr[--idx];
        }
      }
    });
  }
}

const refs = {
  jsGallery: document.querySelector(".js-gallery"),
  lightBoxLargeImg: document.querySelector(".lightbox__image"),
  lightBox: document.querySelector(".lightbox"),
  jsCloseBtn: document.querySelector(`button[data-action="close-lightbox"]`),
  jsOverlay: document.querySelector(".lightbox__overlay"),
};

const gallery = new Gallery(galleryItems, refs);

gallery.showItemsGallery(gallery.createblocksImages());
gallery.selectImgGallery();
gallery.closeBtnModal();
gallery.closeClickOverlay();
gallery.closeKeyWordOverlay();

gallery.selectNextImg();
