//find html elements
const detailBox = document.querySelector(".detail-box")
const detailImg = document.querySelector("#detail-image")
const detailName = document.querySelector("#detail-name")
const detailDesc = document.querySelector("#detail-desc")
const buttonDetail = document.querySelector("#button-details")


fetch("http://localhost:3000/product-type")
.then(res => res.json())
.then(array => renderButton(array))

remove()

function renderButton(periodProducts){
    periodProducts.forEach((product) =>{
        
        //create button
        const button = document.createElement("button")
        button.setAttribute("class", "button")

        //giving button name
        button.innerText = product.name

        //append
        buttonDetail.append(button)

        //button events
        button.addEventListener("mouseover" ,() =>{
            details(product)
        })

        button.addEventListener("mouseout",()=>{
            remove()
        })
    })
}

function details(product){
    detailImg.src = product.image
    detailName.innerText = product.name
    detailDesc.innerText = product.description
    detailBox.style.display = "flex"
}

function remove(){
    detailBox.style.display = "none"
}