const timeline = (frames, config = {}) => {
    let {
        direction = 'normal',
        loop = false,
        autoplay = false,
    } = config;

    let tl = [];

    let semarf = frames.slice().reverse(); // frames backwards
    let totalTime = semarf[0].time;

    const cancel = () => tl.forEach(f => clearTimeout(f));

    const play = () => {
        tl = [];
        let offset = (direction === 'alternate') ? totalTime : 0;

        if (direction === 'normal' || direction === 'alternate') {
            frames.forEach(({ s, to, time, options }) => {
                let f = setTimeout(() => s.set(to, options), time);
                tl.push(f);
            });
        }

        if (direction === 'reverse' || direction === 'alternate') {
            semarf.forEach(({ s, to, time, options }) => {
                let f = setTimeout(() => s.set(to, options), offset + totalTime - time);
                tl.push(f);
            });
        }

        if (loop) {
            let f = setTimeout(play, totalTime + offset);
            tl.push(f);
        }
    }

    autoplay && play();

    return {
        play,
        cancel,
    }
}

export default timeline;