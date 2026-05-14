function loadFromStorage(key, fallback) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
}


function save() {
    console.log("Saving Customers: ", customers);
    localStorage.setItem('pos_customers', JSON.stringify(customers));
    localStorage.setItem('pos_items',     JSON.stringify(items));
    localStorage.setItem('pos_orders',    JSON.stringify(orders));
}

let customers = loadFromStorage('pos_customers', []);
let items     = loadFromStorage('pos_items',     []);
let orders    = loadFromStorage('pos_orders',    []);
let cart = [];



