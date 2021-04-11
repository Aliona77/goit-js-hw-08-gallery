import galleryImages from './gallery-items.js';
console.log(galleryImages);


const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".lightbox"),
    changeLightboxImg: document.querySelector(".lightbox__image"),
    closeLightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modal: document.querySelector(".lightbox__content"),
    image: document.createElement("img"),
    overly: document.querySelector(".lightbox__overlay")
};

const galleryMarkup = galleryImages.map(({preview, original, description}) =>{
           return`<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`});

refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup.join(''));

refs.image.classList.add("gallery__image");
refs.gallery.addEventListener("click", onGalleryClick);
refs.closeLightboxBtn.addEventListener("click", handlerCloseClick);
refs.modal.addEventListener("click", closeLightbox);

function onGalleryClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    if (evt.target.nodeName === 'IMG') {
        refs.lightbox.classList.add("is-open");
        refs.changeLightboxImg.src = evt.target.getAttribute("data-source");
        refs.changeLightboxImg.alt = evt.target.alt;
    }
    window.addEventListener("keyup", clickKey);
}

function handlerCloseClick(evt) {
    evt.preventDefault();
    refs.lightbox.classList.remove("is-open");
    refs.changeLightboxImg.src ='';
    refs.changeLightboxImg.alt ='';
    window.removeEventListener("keyup", clickKey);
}

function closeLightbox(event) {
    if (event.target === event.currentTarget) {
        handlerCloseClick();
    }
}
function clickKey(event) {
    if (event.code === "Escape") {
       handlerCloseClick(); 
    }
}

