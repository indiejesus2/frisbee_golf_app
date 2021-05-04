class CoursePagination {
    static container = document.getElementById("golf-course-pagination")

    constructor() {
        this.render()
    }
    
    render() {
        const head = document.createElement("header")
        head.innerHTML = this.renderHTML();
        this.constructor.container.append(head)
    }

    renderHTML = () => {
        return `
                <h3>Frisbee Golf Course - Page {page} of ___</h3>
                
        `
    }

}
