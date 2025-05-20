
var apiCategory = 'https://dummyjson.com/products/category/';
var apiLists = [];

fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(data => {
        apiLists = data;

        for (let i = 0; i < apiLists.length; i++) {
            let category = apiLists[i];

            fetch(apiCategory + category)
                .then(res => res.json())
                .then(data => {
                    let firstProduct = data.products[0];
                    let imageUrl = firstProduct.thumbnail;

                    let container = document.getElementById('category-container');
                    let div = document.createElement('div');
                    div.className = "col-lg-3 col-md-6 mb-3 d-flex justify-content-center";
                    div.id = "category-box";
                    div.innerHTML = `
                        <div class="position-relative Products">
                            <img src="${imageUrl}" class="img-fluid h-100" alt="${category}">
                            <a href="#" class="btn btn-dark px-2 position-absolute bottom-0 end-0 translate-middle">
                                Shop Now ➔
                            </a>
                        </div>
                        <div class="my-3">
                            <h5 class="fw-bold text-capitalize">${category}</h5>
                        </div>`;

                    container.appendChild(div);

                    // "Shop Now" button
                    let button = div.querySelector('.btn');
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        console.log("Clicked Category:", category);
                        let clickedItem = category;
                        // 
                        fetch(apiCategory + clickedItem)
                            .then(res => res.json())
                            .then(data => {
                                console.log(data.products);
                                localStorage.setItem('selectedCategory', JSON.stringify(data.products));
                                window.location.href = 'productList.html';
                            })
                    });
                });
        }
    });

//productLists

const selectedCategory = localStorage.getItem('selectedCategory');
const categoryData = JSON.parse(selectedCategory);

// Function to display products
function showProducts(data) {
    let html = `<h4 class="text-capitalize">Results for ${data[0].category}</h4>`;
    data.forEach(product => {
        const price = Math.round(product.price * 40.65);
        html += `
            <div class="product-item" style="border-bottom: solid 2px #ddd; margin: 10px 0;">   
                <div class="product-img">
                    <img src="${product.thumbnail}" class="backToProduct" data-id="${product.id}" width="200px" height="200px">
                </div>
                <div class="product-details">
                    <p class="backToProduct" data-id="${product.id}">${product.description}</p>
                    <h5>₹ ${price.toLocaleString()}/- <span>${product.availabilityStatus}</span></h5>
                    <button class="add-cart-btn">Add to Cart</button>
                </div>
            </div>`;
    });
    document.querySelector('.Product-List-Section').innerHTML = html;
}


//Few Categories

let currentProducts = categoryData; // Default to initial products

function applyPriceFilter(products) {
    document.querySelectorAll('input[name="price"]').forEach(input => {
        input.addEventListener('change', () => {
            const max = parseInt(input.value);
            const filtered = products.filter(p => Math.round(p.price * 40.65) <= max);

            if (filtered.length > 0) {
                showProducts(filtered);
            } else {
                document.querySelector('.Product-List-Section').innerHTML = `
                    <div class="no-products">
                        <h4>No products found</h4>
                        <img src="image/no-product" alt="No products">
                    </div>`;
            }
        });
    });
}

// Initial load
showProducts(currentProducts);
applyPriceFilter(currentProducts);



// Category radio buttons
const categoryRadios = document.querySelectorAll('input[name="category"]');
categoryRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        fetch(apiCategory + this.value)
            .then(res => res.json())
            .then(data => {
                localStorage.removeItem(currentProducts);
                currentProducts = data.products;
                showProducts(currentProducts);
                applyPriceFilter(currentProducts);
                attachProductClickListeners();
            });
    });
});

