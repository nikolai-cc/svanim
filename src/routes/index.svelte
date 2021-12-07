<script>
  import { stagger, timeline } from "$lib";
  import { tweened } from "svelte/motion";

  let width = tweened(100);

  let one = tweened(50);
  let two = tweened(50);
  let three = tweened(50);

  let timelineFrames = [
    { s: width, to: 100, time: 0 },
    { s: width, to: 50, time: 1000 },
    { s: width, to: 500, time: 2000 },
  ];

  let staggerFrames = [
    { s: one, to: 200 },
    { s: two, to: 250 },
    { s: three, to: 500 },
  ];

  let resetStagger = () => {
    $one = 50;
    $two = 50;
    $three = 50;
  };

  let tl = timeline(timelineFrames, { direction: "alternate", loop: true });
  let st = stagger(staggerFrames);
</script>

<div style="width: {$width}px; background: red;">
  {Math.round($width)}
</div>

<button on:click={tl.play}> Start Keyframe animation </button>

<button on:click={tl.cancel}> Cancel Keyframe animation </button>

<hr />

<div style="width: {$one}px; background: cyan;">
  {Math.round($one)}
</div>

<div style="width: {$two}px; background: magenta;">
  {Math.round($two)}
</div>

<div style="width: {$three}px; background: yellow;">
  {Math.round($three)}
</div>

<button on:click={st.play}> Start Staggered animation </button>

<button on:click={resetStagger}> Reset Staggered animation </button>

<style>
  div,
  button {
    display: block;
    margin: 8px;
  }
</style>
