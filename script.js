

var apiUrl = 'https://dummyjson.com/products/';
var apiData = [];

async function fetchProduct(imageElementId, index) {
    var number = Math.floor(Math.random() * 194);
    await fetch(apiUrl + number)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let imageElement = document.getElementById(imageElementId);
            imageElement.src = data.thumbnail;
            apiData[index] = data;
        })
        .catch(err => console.log('Error fetching product:', err));
}

for (let i = 1; i <= 12; i++) {
    fetchProduct(`product${i}`, i - 1);
}

//Local Storage

let shopButtons = document.querySelectorAll('.btn');
shopButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        try {
            localStorage.setItem('selectedProduct', JSON.stringify(apiData[index]));
            localStorage.removeItem('selectedProducts');
            window.location.href = 'product.html';
        } catch (error) {
            console.error('Error fecthing the product data:', error);
        }
    });
});

//Product Page

function renderProductDetails(product) {
    // Main Product Image
    const productImg = document.querySelector('.product-image-div');
    productImg.innerHTML = `<img src="${product.images[0]}" alt="" class="img-fluid" id="productImg">`;

    // Preview Images
    const productPreviewImg = document.querySelector('.product-preview');
    productPreviewImg.innerHTML = ''; // Clear previous previews
    if (product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
            productPreviewImg.innerHTML += `<img src="${product.images[i]}" class="img-preview" alt="Preview Image">`;
        }

        const previewImages = document.querySelectorAll('.img-preview');
        for (let i = 0; i < previewImages.length; i++) {
            previewImages[i].addEventListener('click', () => {
                const selectedImageSrc = previewImages[i].src;
                const mainImage = document.getElementById('productImg');
                mainImage.src = selectedImageSrc;
            });
        }
    }

    // First Box (Details)
    const firstBox = document.querySelector('.first-box');
    firstBox.innerHTML = `
        <h2 class="product-title mt-3 fw-bold">${product.description}</h2>
        <button type="button" class="overall-rating">${product.rating} <i class="bi bi-star-fill"></i></button>
        <div class="price-details">
            <div class="product-price">
                <h1 id="product-price">${Math.round(product.price * 40.65)}/- <span class="discount">${product.discountPercentage}% off</span></h1>
            </div>
            <div class="product-count">
                <p class="minus">-</p>
                <p class="product-value">1</p>
                <p class="plus">+</p> 
            </div>
        </div>
        <p class="availability-status">${product.availabilityStatus}</p>
        <p class="category">Category : ${product.category}</p>
        <p class="title">Title : ${product.title}</p>
        <p class="warranty">Warranty Information : ${product.warrantyInformation}</p>
        <p class="weight">Weight : ${product.weight} Kg</p>
        <div class="dimensions">
            <span>Dimensions :</span>
            <ul>
                <li><i class="bi bi-check2-circle"></i> Height : ${product.dimensions.height} cm</li>
                <li><i class="bi bi-check2-circle"></i> Width : ${product.dimensions.width} cm</li>
                <li><i class="bi bi-check2-circle"></i> Depth : ${product.dimensions.depth} cm</li>
            </ul>
        </div>`;

    // Reviews
    const reviewBox = document.querySelector('.second-box');
    reviewBox.innerHTML = ''; // Clear previous reviews
    if (product.reviews.length > 0) {
        reviewBox.innerHTML = `<p class="review-title">Rating & Reviews</p>`;
        for (let i = 0; i < product.reviews.length; i++) {
            reviewBox.innerHTML += `
                <div class="review">
                    <div class="review-box mt-2">
                        <button type="button" class="overall-rating">${product.reviews[i].rating} <i class="bi bi-star-fill"></i></button>
                        <p class="comment">${product.reviews[i].comment}</p>
                        <p class="reviewerEmail">${product.reviews[i].reviewerEmail}</p>
                        <p class="reviewerName">${product.reviews[i].reviewerName}</p>
                        <p class="date">${product.reviews[i].date}</p>
                    </div>
                </div>`;
        }
    } else {
        reviewBox.innerHTML = `<p>No reviews available.</p>`;
    }

    //Update buttons function

    const productMinusBtn = document.querySelector('.minus');
    const productPlusBtn = document.querySelector('.plus');
    const productValue = document.querySelector('.product-value');
    const productPrice = document.getElementById('product-price');

    function updatePrice() {
        let currentQuantity = parseInt(productValue.textContent);
        const totalPrice = Math.round(product.price * 40.65 * currentQuantity);
        productPrice.innerHTML = `₹ ${totalPrice.toLocaleString()}/- <span class="discount">${product.discountPercentage}% off</span>`;
    }

    productMinusBtn.addEventListener('click', () => {
        let currentValue = parseInt(productValue.textContent);
        currentValue -= 1;
        if (currentValue < 1) {
            currentValue = 1;
        }
        productValue.textContent = currentValue;
        updatePrice()
    });

    productPlusBtn.addEventListener('click', () => {
        let currentValue = parseInt(productValue.textContent);
        currentValue += 1;
        if (currentValue > 10) {
            currentValue = 10;
        }
        productValue.textContent = currentValue;
        updatePrice()
    });
}

//Cart Page

CartBtn = document.querySelector('.cart-btn');
CartBtn.addEventListener('click', () => {
    try {
        let cartProduct = localStorage.getItem('selectedProduct');
        localStorage.setItem('cartProduct', cartProduct);
        window.location.href = 'cart.html';
    }
    catch (error) {
        console.error('Error fecthing the cart data:', error);
    }
})

// Display the function

document.addEventListener('DOMContentLoaded', function () {
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    if (selectedProducts.length > 0) {
        const productId = selectedProducts[selectedProducts.length - 1];
        console.log("From cart:", productId);

        const productAPI = 'https://dummyjson.com/products/';
        fetch(productAPI + productId)
            .then(res => res.json())
            .then(data => {
                renderProductDetails(data);
            })
            .catch(err => console.error('Error loading product from cart:', err));
    } else {
        //render from selectedProduct only if not loaded from cart
        const storedProductData = localStorage.getItem('selectedProduct');
        if (storedProductData) {
            const productData = JSON.parse(storedProductData);
            console.log("From shop:", productData.id);
            renderProductDetails(productData);
        }
    }
});


