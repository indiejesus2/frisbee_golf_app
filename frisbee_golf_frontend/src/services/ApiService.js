class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getAllCourses = () => fetch(`${this.baseURL}courses`).then(res => res.json());

    updateRating = (id, vote) => {
        const data = { 
            vote: vote
        }
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };
        return fetch(`${this.baseURL}courses/${id}`, configObj)
        .then((res) => res.json());
    }

    addComment = (data) => {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };
        return fetch(`${this.baseURL}courses/${data.id}/comments`, configObj)
        .then((res) => res.json());
    }

    createCourse = (data) => {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };
        return fetch(`${this.baseURL}courses`, configObj)
        .then((res) => res.json());
    }

}
