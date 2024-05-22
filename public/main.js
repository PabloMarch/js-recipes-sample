document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const limit = 6;
  const recipesContainer = document.getElementById("recipes");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const pageInfo = document.querySelector(".page-info");

  async function fetchRecipes(page) {
    try {
      const response = await fetch(`/recipes?page=${page}&limit=${limit}`);
      const data = response.json();
      return data;
    } catch (error) {
      console.log({ error });
    }
  }

  async function loadRecipes(page) {
    const data = await fetchRecipes(page);
    const { recipes, total } = data || {};
    
    renderRecipes(recipes);
    updatePagination({ page, total });

    console.log({ data });
  }

  function renderRecipes(recipes) {
    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {
      const recipeDiv = document.createElement("div");

      recipeDiv.innerHTML = `
        <h2>${recipe.name}</h2>
        <p>${recipe.instructions}</p>
        <ul>
          ${recipe.ingredients.reduce((list, ingredient) =>
            `${list}<li>${ingredient}</li>`
          , "")}
        </ul>
      `;

      recipesContainer.appendChild(recipeDiv);
    });
  }

  function updatePagination({ page, total }) {
    const totalPages = Math.ceil(total / limit);

    pageInfo.innerHTML = `
      <p>Page: ${page} of ${totalPages}</p>
    `;

    currentPage = page;
    prevButton.disabled = page === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  prevButton.addEventListener("click", () => {
    loadRecipes(--currentPage);
  });

  nextButton.addEventListener("click", () => {
    loadRecipes(++currentPage);
  });

  loadRecipes(currentPage);
});