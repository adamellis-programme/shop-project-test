import { formatPrice, getStorageItem, setStorageItem, getEl } from '../../utils.js'

import { openCart } from '../toggleCart.js'
import addToCartDOM from './addToCartDom.js'
import { findProduct } from '../store.js'

const pageCartCount = getEl('.cart-item-count')
const cartItemsWrapDOM = getEl('.cart-items')
const cartTotalDOM = getEl('.cart-total')

// update local first
// get empty arr or cart items and add onto it
let cart = getStorageItem('cart')

// homePage, Products, singleProduct
// update the cart item with if statement only then update the storage no matter what
// prettier-ignore
export const addToCart = (id) => {
   let item = cart.find((cartItem) => cartItem.id === id)
   if (!item) {
      // if not in cart add
      let product = findProduct(id)

      product = { ...product, amount: 1 }
      cart = [...cart, product]
      addToCartDOM(product)
      
   } else {
      // update values
      const amount = increaseAmount(id)
      const stringID = id.toString()


      // update the dom
      const items = [...cartItemsWrapDOM.querySelectorAll('.cart-item-amount')]
      const itemAmountText = items.find((value) => value.dataset.id === stringID)
      itemAmountText.textContent = amount

      
      console.log(amount)
   }
   
   // items.forEach((i) => console.log( typeof i.dataset.id))
   // run not mattter what -> display updates because we run these functions
   
   displayCartItemCount()
   displayCartTotal()
   setStorageItem('cart', cart)
   openCart()
}

// get the amount of items in cart in total
function displayCartItemCount() {
   const amountOfItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount)
   }, 0)
   pageCartCount.textContent = amountOfItems
   return amountOfItems
}

// multyply price by amount of items in each cartItem
function displayCartTotal() {
   const itemTotal = cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.amount
   }, 0)
   cartTotalDOM.textContent = `Total: ${formatPrice(itemTotal)} `
}

function displayCartItemsDOM() {
   cart.forEach((item) => {
      addToCartDOM(item)
   })
}

// remove, increase, decrease -> run in every page
function cartFuctionality() {
   cartItemsWrapDOM.addEventListener('click', (e) => {
      const element = e.target
      const id = parseInt(e.target.dataset.id)
      const parent = e.target.parentElement
      const parentID = parseInt(e.target.parentElement.dataset.id)

      // calssList is bubbling
      if (element.classList.contains('cart-item-remove-btn')) {
         removeItem(id)
         element.parentElement.parentElement.remove()
      }

      if (parent.classList.contains('cart-item-increase-btn')) {
         const newAmount = increaseAmount(parentID) // <-- updates the data
         parent.nextElementSibling.textContent = newAmount // <-- updates the dom
      }

      //  this is why we need to update the DOM seperate so the element can not be clicked on
      if (parent.classList.contains('cart-item-decrease-btn')) {
         const newAmount = decreaseAmount(parentID)
         if (newAmount === 0) {
            removeItem(parentID) // <-- data
            element.closest('.cart-item').remove() //<-- dom
         } else {
            parent.previousElementSibling.textContent = newAmount // <-- if above 0 items
         }
      }

      displayCartItemCount()
      displayCartTotal()
      setStorageItem('cart', cart)
   })
}

// update local storage

// ERROR undefined
// don't have to come up with a new variable name
function removeItem(id) {
   cart = cart.filter((item) => item.id !== id)
   console.log(id)
}

// using the same funcion twice
function increaseAmount(id) {
   let newAmount
   cart = cart.map((cartItem) => {
      if (cartItem.id === id) {
         newAmount = cartItem.amount + 1
         cartItem = { ...cartItem, amount: newAmount }
      }
      return cartItem
   })

   return newAmount
}

function decreaseAmount(id) {
   let newAmount
   cart = cart.map((cartItem) => {
      if (cartItem.id === id) {
         newAmount = cartItem.amount - 1
         cartItem = { ...cartItem, amount: newAmount }
      }
      return cartItem
   })
   return newAmount
}
// called on every page load
// called to display on page load in every page
const init = () => {
   displayCartItemCount()
   displayCartTotal()
   displayCartItemsDOM() // forEach

   // enambles the fucntionality of the cart (buttons)
   cartFuctionality()

   // console.log(cart)
}

// every page we call
// this to display up to date data
init()

export { displayCartItemCount, increaseAmount }
