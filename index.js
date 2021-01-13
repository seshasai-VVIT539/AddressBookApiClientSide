var contacts = new Array();
var viewingContactId = -1;
var isContactOpen = false;
var viewingContactIndex = -1;
var fetchUrl = 'https://localhost:44325/api/contacts/';

function clearForm() {
    $(".form").find('.name').val("");
    $(".form").find('.email').val("");
    $(".form").find('.phone').val("");
    $(".form").find('.landLine').val("");
    $(".form").find('.website').val("");
    $(".form").find('.address').val("");
}

function renderAllContacts(contactsList) {
    contacts = contactsList;
    if (!isContactOpen) {
        viewingContactIndex = -1;
        viewingContactId = -1;
        isContactOpen = false;
    }
    var counter;
    $(".contacts").html("");
    for (counter = 0; counter < contacts.length; counter += 1) {
        var newContact = "<div class='contact' id='" + counter + "'>" + contacts[counter]["Name"] + "</div>";
        $(".contacts").append(newContact);
    }
}

$(document).ready(function() {
    function init() {
        hideDetailsAndForm();
        fetchAllContacts();
    }

    $("#home").click(function() {
        hideDetailsAndForm();
        fetchAllContacts();
        viewingContactId = -1
        isContactOpen = false;
        click = -1;
    });

    $("#add").click(function() {
        if (viewingContactIndex != -1) {
            var allContacts = document.getElementsByClassName("contact");
            allContacts[viewingContactIndex].classList.remove("present");
        }
        if (isContactOpen) {
            alert("contact not updated");
        }
        clearForm();
        viewingContactId = -1;
        viewingContactIndex = -1;
        isContactOpen = false;
        hideDetailsAndForm();
        toggleForm();
    });

    $(document).on('click', ".contact", function() {
        var allContacts = document.getElementsByClassName("contact");
        hideDetailsAndForm();
        toggleDetails();
        if (viewingContactIndex != -1) {
            allContacts[viewingContactIndex].classList.remove("present");
        }
        if (isContactOpen) {
            alert("contact not updated");
            isContactOpen = false;
        }
        viewingContactIndex = parseInt($(this).attr("id"));
        viewingContactId = contacts[viewingContactIndex]["ID"];
        allContacts[viewingContactIndex].classList.add("present");
        renderContact();
    });

    init();
});

function showEditForm() {
    isContactOpen = true;
    hideDetailsAndForm();
    toggleForm();
    $(".form").find(".name").val(contacts[viewingContactIndex]["Name"]);
    $(".form").find('.email').val(contacts[viewingContactIndex]["Email"]);
    $(".form").find('.phone').val(contacts[viewingContactIndex]["Phone"]);
    $(".form").find('.landLine').val(contacts[viewingContactIndex]["Landline"]);
    $(".form").find('.website').val(contacts[viewingContactIndex]["Url"]);
    $(".form").find('.address').val(contacts[viewingContactIndex]["Address"]);
}

function cancelAction() {
    if (isContactOpen) {
        hideDetailsAndForm();
        toggleDetails();
        renderContact();
        clearForm();
        isContactOpen = false;
    } else {
        hideDetailsAndForm();
    }
}

function renderContact() {
    if (viewingContactIndex != -1) {
        var temp;
        $(".contact-details").find(".name").text(contacts[viewingContactIndex]["Name"]);
        $(".contact-details").find(".email").text(contacts[viewingContactIndex]["Email"]);
        $(".contact-details").find(".phone").text(contacts[viewingContactIndex]["Phone"]);
        $(".contact-details").find(".landLine").text(contacts[viewingContactIndex]["Landline"]);
        $(".contact-details").find(".website").text(contacts[viewingContactIndex]["Url"]);
        temp = contacts[viewingContactIndex]["Address"];
        temp = temp.replace("\n", "<br>");
        $(".contact-details").find(".address").html(temp);
    }
}

function hideDetailsAndForm() {
    $(".form-container").css("visibility", "hidden");
    $(".contact-details").css("visibility", "hidden");
}

function toggleDetails() {
    $(".contact-details").css("visibility", "visible");
    $(".form-container").css("position", "absolute").css("margin-left", "20%").css("visibility", "hidden");
}

function toggleForm() {
    $(".form-container").css("visibility", "visible");
    $(".contact-details").css("position", "absolute").css("margin-left", "20%").css("visibility", "hidden");
}