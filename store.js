import items from './items.json'
import { addToCart } from './shoppingCart.js'
const template = document.querySelector('#cart-item-template')
const dataContainer = document.querySelector('[data-container]')

const IMG = "https://dummyimage.com/210x130"

export default function mainStore(){
  if(template == null) return
    document.addEventListener('click', e => {
        if(!e.target.matches('[data-add-to-cart]')) return;
    
        const id = e.target.closest('[data-item-container]').dataset.itemId
        addToCart(parseInt(id))
    })
    items.forEach(renderItems)
}







function renderItems(item){
  const templateClone = template.content.cloneNode(true)
  
  const container = templateClone.querySelector('[data-item-container]')
  container.dataset.itemId = item.id

  const name = templateClone.querySelector('[data-name]')
  name.innerText = item.name

  const primary = templateClone.querySelector('[data-primary]')
  primary.innerText = item.category

  const image = templateClone.querySelector('[data-image]')
  image.src = `${IMG}/${item.imageColor}/${item.imageColor}`

  const price = templateClone.querySelector('[data-price]')
  const formatter = new Intl.NumberFormat(undefined, {
    style:"currency",
    currency:'USD'
  })
  price.innerText = formatter.format(item.priceCents / 100)

   dataContainer.appendChild(container)

}