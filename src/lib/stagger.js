export let stagger = (frames, config = {}) => {
	let {
		autoplay = false,
		delay = 100,
	} = config
	
	let tl = []
	let time = 0
	
	let cancel = () => {
		tl.forEach(f => clearTimeout(f))
	}
	
	let play = () => {
		frames.forEach(({ s, to, options }) => {
			let f = setTimeout(() => s.set(to, options), time)
            time += delay
			tl.push(f)
		})
	}
	
	autoplay && play();
	
	return {
		play,
		cancel,
	}
}

export default stagger