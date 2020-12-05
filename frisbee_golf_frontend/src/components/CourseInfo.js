class CourseInfo {
    static container = document.getElementById("golf-course-collection")

    constructor(course) {
        this.course = course
        this.renderCourse()
        this.attachEventListener()
    }

    static getAll() {
        api.getAllCourses().then((data) => 
        data.forEach(course => new CourseInfo(course))
        )
    }

    attachEventListener() {
        this.card.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.className == "rate-btn") {
            if (e.target.previousElementSibling.value >= 1) {
                this.course.votes += 1
                this.course.tally += (parseInt(e.target.previousElementSibling.value))
                debugger
            }
        }
    }
    
    renderCourse() {
        const card = document.createElement("div")
        card.className = "card"
        card.dataset.id = this.course.id
        this.card = card
        this.renderInnerHTML();
        this.constructor.container.append(card);
    }

    renderInnerHTML() {
        const { name, city, state, holes, tally } = this.course;
        this.card.innerHTML = `
        <h2>${name}</h2>
        <h5>${tally} Frisbees</h5>
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
        // <button class="rate-btn">Rate</button>
        // <button class="add-comment-btn">Add Comment</button>
        `
    }
}