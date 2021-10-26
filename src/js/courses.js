// Code by Ida Gundhammar 2021-10-07, student at Mittuniversitetet, HT2020.


// Declaring variables
let showCoursesEl = document.getElementById('courses');
let coursesOutputEl = document.getElementById('coursesOutput');
let addCourseButtonEl = document.getElementById('submitCourse');
let updateCourseButtonEl = document.getElementById('updateCourse');
let courseId = document.getElementById('courseid');
let courseCodeInput = document.getElementById('coursecode');
let courseNameInput = document.getElementById('coursename');
let courseUniversityInput = document.getElementById('courseuniversity');
let courseStartdateInput = document.getElementById('coursestartdate');
let courseEnddateInput = document.getElementById('courseenddate');
let auth_token = localStorage.getItem('auth_token');


// Eventlisteners
showCoursesEl.addEventListener('click', getAllCourses);
addCourseButtonEl.addEventListener('click', addCourse);
updateCourseButtonEl.addEventListener('click', updateCourse);



// Function to get all courses from database with fetch. Loop result and write table with the data fetched.
function getAllCourses() {
    // http://localhost/writeable/projekt-restapi/courses.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php')
        .then(response => response.json()
            .then(data => {
                coursesOutputEl.innerHTML = "";
                coursesOutputEl.innerHTML =
                    `<tr class="desktopheadings">
                        <th>Kurskod</th>
                        <th>Kursnamn</th>
                        <th>Lärosäte</th>
                        <th>Startdatum</th>
                        <th>Slutdatum</th>
                    </tr>`
                data.forEach(course => {
                    coursesOutputEl.innerHTML +=
                        `<tr>
                           <td><span class="mobileheading">Kurskod: </span> ${course.code} </td>
                           <td><span class="mobileheading">Kursnamn: </span> ${course.name} </td>
                           <td><span class="mobileheading">Lärosäte: </span> ${course.university} </td>
                           <td><span class="mobileheading">Startdatum: </span>${course.startdate}</td>
                           <td><span class="mobileheading">Slutdatum: </span>${course.enddate}</td>
                           <td><button class="editbutton" onclick="editCourse('${course.code}', '${course.name}', '${course.university}', '${course.startdate}','${course.enddate}', '${course.id}' )">Redigera</button>
                           <button class="deletebutton" onclick="deleteCourse('${course.id}')">Radera</button></td>
                        </tr>`
                })
                checkLoggedInUser();
            }))
}



// Function to add a new course. Get values from inputs and use method POST to post data to the database.
function addCourse(e) {
    e.preventDefault();
    let courseCodeValue = courseCodeInput.value;
    let courseNameValue = courseNameInput.value;
    let courseUniversityValue = courseUniversityInput.value;
    let courseStartdateValue = courseStartdateInput.value;
    let courseEnddateValue = courseEnddateInput.value;
    let course = {
        "code": courseCodeValue,
        "name": courseNameValue,
        "university": courseUniversityValue,
        "startdate": courseStartdateValue,
        "enddate": courseEnddateValue
    };
    // http://localhost/writeable/projekt-restapi/courses.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php?token=' + auth_token, {
        method: 'POST',
        body: JSON.stringify(course),
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


// Function to edit an existing course. This function sets the inputs value to the data fetched from each course in getAllCourses.
function editCourse(code, name, university, startdate, enddate, id) {
    courseId.value = id;
    courseCodeInput.value = code;
    courseNameInput.value = name;
    courseUniversityInput.value = university;
    courseStartdateInput.value = startdate;
    courseEnddateInput.value = enddate;

}


// Function to update an existing course. Gets values from inputs and uses method PUT to update the given course (with id). Then calls getAllCourses to write all courses again to the page.
function updateCourse(e) {
    e.preventDefault();
    let courseIdValue = courseId.value;
    let courseCodeValue = courseCodeInput.value;
    let courseNameValue = courseNameInput.value;
    let courseUniversityValue = courseUniversityInput.value;
    let courseStartdateValue = courseStartdateInput.value;
    let courseEnddateValue = courseEnddateInput.value;
    let course = {
        "code": courseCodeValue,
        "name": courseNameValue,
        "university": courseUniversityValue,
        "startdate": courseStartdateValue,
        "enddate": courseEnddateValue
    };
    // http://localhost/writeable/projekt-restapi/courses.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php?id=' + courseIdValue + '&token=' + auth_token, {
        method: 'PUT',
        body: JSON.stringify(course),
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


// Function to delete a course. Gets the course id from button and uses method DELETE to delete the course fom the database. Then calls getAllCourses to write all courses again to the page.
function deleteCourse(id) {
    // http://localhost/writeable/projekt-restapi/courses.php
    // https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php
    fetch('https://studenter.miun.se/~idgu2001/writeable/projekt-restapi/courses.php?id=' + id + '&token=' + auth_token, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getAllCourses();
        })
        .catch(error => {
            console.log('Error:', error)
        })
}



