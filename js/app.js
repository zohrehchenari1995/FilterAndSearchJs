//select:
const navSearch = document.querySelector(".nav__search");
const container = document.querySelector(".container__products");
const btns = document.querySelectorAll(".btn");

//variable:
let allProductsData = [];
let filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      allProductsData = response.data;

      //render products on DOM:
      renderProducts(response.data, filters);
    })
    .catch((error) => console.log(error));
});

//function for render products:
function renderProducts(_products, _filters) {
  const filterdProducts = _products.filter((p) => { 
    return  p.title.toLowerCase().trim().includes(_filters.searchItems.toLowerCase().trim());
  });
  console.log(filterdProducts);
  
  
  
  container.innerHTML = "";
  //render to DOM:(show in DOM products):
  filterdProducts.forEach((item)=>{
  //create:
  const createDiv= document.createElement("div");
  createDiv.classList.add("product");
  //content:
  createDiv.innerHTML = `

   <div class="product product__one">
          <img src=${item.image} alt="" />
          <div class="product__detail">
            <h3 class="product__title">${item.title}</h3>
            <h4 class="product__price">${item.price}</h4>
          </div>
          </div>
          
  `
  //append:
  container.appendChild(createDiv);
  });
}
//event
navSearch.addEventListener("input", (e) => {
  // console.log(e.target.value);

  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
//search on btn(category):
btns.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  })
})


