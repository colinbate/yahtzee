<script>
import Rules from './Rules.md';
</script>
<style>
.chev-left::after {
  content: "";
  top: 50%;
  left: 50%;
  @apply absolute border-l border-b border-svelte h-4 w-4;
  transform: translate3d(-33%, -50%, 0) rotate(45deg);
}
</style>
<div class="text-left max-w-md px-4 mx-auto">
  <Rules />
</div>