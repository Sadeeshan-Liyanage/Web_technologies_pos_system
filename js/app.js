// ==================login =======================================
$("#loginBtn").click(function () {
    if ($("#username").val() === "admin" && $("#password").val() === "1234") {
        $("#loginPage").fadeOut(300, function () {
            $("#dashboard").fadeIn(300);
            initApp();
        });
    } else {
        showToast("Invalid username or password", "error");
    }
});

$("#password").on("keypress", function(e) {
    if (e.which === 13) $("#loginBtn").click();
});




$("#logoutBtn").click(function () {
    $("#dashboard").fadeOut(300, function () {
        $("#loginPage").fadeIn(300);
        $("#username, #password").val("");
    });
});


function switchSection(section) {
    $("#customerSection, #itemSection, #orderSection").hide();
    $(".nav-item").removeClass("active");
    $("#" + section + "Section").show();
    $("#" + section + "Nav").addClass("active");
}


$("#customerNav").click(() => switchSection("customer"));
$("#itemNav").click(() => switchSection("item"));
$("#orderNav").click(() => switchSection("order"));

function initApp() {
    loadCustomers();
    loadCustomerDropdown();
    loadItems();
    loadItemDropdown();
}


$(document).ready(function() {
    loadCustomers();
    loadItems();
    loadCustomerDropdown();
    loadItemDropdown();

});


