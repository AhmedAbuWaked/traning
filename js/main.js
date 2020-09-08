let colorInput = document.getElementById('myColor');

//Check If There's Local Storage Color Option
let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main--color', `${mainColor}`);

    //Save Main Color In Input Value;
    colorInput.value = mainColor;

    //Check For Active Class
    document.querySelectorAll('.colors-list li').forEach(el => {
        el.classList.remove('active')

        if (el.getAttribute('data-color') === mainColor) {
            el.classList.add('active')
        }
    })
}



// Toggle Spin Class On Icon
let settingButton = document.querySelector('.toggle-setting');
let iconGear = document.querySelector('.toggle-setting i');

settingButton.onmouseover = (e) => {
    iconGear.classList.toggle('fa-spin')
}
settingButton.onmouseout = (e) => {
    iconGear.classList.toggle('fa-spin')
}

// Toggle Setting Box
settingButton.onclick = () => {
    let settingBox = document.querySelector('.setting-box');
    settingBox.classList.toggle('open')
}


// Switch Colors
const colorsLi = document.querySelectorAll('.colors-list li');


colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        let color = e.target.getAttribute('data-color');

        // Set Color On Root
        document.documentElement.style.setProperty('--main--color', color);

        colorInput.value = color;

        //Set Color On Local Storage
        localStorage.setItem('color_option', color);

        //Remove Class Active
        e.target.parentElement.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        })
        e.target.classList.add('active');
    })

    colorInput.addEventListener("input", function () {
        document.documentElement.style.setProperty('--main--color', colorInput.value);

        //Set Color On Local Storage
        localStorage.setItem('color_option', colorInput.value);
    }, false);

})

//Switch Random Background
const randomBackground = document.querySelectorAll('.random-background span');

randomBackground.forEach(span => {
    span.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        })
        e.target.classList.add('active');

        if (e.target.dataset.random === 'yes') {
            randomizeImgs = true
            randomizingImgs();
            localStorage.setItem('background_option', randomizeImgs)
        } else if (e.target.dataset.random === 'no') {
            randomizeImgs = false;
            clearInterval(BackgroundInterval);
            localStorage.setItem('background_option', randomizeImgs)
        }
    })
})


// Select Landing Page Element

let landingPage = document.querySelector('.landing-page');

//Get Array Of Images

let imgsArr = ['header1.jpg', 'header2.jpg', 'header3.jpg', 'header4.png'];

let randomizeImgs = true;

// To Control Randomize
let BackgroundInterval;

function randomizingImgs() {

    if (randomizeImgs) {

        //Change The Index Every Few Sec
        BackgroundInterval = setInterval(() => {
            //Random Index
            let randomIndex = Math.floor(Math.random() * imgsArr.length);
            //Change Background Image URL
            landingPage.style.backgroundImage = `url('images/${imgsArr[randomIndex]}')`
        }, 1000)

    }

}

randomizingImgs();

//Check If There's Local Storage Background Option
let backgroundOption = localStorage.getItem('background_option');

if (backgroundOption !== null) {
    randomizeImgs = backgroundOption;
    if (backgroundOption === 'true') {
        randomizingImgs();
    } else {
        clearInterval(BackgroundInterval);
    }

    randomBackground.forEach(el => {
        el.classList.remove('active');

    })

    if (backgroundOption == 'true') {
        document.querySelector('.yes').classList.add('active');
    } else {
        document.querySelector('.no').classList.add('active');
    }
}


// Select Skills Selector

let ourSkill = document.querySelector('.our-skills');

window.onscroll = function () {

    //Skill Offset Top
    let skillOffset = ourSkill.offsetTop;

    //Skills Outer Height
    let skillOuterHeight = ourSkill.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillOffset + skillOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll('.skill-progress span');

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })

    }

    // console.log(`This Is Skills Offset Top ${skillOffset}`)
    // console.log(`This Is Skills Offset Height ${skillOuterHeight}`)
    // console.log(`This Is Our Window Height ${windowHeight}`)
    // console.log(`This Is Our Window ScrollTop ${windowScrollTop}`)

}

// Create Popup With The Image
let ourGallery = document.querySelectorAll('.images-box img');

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create Overlay Element
        let overlay = document.createElement('div');

        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //Create Popup Box
        let popupBox = document.createElement('div');

        //Add Class To Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            let imgHeading = document.createElement('h3');

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImg = document.createElement('img');

        //Set Image Src
        popupImg.src = img.src;

        //Add Image To Popup
        popupBox.appendChild(popupImg);

        //Append The Popup Box to Body
        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');

        let closeButtonText = document.createTextNode('X');

        closeButton.appendChild(closeButtonText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);

    })

})

document.addEventListener('click', (e) => {
    if (e.target.className === 'close-button') {
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove()
    }
})


// Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullets');
const allLinks = document.querySelectorAll('.links a');

function ScrollToSections(element) {

    element.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let section = e.target.dataset.section;
            document.querySelector(section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })

}

ScrollToSections(allBullets);
ScrollToSections(allLinks);

let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocal = localStorage.getItem('bullets_option');

if (bulletLocal !== null) {

    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    })

    if (bulletLocal === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }

}

bulletsSpan.forEach(el => {
    el.addEventListener('click', (e) => {
        if (el.dataset.display === 'yes') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option', 'block')
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option', 'none')
        }


        e.target.parentElement.querySelectorAll('.active').forEach(ele => {
            ele.classList.remove('active');
        })
        e.target.classList.add('active');
    })
})


//Reset Button

document.querySelector('.reset-option').onclick = () => {

    //We Use This If We Want To Remove Everything In Local Storage
    localStorage.clear();

    // **** We Use This if We Need To Keep Some Values In Local Storage ****
    // localStorage.removeItem('color_option');
    // localStorage.removeItem('background_option');
    // localStorage.removeItem('bullets_option');

    //Reload Page After Reset The Options
    window.location.reload();
}



// Toggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = (e) => {
    e.stopPropagation();

    e.target.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
}

tLinks.onclick = (e) => {
    e.stopPropagation();
}
document.addEventListener('click', (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains('open')) {
            toggleBtn.classList.remove('menu-active')
            tLinks.classList.remove('open')
        }
    }

})