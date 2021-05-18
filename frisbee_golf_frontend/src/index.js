const api = new ApiService("http://localhost:3000/api/v1/")
// const courseCollectionDiv = 

document.addEventListener("DOMContentLoaded", () => {
    CoursePagination.getAll();
    new CourseForm();
    new CourseFilter();
})