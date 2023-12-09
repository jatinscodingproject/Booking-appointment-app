const form = document.querySelector("#form");
const item = document.querySelector("#item");
const username = document.querySelector("#name");
const userphoneno = document.querySelector("#phoneno")
const useremail = document.querySelector("#email");

form.addEventListener("submit", onsubmit);

function onsubmit(event) {
    event.preventDefault();
    const userdata = {
        username,
        useremail,
        userphoneno
    }

    axios
        .post('https://crudcrud.com/api/1aa05d45485b46fdb364067a75097226/appointmentData', userdata)
        .then(response => {
            //showOutput(response.userdata)
            //document.write(response.data)
            //console.log(response)
            showNewUserOnScreen(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}
window.addEventListener("DOMContentLoad", () => {
    axios
        .get("https://crudcrud.com/api/1aa05d45485b46fdb364067a75097226/appointmentData")
        .then(response => {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch(error => {
            console.log(error)
        })
})
function showNewUserOnScreen(user) {
    let a = document.getElementById("name").value;
    let b = document.getElementById("email").value;
    let c = document.getElementById("phoneno").value;

    // const userdata =  {
    //     name : `${username.value}`,
    //     email : `${useremail.value}`,
    //     phoneno : `${userphoneno.value}`

    // }
    //userdatastring = JSON.stringify(userdata);

    const newli = document.createElement("li");
    newli.className = `litag`;
    newli.setAttribute = ('id', 'list');
    newli.innerText = a.concat("-", b)

    // creating delete button
    const delbtn = document.createElement("button");
    delbtn.className = "btn btn-danger delbtn m-2";
    delbtn.setAttribute("type", "submit");
    //delbtn.setAttribute("id",`${userdatastring}`);
    delbtn.innerHTML = "delete"

    const editbtn = document.createElement("button");
    editbtn.className = "btn btn-success editbtn m-2";
    editbtn.setAttribute("type", "submit");
    //editbtn.setAttribute("id",`${userdatastring}`);
    editbtn.innerHTML = "edit"

    //append newlist to html
    newli.appendChild(editbtn)
    newli.appendChild(delbtn);
    item.append(newli);

    //reintializing to blank
    username.value = "";
    useremail.value = "";
    userphoneno.value = ""

}

item.addEventListener("click", onClick);

function onClick(event) {
    event.preventDefault();
    const btnId = JSON.parse(event.target.id).username;
    if (event.target.classList.contains("delbtn")) {
        axios
            .delete('https://crudcrud.com/api/1aa05d45485b46fdb364067a75097226/appointmentData')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

        // localStorage.removeItem(`${btnId}`);
        // event.target.parentElement.remove();
    }
    if (event.target.classList.contains('editbtn')) {
        //remove from local storage
        const btnId = JSON.parse(event.target.id);
        //localStorage.removeItem(`${btnId.username}`);
        axios
            .put('https://crudcrud.com/api/1aa05d45485b46fdb364067a75097226/appointmentData')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        //regain details
        const editinput = document.querySelectorAll('input');;
        editinput[0].value = `${btnId.username}`;
        editinput[1].value = `${btnId.email}`;
        editinput[2].value = `${btnId.userphoneno}`;
        //delete value from browser
        event.target.parentElement.remove();
    }
}
