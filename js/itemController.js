let editingItemCode = null;

$("#addItem").click(function () {
    const code  = $("#itemCode").val().trim();
    const name  = $("#itemName").val().trim();
    const price = parseFloat($("#itemPrice").val());
    const qty   = parseInt($("#itemQty").val());

    if (!name || isNaN(price) || isNaN(qty)) {
        showToast("Please fill all fields", "error"); return;
    }

    if (editingItemCode) {
        const idx = items.findIndex(x => x.code === editingItemCode);
        items[idx] = { code: editingItemCode, name, price, qty };
        showToast("Item updated!");
        resetItemForm();
    } else {
        if (!code) { showToast("Item code is required", "error"); return; }
        if (items.find(x => x.code === code)) {
            showToast("Item code already exists", "error"); return;
        }
        items.push({ code, name, price, qty });
        showToast("Item added!");
    }

    save();
    loadItems();
    loadItemDropdown();
    $("#itemCode, #itemName, #itemPrice, #itemQty").val("");
});

function resetItemForm() {
    editingItemCode = null;
    $("#itemCode").prop("disabled", false);
    $("#addItem").text("+ Add Item")
        .removeClass("btn-warning").addClass("btn-success");
}

function loadItems() {
    const tbody = $("#itemTable");
    tbody.empty();


    if (items.length === 0) {
        tbody.html(`<tr><td colspan="5"><div class="empty-state">
            <div class="empty-icon">📦</div>
            <p>No items yet. Add one above.</p>
        </div></td></tr>`);
        return;
    }

    items.forEach(i => {
        tbody.append(`
            <tr>
                <td><span class="badge badge-teal mono">${i.code}</span></td>
                <td>${i.name}</td>
                <td style="font-family:'JetBrains Mono',monospace; font-size:13px;">Rs. ${i.price.toFixed(2)}</td>
                <td><span class="badge badge-green">${i.qty}</span></td>
                <td>
                    <button class="btn btn-warning edit-item" data-code="${i.code}"
                        style="padding:5px 12px; font-size:12px;">✎ Edit</button>
                    <button class="btn btn-danger delete-item" data-code="${i.code}"
                        style="padding:5px 12px; font-size:12px; margin-left:6px;">🗑 Delete</button>
                </td>
            </tr>
        `);
    });
}

$(document).on("click", ".edit-item", function () {
    const code = $(this).data("code");
    const i    = items.find(x => x.code === code);

    $("#itemCode").val(i.code).prop("disabled", true);
    $("#itemName").val(i.name);
    $("#itemPrice").val(i.price);
    $("#itemQty").val(i.qty);

    editingItemCode = code;
    $("#addItem").text("💾 Save Changes")
        .removeClass("btn-success").addClass("btn-warning");

    $("#itemCode")[0].scrollIntoView({ behavior: "smooth", block: "center" });
});

$(document).on("click", ".delete-item", function () {
    const code = $(this).data("code");
    const i    = items.find(x => x.code === code);

    if (!confirm(`"${i.name}" is this delete`)) return;

    items = items.filter(x => x.code !== code);
    save();
    loadItems();
    loadItemDropdown();
    showToast("Item deleted!", "warn");
});

function loadItemDropdown() {
    $("#orderItem").empty().append('<option value="">Select an item</option>');
    items.forEach(i => {
        $("#orderItem").append(
            `<option value="${i.name}">${i.name} — Rs. ${i.price.toFixed(2)}</option>`
        );
    });
}


