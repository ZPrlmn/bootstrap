document.addEventListener("DOMContentLoaded", function () {
    // Display user sales on page load
    displayUserSales();
});

function displayUserSales() {
    // Retrieve buyItems data from local storage
    var buyItems = JSON.parse(localStorage.getItem("buyItems")) || [];

    // Retrieve loggedInUser data from local storage
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    // Get the userSalesList container element
    var userSalesListContainer = document.getElementById("userSalesList");

    // Check if the userSalesListContainer is not null before accessing its properties
    if (userSalesListContainer) {
        // Clear previous content
        userSalesListContainer.innerHTML = "";

        // Filter buyItems for the specific logged-in user
        var userSales = buyItems.filter(function (item) {
            return item.emailSeller === loggedInUser.email;
        });

        // Create a section for the user's sales
        var userSalesSection = document.createElement("div");
        userSalesSection.className = "user-sales";

        // Display the logged-in user's email in the console
        console.log("Logged-In User Email:", loggedInUser.email);

        // Display emails from buyItems in the console
        var salesEmails = userSales.map(function (sale) {
            return sale.emailSeller;
        });

        console.log("Emails in User Sales:", salesEmails);

        // Create a heading for the user's email
        var userEmailHeading = document.createElement("h2");
        userEmailHeading.textContent = "User Email: " + loggedInUser.email;

        // Check if the user has any sales
        if (userSales.length > 0) {
            userSales.forEach(function (sale, index) {
                // Create a paragraph for the product details
                var productDetailsParagraph = document.createElement("p");
                productDetailsParagraph.innerHTML =
                    "Product Name: " + sale.product.name +
                    ", Description: " + sale.product.description +
                    ", Price: $" + sale.product.price + ".00" +
                    ", Quantity: " + sale.quantity +
                    ", Total: $" + (sale.product.price * sale.quantity).toFixed(2);

                // Append elements to the userSalesSection
                userSalesSection.appendChild(productDetailsParagraph);
            });
        } else {
            // Display a message if there are no sales for the user
            var noSalesMessage = document.createElement("p");
            noSalesMessage.textContent = "No sales for the user: " + loggedInUser.email;
            userSalesSection.appendChild(noSalesMessage);
        }

        // Append the heading and user sales section to the userSalesListContainer
        userSalesListContainer.appendChild(userEmailHeading);
        userSalesListContainer.appendChild(userSalesSection);
    }
}
