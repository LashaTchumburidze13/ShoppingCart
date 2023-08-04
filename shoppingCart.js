import items from './items.json'
const cartButton = document.querySelector('[data-cart-button]')
const cartToggle = document.querySelector('[data-cart-toggle]')
const cartContainer = document.querySelector('[data-add-cart-container]')
const template = document.querySelector('#add-cart-template')
const cartLength = document.querySelector('[data-cart-leng]')
const totalPrice = document.querySelector('[data-total-price]')
const dataSection = document.querySelector('[data-section]')
const SEASON = 'SEASON-STORAGE'
const IMG = "https://dummyimage.com/420x260"
let shoppingCartArray = loadCarts()

export function shoppingCart(){
  removeCart()
  removeButton()
   
}


function removeCart(){
document.addEventListener('click', e => {
    if(!e.target.matches('[data-remove-button]')) return

      const id = parseInt( e.target.closest('[data-cart-container]').dataset.itemId)
      shoppingCart = loadCarts()
  
      shoppingCartArray = shoppingCartArray.filter(i => i.id !== id)    
      renderCarts()
      saveCarts()
   })
}



cartButton.addEventListener('click', () => {
    cartToggle.classList.toggle('invisible')
})

export function addToCart(id){
    const exicting = shoppingCartArray.find(i => i.id === id)
    if(exicting){
        exicting.quantity++
    }else{
        shoppingCartArray.push({id:id,quantity:1})
        
    }
    removeButton()
    saveCarts()
}

function removeButton(){
    if(shoppingCartArray.length === 0){
      dataSection.classList.add('invisible')
    }else { 
        dataSection.classList.remove('invisible')
        renderCarts()
    }
}

console.log(shoppingCartArray.length)

function renderCarts(){

    cartContainer.innerHTML = ''
    cartLength.innerText = shoppingCartArray.length
    const total = shoppingCartArray.reduce((sum,entry) => {
          const item = items.find(i => i.id === entry.id)
          return sum + item.priceCents * entry.quantity
    },0)

    const formatter = new Intl.NumberFormat(undefined, {
        style:"currency",
        currency:'USD'
    })

    totalPrice.innerText = formatter.format(total / 100)

shoppingCartArray.forEach(entry => {

const item = items.find(i => entry.id === i.id)
    const cartItem = template.content.cloneNode(true)
    const container = cartItem.querySelector('[data-cart-container]')
    container.dataset.itemId = item.id
    
    const name = cartItem.querySelector('[data-name]')
    name.innerText = item.name
  

    const image = cartItem.querySelector('[data-image]')
    image.src = `${IMG}/${item.imageColor}/${item.imageColor}`


    const quantity = cartItem.querySelector('[data-quantity]')
    quantity.innerText = `x${entry.quantity}`
  
    const price = cartItem.querySelector('[data-cart-price]')
    const formatter = new Intl.NumberFormat(undefined, {
      style:"currency",
      currency:'USD'
    })
    price.innerText = formatter.format((item.priceCents * entry.quantity) / 100)
    cartContainer.appendChild(cartItem)
})

}


function loadCarts(){
    const item = sessionStorage.getItem(SEASON)
    return JSON.parse(item) || []
}

function saveCarts(){
    sessionStorage.setItem(SEASON, JSON.stringify(shoppingCartArray))
}