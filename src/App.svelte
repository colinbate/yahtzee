<script>
import Tailwindcss from "./Tailwindcss.svelte";
import Game from './Game.svelte';
import SideBar from './SideBar.svelte';
</script>
<style>
:global(body) {
  background-color: #eee;
}
@screen dark {
  :global(body) {
    background-color: #222;
    color: #fff;
  }
}
</style>
<Tailwindcss />
<main class="min-h-full flex flex-col md:flex-row">
  <Game />
  <SideBar />
</main>