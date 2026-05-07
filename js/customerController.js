let editingCustId = null;

$("#addCustomer").click(function () {
    const id      = $("#custId").val().trim();
    const name    = $("#custName").val().trim();
    const address = $("#custAddress").val().trim();

    if (!name) { showToast("Name is required", "error"); return; }

    if (editingCustId) {
        const idx = customers.findIndex(x => x.id === editingCustId);
        customers[idx] = { id: editingCustId, name, address };
        showToast("Customer updated!");
        resetCustForm();
    } else {
        if (!id) { showToast("ID is required", "error"); return; }
        if (customers.find(x => x.id === id)) {
            showToast("Customer ID already exists", "error"); return;
        }
        customers.push({ id, name, address });
        showToast("Customer added!");
    }


    save();
    loadCustomers();
    loadCustomerDropdown();
    $("#custId, #custName, #custAddress").val("");
});

function resetCustForm() {
    editingCustId = null;
    $("#custId").prop("disabled", false);
    $("#addCustomer").text("+ Add Customer")
        .removeClass("btn-warning").addClass("btn-primary");
}

function loadCustomers() {
    const tbody = $("#customerTable");
    tbody.empty();

    if (customers.length === 0) {
        tbody.html(`<tr><td colspan="4"><div class="empty-state">
            <div class="empty-icon">👥</div>
            <p>No customers yet. Add one above.</p>
        </div></td></tr>`);
        return;
    }

    customers.forEach(c => {
        tbody.append(`
            <tr>
                <td><span class="badge badge-blue mono">${c.id}</span></td>
                <td>${c.name}</td>
                <td style="color:var(--text-secondary);">${c.address || "—"}</td>
                <td>
                    <button class="btn btn-warning edit-cust" data-id="${c.id}"
                        style="padding:5px 12px; font-size:12px;">✎ Edit</button>
                    <button class="btn btn-danger delete-cust" data-id="${c.id}"
                        style="padding:5px 12px; font-size:12px; margin-left:6px;">🗑 Delete</button>
                </td>
            </tr>
        `);
    });
}

$(document).on("click", ".edit-cust", function () {
    const id = $(this).data("id");
    const c  = customers.find(x => x.id === id);

    $("#custId").val(c.id).prop("disabled", true);
    $("#custName").val(c.name);
    $("#custAddress").val(c.address);

    editingCustId = id;
    $("#addCustomer").text("💾 Save Changes")
        .removeClass("btn-primary").addClass("btn-warning");

    $("#custId")[0].scrollIntoView({ behavior: "smooth", block: "center" });
});


$(document).on("click", ".delete-cust", function () {
    const id = $(this).data("id");
    const c  = customers.find(x => x.id === id);

    if (!confirm(`"${c.name}" is this delete`)) return;

    customers = customers.filter(x => x.id !== id);
    save();
    loadCustomers();
    loadCustomerDropdown();
    showToast("Customer deleted!", "warn");
});


function loadCustomerDropdown() {
    $("#orderCustomer").empty().append('<option value="">Select a customer</option>');
    customers.forEach(c => {
        $("#orderCustomer").append(`<option value="${c.id}">${c.name}</option>`);
    });
}