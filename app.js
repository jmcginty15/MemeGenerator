const memeForm = document.querySelector('#meme-form');
const submitBtn = document.querySelector('#submit');
const imgLinkInput = document.querySelector('#img-link');
const topTextInput = document.querySelector('#top-text');
const bottomTextInput = document.querySelector('#bottom-text');
const memeDiv = document.querySelector('#the-memes');

if (localStorage.memeList) {
    memeDiv.innerHTML = JSON.parse(localStorage.memeList);
} else {
    localStorage.memeList = '';
}

// the default image is Shrek if the user doesn't input a link
const defImgLink = 'https://img1.looper.com/img/gallery/things-only-adults-notice-in-shrek/intro-1573597941.jpg';
const defTopText = 'YOUR DANK TOP TEXT';
const defBottomText = 'YOUR DANK BOTTOM TEXT';

// this function creates a new meme
function createMeme(imgLink, topText, bottomText) {
    const newMeme = document.createElement('div');
    const img = document.createElement('img');
    const topCaption = document.createElement('div');
    const bottomCaption = document.createElement('div');

    img.src = imgLink;
    topCaption.innerText = topText;
    bottomCaption.innerText = bottomText;

    // this function ensures the image is loaded before setting the size of the div to the size of the image
    // without this, the size of the div sometimes gets set to 0 if the image takes too long to load
    // I spent way too much time tearing my hair out about this issue :D
    img.onload = function () {
        newMeme.style.width = img.naturalWidth + 'px';
        newMeme.style.height = img.naturalHeight + 'px';
        
        newMeme.classList.add('meme-container');
        topCaption.classList.add('meme', 'top');
        bottomCaption.classList.add('meme', 'bottom');

        newMeme.appendChild(img);
        newMeme.appendChild(topCaption);
        newMeme.appendChild(bottomCaption);
        memeDiv.appendChild(newMeme);

        localStorage.memeList = JSON.stringify(memeDiv.innerHTML);
    }
}

// this function listens for form submissions
memeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let imgLink = imgLinkInput.value;
    let topText = topTextInput.value;
    let bottomText = bottomTextInput.value;

    imgLinkInput.value = '';
    topTextInput.value = '';
    bottomTextInput.value = '';

    if (imgLink === '') {
        imgLink = defImgLink;
    }
    if (topText === '') {
        topText = defTopText;
    }
    if (bottomText === '') {
        bottomText = defBottomText;
    }

    createMeme(imgLink, topText, bottomText);
})

// this function listens for a click on an image to remove a meme from the page
memeDiv.addEventListener('click', function (event) {
    const deletedMeme = event.target.parentElement;
    memeDiv.removeChild(deletedMeme);
    localStorage.memeList = JSON.stringify(memeDiv.innerHTML);
})