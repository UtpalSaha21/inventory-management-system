// Load products from LocalStorage when page loads
document.addEventListener("DOMContentLoaded", loadProducts);

// Function to add a product
function addProduct() {
    let name = document.getElementById("productName").value;
    let quantity = document.getElementById("productQuantity").value;
    let price = document.getElementById("productPrice").value;

    if (name === "" || quantity === "" || price === "") {
        alert("Please fill all fields!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({ name, quantity, price });
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();
    clearForm();
}

// Function to load products from LocalStorage
function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach((product, index) => {
        let row = `
            <tr>
                <td>${product.name}</td>
                <td><input type="number" value="${product.quantity}" onchange="updateProduct(${index}, this.value, 'quantity')"></td>
                <td><input type="number" value="${product.price}" onchange="updateProduct(${index}, this.value, 'price')"></td>
                <td><button class="delete-btn" onclick="deleteProduct(${index})">Delete</button></td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Function to update product quantity or price
function updateProduct(index, value, field) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products[index][field] = value;
    localStorage.setItem("products", JSON.stringify(products));
}

// Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

// Function to clear input fields
function clearForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productPrice").value = "";
}