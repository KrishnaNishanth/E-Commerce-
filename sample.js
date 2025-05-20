// let shopButtons = document.querySelectorAll('.btn');
// shopButtons.forEach((button, index) => {
//     button.addEventListener('click', () => {
//         console.log(apiData[index]);
//         try {
//             let inputImg = apiData[index].images[0];
//             localStorage.setItem('selectedImage', inputImg);

//             let inputDescription = apiData[index].description;
//             localStorage.setItem('Description', inputDescription);

//             let inputTitle = apiData[index].title;
//             localStorage.setItem('Title', inputTitle);

//             let inputCategory = apiData[index].category;
//             localStorage.setItem('Category', inputCategory);

//             let inputWarrenty = apiData[index].warrantyInformation;
//             localStorage.setItem('Warranty', inputWarrenty);

//             let inputWeight = apiData[index].weight;
//             localStorage.setItem('Weight', inputWeight);

//             let inputHeight = apiData[index].dimensions.height;
//             localStorage.setItem('Height', inputHeight);

//             let inputWidth = apiData[index].dimensions.width;
//             localStorage.setItem('Width', inputWidth);

//             let inputDepth = apiData[index].dimensions.depth;
//             localStorage.setItem('Depth', inputDepth);

//             let inputStock = apiData[index].availabilityStatus;
//             localStorage.setItem('Stock', inputStock);

//             let inputRating = apiData[index].rating;
//             localStorage.setItem('Rating', inputRating);

//             let inputPrice = apiData[index].price;
//             localStorage.setItem('Price', inputPrice);

//             let inputDiscount = apiData[index].discountPercentage;
//             localStorage.setItem('Discount', inputDiscount);

//             let inputReviews = apiData[index].reviews;
//             localStorage.setItem('Reviews', JSON.stringify(inputReviews));

//             window.location.href = 'product.html';
//         }

//         catch (error) {
//             console.error('Error fetching the image:', error);
//         }
//     });
// });

// //Product Page

// const getProductImage = localStorage.getItem('selectedImage');
// const getDescription = localStorage.getItem('Description');
// const getCategory = localStorage.getItem('Category');
// const getTitle = localStorage.getItem('Title');
// const getWarrenty = localStorage.getItem('Warranty');
// const getWeight = localStorage.getItem('Weight');
// const getHeight = localStorage.getItem('Height');
// const getWidth = localStorage.getItem('Width');
// const getDepth = localStorage.getItem('Depth');
// const getStock = localStorage.getItem('Stock');
// const getRating = localStorage.getItem('Rating');
// const getPrice = localStorage.getItem('Price');
// const getDiscount = localStorage.getItem('Discount');
// const getReviews = localStorage.getItem('Reviews')

// const productImg = document.querySelector('.product-image-div');
// productImg.innerHTML = `<img src="${getProductImage}" alt="" class="img-fluid" id="productImg">`

// const productPreviewImg = document.querySelector('.product-preview');
// productPreviewImg.innerHTML = `<img src="image/image.png" class="img-preview" alt="Preview Image">`


// const firstBox = document.querySelector('.first-box')

// firstBox.innerHTML = `
//             <h2 class="product-title fw-bold">${getDescription}</h2>
//             <button type="button" class="overall-rating">${getRating} <i class="bi bi-star-fill"></i></button>
//                 <div class="price">
//                     <h1 class="product-price">$${getPrice}</h1>
//                         <p class="price-details">
//                             <span class="discount">${getDiscount}% off</span>
//                         </p>
//                 </div>
//                 <p class="availability-status">${getStock}</p>
//                 <p class="category">Category : ${getCategory}</p>
//                 <p class="title">Title : ${getTitle}</p>
//                 <p class="warranty">Warranty Information : ${getWarrenty}</p>
//                 <p class="weight">Weight : ${getWeight}</p>
//                 <div class="dimensions">
//                     <span>Dimensions :</span>
//                     <ul>
//                         <li><i class="bi bi-check2-circle"></i> Height : ${getHeight}</li>
//                         <li><i class="bi bi-check2-circle"></i> Width : ${getWidth}</li>
//                         <li><i class="bi bi-check2-circle"></i> Depth : ${getDepth}</li>
//                     </ul>
//                 </div>`;

// const reviewBox = document.querySelector('.second-box')
// const reviews = JSON.parse(getReviews);

// if (reviews.length > 0) {

//     reviewBox.innerHTML = `<p class="review-title">Rating & Reviews</p>`;

//     for (let i = 0; i < reviews.length; i++) {
//         reviewBox.innerHTML += `
//                     <div class="review">
//                         <div class="review-box mt-2">
//                             <button type="button" class="overall-rating"> ${reviews[i].rating} <i class="bi bi-star-fill"></i></button>
//                             <p class="comment"> ${reviews[i].comment} </p>
//                             <p class="reviewerEmail"> ${reviews[i].reviewerEmail} </p>
//                             <p class="reviewerName"> ${reviews[i].reviewerName} </p>
//                             <p class="date"> ${reviews[i].date} </p>
//                         </div>
//                     </div>`
//     }
// }
// else {
//     reviewBox.innerHTML = `<p>No reviews available.</p>`;
// }