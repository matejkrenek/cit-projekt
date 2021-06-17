class Preview {
    constructor(element, options = {}) {
        this.preview = element;
        this.options = options;

        this.init();
    }

    setupControllers() {
        this.previewImage.forEach(image => {
            image.addEventListener("click", () => {
                this.openCover(image)
            })
        })

        this.previewCover.addEventListener("click", (e) => {
            if(e.target.classList.contains("js-preview-cover")) {
                this.closeCover()
            }
        })

        this.previewClose.addEventListener("click", () => {
            this.closeCover()
        })
    }

    openCover(imageToOpen) {
        this.previewCover.classList.add("is-opened");
        document.body.style.overflow = "hidden";

        this.previewImage.forEach((image, index) => {
            if(image === imageToOpen) {
                this.previewIndex = index
            }
        })

        const jsPreviewCoverImage = document.createElement("img")
        jsPreviewCoverImage.className = "previewImage js-preview-coverImage"
        jsPreviewCoverImage.src = imageToOpen.src

        this.previewCoverImage = jsPreviewCoverImage

        this.previewCover.append(jsPreviewCoverImage)
    }

    closeCover() {
        this.previewCover.classList.remove("is-opened");
        document.body.style.overflow = "visible";
        this.previewCoverImage.remove()
    }

    prevImage() {
        console.log("previous Image");

        if(this.previewIndex === 0) {
            this.previewIndex = this.previewImageLen - 1
        } else {
            this.previewIndex--
        }

        this.previewCoverImage.src = this.previewImage[this.previewIndex].src
    }

    nextImage() {
        console.log("next Image");
        if(this.previewIndex === this.previewImageLen - 1) {
            this.previewIndex = 0
        } else {
            this.previewIndex++
        }

        this.previewCoverImage.src = this.previewImage[this.previewIndex].src
    }

    initPreview() {
        this.previewImage = this.preview.querySelectorAll(".js-preview-image");
        this.previewImageLen = this.previewImage.length
        this.previewCover = document.querySelector(".js-preview-cover");
        this.previewCoverImage = this.previewCover.querySelector(".js-preview-coverImage");
        this.previewHeader = this.previewCover.querySelector(".js-preview-header");
        this.previewClose = this.previewHeader.querySelector(".js-preview-close");
        this.setupControllers();
    }

    setupArrows() {
        const controllersElement = document.createElement("div");
        controllersElement.classList.add("previewImage__controllers");

        controllersElement.innerHTML = `
            <button class="previewImage__arrow js-preview-prev js-preview-arrow ${this.options.arrowClass}">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="previewImage__arrow js-preview-next js-preview-arrow ${this.options.arrowClass}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `

        const arrows = controllersElement.querySelectorAll(".js-preview-arrow")

        arrows.forEach(arrow => {
            arrow.addEventListener("click", () => {
                if(arrow.classList.contains("js-preview-prev")){
                    this.prevImage()
                } else{
                    this.nextImage()
                }
            })
        })

        this.previewCover.append(controllersElement)
    }

    setupCounter() {
        const counterElement = document.createElement("div");
        counterElement.classList.add("previewImage__counter");

        counterElement.innerHTML = `1/5`

        this.previewHeader.append(counterElement)
    }

    initOptions() {
        this.arrows = this.options.arrows === true ? this.options.arrows : false;
        this.counter = this.options.counter === true ? this.options.counter : false;

        if(this.arrows === true) {
            this.setupArrows()
        }

        if(this.counter === true) {
            this.setupCounter()
        }
    }

    init() {
        this.initPreview();
        this.initOptions();
    }
}

const jsPreview = document.querySelectorAll(".js-preview");

jsPreview.forEach(preview => {
    new Preview(preview, {
        arrows: true,
        counter: false,
        arrowClass: "btn btn--circle"
    })
})