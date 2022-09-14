function deploymenu(){
    const menubar= document.getElementById('menubar')
    menubar.style.display='block';
}
document.getElementById('deploy-menu').addEventListener('click',deploymenu);

function closemenu(){
    const menubar= document.getElementById('menubar');
    menubar.style.display='none';
}
document.getElementById('closebutton').addEventListener('click',closemenu);




/* button Showmore */
/* function showmore(){
    const button = document.getElementById('showmore')
    show2 = document.getElementById('show2')

    //cards
    const card1 = document.getElementById('card1')
    const card2 = document.getElementById('card2')
    const card3 = document.getElementById('card3')
    const card4 = document.getElementById('card4')

    button.style.display='none'  //hide button

    //show2.style.display=''
    show2.style.cssText=`
        display: block !important
    `;

    card1.style.cssText=`
        display: flex !important
    `;

    card2.style.cssText=`
        display: flex !important
    `;

    card3.style.cssText=`
        display: flex !important
    `;

    card4.style.cssText=`
        display: flex !important
    `;



} */
