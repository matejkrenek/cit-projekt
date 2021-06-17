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