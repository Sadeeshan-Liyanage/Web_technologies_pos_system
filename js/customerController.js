$("#addCustomer").click(function () {
    const id = $("#custId").val().trim();
    const name = $("#custName").val().trim();
    const address = $("#custAddress").val().trim();

    if (!id || !name) {
        showToast("Please fill in ID and Name", "error");
        return;
    }

    customers.push({ id, name, address });
    loadCustomers();
    loadCustomerDropdown();
    $("#custId, #custName, #custAddress").val("");
    showToast("Customer added successfully");
});



function loadCustomers() {
    const tbody = $("#customerTable");
    tbody.empty();

    if (customers.length === 0) {
        tbody.html(`<tr><td colspan="3"><div class="empty-state"><div class="empty-icon">👥</div><p>No customers yet. Add one above.</p></div></td></tr>`);
        return;
    }

    customers.forEach(c => {
        tbody.append(`
            <tr>
                <td><span class="badge badge-blue mono">${c.id}</span></td>
                <td>${c.name}</td>
                <td style="color: var(--text-secondary);">${c.address || '—'}</td>
            </tr>
        `);
    });
}

function loadCustomerDropdown() {
    $("#orderCustomer").empty().append('<option value="">Select a customer</option>');
    customers.forEach(c => {
        $("#orderCustomer").append(`<option value="${c.id}">${c.name}</option>`);
    });
}
