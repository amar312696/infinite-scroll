const imageContainer=document.getElementById("image-container");
let ready =false;
let imageLoaded=0;
let totalImages=0;
let photosArray =[];


//unsplash Api
const count=30;
const apiKey='tpg0v1Tig4JNp5Qfl0qDxTLdE-7o2mYfMeDORke3law';

const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageloader(){
  imageLoaded++;
  if(imageLoaded===totalImages){
    ready=true;
    console.log("ready =", ready);
  }
}

function setAttributes(elements,attributes){
  for (const key in attributes){
    elements.setAttribute(key,attributes[key]);
  }
}

//create Elements for links and photos and we will add that to DOm

function displayPhotos(){
  imageLoaded=0;
  totalImages=photosArray.length;

  photosArray.forEach((photo) => {

    //create <a> to link to unsplash
    const item=document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item,{
      href: photo.links.html,
      target: "_blank",
    })
    //create <img>
    const img =document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    setAttributes(img,{
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event listner, check when each is finished loading
    img.addEventListener('load',imageloader());

    item.appendChild(img);
    imageContainer.appendChild(item);



  });
}

async function getPhotos(){
  
  try {
    const response=await fetch(apiUrl);
    photosArray=await response.json();
    displayPhotos();
    
  } catch (error) {
    //catch error
    
  }
}

//check to see if scrolling near bottom of page
//scroll event
//scroll event
window.addEventListener('scroll',() =>{
  if(window.innerHeight +window.scrollY >= document.body.offsetHeight-1000 && ready){

    ready=false;
    

    getPhotos();

  }
})


getPhotos();