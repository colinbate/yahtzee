<script>
import Tailwindcss from "./Tailwindcss.svelte";
import ModeSwitcher from "./ModeSwitcher.svelte";
import Game from './Game.svelte';
import SideBar from './SideBar.svelte';
export let update;

update.then(avail => {
  if (avail && window && window.location.hostname !== 'localost') {
    setTimeout(() => {
      const reload = confirm('New Update Available! Reload?');
      if (reload) {
        window.location.reload();
      }
    }, 1);
  }
});
</script>
<Tailwindcss />
<ModeSwitcher />
<main class="min-h-full flex flex-col md:flex-row">
  <Game />
  <SideBar />
</main>