const initQuotesAnimation = () => {
    const duration = 1500;

    function animateBlock(elem) {
        const started = Date.now();
        const originalText = elem.innerText;

        let randomText = originalText.replace(/\S/g, () => String.fromCharCode(0x20 + Math.floor(Math.random() * (0x24f - 0x20))));
        elem.innerText = randomText;

        let shuffledIndices = (new Array(originalText.length))
            .fill(1)
            .map((_, i) => i)
            .sort(() => Math.random() - .5);


        let lastProcessedIndex = 0;

        function an() {
            const d = (Date.now() - started) / duration;
            const rightIndex = Math.ceil(d * randomText.length);

            shuffledIndices
                .slice(lastProcessedIndex, rightIndex)
                .forEach(
                    (i) =>
                        randomText = randomText.slice(0, i) + originalText[i] + randomText.slice(i + 1)
                );

            elem.innerText = randomText;

            lastProcessedIndex = rightIndex;

            if (lastProcessedIndex < shuffledIndices.length)
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