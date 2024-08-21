"use strict";

let formCheck = true;
let addContact = document.getElementById("addcontact"); // a button to show the add contact pop-up
let addForm = addBlock(formCheck);
let form_parent = document.createElement("section");
form_parent.classList.toggle("form_parent");
form_parent.appendChild(addForm);
document.body.appendChild(form_parent);
form_parent.style.display = "none";
let infoDocument_parent = document.createElement("section");
infoDocument_parent.style.width = "100%"
infoDocument_parent.style.minHeight = "100vh"

infoDocument_parent.classList.toggle("infoParent");

infoDocument_parent.style.display = 'none';
let removeAllBtn = document.getElementById("removeAll"); // the remove all button
let animateTrickBt = document.getElementById("animateBtn");
let animateTrickSt = document.createElement("section");
let animateTrickSt2 = document.createElement("section");
let check_animation = true;
document.body.append(animateTrickSt);
document.body.append(animateTrickSt2);
let search = document.getElementById("searchIn") // the search input
search.type = "text";
search.onchange = (el)=>{
    el.preventDefault()
    searchContacts(el.target.value);
};

let infoCheck = true;
document.body.append(infoDocument_parent);
var header_section = document.getElementById("head_section");
var show_btns_btn = document.getElementById("hamburger");
let check_btns_menu = true
let infoDocument = document.createElement("section");
infoDocument_parent.appendChild(infoDocument)

infoDocument.classList.toggle("infoDocs");
infoDocument.style.display = 'flex';
show_btns_btn.addEventListener("click", ()=>{
    if(check_btns_menu){
        header_section.style.display="flex";
        check_btns_menu = false
    }else{
        header_section.style.display="none";
        check_btns_menu = true;
    }

});

showUsers(); // we'll have to make sure to show the the current list once we enter the site

/**
 * a function that requires a user and creates a popup of his informaion
 * @param {HTMLElement} user - the user information
 * 
 */
function showInfo(user){
  
    if(infoCheck){
        
        let exitBtn = document.createElement("Button");
        exitBtn.classList.toggle("exist_btn");
        exitBtn.addEventListener("click",()=>{

            infoCheck = true;
            infoDocument_parent.style.display = 'none';

        })
        
        infoDocument_parent.style.display = 'flex';
        infoDocument.innerHTML = "";// deleting everything in the element to enter new informaion
        // make sure to gather all of the user's attributes
        let namePlc = document.createElement('p');
        namePlc.innerText = "Name: " + user.name
        let phoneNumber = document.createElement('p');
        phoneNumber.innerText = "phone number: " + user.phoneNumber
        let address = document.createElement('p');
        address.innerText = "Address: " + user.address
        let email = document.createElement('p');
        email.innerText = "Email: " + user.email
        let about = document.createElement('p');
        about.innerText = "About: " + user.about
        infoDocument.append(exitBtn, namePlc, phoneNumber, address, email, about);

        infoCheck = false
    }else{
        // when clicking an information button again the element disappears
        infoCheck = true;
        infoDocument_parent.style.display = 'none';
        
    }

}

/* 
    a function that removes all the contacts from the list
*/
removeAllBtn.addEventListener("click", (el)=>{
    
    el.preventDefault()
    contacts = [];
    contactsSave = [];
    showUsers();
})

function removeContact(contact){
    // a function that requires a contact and is responisble for deleting him from the contacts list
    contacts = contacts.filter((user)=>{

        return contact.name !== user.name || contact.phoneNumber !== user.phoneNumber;

    })
    // we have to delete it from the original list and the save list
    contactsSave = contacts.filter((user)=>{

        return contact.name !== user.name || contact.phoneNumber !== user.phoneNumber;

    })

    // in order for us to see the change in the contacts list we have to reload the contacts
    showUsers();

}

addContact.addEventListener("click", (el)=>{
    // a function that turns the add popup on and off
    el.preventDefault();
    clearForm(addForm);
    showAdd(el, form_parent);
    contactEdit = {name:"", phoneNumber: ""
        , address: "", email: "", about: "", img: ""};
});

restore.addEventListener("click", ()=>{
    // a function taht restore the original list of contacts
    contacts = restoreContacts.filter(()=>{
        return true
    });
    contactsSave = restoreContacts.filter(()=>{
        return true
    });
    showUsers() // reload the contancts list after the restore to show the current list

})


function searchContacts(el){
    // a function that requires a string and searches the contacts for name that has this string
    contacts = contactsSave.filter((contact)=>{

        return contact.name.indexOf(el) != -1;

    })
    showUsers() // we have to make sure to reload the contacts list after the search
    contacts = contactsSave.filter(()=> true);
}

animateTrickBt.addEventListener("click", ()=>{
    animateTrickSt.classList.toggle("animateTrickSt");
    animateTrickSt.innerHTML = "<p>Sanad</p>";
    
    animateTrickSt2.classList.toggle("animateTrickSt2");
    animateTrickSt2.innerHTML = "<p>Bahaa</p>";
    if(check_animation){
        animateTrickSt.style.display = "flex";
        animateTrickSt2.style.display = "flex";
        check_animation = false
    }else{
        animateTrickSt.style.display = "none";
        animateTrickSt2.style.display = "none";
        check_animation = true;
    }

})

