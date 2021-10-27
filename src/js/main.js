let showHomeEl = document.getElementById('home');
let coursesFormsEl = document.getElementById('coursesform');
let jobsFormsEl = document.getElementById('workform');
let websitesFormsEl = document.getElementById('websiteform');
let tokenCheckEl = document.getElementById('tokencheck');
let deleteButton = document.getElementsByClassName('deletebutton');
let editButton = document.getElementsByClassName('editbutton');
let editColumn = document.getElementsByClassName('edit');
let changeIcons = document.getElementsByClassName('change');

window.addEventListener('load', getStartText);
showHomeEl.addEventListener('click', getStartText);


function getStartText() {
    outputEl.innerHTML = "";
    outputEl.innerHTML =
        `<h2>Hej! 👋</h2>
            <p>Kul att du har hittat hit!</p>
                <p>Jag gillar skidor och skoter. Och hund och sånt. Och så gillar jag webbutveckling, åtminstone när det går bra.
                Det var det. Hejdå!</p>
                <p>P.S jag har sjukt bra musiksmak! 🎵 🎶</p>
                <h3>Mina färdigheter</h3>
                  <div class="skills">
                   <ul>
                    <li><img src="./images/html.png" alt=""></li>
                    <li><img src="./images/css.png" alt=""></li>
                    <li><img src="./images/js.png" alt=""></li>
                    <li><img src="./images/php.png" alt=""></li>
                    <li><img src="./images/mysql.png" alt=""></li>
                    <li><img src="./images/ps.png" alt=""></li>
                    <li><img src="./images/sass.png" alt=""></li>
                    <li><img src="./images/typescript.png" alt=""></li>
                    <li><img src="./images/adobexd.png" alt=""></li>
                   </ul>
                 </div>`;
    coursesFormsEl.style.display = "none";
    jobsFormsEl.style.display = "none";
    websitesFormsEl.style.display = "none";
}


function checkLoggedInUser() {
    if (auth_token == null || auth_token == undefined) {
        tokenCheckEl.innerHTML = `<h4><a href="https://studenter.miun.se/~idgu2001/writeable/projekt-login" id="loginlink">Logga in som administratör</a></h4>`;

        for (let i = 0; i < editButton.length; i++) {
            editButton[i].style.display = "none";
        }
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].style.display = "none";
        }

        for (let i = 0; i < editColumn.length; i++) {
            editColumn[i].style.display = "none";
        }

        for (let i = 0; i < changeIcons.length; i++) {
            changeIcons[i].style.display = "none";
        }

        coursesFormsEl.style.display = "none";
        jobsFormsEl.style.display = "none";
        websitesFormsEl.style.display = "none";
    } else {
        tokenCheckEl.innerHTML = `<h4><button class="logout" onclick="logout()">Logga ut</button></h4>`;
        return true;
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

// Simple jQuery for dropdown-function on mobile menu.
$(document).ready(function() {
    $('input[type="checkbox"]').click(function() {
        var inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
    });
});


function dropdownFunction() {
    document.getElementById("tabletdropdown").classList.toggle("show");
}


window.onclick = function(event) {
    if (!event.target.matches('hamburgerbutton')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}