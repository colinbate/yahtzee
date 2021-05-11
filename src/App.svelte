<script>
import Tailwindcss from "./Tailwindcss.svelte";
import ModeSwitcher from "./ModeSwitcher.svelte";
import Game from './Game.svelte';
import SideBar from './SideBar.svelte';
</script>
<Tailwindcss />
<ModeSwitcher />
<main class="min-h-full flex flex-col md:flex-row">
  <Game />
  <SideBar />
</main>