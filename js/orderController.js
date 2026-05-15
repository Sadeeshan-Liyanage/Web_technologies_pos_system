$("#addToCart").click(function () {
    const itemName = $("#orderItem").val();
    const qty = parseInt($("#orderQty").val());

    if (!itemName || isNaN(qty) || qty <= 0) {
        showToast("Please select an item and enter a valid quantity", "warn");
        return;
    }

    const item = items.find(i => i.name === itemName);
    if (!item) {
        showToast("Item not found", "error");
        return;
    }

    if (qty > item.qty) {
        showToast(`Only ${item.qty} units available`, "warn");
        return;
    }

    const total = item.price * qty;
    cart.push({ name: item.name, qty, total });

    loadCart();
    $("#orderQty").val("");
    showToast(`${item.name} added to cart`);
});




function loadCart() {
    const tbody = $("#cartTable");
    tbody.empty();

    if (cart.length === 0) {
        tbody.html(`<tr><td colspan="3"><div class="empty-state"><div class="empty-icon">🛒</div><p>Cart is empty</p></div></td></tr>`);
        $("#total").text("0.00");
        return;
    }

    let grandTotal = 0;
    cart.forEach(c => {
        grandTotal += c.total;
        tbody.append(`
            <tr>
                <td>${c.name}</td>
                <td><span class="badge badge-blue">${c.qty}</span></td>
                <td style="font-family:'JetBrains Mono',monospace; font-size:13px;">Rs. ${c.total.toFixed(2)}</td>
            </tr>
        `);
    });

    $("#total").text(grandTotal.toFixed(2));
}


$("#placeOrder").click(function () {
    if (cart.length === 0) {
        showToast("Cart is empty", "warn");
        return;
    }

    const customer = $("#orderCustomer").val();
    if (!customer) {
        showToast("Please select a customer", "warn");
        return;
    }


    cart.forEach(cartItem => {
        const mainItem = items.find(i => i.name === cartItem.name);

        if (mainItem) {
            mainItem.qty -= cartItem.qty;
        }
    });

    const order = {
        id: "O" + String(orders.length + 1).padStart(3, "0"),
        customer,
        items: [...cart],
        total: parseFloat($("#total").text())
    };

    orders.push(order);


    save();



    if (typeof loadItems === "function") {
        loadItems();
    }

    showToast(`Order ${order.id} placed successfully! 🎉`);

    cart = [];
    loadCart();
    $("#orderCustomer, #orderItem").val("").trigger("change");
});


