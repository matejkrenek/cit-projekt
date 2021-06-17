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

