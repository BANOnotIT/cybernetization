const initScrollAnimation = () => {
    const delay = 400;
    const duration = 300;

    let sections = Array.prototype.slice.call(document.querySelectorAll('#js-fullpage > section'));

    let state = {
        lastScrollTime: -1,
        lastAF: -1,
        startY: -1,
        currentTargetSection: null,
        simulated: false
    };


    document.addEventListener('scroll', () => {
        if (state.simulated) {
            state.simulated = false;
            return
        }

        cancelAnimationFrame(state.lastAF);
        clearTimeout(state.lastTimeout);


        state.lastScrollTime = Date.now();
        state.startY = pageYOffset;
        state.deltaY = getCurrentSection().getBoundingClientRect().y;
        state.lastTimeout = setTimeout(animateScroll, delay, getCurrentSection())
    }, {passive: true});

    function getCurrentSection() {
        let retEl = sections[0];
        let min = Math.abs(retEl.getBoundingClientRect().y);
        for (let i = 1; i < sections.length; i++) {
            const distance = Math.abs(sections[i].getBoundingClientRect().y);
            if (distance > min) {
                return retEl
            }
            min = distance;
            retEl = sections[i]
        }
        return retEl
    }

    function animateScroll(target) {
        const spend = Date.now() - state.lastScrollTime - delay;

        const t = spend / duration;

        const curveY = 2 * (1 - t) * t + t ** 2;
        const newScrollTop = Math.round(curveY * state.deltaY + state.startY);

        state.simulated = true;
        window.scroll(0, newScrollTop);

        if (t <= 1)
            state.lastAF = requestAnimationFrame(() => animateScroll(target))

    }

};

window.addEventListener('load', initScrollAnimation);