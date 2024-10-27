import { getEl } from '../../utils.js'
import { formatPrice } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'

const priceFilter = (store) => {
   const priceFilter = getEl('.price-filter')
   const priceValue = getEl('.price-value')

   let maxPrice = store.map((product) => product.price)

   // as far as the filter is concerned we round up to th nearest integer
   maxPrice = Math.max(...maxPrice)
   maxPrice = Math.ceil(maxPrice / 100)

   priceFilter.max = maxPrice
   priceFilter.min = 0
   priceFilter.value = maxPrice

   priceValue.textContent = maxPrice

   priceFilter.addEventListener('input', () => {
      document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'))

      const value = +priceFilter.value
      priceValue.textContent = value

      // less than or equal to value
      let newStore = store.filter((product) => product.price / 100 <= value)

      displayProducts(getEl('.products-wrapper'), newStore, true)

      if (newStore.length < 1) {
         const productsWrapper = getEl('.products-wrapper')
         productsWrapper.innerHTML = '<h3 class="filter-error" > <span> no matching products try again </span> </h3>'
      }
   })
}

console.log(8999 / 100)

export default priceFilter

/**
 * Here's an analogy:
 * Imagine maxPrice is a box.
 * Initially, you put all the prices
 * (like toys) in the box. Then, you take
 * out all but the biggest toy
 * (finding the max).
 * Finally, you convert
 * that big toy to a different form
 * (like dividing by 100). Each step replaces
 * the contents of the box entirely.
 */

/**
 * For simple calculations like this, reusing might be okay if it maintains clarity.
 * For complex logic or when multiple variables hold related but distinct values, use different names for better readability and to avoid errors.
 */

/**
 * 
 * 
 * const allPrices = store.map((product) => product.price);
   const highestPrice = Math.max(...allPrices);
   const maxPriceInDollars = Math.ceil(highestPrice / 100);

   priceFilter.value = maxPriceInDollars;
   priceFilter.max = maxPriceInDollars;
   priceFilter.min = 0;


 */
