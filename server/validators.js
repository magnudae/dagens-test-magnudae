
const categoryFilter = (cat) => {
  return (productCat) => {
    if(!cat) {
      return true
    }
    return cat == productCat
}
}

const minPriceFilter = (minPrice) => {
  return (productPrice) => {
    if(!minPrice){
      return true
    }
    return productPrice > minPrice
  }
}

const maxPriceFilter = (maxPrice) => {
  return (productPrice) => {
    if(!maxPrice) {
      return true
    }
    return productPrice < maxPrice
  }
}

module.exports = {
  categoryFilter,
  minPriceFilter,
  maxPriceFilter
};
