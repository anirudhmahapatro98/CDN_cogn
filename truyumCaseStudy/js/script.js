var foodDatas = [
    { id: 1, name: 'Sandwich', price: 99, active: 'Yes', dateOfLaunch: '15/03/2017', category: 'Main Course', freeDelivery: 'Yes' },
    { id: 2, name: 'Burger', price: 129, active: 'Yes', dateOfLaunch: '23/12/2017', category: 'Main Course', freeDelivery: 'No' },
    { id: 3, name: 'Pizza', price: 149, active: 'Yes', dateOfLaunch: '21/08/2017', category: 'Main Course', freeDelivery: 'No' },
    { id: 4, name: 'French Fries', price: 57, active: 'No', dateOfLaunch: '02/07/2017', category: 'Starter', freeDelivery: 'Yes' },
    { id: 5, name: 'Chocolate Brownies', price: 32, active: 'Yes', dateOfLaunch: '02/11/2022', category: 'Dessert', freeDelivery: 'Yes' }
]
var customercart = [];
var cart = [];

function admin() {
    let adminContent = document.getElementById('admin-content');
    let customerContent = document.getElementById('customer-content');

    adminContent.style.display = 'block';
    customerContent.style.display = 'none';
    displayDataAdmin(foodDatas);
}

function customer() {
    let adminContent = document.getElementById('admin-content');
    let customerContent = document.getElementById('customer-content');

    adminContent.style.display = 'none';
    customerContent.style.display = 'block';
    displayDataCustomer(foodDatas);
}

const displayDataCustomer = function (foodDatas) {
    let tBody = document.getElementById('customer-table');
    tBody.innerHTML = '';

    for (let foodData of foodDatas) {

        let row = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let addToCart = document.createElement('a');

        col1.textContent = foodData.name;
        row.appendChild(col1);

        col2.textContent = foodData.freeDelivery;
        row.appendChild(col2);

        col3.textContent = foodData.price;
        row.appendChild(col3);

        col4.textContent = foodData.category;
        row.appendChild(col4);

        addToCart.href = "menu-item-list-customer-notification.html";
        addToCart.onclick = function () {
            if(window.localStorage.getItem('customerCart')!=null)
            cart = JSON.parse(window.localStorage.getItem('customerCart'));
            cart.push(foodData);
            window.localStorage.setItem('customerCart', JSON.stringify(cart));
        }
        addToCart.textContent = "Add to Cart";
        // addToCart.classList.add('mdl-button','mdl-js-button');

        col5.appendChild(addToCart);
        row.appendChild(col5);
        tBody.appendChild(row);

    }
}

const displayDataAdmin = function (foodDatas) {
    let tBody = document.getElementById('tBodyAdmin');
    tBody.innerHTML = '';

    for (let foodData of foodDatas) {

        let row = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let col6 = document.createElement('td');
        let col7 = document.createElement('td');
        let edit = document.createElement('a');

        col1.textContent = foodData.name;
        row.appendChild(col1);

        col2.textContent = foodData.price;
        row.appendChild(col2);

        col3.textContent = foodData.active;
        row.appendChild(col3);

        col4.textContent = foodData.dateOfLaunch;
        row.appendChild(col4);

        col5.textContent = foodData.category;
        row.appendChild(col5);

        col6.textContent = foodData.freeDelivery;
        row.appendChild(col6);

        edit.href = "edit-menu-item.html";
        edit.onclick = function () {
            editData(foodData);
        }
        edit.textContent = "Edit";
        // edit.classList.add('mdl-button','mdl-js-button');

        col7.appendChild(edit);
        row.appendChild(col7);
        tBody.appendChild(row);
    }
}

const cartDisplay =  function(cart){
    let tBody = document.getElementById('cart-table');
    let isCartEmpty = true;
    cart.forEach(function(item){
        if(item!=undefined){
        let dataRow = tBody.insertRow();

        let nameRowCell = dataRow.insertCell();
		let freeDeliveryRowCell = dataRow.insertCell();
        let priceRowCell = dataRow.insertCell();
		let actionCell = document.createElement('td');
        let deleteItem = document.createElement('a');

       nameRowCell.innerText = item.name;
	   
	   freeDeliveryRowCell.innerText = item.freeDelivery;
	   
        priceRowCell.innerText = item.price;
        

        deleteItem.href = "cart-notification.html";
        deleteItem.onclick = function () {
            delete cart[cart.indexOf(item)];
            window.localStorage.setItem('customerCart', JSON.stringify(cart));
        }
        deleteItem.textContent = "Delete";

        actionCell.appendChild(deleteItem);
        dataRow.appendChild(actionCell);
        tBody.appendChild(dataRow);
        isCartEmpty = false;
    }
    })
    if(isCartEmpty){
        window.location.href = "cart-empty.html";
    }
}

window.onload = function (e) {
    let page = document.getElementById("page").value
    if(page=='admin'){
    adminDataDisplay(foodDatas);
}
    else if(page=='customer'|| page=="customer-notification")
    customerDataDisplay(foodDatas);
    else if(page=='cart'|| page == 'cart-notification'){
        cart = JSON.parse(window.localStorage.getItem('customerCart'))
        cartDisplay(cart)
    }
}

function getCart(){
    cart = JSON.parse(window.localStorage.getItem('customerCart'));
    if(cart!=null){
        window.location.href = "cart.html"
    }
    else{
        window.location.href = "cart-empty.html"
    }
}

function editData(foodData) {
    let adminContent = document.getElementById('admin-content');
    let editForm = document.getElementById('admin-edit-form');
    adminContent.style.display = 'none';
    editForm.style.display = 'block';
}

if (document.getElementById('page').value == 'customer') {
    displayDataCustomer(foodDatas);
} else if (document.getElementById('page') == 'admin') {
    displayDataAdmin(foodDatas);
} else {
    console.log("not customer / admin page");
}
