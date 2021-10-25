let coursesFormsEl = document.getElementById('coursesform');
let jobsFormsEl = document.getElementById('workform');
let websitesFormsEl = document.getElementById('websiteform');
let tokenCheckEl = document.getElementById('tokencheck');


let deleteButton = document.getElementsByClassName('deletebutton');
let editButton = document.getElementsByClassName('editbutton');


function checkLoggedInUser() {
    if (auth_token == null || auth_token == undefined) {
        tokenCheckEl.innerHTML = `<h4><a href="https://studenter.miun.se/~idgu2001/writeable/projekt-login">Logga in som administratör</a></h4>`;
        for ( let i=0; i<editButton.length; i++) {
            editButton[i].style.display = "none";
        }
        for ( let i=0; i<deleteButton.length; i++) {
            deleteButton[i].style.display = "none";
        }
        coursesFormsEl.style.display = "none";
        jobsFormsEl.style.display = "none";
        websitesFormsEl.style.display = "none";
    } else {
        tokenCheckEl.innerHTML = `<h4><button class="logout" onclick="logout()">Logga ut</button></h4>`;
    }
}

function logout() {
    localStorage.removeItem('auth_token');
    location.reload();
}


// Scroll to top function.
function scrollToTop() {
    window.scrollTo(0, 0);
}