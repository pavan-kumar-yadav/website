// script.js
let currentIndex = 0;
const images = document.querySelectorAll('#image-gallery img');
const totalImages = images.length;

function showImage(index) {
    images.forEach(img => img.style.display = 'none');
    images[index].style.display = 'block';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
}

// Show the first image initially
showImage(currentIndex);

// Add event listeners for next and previous buttons
document.getElementById('next-btn').addEventListener('click', nextImage);
document.getElementById('prev-btn').addEventListener('click', prevImage);

