// disable dragging of all images on website 
document.querySelectorAll("img").forEach(img => img.draggable = false)
/*****************************
          CAROUSEL
 *****************************/
class Carousel {
    constructor ({slider, controllers, options = {}}) {
        this.slider = slider;
        this.controllers = controllers;
        this.options = options;
        this.init()
    }

    prevSlide() {
        console.log(this.perPage)
        this.currentIndex = this.currentIndex <= 0 ? this.sliderLen - this.perPage : this.currentIndex - this.perSlide;
        this.changeSlide(this.currentIndex)
    }

    nextSlide() {
        console.log(this.perPage)
        this.currentIndex = this.currentIndex >= this.sliderLen - this.perPage 
        ? 0 
        : (this.sliderLen - (this.currentIndex + this.perSlide)) < this.perPage 
            ? this.sliderLen - this.perPage 
            : this.currentIndex + this.perSlide;
        this.changeSlide(this.currentIndex)
    }

    renderPagination() {
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination__container");

        for(let i = 0; i < this.sliderLen; i++){
            const pagination = document.createElement('button')
            pagination.classList.add('slider__pagination')
            pagination.innerText = i
            paginationContainer.append(pagination)

            pagination.addEventListener('click', () => {
                this.changeSlide(parseInt(pagination.innerText))
            })
        }

        this.sliderControllers.append(paginationContainer)

        this.changePagination()
    }

    renderArrows() {
        const arrowContainer = document.createElement("div");
        arrowContainer.classList.add("arrow__container");

        arrowContainer.innerHTML = `
            <button class="slider__arrow js-slider-prev js-slider-arrow ${this.options.arrowClass}">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="slider__arrow js-slider-next js-slider-arrow ${this.options.arrowClass}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `

        const arrows = arrowContainer.querySelectorAll(".js-slider-arrow")
        arrows.forEach(arrow => {
            arrow.addEventListener("click", () => {
                if(arrow.classList.contains("js-slider-prev")){
                    this.prevSlide()
                } else{
                    this.nextSlide()
                }
            })
        })

        this.sliderControllers.append(arrowContainer)
    }

    changePagination() {
        const allPagination = this.sliderControllers.querySelectorAll('.slider__pagination');

        allPagination.forEach(pagination => {
            pagination.classList.remove('active')
        })

        allPagination[this.currentIndex].classList.add('active')
    }

    changeSlide(index = this.currentIndex) {
        this.currentIndex = index;
        this.sliderShow.style.transform = `translateX(-${this.currentIndex * (this.sliderSlide.getBoundingClientRect().width + this.sliderSlideOffset)}px)`;

        if(this.controllers["pagination"] === true) {
            this.changePagination()
        }
    }

    changeSlideInterval(delay) {
        setInterval(() => {
            this.nextSlide()
        }, delay)
    }

    
    initSlider() {
        this.sliderShow = this.slider.querySelector(".js-slider-show");
        this.sliderSlide = this.slider.querySelector(".js-slider-slide");
        this.sliderLen = this.slider.querySelectorAll(".js-slider-slide").length;
        this.sliderSlideOffset = parseInt(window.getComputedStyle(this.sliderSlide, null).getPropertyValue("margin-left").split("px")[0]) + parseInt(window.getComputedStyle(this.sliderSlide, null).getPropertyValue("margin-right").split("px")[0]);
    }

    initControllers() {
        const sliderControllers = document.createElement("div");
        sliderControllers.classList.add("js-slider-controllers");

        this.slider.append(sliderControllers)
        this.sliderControllers = sliderControllers;

        if(this.controllers["pagination"] === true){
            this.renderPagination()
        }
        
        if(this.controllers["arrows"] === true){
            this.renderArrows()
        }
    }

    initOptions() {
        this.currentIndex = this.options["startIndex"] ? this.options["startIndex"] : 0;
        this.perPage = this.options["perPage"] ? this.options["perPage"] : 1;
        this.perSlide = this.options["perSlide"] ? this.options["perSlide"] : 1;
    }

    init() {
        this.initSlider();
        this.initControllers();
        this.initOptions();
    }
}

const jsSliders = document.querySelectorAll(".js-slider")

jsSliders.forEach(slider => {

    if(slider.classList.contains("js-slider-full")) {
        const carousel = new Carousel({
            slider,
            controllers: {
                arrows: true,
    
            },
            options: {
                perSlide: 1,
                perPage: 1,
                arrowClass: "btn btn--circle",
            }
        })
    } else {
        const carousel = new Carousel({
            slider,
            controllers: {
                arrows: true,
    
            },
            options: {
                perSlide: 1,
                perPage: 3,
                arrowClass: "btn btn--circle",
            }
        })
    
        window.addEventListener("resize", () => {
            if (window.innerWidth === 1200) {
                console.log("benger")
                const carousel = new Carousel({
                    slider,
                    controllers: {
                        arrows: true,
            
                    },
                    options: {
                        perSlide: 1,
                        perPage: 2,
                        arrowClass: "btn btn--circle",
                    }
                })
            }
        })
    }
})


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
const jsAccordions = document.querySelectorAll(".js-accordion")

jsAccordions.forEach(accordion => {
    const accordionHead = accordion.querySelector(".js-accordion-head");
    const accordionBody = accordion.querySelector(".js-accordion-body");

    accordionHead.addEventListener("click", () => {
        let accordionActive = accordion.classList.contains("is-opened");

        if(accordionActive) {
            accordionBody.style.maxHeight = 0;
            accordion.classList.remove("is-opened");
        } else {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            accordion.classList.add("is-opened");
        }
    })
})