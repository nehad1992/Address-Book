// Defining the AddressBook class
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id =this.assignId();
  this.contacts.push(contact);

}
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]) {
      if (this.contacts[i].id ==id) {
       return this.contacts[i];
      }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]) {
      if (this.contacts[i].id ==id){
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}


// Defining the Contact class
function Contact(firstName, lastName, phoneNumbers, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumbers = phoneNumbers;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
}
Contact.prototype.updateFirstName = function(newFirstName) {
  return this.firstName = newFirstName;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " +this.lastName;
}


// Defining the PhoneNumber class
function PhoneNumber(number, type) {
  this.number = number;
  this.type = type;
}


// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function displayPhoneNumberDetails(contactToDisplay){
  htmlForPhoneNumbers = "";
  contactToDisplay.phoneNumbers.forEach(function(phone){
    if (phone.number) {
      htmlForPhoneNumbers += `<p>${phone.number} (${phone.type})</p>`
    }
  });
  return htmlForPhoneNumbers;
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  // To show input first name....physical add (if we dont want to delete empty labels):
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  $(".phone-numbers").html(displayPhoneNumberDetails(contact))
  
  // if (contact.firstName){
  //   $(".first-name").html(contact.firstName)
  //   $("#first-name-p").show();
  // } else {
  //   $("#first-name-p").hide();
  // } 
  // if (contact.lastName) {
  //   $(".last-name").html(contact.lastName)
  //   $("#last-name-p").show();
  // } else {
  //   $ ("#last-name-p").hide();
  // }
  // if (contact.lastName){
  //   $(".last-name").html(contact.lastName)
  //   $("#last-name-p").show();
  // }else {
  //   $("#last-name-p").hide()
  // }
  // if (contact.emailAddress) {
  //   $(".email-address").html(contact.emailAddress)
  //   $("#email-address-p").show();
  // } else {
  //   $ ("#email-address-p").hide();
  // }
  // if (contact.physicalAddress) {
  //   $(".physical-address").html(contact.physicalAddress)
  //   $("#physical-address-p").show();
  // } else {
  //   $("#physical-address-p").hide();
  // }
  // if (contact.phoneNumbers.length > 0) {
  //   $(".phone-numbers").html(displayPhoneNumberDetails(contact))
  //   $("#phone-numbers-p").show();
  // } else {
  //   $("#phone-number-p").hide();
  // }

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumberHome = $("input#new-phone-number-home").val();
    var inputtedPhoneNumberWork = $("input#new-phone-number-work").val();
    var inputtedPhoneNumberCell = $("input#new-phone-number-cell").val();
    var inputtedEmailAddress= $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number-home").val("");
    $("input#new-phone-number-work").val("");
    $("input#new-phone-number-cell").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");

    var phoneNumbersArray = [];
    if (inputtedPhoneNumberHome.length > 0) {
      var newPhoneNumberHome = new PhoneNumber(inputtedPhoneNumberHome, "Home");
      phoneNumbersArray.push(newPhoneNumberHome);
    }
    if (inputtedPhoneNumberWork.length > 0) {
      var newPhoneNumberWork = new PhoneNumber(inputtedPhoneNumberWork, "Work");
      phoneNumbersArray.push(newPhoneNumberWork);
    }
    if (inputtedPhoneNumberCell.length > 0) {
      var newPhoneNumberCell = new PhoneNumber(inputtedPhoneNumberCell, "Cell");
      phoneNumbersArray.push(newPhoneNumberCell);
    }
    var newContact = new Contact(inputtedFirstName, inputtedLastName, phoneNumbersArray, inputtedEmailAddress,inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
