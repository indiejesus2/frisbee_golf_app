class CourseInfo {
    constructor(course) {
        this.course = course
        this.renderCourse()
        console.log(this)
    }

    static getAll() {
        api.getAllCourses().then((data) => 
        data.forEach(course => new CourseInfo(course))
        )
    }
    
    renderCourse() {
        const { id, name, city, state, holes } = this.course;
        courseCollectionDiv.innerHTML += `
        <div class="info">
        <h2>${name}</h2>
        <h4>${city}, ${state}</h4>
        <ul>
            <li>${holes} Holes (Baskets) </li>
        </ul>
        <label for="rating">Rate This Course</label>
        <select>
            <option disabled selected value>--</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <button class="rate-btn" id="${id}">Rate</button>
        <button class="add-comment-btn">Add Comment</button>
        </div>
        `
    }
}