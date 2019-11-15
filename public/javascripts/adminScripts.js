let customersButton = document.getElementsByClassName('customers');
let paidCustomers = document.getElementById('paid-customers');
let noPaidCustomers = document.getElementById('no-paid-customers');
let customersElement = document.getElementsByClassName('customer-element');
let customersElementLink = document.getElementsByClassName('customer-element-link');

customersButton[0].onclick = function () {
    if(paidCustomers.classList.contains('invisibility')) {
        customersElementLink[0].className += (' active-menu-link');
        customersElementLink[1].className += (' active-menu-link');
        customersElement[0].className += " active";
        paidCustomers.classList.remove('invisibility');
        noPaidCustomers.classList.remove('invisibility');
    } else {
        customersElementLink[0].classList.remove('active-menu-link');
        customersElementLink[1].classList.remove('active-menu-link');
        customersElement[0].classList.remove('active');
        paidCustomers.className += " invisibility";
        noPaidCustomers.className += " invisibility";
    }
};


let wallOfFameButton = document.getElementsByClassName('wall-of-fame-menu');
let addUsers = document.getElementById('wall-add-users');
let changeUsers = document.getElementById('wall-change-users');
let wallElement = document.getElementsByClassName('wall-element');
let wallElementLink = document.getElementsByClassName('wall-element-link');

wallOfFameButton[0].onclick = function () {
    if(addUsers.classList.contains('invisibility')) {
        wallElementLink[0].className += (' active-menu-link');
        wallElementLink[1].className += (' active-menu-link');
        wallElement[0].className += " active";
        addUsers.classList.remove('invisibility');
        changeUsers.classList.remove('invisibility');
    } else {
        wallElementLink[0].classList.remove('active-menu-link');
        wallElementLink[1].classList.remove('active-menu-link');
        wallElement[0].classList.remove('active');
        addUsers.className += " invisibility";
        changeUsers.className += " invisibility";
    }
};