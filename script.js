var alert = document.getElementById("alert");
var alertText = document.getElementById("alertText");

function login() {
    console.log("login works");

    // Retrieve input values
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Retrieve accounts data from local storage
    var accountsData = JSON.parse(localStorage.getItem("accountsData")) || [];

    // Check if there is an account with the provided email and password
    var loggedInAccount = accountsData.find(function(account) {
        return account.email === email && account.password === password;
    });

    if (loggedInAccount) {
        var loggedInUser = {
            username: loggedInAccount.username,
            email: loggedInAccount.email,
            address: loggedInAccount.address,
            password: "********"
        };

        // Save the logged-in user details in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        alert.style.display = "block";
        alert.style.backgroundColor = "#58F351";
        alertText.textContent = "Login Successful";

        setTimeout(function() {
            alert.style.display = "none";
            window.location.href = "homePage.html";
        }, 3000);

        window.location.href("homePage.html")

    } else {
        alert.style.display = "block";
        alert.style.backgroundColor = "#FF1C1C";
        alertText.textContent = "Invalid credentials";

        setTimeout(function() {
            alert.style.display = "none";
        }, 3000);
    }
}

function openRegistration(){
    document.getElementById('login').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
}
function registration() {
    console.log("regworks");

    // Retrieve input values
    var username = document.getElementById("registerUserName").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;
    var address = document.getElementById("registerAddress").value;

    // Check if any input is empty
    if (!username || !email || !password || !address) {
        console.log("Please fill in all fields.");
        return; // Stop the registration process if any input is empty
    }

    // Check if email is already registered
    var accountsData = JSON.parse(localStorage.getItem("accountsData")) || [];

    var isEmailRegistered = accountsData.some(function(account) {
        return account.email === email;
    });

    if (!isEmailRegistered) {
        // Create a new account object
        var newAccount = {
            username: username,
            email: email,
            password: password,
            address: address
        };

        // Update the accounts data in local storage
        accountsData.push(newAccount);
        localStorage.setItem("accountsData", JSON.stringify(accountsData));

        console.log("Registration successful. Welcome, " + username + "!");

        document.getElementById('registration').style.display = 'none';
        document.getElementById('login').style.display = 'block';

    } else {
        console.log("Email is already registered. Please use a different email.");
    }
}




