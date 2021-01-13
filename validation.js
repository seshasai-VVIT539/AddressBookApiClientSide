var mailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$");
var phonePattern = /^\d{10}$/;
var landLinePattern = /^\d{8,12}$/;
var urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function validateForm() {
  valid = validateName();
  valid = validateEmail() && valid;
  valid = validatePhone() && valid;
  valid = validateLandLine() && valid;
  valid = validateUrl() && valid;
  return valid;
}

function validateName() {
  var name = $(".form").find('.name').val();
  if (name.length == 0) {
    document.getElementById('nameError').innerHTML = "&nbsp;Name is required";
    return false;
  } else {
    return true;
  }
}

function validateEmail() {
  var mail = $(".form").find('.email').val();

  if (mail.length == 0) {
    document.getElementById('mailError').innerHTML = '&nbsp;Email is required';
    return false;
  } else if (mailPattern.test(mail)) {
    return true;
  } else {
    document.getElementById('mailError').innerHTML = "&nbsp;Incorrect mail id";
    return false;
  }
}

function validatePhone() {
  var phone = $(".form").find('.phone').val();

  if (phone.length == 0) {
    document.getElementById('phoneError').innerHTML = '&nbsp;Phone number is required';
    return false;
  } else if (phonePattern.test(phone)) {
    return true;
  } else {
    document.getElementById('phoneError').innerHTML = '&nbsp;Please enter valid phone number';
    return false;
  }
}

function validateLandLine() {
  var landLine = $(".form").find('.landLine').val();
  if (landLine.length == 0) {
    return true;
  } else if (landLinePattern.test(landLine)) {
    return true;
  } else {
    document.getElementById('landLineError').innerHTML = '&nbsp;Please enter valid landline number';
    return false;
  }
}

function validateUrl() {
  var url = $(".form").find('.website').val();

  if (url.length == 0) {
    document.getElementById('websiteError').innerHTML = '&nbsp;Website address is required';
    return false;
  } else if (urlPattern.test(url)) {
    return true;
  } else {
    document.getElementById('websiteError').innerHTML = 'Please enter valid url';
    return false;
  }
}
