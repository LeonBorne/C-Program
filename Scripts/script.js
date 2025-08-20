const programNav = document.getElementById("extended-nav-section");
const totalNav = document.getElementsByTagName("header")[0];
let hideTimeout;

function toggleProgramNav() {
    programNav.classList.toggle("hidden");
}

// Only hide after a small delay
totalNav.addEventListener("mouseleave", function() {
    hideTimeout = setTimeout(() => {
        programNav.classList.add("hidden");
    }, 200); // 200ms delay
});

// If mouse enters the header again, cancel hiding
totalNav.addEventListener("mouseenter", function() {
    clearTimeout(hideTimeout);
});

// Also, prevent hiding if the mouse enters the extended nav
programNav.addEventListener("mouseenter", function() {
    clearTimeout(hideTimeout);
});

// Hide when leaving extended nav
programNav.addEventListener("mouseleave", function() {
    hideTimeout = setTimeout(() => {
        programNav.classList.add("hidden");
    }, 200);
});

