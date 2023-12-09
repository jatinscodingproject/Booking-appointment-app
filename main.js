const form = document.querySelector("#form");
const item = document.querySelector("#item");
const username = document.querySelector("#name");
const userphoneno = document.querySelector("#phoneno")
const email = document.querySelector("#email");

form.addEventListener("submit", onsubmit);

function onsubmit(event){
    event.preventDefault();
    const userdata = {
        username:`${username.value}`,
        userphoneno:`${userphoneno.value}`,
        email:`${email.value}`,
    }
    userdatastring = JSON.stringify(userdata);
    localStorage.setItem(`${JSON.stringify(userdata)}`,`${userphoneno.value}`);

    // creating new element li
    const newli = document.createElement("li");
    newli.className = `litag`;
    newli.setAttribute = ('id','list');
    newli.innerText = `${username.value} - ${email.value}`

    // creating delete button
    const delbtn = document.createElement("button");
    delbtn.className = "btn btn-danger delbtn m-2";
    delbtn.setAttribute("type","submit");
    delbtn.setAttribute("id",`${userdatastring}`);
    delbtn.innerHTML = "delete"

    const editbtn = document.createElement("button");
    editbtn.className = "btn btn-success editbtn m-2";
    editbtn.setAttribute("type","submit");
    editbtn.setAttribute("id",`${userdatastring}`);
    editbtn.innerHTML = "edit"

    //append newlist to html
    newli.appendChild(editbtn)
    newli.appendChild(delbtn);
    item.append(newli);

    //reintializing to blank
    username.value = ``;
    email.value = ``;
    userphoneno.value = ``
}

item.addEventListener("click",onClick);

function onClick(event){
    event.preventDefault();
    if (event.target.classList.contains("delbtn")){
        const btnId = JSON.parse(event.target.id).username;
        localStorage.removeItem(`${btnId.userphoneno}`);
        event.target.parentElement.remove();
    }
    if (event.target.classList.contains('editbtn')) {
        //remove from local storage
        const btnId = JSON.parse(event.target.id);
        localStorage.removeItem(`${btnId.userphoneno}`);
        
        //regain details
        const editinput= document.querySelectorAll('input');;
        editinput[0].value=`${btnId.username}`;
        editinput[1].value=`${btnId.email}`;
        editinput[2].value=`${btnId.userphoneno}`;
        //delete value from browser
        event.target.parentElement.remove();
    }
}



