const dataCard = (data) => data.map(item => `<div class="data-card">
  <h2>Name: ${item.name}</h2>
  <p>Age: ${item.age}</p>
  <p>Pets: ${item.pets ? item.pets.join(", ") : "None"}</p>
</div>`).join("")


const newDataForm = () => `<form id="new-data-form">
  <input type="text" name="name" placeholder="Name">
  <input type="number" name="age" placeholder="Age">
  <input type="text" name="pets" placeholder="Pet names, separated by commas">
  <button class="submit-button" type="submit">Add</button>
</form>`


const fetchData = async () => {
  const response = await fetch("/api/data")
  const data = await response.json()
  return data
}


const createHTML = (data) => {
  const root = document.querySelector("#root")
  root.insertAdjacentHTML("beforeend", dataCard(data))
  root.insertAdjacentHTML("beforeend", newDataForm())
  submitFormEvent(root)
}


const submitFormEvent = (root) => {
    const form = document.querySelector("#new-data-form")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = {
            name: form.name.value,
            age: Number(form.age.value),
            pets: form.pets.value.split(",")
        }
        const response = await fetch("/api/data/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if(response.ok) {
            const data = await fetchData()
            root.innerHTML = ''
            createHTML(data)
        } else {
            const button = form.querySelector(".submit-button")
            button.classList.add("error")
            button.textContent = "Some data are missing!"
            setTimeout(() => {
                button.classList.remove("error")
                button.textContent = "Add"
                form.reset()
            }, 3000)
            console.error( "Error: Some data are missing!")
        }
    })
}

// immediately invoked function expression just for fun :D

(async () => {
  const data = await fetchData()
  createHTML(data)
})()


