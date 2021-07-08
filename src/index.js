let dogID;

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => json.forEach(renderDogs))
}

function renderDogs(dog) {
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdButton = document.createElement('td')
    let h6Name = document.createElement('h6')
    let h6Breed = document.createElement('h6')
    let h6Sex = document.createElement('h6')
    let editButton = document.createElement('button')
    let table = document.querySelector('#table-body')
    let form = document.getElementById('dog-form')

    h6Name.textContent = dog.name
    h6Breed.textContent = dog.breed
    h6Sex.textContent = dog.sex
    editButton.textContent = 'EDIT'

    tdName.append(h6Name)
    tdBreed.append(h6Breed)
    tdSex.append(h6Sex)
    tdButton.append(editButton)
    tr.append(tdName, tdBreed, tdSex, tdButton)

    table.append(tr)

    editButton.addEventListener('click', () => {
        form.elements[0].value = dog.name
        form.elements[1].value = dog.breed
        form.elements[2].value = dog.sex

        dogID = dog.id
    })
}

document.querySelector('#dog-form').addEventListener('submit', (e) => {
    e.preventDefault()

    let editDog = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }

    e.target.name.value = ''
    e.target.breed.value = ''
    e.target.sex.value = ''

    document.querySelector('#table-body').innerHTML = ''
    patchRequest(dogID, editDog)
})

function patchRequest(id, dog) {
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        })
    })
    .then(res => res.json())
    .then(json => {
        fetchDogs()
    })
}

// Initial Render
function initialRender() {
    fetchDogs()
}

initialRender()