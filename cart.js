function checkLoggedInUser() {
    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the loggedInUser is not present
    if (Object.keys(loggedInUser).length === 0) {
        // Redirect to index.html or any other desired HTML file
        window.location.href = "index.html";
    }
}

checkLoggedInUser();

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve allProducts data from local storage
    var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Get the productList container element
    var productListContainer = document.getElementById("productList");

    // Check if the productListContainer is not null before accessing its properties
    if (productListContainer) {
        // Clear previous content
        productListContainer.innerHTML = "";

        // Display allProducts
        allProducts.forEach(function (userProducts, userIndex) {
            // Create a section for each user's products
            var userProductsSection = document.createElement("div");
            userProductsSection.className = "user-products";

            // Create a heading for the user's email
            var userEmailHeading = document.createElement("h2");
            userEmailHeading.textContent = "User Email: " + userProducts.email;

            // Create a list for the user's products
            var productList = document.createElement("ul");

            // Iterate through the products and create list items
            userProducts.products.forEach(function (product, productIndex) {
                var listItem = document.createElement("li");
                listItem.textContent =
                    "Product Name: " + product.name +
                    ", Description: " + product.description +
                    ", Price: $" + product.price + ".00";

                // Append the list item to the product list
                productList.appendChild(listItem);

                // Create an "Add to Favorites" button for each product
                var addButton = document.createElement("button");
                addButton.textContent = "Add to Favorites";
                addButton.className = "btn btn-primary";
                addButton.onclick = function () {
                    addToFavorites(userProducts.email, product);
                };

                // Append the button to the list item
                listItem.appendChild(addButton);
            });

            // Append the heading and product list to the userProductsSection
            userProductsSection.appendChild(userEmailHeading);
            userProductsSection.appendChild(productList);

            // Append the userProductsSection to the productListContainer
            productListContainer.appendChild(userProductsSection);
        });
    }
});

function addToFavorites(userEmail, product) {
    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the user is logged in
    if (Object.keys(loggedInUser).length === 0) {
        console.log("User not logged in. Unable to add to favorites.");
        return;
    }

    // Prompt the user for the quantity
    var quantity = prompt("Enter the quantity:");
    // Convert the quantity to a number
    quantity = parseInt(quantity, 10);

    // Check if the quantity is a valid number
    if (isNaN(quantity) || quantity <= 0) {
        console.log("Invalid quantity. Please enter a positive number.");
        return;
    }

    // Retrieve favorites data from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Create an entry with loggedInUser, selected product, and quantity
    var favoriteEntry = {
        loggedInUser: loggedInUser,
        product: product,
        quantity: quantity,
        emailSeller: userEmail
    };

    // Add the entry to the favorites array
    favorites.push(favoriteEntry);

    // Update the favorites data in local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    console.log("Product added to favorites:", favoriteEntry);
}























document.addEventListener("DOMContentLoaded", function () {
    // Display favorites on page load
    displayFavorites();
});

function displayFavorites() {
    // Retrieve favorites data from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Get the favoritesList container element
    var favoritesListContainer = document.getElementById("favoritesList");

    // Check if the favoritesListContainer is not null before accessing its properties
    if (favoritesListContainer) {
        // Clear previous content
        favoritesListContainer.innerHTML = "";

        // Display favorites
        favorites.forEach(function (favoriteEntry, index) {
            // Create a section for each favorite entry
            var favoriteEntrySection = document.createElement("div");
            favoriteEntrySection.className = "favorite-entry";

            // Create a heading for the user's email
            var userEmailHeading = document.createElement("h2");
            userEmailHeading.textContent = "User Email: " + favoriteEntry.loggedInUser.email;

            // Create a paragraph for the product details
            var productDetailsParagraph = document.createElement("p");
            productDetailsParagraph.textContent =
                "Product Name: " + favoriteEntry.product.name +
                ", Description: " + favoriteEntry.product.description +
                ", Price: $" + favoriteEntry.product.price + ".00" +
                ", Quantity: " + favoriteEntry.quantity +
                ", Total: $" + (favoriteEntry.product.price * favoriteEntry.quantity).toFixed(2); // Display the total value

            // Create a "Buy" button
            var buyButton = document.createElement("button");
            buyButton.textContent = "Buy";
            buyButton.className = "btn btn-success";
            buyButton.onclick = function () {
                buyItem(index);
            };

            var editQuantityButton = document.createElement("button");
            editQuantityButton.textContent = "Edit Quantity";
            editQuantityButton.className = "btn btn-warning";
            editQuantityButton.onclick = function () {
                editQuantity(index);
            };

            // Create a "Delete" button
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.onclick = function () {
                removeFromFavorites(index);
            };

            // Append elements to the favoriteEntrySection
            favoriteEntrySection.appendChild(userEmailHeading);
            favoriteEntrySection.appendChild(productDetailsParagraph);
            favoriteEntrySection.appendChild(buyButton);
            favoriteEntrySection.appendChild(deleteButton);
            favoriteEntrySection.appendChild(editQuantityButton);

            // Append the favoriteEntrySection to the favoritesListContainer
            favoritesListContainer.appendChild(favoriteEntrySection);
        });
    }
}


function removeFromFavorites(index) {
    // Retrieve favorites data from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Ensure that the index is valid
    if (index >= 0 && index < favorites.length) {
        // Remove the entry from the favorites array
        favorites.splice(index, 1);

        // Update the favorites data in local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        console.log("Entry removed from favorites at index:", index);
    } else {
        console.log("Invalid index:", index);
    }

    // Refresh the displayed favorites
    displayFavorites();
}

function buyItem(index) {
    // Retrieve favorites data from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Ensure that the index is valid
    if (index >= 0 && index < favorites.length) {
        // Get the selected item to be bought
        var itemToBuy = favorites[index];

        // Retrieve the buyItems array from local storage
        var buyItems = JSON.parse(localStorage.getItem("buyItems")) || [];

        // Add the item to the buyItems array
        buyItems.push(itemToBuy);

        // Update the buyItems data in local storage
        localStorage.setItem("buyItems", JSON.stringify(buyItems));

        console.log("Item bought and moved to buyItems:", itemToBuy);

        // After buying, remove it from favorites
        removeFromFavorites(index);

    } else {
        console.log("Invalid index:", index);
    }
}

function editQuantity(index) {
    // Retrieve favorites data from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Ensure that the index is valid
    if (index >= 0 && index < favorites.length) {
        // Prompt the user for a new quantity
        var newQuantity = prompt("Enter the new quantity:", favorites[index].quantity);

        // Validate if the input is a valid number
        if (!isNaN(newQuantity) && newQuantity !== null) {
            // Update the quantity in the favorites array
            favorites[index].quantity = parseInt(newQuantity);

            // Update the favorites data in local storage
            localStorage.setItem("favorites", JSON.stringify(favorites));

            // Refresh the displayed favorites
            displayFavorites();
        } else {
            alert("Invalid input. Please enter a valid quantity.");
        }
    } else {
        console.log("Invalid index:", index);
    }
}