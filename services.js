function addContact() {
    if (validateForm()) {
        var name = $(".form").find('.name').val();
        var mail = $(".form").find('.email').val();
        var phone = $(".form").find('.phone').val();
        var landLine = $(".form").find('.landLine').val();
        var url = $(".form").find('.website').val();
        var address = $(".form").find('.address').val();
        var contact = {
            "Name": name,
            "Email": mail,
            "Phone": phone,
            "Landline": landLine,
            "Address": address,
            "Url": url
        };
        hideDetailsAndForm();
        if (isContactOpen) {
            fetch(fetchUrl + viewingContactId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => {
                    if (response.ok) {
                        renderContact();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {
            fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => response.json())
                .then(data => {
                    fetchAllContacts();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        fetchAllContacts();
        clearForm();
        if (isContactOpen) {
            toggleDetails();
            renderContact();
            isContactOpen = false;
        }
    }
}

function fetchAllContacts() {
    hideDetailsAndForm();
    fetch(fetchUrl).then(response => response.json()).then(data => renderAllContacts(data));
}

function deleteContact() {
    console.log(viewingContactId);
    if (viewingContactId == -1) {
        alert("Please select a contact to delete");
    } else if (confirm("Are you sure to delete contact?", "")) {
        if (viewingContactId != -1) {
            fetch(fetchUrl + viewingContactId, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        fetchAllContacts();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            $("#home").trigger("click");
        }
        hideDetailsAndForm();
    }
}