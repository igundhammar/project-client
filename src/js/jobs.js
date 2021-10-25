let jobsOutputEl = document.getElementById('jobsOutput');

let addJobButtonEl = document.getElementById('submitJob');
let updateJobButtonEl = document.getElementById('updateJob');
let jobId = document.getElementById('jobid');
let jobPlaceInput = document.getElementById('jobplace');
let jobTitleInput = document.getElementById('jobtitle');
let jobStartdateInput = document.getElementById('jobstartdate');
let jobEnddateInput = document.getElementById('jobenddate');

window.addEventListener('load', getAllJobs);
addJobButtonEl.addEventListener('click', addJob);
updateJobButtonEl.addEventListener('click', updateJob);



// Jobs
function getAllJobs() {
    // http://localhost/writeable/projekt-restapi/workexperiences.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php')
        .then(response => response.json()
            .then(data => {
                jobsOutputEl.innerHTML =
                    `<tr class="desktopheadings">
                        <th>Företag</th>
                        <th>Titel</th>
                        <th>Startdatum</th>
                        <th>Slutdatum</th>
                    </tr>`
                data.forEach(job => {
                    jobsOutputEl.innerHTML +=
                        `<tr>
                           <td><span class="mobileheading">Företag:</span> ${job.place} </td>
                           <td><span class="mobileheading">Titel:</span> ${job.title} </td>
                           <td><span class="mobileheading">Startdatum:</span> ${job.startdate} </td>
                           <td><span class="mobileheading">Slutdatum:</span> ${job.enddate} </td>
                           <td><button class="editbutton" onclick="editJob('${job.place}', '${job.title}', '${job.startdate}', '${job.enddate}', '${job.id}')">Redigera</button>
                           <button class="deletebutton" onclick="deleteJob('${job.id}')">Radera</button></td>
                        </tr>`
                })
                checkLoggedInUser();
            }))
}


// Add job
function addJob(e) {
    e.preventDefault();
    let jobPlaceValue = jobPlaceInput.value;
    let jobTitleValue = jobTitleInput.value;
    let jobStartdateValue = jobStartdateInput.value;
    let jobEnddateValue = jobEnddateInput.value;
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
            location.reload();
        })
        .catch(error => {
            console.log('Error:', error)
        })
}


// Edit job
function editJob(place, title, startdate, enddate, id) {
    jobId.value = id;
    jobPlaceInput.value = place;
    jobTitleInput.value = title;
    jobStartdateInput.value = startdate;
    jobEnddateInput.value = enddate;
}


// Update job
function updateJob(e) {
    e.preventDefault();
    let jobIdValue = jobId.value;
    let jobPlaceValue = jobPlaceInput.value;
    let jobTitleValue = jobTitleInput.value;
    let jobStartdateValue = jobStartdateInput.value;
    let jobEnddateValue = jobEnddateInput.value;
    let job = {"place" : jobPlaceValue, "title" : jobTitleValue, "startdate" : jobStartdateValue, "enddate" : jobEnddateValue};
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
            location.reload();
        })
        .catch(error => {
            console.log('Error:', error)
        })

}


// Delete job
function deleteJob(id) {
    // http://localhost/writeable/projekt-restapi/workexperiences.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/workexperiences.php?id=' + id + '&token=' + auth_token, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getAllJobs();
        })
        .catch(error => {
            console.log('Error:', error)
        })

}