$("#addItem").click(function () {
    const code = $("#itemCode").val().trim();
    const name = $("#itemName").val().trim();
    const price = parseFloat($("#itemPrice").val());
    const qty = parseInt($("#itemQty").val());

    if (!code || !name || isNaN(price) || isNaN(qty)) {
        showToast("Please fill in all item fields", "error");
        return;
    }

    items.push({ code, name, price, qty });
    loadItems();
    loadItemDropdown();
    $("#itemCode, #itemName, #itemPrice, #itemQty").val("");
    showToast("Item added successfully");
});

function loadItems() {
    const tbody = $("#itemTable");
    tbody.empty();

    if (items.length === 0) {
        tbody.html(`<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">📦</div><p>No items yet. Add one above.</p></div></td></tr>`);
        return;
    }

    items.forEach(i => {
        tbody.append(`
            <tr>
                <td><span class="badge badge-teal mono">${i.code}</span></td>
                <td>${i.name}</td>
                <td style="font-family:'JetBrains Mono',monospace; font-size:13px;">Rs. ${i.price.toFixed(2)}</td>
                <td><span class="badge badge-green">${i.qty}</span></td>
            </tr>
        `);
    });
}

function loadItemDropdown() {
    $("#orderItem").empty().append('<option value="">Select an item</option>');
    items.forEach(i => {
        $("#orderItem").append(`<option value="${i.name}">${i.name} — Rs. ${i.price.toFixed(2)}</option>`);
    });
}
