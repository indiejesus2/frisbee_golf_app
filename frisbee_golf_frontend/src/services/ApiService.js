class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getAllCourses = () => fetch(`${this.baseURL}courses`).then(res => res.json());
}