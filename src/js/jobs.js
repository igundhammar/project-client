// Code by Ida Gundhammar 2021-10-28, student at Mittuniversitetet, HT2020.

// Declaring variables
let showJobsEl = document.getElementById('jobs');
let addJobButtonEl = document.getElementById('submitJob');
let updateJobButtonEl = document.getElementById('updateJob');
let jobId = document.getElementById('jobid');
let jobPlaceInput = document.getElementById('jobplace');
let jobTitleInput = document.getElementById('jobtitle');
let jobStartdateInput = document.getElementById('jobstartdate');
let jobEnddateInput = document.getElementById('jobenddate');
let jobsMessageEl = document.getElementById('jobsmessage');
let clearJobsEl = document.getElementById('clearjobs');


// Eventlisteners
showJobsEl.addEventListener('click', getAllJobs);
addJobButtonEl.addEventListener('click', addJob);
updateJobButtonEl.addEventListener('click', updateJob);



// Function to get all jobs from database with fetch. Loop result and write table with the data fetched. Checks if there is a logged in user and displays/not displays edit and delete buttons.
function getAllJobs() {
    // http://localhost/writeable/projekt-restapi/workexperiences.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php')
        .then(response => response.json()
            .then(data => {
                outputEl.innerHTML = "";
                outputEl.innerHTML =
                    `<h2>Mina arbetserfarenheter</h2>
                        <tr class="desktopheadings">
                        <th>Företag</th>
                        <th>Titel</th>
                        <th>Startdatum</th>
                        <th>Slutdatum</th>
                        <th class="edit">Ändra</th>
                    </tr>`
                data.forEach(job => {
                    outputEl.innerHTML +=
                        `<tr>
                           <td><span class="mobileheading">Företag: </span>&nbsp; ${job.place} </td>
                           <td><span class="mobileheading">Titel: </span>&nbsp; ${job.title} </td>
                           <td><span class="mobileheading">Startdatum </span> &nbsp;${job.startdate} </td>
                           <td><span class="mobileheading">Slutdatum: </span>&nbsp; ${job.enddate} </td>
                           <td class="edit"><button class="editbutton" onclick="editJob('${job.place}', '${job.title}', '${job.startdate}', '${job.enddate}', '${job.id}')"><img src="./images/edit.png" alt=""></button>
                           <button class="deletebutton" onclick="deleteJob('${job.id}')"><img src="./images/delete.png" alt=""></button></td>
                        </tr>`
                })
                if (checkLoggedInUser()) {
                    coursesFormsEl.style.display = "none";
                    jobsFormsEl.style.display = "block";
                    websitesFormsEl.style.display = "none";
                }
            }))
}


// Function to add a new job. Get values from inputs and use method POST to post data to the database. Writes either error or ok message, resets the form and calls getAllJobs to refresh the table.
function addJob(e) {
    e.preventDefault();
    let jobPlaceValue = jobPlaceInput.value;
    let jobTitleValue = jobTitleInput.value;
    let jobStartdateValue = jobStartdateInput.value;
    let jobEnddateValue = jobEnddateInput.value;
    if (jobPlaceValue == "" || jobTitleValue == "" || jobStartdateValue == "" || jobEnddateValue == "") {
        jobsMessageEl.innerHTML = `<h3 class="errormessage">Fyll i alla fält<h3>`;
    } else {
        let job = {"place" : jobPlaceValue, "title" : jobTitleValue, "startdate" : jobStartdateValue, "enddate" : jobEnddateValue};
        // http://localhost/writeable/projekt-restapi/workexperiences.php
        // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
        fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php?token=' + auth_token, {
            method: 'POST',
            body: JSON.stringify(job),
        })
            .then(response => () => {
                return response.json();
            })
            .then(data => {
                getAllJobs();
                jobsMessageEl.innerHTML = `<h3 class="okmessage">Kurs tillagd<h3>`;
                clearJobsEl.reset();
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }
}


// Function to edit an existing job. This function sets the inputs value to the data from the row clicked in the table. Sets focus to the edit form and disables "add job" button to prevent user from accidentally add the same job twice.
function editJob(place, title, startdate, enddate, id) {
    jobId.value = id;
    jobPlaceInput.value = place;
    jobTitleInput.value = title;
    jobStartdateInput.value = startdate;
    jobEnddateInput.value = enddate;
    jobPlaceInput.focus();
    addJobButtonEl.disabled = true;
}


// Function to update an existing job. Gets values from inputs and uses method PUT to update the given job (with id). Then calls getAllJobs to refresh the table with new data.
function updateJob(e) {
    e.preventDefault();
    let jobIdValue = jobId.value;
    let jobPlaceValue = jobPlaceInput.value;
    let jobTitleValue = jobTitleInput.value;
    let jobStartdateValue = jobStartdateInput.value;
    let jobEnddateValue = jobEnddateInput.value;
    if (jobPlaceValue == "" || jobTitleValue == "" || jobStartdateValue == "" || jobEnddateValue == "") {
        jobsMessageEl.innerHTML = `<h3 class="errormessage">Fyll i alla fält<h3>`;
    } else {
        let job = {
            "place": jobPlaceValue,
            "title": jobTitleValue,
            "startdate": jobStartdateValue,
            "enddate": jobEnddateValue
        };
        // http://localhost/writeable/projekt-restapi/workexperiences.php
        // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
        fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php?id=' + jobIdValue + '&token=' + auth_token, {
            method: 'PUT',
            body: JSON.stringify(job),
        })
            .then(response => () => {
                return response.json();
            })
            .then(data => {
                getAllJobs();
                jobsMessageEl.innerHTML = `<h3 class="okmessage">Kurs uppdaterad<h3>`;
                clearJobsEl.reset();
                addJobButtonEl.disabled = false;
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }

}


// Function to delete a job. Gets the job id from button and uses method DELETE to delete the job fom the database. Then calls getAllJobs to refresh the table with new data.
function deleteJob(id) {
    // http://localhost/writeable/projekt-restapi/workexperiences.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php?id=' + id + '&token=' + auth_token, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getAllJobs();
            jobsMessageEl.innerHTML = `<h3 class="okmessage">Kurs raderad<h3>`;
        })
        .catch(error => {
            console.log('Error:', error)
        })

}
