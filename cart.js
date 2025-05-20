
const cartProductData = localStorage.getItem('cartProduct');
const product = JSON.parse(cartProductData);
let cartItems = JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [];

console.log(cartItems)

function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';

    cartItems.forEach((item, index) => {

        let shortDescription = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;

        cartContainer.innerHTML += `
            <div class="cart-item m-3" data-index="${index}">
                <div class="cart-img">
                    <div class="img-wrapper">
                        <img class="backToProduct" data-id="${item.id}" src="${item.thumbnail}" alt="${item.title}">
                    </div> 
                </div>
                <div class="cart-details">
                        <p class="backToProduct" data-id="${item.id}">${shortDescription}</p>
                    <div class="cart-price">
                        <h5 id="rate-${index}">₹ ${Math.round(item.price * 40.65 * item.quantity).toLocaleString()}/- <span>In Stock</span></h5>
                        <div class="item-count">
                            <p class="minus" data-index="${index}">-</p>
                            <p class="product-value">${item.quantity}</p>
                            <p class="plus" data-index="${index}">+</p>
                        </div>
                    </div>
                    <div class="cart-buttons">
                        <button class="delete-cart-btn" type="submit">Delete</button>
                        <button class="buy-cart-btn" type="submit">Buy Now</button>
                    </div>
                </div>
            </div>`;
    });

    attachEventListeners();
}

function addToCart(newProduct) {
    const existingProductIndex = cartItems.findIndex(item => item.id == newProduct.id);

    if (existingProductIndex >= 0) {
        cartItems[existingProductIndex].quantity += 1;
    } else {
        newProduct.quantity = 1;
        cartItems.push(newProduct);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

function updateQuantity(index, change) {
    const item = cartItems[index];
    item.quantity += change;

    if (item.quantity <= 1) {
        item.quantity = 1;
    } else if (item.quantity > 10) {
        item.quantity = 10;
    }

    cartItems[index] = item;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

function attachEventListeners() {
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);
            updateQuantity(index, -1);
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);
            updateQuantity(index, 1);
        });
    });

    // Add delete cart functionality
    const deleteCartBtns = document.querySelectorAll('.delete-cart-btn');
    deleteCartBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (event) => {
            const index = parseInt(event.target.closest('.cart-item').dataset.index, 10);
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        });
    });
}

document.querySelectorAll('.cart-buy button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Purchase functionality is not yet implemented.');
    });
});

//Back to Product Page

// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('.backToProduct').forEach((btn) => {
//         btn.addEventListener('click', (event) => {
//             const productId = event.target.dataset.id; 
//             console.log("Selected Product ID:", productId);

//             if (productId) {
//                 let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
//                 selectedProducts.push(productId); 
//                 localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

//                 window.location.href = `product.html`; 
//             } else {
//                 console.error('Product ID is missing!');
//             }
//         });
//     });
// });

function attachProductClickListeners() {
    document.querySelectorAll('.backToProduct').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            console.log("Selected Product ID:", productId);

            if (productId) {
                let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
                selectedProducts.push(productId);
                localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

                window.location.href = `product.html`;
            } else {
                console.error('Product ID is missing!');
            }
        });
    });
}

attachProductClickListeners();



addToCart(product);
renderCart();


