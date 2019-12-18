const initQuotesAnimation = () => {
    function animateBlock(elem) {
        const originalText = elem.innerText;

        // const CODE = "&#TфЕ3фПнфПШыпЫ.6^⅋¶4;";
        // CODE.charAt(Math.floor(Math.random() * CODE.length))
        let randomText = originalText.replace(/\S/g, () => String.fromCharCode(0x20 + Math.floor(Math.random() * (0x24f - 0x20))));
        elem.innerText = randomText;

        let shuffledIndices = (new Array(originalText.length))
            .fill(1)
            .map((_, i) => i)
            .sort(() => Math.random() - .5);

        function an() {
            const i = shuffledIndices.pop();
            randomText = randomText.slice(0, i) + originalText[i] + randomText.slice(i + 1);
            elem.innerText = randomText;

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
};

document.addEventListener('DOMContentLoaded', initQuotesAnimation);