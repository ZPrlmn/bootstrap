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

// Function to post a product
function postProduct() {
    var name = document.getElementById("productName").value;
    var description = document.getElementById("productDescription").value;
    var price = document.getElementById("productPrice").value;

    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the user is logged in
    if (Object.keys(loggedInUser).length === 0) {
        console.log("User not logged in. Please log in to post a product.");
        return;
    }

    // Create a product object
    var productData = {
        name: name,
        description: description,
        price: price,
    };

    // Add the product to the user's products
    loggedInUser.products = loggedInUser.products || [];
    loggedInUser.products.push(productData);

    // Update the loggedInUser data in local storage
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Check if products with the same email already exist in a different location
    var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Find products with the same email as loggedInUser
    var userProducts = allProducts.find(function(products) {
        return products.email === loggedInUser.email;
    });

    // If userProducts exist, add the new product to the existing products
    if (userProducts) {
        userProducts.products.push(productData);
    } else {
        // If no userProducts exist, create a new entry
        allProducts.push({
            email: loggedInUser.email,
            products: [productData]
        });
    }

    // Update the allProducts data in local storage
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    console.log("Product data added to loggedInUser and allProducts in local storage");
    // Display the user's products
    displayUserProducts();
}




function displayUserProducts() {
    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the user is logged in
    if (Object.keys(loggedInUser).length === 0) {
        console.log("User not logged in.");
        return;
    }

    // Retrieve allProducts data from local storage
    var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Find the entry with the same email as loggedInUser in allProducts
    var userProducts = allProducts.find(function(products) {
        return products.email === loggedInUser.email;
    });

    // Access the products array from userProducts, or use an empty array if not found
    var productsToDisplay = (userProducts && userProducts.products) || [];

    // Get the products container element
    var productsContainer = document.getElementById("item");

    // Check if the productsContainer is not null before accessing its properties
    if (productsContainer) {
        // Clear previous content
        productsContainer.innerHTML = "";

        // Display the user's products from allProducts
        productsToDisplay.forEach(function(product, index) {
            // Create a card for each product
            var card = document.createElement("div");
            card.className = "card";

            // Create a p element for the product name
            var productName = document.createElement("p");
            productName.textContent = "Product Name: " + product.name;

            // Create a p element for the product description
            var productDescription = document.createElement("p");
            productDescription.textContent = "Description: " + product.description;

            // Create a p element for the product price
            var productPrice = document.createElement("p");
            productPrice.textContent = "Price: $" + product.price + ".00";

            // Create an edit button
            var showButton = document.createElement("button");
            showButton.textContent = "Show Product";
            showButton.className = "btn btn-success";
            showButton.onclick = function () {
                showProductDetails(product.name, product.description, product.price);
            
            };

            // Create an edit button
            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "btn btn-success";
            editButton.onclick = function() {
                editProduct(product.name, loggedInUser.email);
            };

            // Inside displayUserProducts function
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.onclick = function() {
                deleteEProduct(product.name, loggedInUser.email);
            };
            

            // Append the elements to the card
            card.appendChild(productName);
            card.appendChild(productDescription);
            card.appendChild(productPrice);
            card.appendChild(showButton);
            card.appendChild(editButton);
            card.appendChild(deleteButton);

            // Append the card to the products container
            productsContainer.appendChild(card);
        });
    }
}



function closeBtn() {
    // Set display to "none"
    document.getElementById("save").style.display = "none";
}

function showProductDetails(name, description, price) {
    document.getElementById("showProductName").textContent = ("Name: " + name);
    document.getElementById("showProductDescription").textContent = ("Description: " + description);
    document.getElementById("showProductPrice").textContent = ("Price: " + price);

    document.getElementById("showProductCard").style.display = ("block");
}

// Function to close the modal
function closeShow() {
    document.getElementById("showProductCard").style.display = ("none");
}



function deleteEProduct(name, userEmail) {
    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the user is logged in
    if (Object.keys(loggedInUser).length === 0) {
        console.log("User not logged in. Unable to delete product.");
        return;
    }

    // Ensure that loggedInUser.products is initialized as an array
    loggedInUser.products = loggedInUser.products || [];

    // Find the index of the product with the specified name in the user's products
    var productIndex = loggedInUser.products.findIndex(function(product) {
        return product.name === name;
    });

    // Check if the product with the specified name was found
    if (productIndex !== -1) {
        // Remove the product from the user's products array
        loggedInUser.products.splice(productIndex, 1);

        // Update the loggedInUser data in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // Check if products with the same email already exist in a different location (allProducts)
        var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Find the entry with the same email as the provided userEmail in allProducts
        var userProducts = allProducts.find(function(products) {
            return products.email === userEmail;
        });

        // If userProducts exist, remove the product from the existing products
        if (userProducts) {
            var userProductIndex = userProducts.products.findIndex(function(product) {
                return product.name === name;
            });

            if (userProductIndex !== -1) {
                userProducts.products.splice(userProductIndex, 1);
            }

            // Update the allProducts data in local storage
            localStorage.setItem("allProducts", JSON.stringify(allProducts));
        }

        console.log("Product deleted:", name);
    } else {
        console.log("Product not found:", name);
    }

    // Display the user's products
    displayUserProducts();
}


function editProduct(name, userEmail) {
    // Retrieve the loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Check if the user is logged in
    if (Object.keys(loggedInUser).length === 0) {
        console.log("User not logged in. Unable to edit product.");
        return;
    }

    // Ensure that loggedInUser.products is initialized as an array
    loggedInUser.products = loggedInUser.products || [];

    // Find the index of the product with the specified name in the user's products
    var productIndex = loggedInUser.products.findIndex(function(product) {
        return product.name === name;
    });

    // Check if the product with the specified name was found
    if (productIndex !== -1) {
        // Prompt the user for new values
        var newName = prompt("Enter the new name:", loggedInUser.products[productIndex].name);
        var newDescription = prompt("Enter the new description:", loggedInUser.products[productIndex].description);
        var newPrice = prompt("Enter the new price:", loggedInUser.products[productIndex].price);

        // Update the product with the new values
        loggedInUser.products[productIndex].name = newName;
        loggedInUser.products[productIndex].description = newDescription;
        loggedInUser.products[productIndex].price = newPrice;

        // Update the loggedInUser data in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // Update the allProducts data in local storage
        var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Find the entry with the same email as the provided userEmail in allProducts
        var userProducts = allProducts.find(function(products) {
            return products.email === userEmail;
        });

        // Update the product in allProducts if found
        if (userProducts) {
            var userProductIndex = userProducts.products.findIndex(function(product) {
                return product.name === name;
            });

            if (userProductIndex !== -1) {
                userProducts.products[userProductIndex] = loggedInUser.products[productIndex];
            }

            // Update the allProducts data in local storage
            localStorage.setItem("allProducts", JSON.stringify(allProducts));
        }

        console.log("Product edited:", newName);
    } else {
        console.log("Product not found:", name);
    }

    // Display the user's products
    displayUserProducts();
}
