const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];


// unsplash api
const count = 30;
const apiKey = 'JAyNUZl_yypIMhVk2Q9b3MMQYJot8jK_t_5NRsv1E8Y';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
         loader.hidden = true; 
        
    }
}

//Helper Function to set attributes om dom elements
function setAttribute(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//create elements for links and photos, add to dom 
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item =document.createElement('a');
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,  
        });
    
        // Event Listener, check when each is finished loading

        img.addEventListener('load',imageLoaded)

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//GET photos from unsplash API

async function getPhotos(){
    try{
    const response = await fetch(apiUrl);
     photosArray = await response.json();
    displayPhotos();
    }catch(error){
       //catch error
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})


//onload
getPhotos();