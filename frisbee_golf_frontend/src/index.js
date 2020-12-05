const api = new ApiService("http://localhost:3000/api/v1/")
const courseCollectionDiv = document.getElementById("golf-course-collection")

document.addEventListener("DOMContentLoaded", () => {
    CourseInfo.getAll();

})