const CODE = "&#*+%?£@§\\/.6^⅋¶4;";

function animateBlock(elem) {
    const originalText = elem.innerText;

    let shuffledIndices = (new Array(originalText.length)).fill(1).map((_, i) => i).sort(() => Math.random() - .5);
    let randomText = shuffledIndices.map(() => CODE[Math.floor(Math.random() * CODE.length)]).join('');


    elem.innerText = randomText;

    function an() {
        const i = shuffledIndices.pop();
        randomText = randomText.slice(0, i) + originalText[i] + randomText.slice(i + 1);
        console.log(randomText);
        elem.innerText = randomText;

        console.log(i);

        if (shuffledIndices.length)
            requestAnimationFrame(an)
    }

    requestAnimationFrame(an)
}


const observer = new IntersectionObserver((entries, observer) => {
    entries.filter(el => el.isIntersecting).forEach(({target}) => {
        animateBlock(target);
        observer.unobserve(target)
    })
});
for (let quote of document.getElementsByTagName('blockquote')) {
    observer.observe(quote)
}
