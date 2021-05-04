const api = new ApiService("http://localhost:3000/api/v1/")
// const courseCollectionDiv = 

document.addEventListener("DOMContentLoaded", () => {
    CourseInfo.getAll();
    new CourseForm();
    new CourseFilter();
    new CoursePagination();
})