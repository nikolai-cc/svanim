# Svanim

Animation utillities for svelte/motion stores.

### Installation

```
npm i svanim
```

Svelte/motion stores are powerful ways to tween values over time. This is a tiny lib that allows you to pass in an array of store transormations and play them as keyframes or staggered. It will simply loop over the array and play them using setTimeout();

It returns a `play()` function that allows you to manually (re)start the timeline and a `cancel()` function that stops the animation after the current transform is complete.

## Usage

#### Keyframes:

```html
<script>
  import { keyframe } from 'svanim'
  import { tweened } from 'svelte/motion'

  let width = tweened(100)

  let frames = [{
      { s: width, to: 100, time: 0 }
      { s: width, to: 1000, time: 1000 }
      { s: width, to: 500, time: 3000 }
  }]

  let tl = timeline(frames, { autoplay: false, direction: 'alternate', loop: true });
</script>

<div style="width: {$width}px">I will be changing my width.</div>

<button on:click="{" tl.play }>Start looping through the keyframes</button>
```

#### Staggered:

```html
<script>
  import { stagger } from 'svanim'
  import { tweened } from 'svelte/motion'

  let one = tweened(100)
  let two = tweened(100)
  let three = tweened(100)

  let frames = [{
      { s: one, to: 500 }
      { s: two, to: 500 }
      { s: three, to: 500 }
  }]

  let st = stagger(frames, { autoplay: false, delay: 250 })
</script>

<div style="width: {$one}px">I am first</div>

<div style="width: {$two}px">I am second</div>

<div style="width: {$three}px">I am third</div>

<button on:click="{" st.play }>Start staggered animation</button>
```
