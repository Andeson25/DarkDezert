for (let i = 0; i < document.getElementsByClassName('image').length; i++) {
    document.getElementsByClassName('image')[i].style.opacity = '0';
}
let counter = 0;
document.getElementsByClassName('image')[0].style.opacity = '1';
setInterval(() => {
        counter++;
        if (counter === 5) {
            document.getElementsByClassName('image')[4].style.opacity = '0';
            document.getElementsByClassName('image')[0].style.opacity = '1';
            counter=0;
            return;
        }
        document.getElementsByClassName('image')[counter-1].style.opacity = '0';
        document.getElementsByClassName('image')[counter].style.opacity = '1';
}, 5000);