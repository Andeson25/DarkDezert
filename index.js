setTimeout(() => {
    document.getElementsByClassName('image')[0].style.opacity = '1';
    let counter = 0;
    setInterval(() => {
        counter++;
        if (counter === 5) {
            document.getElementsByClassName('image')[4].style.opacity = '0';
            document.getElementsByClassName('image')[0].style.opacity = '1';
            counter = 0;
            return;
        }
        document.getElementsByClassName('image')[counter - 1].style.opacity = '0';
        document.getElementsByClassName('image')[counter].style.opacity = '1';
    }, 5000);
}, 500);