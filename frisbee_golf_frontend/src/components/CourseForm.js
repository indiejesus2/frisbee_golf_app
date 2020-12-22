class CourseForm {
    static container = document.getElementById("golf-course-form")

    constructor() {
        this.render()
        this.attachEventListener()
    };

    attachEventListener() {
        this.form.addEventListener("submit", this.handleOnSubmit);
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { name, city, state, holes } = e.target
        const data = {
            name: name.value,
            city: city.value,
            state: state.value,
            holes: holes.valueAsNumber
        }
        api.createCourse(data).then((course) => new CourseInfo(course.data))
    }

    render() {
        const form = document.createElement("form");
        form.className = "add-course-form";
        form.innerHTML = this.renderInnerHTML();
        this.form = form;
        this.constructor.container.append(form);
    }

    renderInnerHTML = () => {
        return `
          <h3>Add A Frisbee Golf Course!</h3>
  
          <input
            type="text"
            name="name"
            value=""
            placeholder="Course Name"
            class="input-text"
          />
          <br />
          <input
            type="text"
            name="city"
            value=""
            placeholder="City"
            class="input-text"
          />
          <br />
          <input
            type="text"
            name="state"
            value=""
            maxlength="2"
            placeholder="State"
            class="input-text"
          />
          <br />
          <input
            type="number"
            name="holes"
            value=""
            placeholder="Numbers of Holes (Baskets)"
            class="input-number"
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Create New Course"
            class="submit"
          />
        `;
    };
}