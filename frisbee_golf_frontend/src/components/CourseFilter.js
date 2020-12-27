class CourseFilter {
    static container = document.getElementById("golf-course-filter")

    constructor() {
        this.attachSearch()
        this.attachSearchSubmitEventListener()
    };

    attachSearch() {
        const heading = document.createElement("p")
        heading.innerText = "Filter By Rating: "
        const search = document.createElement("select")
        search.innerHTML = this.renderInnerHTML();
        this.search = search
        this.constructor.container.append(heading, search)
    }

    reset = (cards) => {
        cards.forEach(card => card.style.display = "")
    }

    attachSearchSubmitEventListener() {
        this.constructor.container.addEventListener("change", this.handleOnSearch)
    }

    handleOnSearch = (e) => {
        const cards = document.getElementsByClassName("card")
        this.reset([...cards])
        const rating = Number(e.target.value)
        const newDeck = [...cards].filter(card => 
            Number(card.children[2].innerText.split(" ")[0] < rating)
            &&
            Number(card.children[2].innerText.split(" ")[0] != 0)
            )
        newDeck.forEach(card => card.style.display = "none")
    }

    renderInnerHTML = () => {
        return `
        <select>
            <option selected value="">--</option>
            <option value="5">5</option>
            <option value="4.5">4.5</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
            <option value="2.5">2.5</option>
            <option value="2">2</option>
            <option value="1.5">1.5</option>
            <option value="1">1</option>
        </select>
        `
    }

}

