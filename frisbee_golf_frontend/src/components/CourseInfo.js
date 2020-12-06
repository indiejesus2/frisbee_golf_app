class CourseInfo {
    static container = document.getElementById("golf-course-collection")

    constructor(course) {
        this.course = course
        this.renderCourse()
        this.attachEventListener()
    }

    static getAll() {
        api.getAllCourses().then((data) => {
            let newdata = data.data
            newdata.forEach(course => new CourseInfo(course))
        }
            
        );
    }

    attachEventListener() {
        this.card.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.className == "rate-btn") {
            if (e.target.previousElementSibling.value >= 1) {
                const id = this.card.dataset.id;
                let vote = (parseInt(e.target.previousElementSibling.value))
                api.updateRating(id, vote).then((course) => this.updatedRating(course.tally, course.votes))
            }
        }
    }

    calculateRating = (tally, votes) => {
        let rating = 0
        if (tally == 0 && votes == 0) {
            return rating
            // return rating
        } else {
            let rating = (votes/tally)
            return rating
        }
    }

    updatedRating = (tally, votes) => {
        const rating = (votes/tally)
        this.card.children[1].innerHTML = `${rating} Frisbees`;
    }
    
    renderCourse() {
        const card = document.createElement("div")
        card.className = "card"
        card.dataset.id = this.course.id
        this.card = card
        this.renderInnerHTML();
        this.renderComments();
        this.constructor.container.append(card);
    }

    renderComments() {
        const comments = this.course.attributes.comments.map(comment => comment)
        var ul = document.createElement('ul')
        comments.forEach(comment => {
            var li = document.createElement('li')
            li.innerText = `"${comment.review}" - ${comment.username}`
            ul.appendChild(li)
        }) 
        this.card.append(ul)
    }

    renderInnerHTML() {
        const { name, city, state, holes, votes, tally } = this.course.attributes;
        this.card.innerHTML = `
        <h2>${name}</h2> 
        <h4>${city}, ${state}</h4>
        ${holes} Holes (Baskets)
        <h5>${this.calculateRating(tally, votes)} Frisbees</h5>
        <label for="rating">Rate This Course</label>
        <select>
            <option disabled selected value>--</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <button class="rate-btn">Rate</button>
        <button class="add-comment-btn">Add Comment</button
        `
    }
}