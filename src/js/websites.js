let showWebsitesEl = document.getElementById('websites');
let addWebsiteButtonEl = document.getElementById('submitWebsite');
let updateWebsiteButtonEl = document.getElementById('updateWebsite');
let websiteId = document.getElementById('websiteid');
let websiteTitleInput = document.getElementById('websitetitle');
let websiteDescriptionInput = document.getElementById('websitedescription');
let websiteUrlInput = document.getElementById('websiteurl');
let websitesMessageEl = document.getElementById('websitesmessage');
let clearWebsitesEl = document.getElementById('clearwebsites');


showWebsitesEl.addEventListener('click', getAllWebsites);
addWebsiteButtonEl.addEventListener('click', addWebsite);
updateWebsiteButtonEl.addEventListener('click', updateWebsite);


// Websites
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


// Add website
function addWebsite(e) {
    e.preventDefault();
    let websiteTitleValue = websiteTitleInput.value;
    let websiteDescriptionValue = websiteDescriptionInput.value;
    let websiteUrlValue = websiteUrlInput.value;
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


// Edit website
function editWebsite(title, description, url, id) {
    websiteId.value = id;
    websiteTitleInput.value = title;
    websiteDescriptionInput.value = description;
    websiteUrlInput.value = url;
    websiteTitleInput.focus();
    addWebsiteButtonEl.disabled = true;
}


// Update website
function updateWebsite(e) {
    e.preventDefault();
    let websiteIdValue = websiteId.value;
    let websiteTitleValue = websiteTitleInput.value;
    let websiteDescriptionValue = websiteDescriptionInput.value;
    let websiteUrlValue = websiteUrlInput.value;
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


// Delete website
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