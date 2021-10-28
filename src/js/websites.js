// Code by Ida Gundhammar 2021-10-28, student at Mittuniversitetet, HT2020.


// Declaring variables
let showWebsitesEl = document.getElementById('websites');
let addWebsiteButtonEl = document.getElementById('submitWebsite');
let updateWebsiteButtonEl = document.getElementById('updateWebsite');
let websiteId = document.getElementById('websiteid');
let websiteTitleInput = document.getElementById('websitetitle');
let websiteDescriptionInput = document.getElementById('websitedescription');
let websiteUrlInput = document.getElementById('websiteurl');
let websitesMessageEl = document.getElementById('websitesmessage');
let clearWebsitesEl = document.getElementById('clearwebsites');


// Eventlisteners
showWebsitesEl.addEventListener('click', getAllWebsites);
addWebsiteButtonEl.addEventListener('click', addWebsite);
updateWebsiteButtonEl.addEventListener('click', updateWebsite);


// Function to get all websites from database with fetch. Loop result and write table with the data fetched. Checks if there is a logged in user and displays/not displays edit and delete buttons.
function getAllWebsites() {
    // http://localhost/writeable/projekt-restapi/websites.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php')
        .then(response => response.json()
            .then(data => {
                outputEl.innerHTML = "";
                outputEl.innerHTML =
                    `<h2>Webbplatser</h2>
                        <tr class="desktopheadings">
                        <th>Titel</th>
                        <th>Beskrivning</th>
                        <th>Länk</th>
                        <th class="edit">Ändra</th>
                    </tr>`
                data.forEach(website => {
                    outputEl.innerHTML +=
                        `<tr>
                           <td><span class="mobileheading">Titel: </span>&nbsp; ${website.title} </td>
                           <td><span class="mobileheading">Beskrivning: </span>&nbsp; ${website.description} </td>
                           <td><span class="mobileheading">Länk: </span>&nbsp;<a href="${website.url}">Länk</a></td>
                           <td class="change"><button class="editbutton" onclick="editWebsite('${website.title}', '${website.description}', '${website.url}', '${website.id}')"><img src="./images/edit.png" alt=""></button>
                           <button class="deletebutton" onclick="deleteWebsite('${website.id}')"><img src="./images/delete.png" alt=""></button></td>
                        </tr>`
                })
                if (checkLoggedInUser()) {
                    coursesFormsEl.style.display = "none";
                    jobsFormsEl.style.display = "none";
                    websitesFormsEl.style.display = "block";
                }
            }))
}


// Function to add a new website. Get values from inputs and use method POST to post data to the database. Writes either error or ok message, resets the form and calls getAllWebsites to refresh the table.
function addWebsite(e) {
    e.preventDefault();
    let websiteTitleValue = websiteTitleInput.value;
    let websiteDescriptionValue = websiteDescriptionInput.value;
    let websiteUrlValue = websiteUrlInput.value;
    if (websiteTitleValue == "" || websiteDescriptionValue == "" || websiteUrlValue == "") {
        websitesMessageEl.innerHTML = `<h3 class="errormessage">Fyll i alla fält<h3>`;
    } else {
        let website = {
            "title": websiteTitleValue,
            "description": websiteDescriptionValue,
            "url": websiteUrlValue
        };
        // http://localhost/writeable/projekt-restapi/websites.php
        // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php
        fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php?token=' + auth_token, {
            method: 'POST',
            body: JSON.stringify(website),
        })
            .then(response => () => {
                return response.json();
            })
            .then(data => {
                getAllWebsites();
                websitesMessageEl.innerHTML = `<h3 class="okmessage">Kurs tillagd<h3>`;
                clearWebsitesEl.reset();
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }
}


// Function to edit an existing website. This function sets the inputs value to the data from the row clicked in the table. Sets focus to the edit form and disables "add website" button to prevent user from accidentally add the same website twice.
function editWebsite(title, description, url, id) {
    websiteId.value = id;
    websiteTitleInput.value = title;
    websiteDescriptionInput.value = description;
    websiteUrlInput.value = url;
    websiteTitleInput.focus();
    addWebsiteButtonEl.disabled = true;
}


// Function to update an existing website. Gets values from inputs and uses method PUT to update the given website (with id). Then calls getAllWebsites to refresh the table with new data.
function updateWebsite(e) {
    e.preventDefault();
    let websiteIdValue = websiteId.value;
    let websiteTitleValue = websiteTitleInput.value;
    let websiteDescriptionValue = websiteDescriptionInput.value;
    let websiteUrlValue = websiteUrlInput.value;
    if (websiteTitleValue == "" || websiteDescriptionValue == "" || websiteUrlValue == "") {
        websitesMessageEl.innerHTML = `<h3 class="errormessage">Fyll i alla fält<h3>`;
    } else {
        let website = {"title": websiteTitleValue, "description": websiteDescriptionValue, "url": websiteUrlValue};
        // http://localhost/writeable/projekt-restapi/websites.php
        // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php
        fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php?id=' + websiteIdValue + '&token=' + auth_token, {
            method: 'PUT',
            body: JSON.stringify(website),
        })
            .then(response => () => {
                return response.json();
            })
            .then(data => {
                getAllWebsites();
                websitesMessageEl.innerHTML = `<h3 class="okmessage">Kurs uppdaterad<h3>`;
                clearWebsitesEl.reset();
                addWebsiteButtonEl.disabled = false;
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }
}


// Function to delete a website. Gets the website id from button and uses method DELETE to delete the website from the database. Then calls getAllWebsites to refresh the table with new data.
function deleteWebsite(id) {
    // http://localhost/writeable/projekt-restapi/websites.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/websites.php?id=' + id + '&token=' + auth_token, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getAllWebsites();
            websitesMessageEl.innerHTML = `<h3 class="okmessage">Kurs raderad<h3>`;
        })
        .catch(error => {
            console.log('Error:', error)
        })

}