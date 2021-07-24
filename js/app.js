/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');  // select all section in the document
const navigationList = document.querySelector('#navbar__list'); // select by id 
const fragm = document.createDocumentFragment();   // create fragment to hold lists

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavBarAndScrollTo = ()=>{
    sections.forEach((sec,order)=>{
        let nList = document.createElement('li');  // create new list element to hold link of a section 
        let nLink = document.createElement('a');   // create new link element to hold section name  

        nLink.classList.add('menu__link'); // add class to link item to link it with the css properties
        nLink.setAttribute('id',sec.id);   // add id in link = id of the section 
        nLink.innerText = 'section' + `${order+1}`;  // set the text will show 

        nList.appendChild(nLink); // add link to the list 
        fragm.appendChild(nList);// add list to fragment to hold all list but not reflow or reprint the screen to improve the performance 
    
        scrollTOSection(nLink,sec); // add action listener to the section willscroll to the related section       
    })
    navigationList.appendChild(fragm); // add fragment that hold all links to the ul element to print it into the screen 
};

// Add class 'active' to section when near top of viewport and highLight the block link
const activeSectionAndLink =()=>{
    sections.forEach((sec)=>{
        sec.classList.remove('activaClass');
        sec.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)"; // remove the highlight of section
        linkID ='#'+sec.id;
        link = document.querySelector(linkID);
        link.style.cssText ="color: #000; background: #fff;" // remove the hightlight of the link 
        
        const distance= sec.getBoundingClientRect().top; // to get the hight of the current section 
        let status = true;
             if(window.innerHeight <= 640  ){                // make the website Responsive for phones (360×640)
                status = distance < 400 && distance >= -560;
            }
             else if(window.innerHeight <= 1023 && window.innerHeight > 640 ){ //  make the website Responsive for tablets (1366×768)
                status = distance < 400 && distance >= -200;
            }
             else{  status = distance < 155 && distance >= -155 ;  }    // make the website Responsive for PCs (1920 x 1080)
        if (status === true ){
            sec.classList.add('activaClass');
            sec.style.cssText = "background-color: rgba(198, 102, 218, 0.322);";
            link.style.cssText ="background: #333; color: #fff;"
        }
    }) 
};

//  Scroll to section on link click function 
const scrollTOSection = (link,section)=>{
link.addEventListener('click', () => {    // add scroll to action to the link
    section.scrollIntoView({behavior:'smooth'})});
};

/**
* End Main Functions
*  * Begin Events
* 
*/

// Build menu  and Scroll to section on link click
buildNavBarAndScrollTo();

// Set sections as active
window.addEventListener('scroll' ,activeSectionAndLink);
