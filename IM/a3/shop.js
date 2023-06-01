document.addEventListener('DOMContentLoaded', function() {
  // Get the container for the cart icon
  const cartNav = document.querySelector('.cart-nav');
  // Get the element displaying the item count
  const itemCount = document.querySelector('.item-count');
  // Get the container for the cart items
  const cartItems = document.querySelector('.cart-items tbody');
  // Cart list visibility flag, initially hidden
  let cartListVisible = false;
  // Counter for the number of items in the cart
  let count = 0;
   // Get all button elements
   const buttons = document.querySelectorAll('button');

   // Get the sound element
   const sound = document.getElementById('buttonSound');

   // Function to play the sound
   function playSound() {
     sound.currentTime = 0; // Reset the sound to the starting position for repeated play
     sound.play(); 
   }
   buttons.forEach((button) => {
     button.addEventListener('click', playSound);
   });
  // Add item to the cart
  function addToCart(event) {
    // Increment the item count
    count++;
    // Update the content of the item count element
    itemCount.textContent = count;

    // Get the clicked card
    const card = event.target.closest('.card');
    // Get the item name
    const itemName = card.querySelector('.details span').textContent;
    // Get the item price
    const itemPrice = card.querySelector('.price').textContent;

    // Create a new table row to display the item
    const row = document.createElement('tr');
    row.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>`;
    cartItems.appendChild(row);

    // Add the cart-jump animation class
    card.classList.add('cart-jump');
    setTimeout(() => {
      // Remove the cart-jump animation class after 500ms
      card.classList.remove('cart-jump');
    }, 500);
  }

  // Toggle the visibility of the cart items
  function toggleCartItems() {
    cartListVisible = !cartListVisible;
    // Set the display style of the cart items container based on the visibility flag
    cartItems.parentElement.style.display = cartListVisible ? 'block' : 'none';
  }

  // Toggle cart items visibility on cart icon click
  cartNav.addEventListener('click', toggleCartItems);

  // Get all the add-to-cart buttons
  const cartButtons = document.querySelectorAll('.cart-btn');
  // Add click event listener to each button
  cartButtons.forEach(function(button) {
    button.addEventListener('click', addToCart);
  });

  // Get the element displaying the item count in the cart icon
  const cartNavItemCount = document.querySelector('.cart-nav .item-count');
  // Get all the add-to-cart buttons again
  document.querySelectorAll('.cart-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      // Get the cart icon element
      const cart = document.querySelector('.cart-nav');
      // Clone the image from the clicked card
      const imgToDrag = this.closest('.card').querySelector('img').cloneNode(true);

      // Check if the image was successfully cloned
      if (imgToDrag) {
        // Add the cart-jump animation class
        imgToDrag.classList.add('cart-jump');
        // Get the position of the image on the page
        const imgOffsetTop = imgToDrag.offsetTop;
        const imgOffsetLeft = imgToDrag.offsetLeft;

        // Set the styles for the image
        imgToDrag.style.opacity = '0.8';
        imgToDrag.style.position = 'absolute';
        imgToDrag.style.height = '150px';
        imgToDrag.style.width = '150px';
        imgToDrag.style.zIndex = '100';
        document.body.appendChild(imgToDrag);

        // Get the position of the cart icon on the page
        const cartOffsetTop = cart.offsetTop;
        const cartOffsetLeft = cart.offsetLeft;
        const animateInterval = 10;
        const animateDuration = 1000;
        const animateSteps = animateDuration / animateInterval;
        let stepCount = 0;

        // Set an interval for the animation
        const animateIntervalId = setInterval(function() {
          // Get the current position of the image
          const currentTop = imgToDrag.offsetTop;
          const currentLeft = imgToDrag.offsetLeft;

          // Calculate the distance between the image and the cart icon
          const distanceTop = cartOffsetTop + 20 - currentTop;
          const distanceLeft = cartOffsetLeft + 30 - currentLeft;

          // Calculate the step size for each animation step
          const stepTop = distanceTop / animateSteps;
          const stepLeft = distanceLeft / animateSteps;

          // Update the position of the image
          imgToDrag.style.top = currentTop + stepTop + 'px';
          imgToDrag.style.left = currentLeft + stepLeft + 'px';

          // Increment the step count
          stepCount++;

          // Clear the interval and remove the image when the animation is complete
          if (stepCount >= animateSteps) {
            clearInterval(animateIntervalId);
            imgToDrag.style.width = '0';
            imgToDrag.style.height = '0';
            imgToDrag.parentNode.removeChild(imgToDrag);
          }
        }, animateInterval);
      }
    });
  });
});

