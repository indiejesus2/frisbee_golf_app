class CoursePagination {
    static container = document.getElementById("golf-course-pagination")

    constructor(pages) {
        this.pages = pages
        this.page = 0
        this.count = (Math.floor(this.pages.length / 8))
        this.renderPage()
        this.renderCourses()
        this.attachClickEventListener()
    }

    static getAll() {
        api.getAllCourses().then((data) => {
            const newData = data.data
            new CoursePagination(newData)
        });
    }

    attachClickEventListener() {
        this.constructor.container.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (e) => {
        if (e.target.className == "next") {
            if ((this.page+1) != this.count) {
                this.page += 1
                this.renderCourses(this.page*8)
            }
        } else if (e.target.className == "last") {
            if (this.page != 0) {
                this.page -= 1
                this.renderCourses(this.page*8)
            }
        }
    }

    renderCourses(page = 0) {
        let courses = []
        let i = page
        while (courses.length < 8) {
            courses.push(this.pages[i])
            i++
        }
        let cards = document.getElementsByClassName("card")
        if (cards.length > 1) {
            while(cards.length > 0) {
                cards[0].remove()
            }
        }
        courses.forEach(course => new CourseInfo(course))
        this.renderPage()
    }
    
    renderPage() {
        const old = document.getElementsByClassName("pagination")
        if (old.length > 0) {
            old[0].remove()
        }
        const head = document.createElement("header")
        head.innerHTML = this.renderHTML(this.page, this.count);
        this.constructor.container.append(head);

    }

    renderHTML = (page = 1, count) => {
        return `
        <div class="pagination">
        <h3>Frisbee Golf Course - Page ${page + 1} of ${count}</h3>
  <a href="#" class="last">&laquo;Last Page</a>

  <a href="#" class="next">Next Page&raquo;</a>
</div>

                
        `
    }

}