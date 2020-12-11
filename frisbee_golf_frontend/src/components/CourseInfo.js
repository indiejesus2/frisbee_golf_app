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
                let vote = (parseInt(e.target.previousElementSibling.value));
                api.updateRating(id, vote).then((course) => this.updatedRating(course.tally, course.votes));
            }
        } else if (e.target.className == "comment-btn") {
            const id = this.card.dataset.id;
            let username = (e.target.previousElementSibling.value)
            let comment = (e.target.previousElementSibling.previousElementSibling.value)
            api.addComment(id, comment, username).then((comments) => this.addComment(comments));
        }
    }

    addComment = (comments) => {
        let comment = comments.pop()
        let id = comment.api_v1_course_id
        let card = document.querySelector(`[data-id="${id}"]`)
        let ul = card.children[6]
        let li = document.createElement("li")
        li.innerText = `"${comment.review}" - ${comment.username}`
        // debugger
        ul.append(li)
        // let card = getElementById
    }

    calculateRating = (tally, votes) => {
        let rating = 0
        if (!tally && !votes) {
            return rating
            // return rating
        } else {
            let rating = (votes/tally)
            return rating
        }
    }

    updatedRating = (tally, votes) => {
        const rating = (votes/tally)
        this.card.children[2].innerHTML = `${rating} Frisbees`;
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
            const commentBox = document.createElement("textarea")
            const usernameBox = document.createElement("input")
            const commentBtn = document.createElement("button")
            commentBtn.className = "comment-btn"
            commentBtn.innerText = "Add Comment"
            this.card.append(ul, commentBox, usernameBox)
            this.card.append(commentBtn)
    }

    renderInnerHTML = () => {
        debugger
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
        `
    }
}