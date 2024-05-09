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

// The following code should be inside an appropriate place in your homePage.html file
var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
document.getElementById("displayUsername").innerText = loggedInUser.username || "Not available";
document.getElementById("displayEmail").innerText = loggedInUser.email || "Not available";
document.getElementById("displayAddress").innerText = loggedInUser.address || "Not available";

function editUserInfo() {
    document.getElementById("editUserInfoForm").style.display = "block";
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("editBtn").style.display = "none";
}


function cancelEditBtn(){
    document.getElementById("editUserInfoForm").style.display = "none";
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("editBtn").style.display = "block";
}

function saveUserInfo() {
    cancelEditBtn();   
    // Retrieve values from the edit form
    var newUsername = document.getElementById("editUsername").value;
    var newEmail = document.getElementById("editEmail").value;
    var newAddress = document.getElementById("editAddress").value;
    var newPassword = document.getElementById("editPassword").value;

    // Retrieve the logged-in user's email
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    var userEmail = loggedInUser.email;

    // Retrieve the accounts data from local storage
    var accountsData = JSON.parse(localStorage.getItem("accountsData")) || [];

    // Find the index of the user account in accountsData
    var userIndex = accountsData.findIndex(function(account) {
        return account.email === userEmail;
    });

    if (userIndex !== -1) {
        // Update the user account information
        accountsData[userIndex].username = newUsername;
        accountsData[userIndex].email = newEmail;
        accountsData[userIndex].address = newAddress;
        accountsData[userIndex].password = newPassword;

        // Save the updated accountsData in local storage
        localStorage.setItem("accountsData", JSON.stringify(accountsData));

        // Update the loggedInUser information
        loggedInUser.username = newUsername;
        loggedInUser.email = newEmail;
        loggedInUser.address = newAddress;
        loggedInUser.password = "********"; // Consider updating this based on your security considerations

        // Save the updated loggedInUser in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        document.getElementById("displayUsername").innerText = newUsername || "Not available";
        document.getElementById("displayEmail").innerText = newEmail || "Not available";
        document.getElementById("displayAddress").innerText = newAddress || "Not available";


        // Additional actions if needed
    } else {
        console.log("User not found in accountsData.");
    }
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function deleteAccount() {
    // Retrieve the logged-in user's email
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    var userEmail = loggedInUser.email;

    // Retrieve the accounts data from local storage
    var accountsData = JSON.parse(localStorage.getItem("accountsData")) || [];

    // Find the index of the user account in accountsData
    var userIndex = accountsData.findIndex(function(account) {
        return account.email === userEmail;
    });

    if (userIndex !== -1) {
        // Remove the user account from accountsData
        accountsData.splice(userIndex, 1);

        // Save the updated accountsData in local storage
        localStorage.setItem("accountsData", JSON.stringify(accountsData));

        // Clear the loggedInUser from local storage
        localStorage.removeItem("loggedInUser");

        // You may also want to perform additional actions, such as redirecting to the login page
        window.location.href = "index.html";
    } else {
        console.log("User not found in accountsData.");
    }
}

















function postProduct(){
    var name = document.getElementById("productName").value;
    var description = document.getElementById("productDescription").value;
    var price = document.getElementById("productPrice").value;
    var image = document.getElementById("productImage").value;
    

    console.log(name, description, price)

    console.log("list")
}