document.getElementById('btn').addEventListener('click', (e) => {
  e.preventDefault();
  searchRecipes();
});

async function searchRecipes() {
  const userInput = document.getElementById('userInput').value.trim();
  if (userInput === '') {
      document.querySelector('.notfound').textContent = 'Please enter a meal to search.';
      return;
  }
  document.querySelector('.find').style.display = 'none'; // Hide default "Find Your Meal" text
  document.querySelector('.notfound').textContent = ''; // Clear any previous not found messages

  try {
      const response = await fetch(`https://api.edamam.com/search?q=${userInput}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
      const data = await response.json();

      if (data.hits.length === 0) {
          document.querySelector('.notfound').textContent = 'Meal Not Found';
          document.querySelector('.try').textContent = 'Try Something Else';
      } else {
          displayRecipes(data.hits);
      }
  } catch (error) {
      document.querySelector('.notfound').textContent = 'Error fetching data. Please try again later.';
  }
}

function displayRecipes(recipes) {
  let html = '';
  recipes.forEach((recipe, i) => {
      html += `
          <div class="row my-5">
              <h2 class='text-center text-secondary mt-5'>Food Area: ${recipe.recipe.cuisineType}</h2>
              <h2 class='text-center text-warning'>Food Name: ${recipe.recipe.label}</h2>
              <div class="col-md-4">
                  <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" class='w-100 img'>
              </div>
              <div class="col-md-4">
                  <h2>Ingredients:</h2>
                  <ul>
                      ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
              </div>
              <div class="col-md-4">
                  <a href="${recipe.recipe.url}" target="_blank"><button id="sum">View Full Recipe</button></a>
              </div>
          </div>
      `;
  });

  document.getElementById('appendData').innerHTML = html;
}
