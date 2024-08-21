"use strict";

function editUser(){
    //a function that requires the form responsible for adding contacts and the form observation chech
    // and edits the user's informaion
    contactsSave.forEach((con)=>{

        if(con.name == contactEdit.name && con.phoneNumber == contactEdit.phoneNumber || addForm.childNodes[2].name == con.name + con.phoneNumber){
            // the system is allowd to change the informaion for only one specific user
            con.name = contactEdit.name;
            con.email = contactEdit.email;
            con.phoneNumber = contactEdit.phoneNumber;
            con.address = contactEdit.address;
            con.img = contactEdit.img;
            con.about = contactEdit.about;

        }

    });
    // the contacts saving list should change too we dont want to see the previous information again
    contactsSave = contacts.filter(()=>{

        return true;

    })
    showUsers(); // make sure to reload the information
    showUsers()
}

/*

    * a function that requires a user, form and a form observation check and creates a new user

    * @param {object} user the required user info to add to the array

    *@returns {HtmlElement}

    * @example
    * let user = {name: "sara", phoneNumber: "0549365459", 
                    address:"somewhere", email: "uu@gmail.com",
                    about: "its my friend", img:"images4.jpg"}
    * createUser(user)
 */
/**
 * 
 * @param {Object} user - the required user info to add to the array
 * @returns {section} - a section to carry the users information
 * 
 */

function createUser(user){
    
    let section = document.createElement("section"); // the section that will yield the entiry of the user list
    let btnInfo = document.createElement("button"); // a button to show the information for the current user
    let editBtn = document.createElement("button"); // a button to show the add contact popup but with the values of the current user

    editBtn.classList.toggle("editBtn");
    btnInfo.classList.toggle("info_btn");

    editBtn.addEventListener("click", (el)=>{
        // a function that shows the add user popup but this time filled with the current user information
        el.preventDefault()
        form_parent.style.display = 'flex';
        formCheck = false;
        let i = 0;
        addForm.childNodes.forEach(el=>{
            // saving the current users information in a different list to edit it
            if(el.type === 'text'){
                el.name = user['name'] + user['phoneNumber']
                el.value = Object.values(user)[i]
                contactEdit[Object.entries(user)[i][0]] = Object.values(user)[i]
                i++;
            }
            if(el.type === 'file')
                contactEdit[Object.entries(user)[i][0]] = Object.values(user)[i]

        })
        
    });

    btnInfo.addEventListener("click", ()=>{
        // a function that calles the showinfo function in order to show the current user information list
        showInfo(user);

    });
    
    let propsSeciton = document.createElement("section")
    let removeCurrent = document.createElement("button");
    removeCurrent.classList.toggle("remove_btn");
    removeCurrent.addEventListener("click", ()=>{

        removeContact(user, contactsSave);

    })
    section.addEventListener("mouseover", ()=>{
        // a funciton that 
        section.classList.remove("user")
        
        section.classList.toggle("userColor");
    }, false)

    section.addEventListener("mouseout", ()=>{
        section.classList.remove("userColor")
        section.classList.toggle("user");
    }, false)

    propsSeciton.classList.toggle("propsSection");
    section.classList.toggle("user")
    let img = document.createElement("img");
    let pName = document.createElement("p");
    let phoneNumber = document.createElement("p");
    img.src = "../images/" + user.img;
    img.style.borderRadius = "4rem";
    img.style.width = "5rem";
    pName.innerText = user.name;
    phoneNumber.innerText = user.phoneNumber;
    section.append(img);
    propsSeciton.append(pName);
    propsSeciton.append(phoneNumber);
    section.append(propsSeciton);
    
    section.append(editBtn);
    section.append(btnInfo);
    section.append(removeCurrent);
    return section;
}


function addUser(){
    /*  
    a function that requires a form and a form observation check and adds a user if he doesnt exist 
    and edits him if he already exist depending on the name and phone number
    */
    let allowAdition = true; // a variable to check if the user exist or not
    
    contacts.forEach(el=>{
        if (el.name == contactEdit.name && el.phoneNumber == contactEdit.phoneNumber ||
             addForm.childNodes[2].name != "" && el.name + el.phoneNumber == addForm.childNodes[2].name)
            allowAdition = false

    })
    if (allowAdition){
        contacts.push({name:contactEdit.name, phoneNumber: contactEdit.phoneNumber
                        , address: contactEdit.address, email: contactEdit.email, about: contactEdit.about, img:contactEdit.img
        });
        contactsSave.push({name:contactEdit.name, phoneNumber: contactEdit.phoneNumber
            , address: contactEdit.address, email: contactEdit.email, about: contactEdit.about, img:contactEdit.img
});
    } else{
        editUser(addForm, formCheck); // if the user exists we have to edit him
    }
    showUsers(addForm, formCheck) // after the change to the list or to the usesr we have to reload the page
}


/**
 * a function that reqiores a form and a form ovservation check and prints the current users
 * information from a to z
 */
function showUsers(){
    
    let contactsSec = document.getElementById("contactsSec");
    let emptyzone = document.getElementById("emptyCon");
    contactsSec.innerHTML = "";
    contacts.sort((a, b) => {
        
        const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1; // a comes before b
        } else if (nameA > nameB) {
          return 1; // b comes before a
        }
        // names must be equal
        return 0;
      });
    if (contacts.length > 0){
        emptyzone.style.display = "none";
        contacts.forEach(el => {
            contactsSec.append(createUser(el));
        });
    }
    else
        emptyzone.style.display = "flex"; // if the list was empty we need a clear message to the user

}
