class CourseInfo {
    static container = document.getElementById("golf-course-collection")

    constructor(course) {
        this.course = course
        this.renderCourse()
        this.attachClickEventListener()
        this.attachSubmitEventListener()
    }

    static getAll() {
        api.getAllCourses().then((data) => {
            let newdata = data.data
            newdata.forEach(course => new CourseInfo(course))
        });
    }



    attachClickEventListener() {
        this.card.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.className == "rate-btn") {
            if (e.target.previousElementSibling.value >= 1) {
                const id = this.card.dataset.id;
                let vote = (parseInt(e.target.previousElementSibling.value));
                api.updateRating(id, vote).then((course) => this.updatedRating(course.tally, course.votes));
            }
        }
    }

    attachSubmitEventListener() {
        this.card.addEventListener("submit", this.handleOnSubmit);
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { review, username } = e.target
        const data = {
            id: Number(this.card.dataset.id),
            username: username.value,
            review: review.value
        }
        username.value = ""
        review.value = ""
        api.addComment(data).then((comments) => this.addComment(comments));
    }

    removeDefault = (card) => {

    }

    addComment = (comments) => {
        let comment = comments.pop()
        let id = comment.api_v1_course_id
        let card = document.querySelector(`[data-id="${id}"]`)
        let p = card.getElementsByClassName("default")
        if (p.length > 0) {
            p.item("p").remove()
        }
        let ul = card.children[1]
        let li = document.createElement("li")
        li.innerText = `"${comment.review}" - ${comment.username}`
        ul.append(li)

    }

    calculateRating = (tally, votes) => {
        let rating = 0
        if (!tally && !votes) {
            return rating
        } else {
            let rating = (votes/tally)
            return rating.toFixed(2)
        }
    }

    updatedRating = (tally, votes) => {
        const rating = this.calculateRating(tally, votes)
        this.card.children[0].children[2].innerHTML = `${rating} Frisbees`;
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
        ul.className = "overflow-auto"
        this.card.append(ul)
        if (comments.length > 0) {
            comments.forEach(comment => {
            var li = document.createElement('li')
            li.innerText = `"${comment.review}" - ${comment.username}`
            ul.appendChild(li)
        })
        } else {
            var p = document.createElement('p')
            p.className = "default"
            p.innerHTML = "<strong>Make the first comment!</strong>"
            this.card.append(p)
        }
        const form = document.createElement("form");
        form.innerHTML = this.renderCommentHTML();
        this.form = form;
        this.card.append(form);

    }

    renderCommentHTML = () => {
        return `
            <input
            text="text"
            name="review"
            value=""
            placeholder="Add a comment..."
            />
            <br/>
            <input
            text="text"
            name="username"
            value=""
            placeholder="Username"
            <br/>
            <input
            type="submit"
            name="submit"
            value="Add a comment"
            />
        `
    }

    renderInnerHTML = () => {
        const { name, city, state, holes, votes, tally } = this.course.attributes;
        this.card.innerHTML = `
        <div class="card-body">
        <h2 class="title">${name}</h2> 
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
        </div>
        </div>
        `
    }
}