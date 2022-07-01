// constants

const url = "https://api.thecatapi.com/v1/images/search"
const categoryUrl = "https://api.thecatapi.com/v1/images/search?category_ids="
const categoriesUrl = "https://api.thecatapi.com/v1/categories"

// DOM elements

const randomCatsButton = document.querySelector('.randomButton')
const findCatsButton = document.querySelector('.searchButton')
const inputBox = document.querySelector('.input')
const randomCatImage = document.querySelector('.randomCatImage')
const categoryCatImage = document.querySelector('.categoryCatImage')

// event handlers

function getRandomCatHandler(e) { // logic for Random Cats! Meow! button

    fetch(url, {
        headers: {
            'x-api-key': 'fa64bc42-1724-4e8f-8456-c7398dad03c2'
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data =>{
        console.log(data)
        randomCatImage.src = data[0].url
    })
}

function getCatsByCategoryHandler(e) { // logic for Find Cats! Meow! button
    e.preventDefault()

    fetch(categoriesUrl) // GET array of categories
    .then(res => {
        return res.json()
    })
    .then(data => {
        for(let i=0; i < data.length; i++) {  // iterate through array and match against user input
            if(data[i].name == inputBox.value.toLowerCase()) {  // if a match is found, put the url in the categoryCatImage element
                fetch(categoryUrl + data[i].id) 
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        categoryCatImage.src = data[0].url
                        inputBox.value = ''
                    })
                
            }
        }
    })
}

// event listeners

randomCatsButton.addEventListener('click', getRandomCatHandler)
findCatsButton.addEventListener('click', getCatsByCategoryHandler)




