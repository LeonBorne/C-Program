const programNav = document.getElementById("extended-nav-section");
const totalNav = document.getElementsByTagName("header")[0];
let hideTimeout;

function toggleProgramNav() {
    programNav.classList.toggle("hidden");
}

// Only hide after a small delay
totalNav.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        programNav.classList.add("hidden");
    }, 200); // 200ms delay
});

// If mouse enters the header again, cancel hiding
totalNav.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
});

// Also, prevent hiding if the mouse enters the extended nav
programNav.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
});

// Hide when leaving extended nav
programNav.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        programNav.classList.add("hidden");
    }, 200);
});



function toggleBurger() {
    const burgerHeading = document.getElementById("burger-heading");
    const burgerTag = document.getElementById("burger-a-tag");
    const burgerList = document.getElementById("burger-list");
    const burgerContainer = document.getElementById("burger-container");
    const burgerContainer_Class = document.getElementsByClassName("hidden-burger-container")[0];

    burgerList.classList.toggle("hidden")
    burgerTag.classList.toggle("hidden");
    burgerHeading.classList.toggle("hidden");


    if (burgerContainer === burgerContainer_Class) {
        burgerContainer.classList.remove("hidden-burger-container");
        burgerContainer.classList.add("open-burger-container");
    }

    else {
        burgerContainer.classList.remove("open-burger-container");
        burgerContainer.classList.add("hidden-burger-container");
    }

}

