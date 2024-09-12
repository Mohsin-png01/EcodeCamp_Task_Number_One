document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        {
          title: 'Gulab Jamun',
          image: 'gulab-jamun.jpg',
          ingredients: ['Sugar', 'Bread', 'Oil'],
          instructions: [
            'Mix the sugar and water to make a syrup.',
            'Prepare the dough with bread and oil.',
            'Shape the dough into balls and fry them.',
            'Soak the fried balls in syrup.'
          ],
          price: 5.00
        },
        {
          title: 'Chicken Biryani',
          image: 'chicken-biryani.jpeg',
          ingredients: ['Chicken', 'Rice', 'Yogurt', 'Spices', 'Onion', 'Tomato'],
          instructions: [
            'Marinate the chicken with yogurt and spices.',
            'Cook the rice until half done.',
            'Fry onions and tomatoes in a pan.',
            'Add marinated chicken and cook until done.',
            'Layer rice and chicken, cook on low heat.'
          ],
          price: 12.00
        },
        {
          title: 'Chocolate Cake',
          image: 'chocolate-cake.jpeg',
          ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs', 'Butter', 'Baking Powder'],
          instructions: [
            'Preheat the oven to 350°F (175°C).',
            'Mix flour, cocoa powder, baking powder, and sugar.',
            'Add eggs and melted butter, mix well.',
            'Pour into a cake pan and bake for 30 minutes.',
            'Cool and frost as desired.'
          ],
          price: 8.00
        },
        {
          title: 'Sweet Dish',
          image: 'sweet-dish.jpeg',
          ingredients: ['Sugar', 'Milk', 'Rice', 'Cardamom'],
          instructions: [
            'Boil milk and add sugar.',
            'Cook rice until tender.',
            'Add cooked rice to milk mixture.',
            'Simmer until thickened.',
            'Add cardamom and serve.'
          ],
          price: 6.00
        },
        {
          title: 'Veggie Stir Fry',
          image: 'veggie-stir-fry.jpeg',
          ingredients: ['Mixed Vegetables', 'Soy Sauce', 'Garlic', 'Ginger', 'Olive Oil'],
          instructions: [
            'Heat olive oil in a pan.',
            'Add garlic and ginger, sauté until fragrant.',
            'Add mixed vegetables and stir-fry.',
            'Pour in soy sauce and cook until vegetables are tender.',
            'Serve with rice or noodles.'
          ],
          price: 7.00
        }
      ];


    const recipeList = document.getElementById('recipeList');
    const recipeDetail = document.getElementById('recipeDetail');
    const backButton = document.getElementById('backButton');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeImage = document.getElementById('recipeImage');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const recipeInstructions = document.getElementById('recipeInstructions');
    const recipeRating = document.getElementById('recipeRating');
    const addToCartButton = document.getElementById('addToCartButton');
    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutButton = document.getElementById('checkoutButton');
    const searchBar = document.getElementById('searchBar');

    let cartItems = [];

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const item = document.createElement('div');
            item.className = 'recipe-card';
            item.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-card-content">
                    <h3>${recipe.title}</h3>
                    <div class="recipe-card-rating">
                        <span>${recipe.rating}</span>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="recipe-card-price">$${recipe.price.toFixed(2)}</p>
                </div>
            `;
            item.addEventListener('click', () => showRecipeDetail(recipe));
            recipeList.appendChild(item);
        });
    }

    function showRecipeDetail(recipe) {
        recipeTitle.textContent = recipe.title;
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;
        recipeIngredients.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        recipeInstructions.innerHTML = recipe.instructions.map(step => `<li>${step}</li>`).join('');
        recipeRating.textContent = recipe.rating;
        recipeDetail.style.display = 'block';
        recipeList.style.display = 'none';
        cart.style.display = 'none';
        addToCartButton.onclick = () => addToCart(recipe);
        addToCartButton.textContent = `Add to Cart - $${recipe.price.toFixed(2)}`;
    }

    function showCart() {
        cart.style.display = 'block';
        recipeDetail.style.display = 'none';
        recipeList.style.display = 'none';
        updateCartList();
    }

    function addToCart(recipe) {
        cartItems.push(recipe);
        updateCartList();
        updateCartCount();
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCartList();
        updateCartCount();
    }

    function updateCartList() {
        cartList.innerHTML = '';
        let total = 0;
        cartItems.forEach((item, index) => {
            total += item.price;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.title} - $${item.price.toFixed(2)}</span>
                <button class="remove-button">Remove</button>
            `;
            listItem.querySelector('.remove-button').addEventListener('click', () => removeFromCart(index));
            cartList.appendChild(listItem);
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    function showRecipeList() {
        recipeDetail.style.display = 'none';
        recipeList.style.display = 'grid';
        cart.style.display = 'none';
    }

    backButton.addEventListener('click', showRecipeList);
    cartButton.addEventListener('click', showCart);

    checkoutButton.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        cartItems = [];
        updateCartList();
        updateCartCount();
        showRecipeList();
    });

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
        );
        displayRecipes(filteredRecipes);
    });

    // Initial display of recipes
    displayRecipes(recipes);
});