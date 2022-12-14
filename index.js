//global values
const divs = document.querySelectorAll(".drag-drop")
const categoryBtn = document.querySelector("#category-button")
const listContainer = document.querySelector("#product-list")

var category = false
categoryBtn.innerText = "Single-Use"
var productObj

//onstart
renderList()

categoryBtn.addEventListener("click", ()=>{
    //switch boolean
    category = !category

    //change button name and render
    if(category == false){
        categoryBtn.innerText = "Single-Use"
    }
    else{
        categoryBtn.innerText = "Reusable"
    }
    renderList()

})

//functions 
function renderList(){
    
    removeRender()
    
    //if for boolean
    if(category == false){
        //fetch
        fetch(`http://localhost:3000/disposable-products`)
        .then(res => res.json())
        .then(array => render(array))
    }
    else{
        fetch(`http://localhost:3000/reusable-products`)
        .then(res => res.json())
        .then(array => render(array))
    }
}

function render(array){
    array.forEach((obj)=>{
            
        //create list element
        const li = document.createElement("div")
        li.setAttribute("id", "period-list")

        //inner text of list
        li.innerText = obj.name

        //append list to ul
        listContainer.append(li)

        //list is draggable
        li.draggable = true

        //drag start listener
        li.addEventListener("dragstart", ()=>{
            li.classList.add("dragging")
            productObj = obj
        })

        //drag stop listener
        li.addEventListener("dragend", () =>{
            li.classList.remove("dragging")
        })

    })
}

function removeRender(){
    while(listContainer.firstChild){
        const periodList = document.getElementById("period-list")
        periodList.remove()
    }
}

//Drag and Drop code
divs.forEach(div =>{

    div.addEventListener("dragover", (e)=>{
        e.preventDefault()
    })

    div.addEventListener("drop", (event) =>{
        event.preventDefault()
                removeDetail(div)
                renderDetail(div)
    })
})

function renderDetail(div){
    const productName = div.querySelector("#product-name")
    const productImg = div.querySelector("#product-image")
    const productLevel = div.querySelector("#product-level")
    const productDescription = div.querySelector("#product-description")
    const productButton = div.querySelector("#product-button")

    productName.innerText = productObj.name
    productImg.src = productObj.image
    productLevel.innerText = productObj.level
    productDescription.innertext = productObj.description 
    productButton.innerText = productObj.price
    productButton.onClick = productObj.url
}

function removeDetail(div){
    const productName = div.querySelector("#product-name")
    const productImg = div.querySelector("#product-image")
    const productLevel = div.querySelector("#product-level")
    const productDescription = div.querySelector("#product-description")
    const productButton = div.querySelector("#product-button")

    productName.innerText = ""
    productImg.src = ""
    productLevel.innerText = ""
    productDescription.innertext = ""
    productButton.innerText = ""
    productButton.onClick = ""
    

}