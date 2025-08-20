const searchInput = document.getElementById("search-input");
const programsContainer = document.querySelector(".programs-container");
const programs = Array.from(document.querySelectorAll(".program"));
const noResults = document.getElementById("no-results");

// Prevent form submission reloading the page
document.getElementById("search-form").addEventListener("submit", e => e.preventDefault());

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // Score each program based on match
    const scoredPrograms = programs.map(program => {
        const title = program.querySelector("h3").textContent.toLowerCase();
        let score = 0;

        if (title === query && query !== "") score = 100; // exact match highest priority
        else if (title.includes(query) && query !== "") score = title.split(query).length - 1; // partial match
        else score = 0; // unmatched

        return { program, score };
    });

    // Sort by score descending
    scoredPrograms.sort((a, b) => b.score - a.score);

    // Append programs back to container in new order
    scoredPrograms.forEach(({ program }) => programsContainer.appendChild(program));

 
});