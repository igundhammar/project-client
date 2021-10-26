let showWebsitesEl = document.getElementById('websites');
let addWebsiteButtonEl = document.getElementById('submitWebsite');
let updateWebsiteButtonEl = document.getElementById('updateWebsite');
let websiteId = document.getElementById('websiteid');
let websiteTitleInput = document.getElementById('websitetitle');
let websiteDescriptionInput = document.getElementById('websitedescription');
let websiteUrlInput = document.getElementById('websiteurl');

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
                           <td><span class="mobileheading">Titel:</span> ${website.title} </td>
                           <td><span class="mobileheading">Beskrivning:</span> ${website.description} </td>
                           <td><span class="mobileheading">Länk:</span><a href="${website.url}">Länk</a></td>
                           <td class="change"><button class="editbutton" onclick="editWebsite('${website.title}', '${website.description}', '${website.url}', '${website.id}')"><img src="./images/edit.png" alt=""></button>
                           <button class="deletebutton" onclick="deleteWebsite('${website.id}')"><img src="./images/delete.png" alt=""></button></td>
                        </tr>`
                })
                checkLoggedInUser();
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
            location.reload();
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
            location.reload();
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
        })
        .catch(error => {
            console.log('Error:', error)
        })

}