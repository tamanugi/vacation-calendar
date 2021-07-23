<script>
  import '../app.postcss';
</script>

<svelte:head>
  <title>祝日移動ガチャ</title>
</svelte:head>

<h1 class="mt-2 text-center text-2xl font-bold">祝日移動ガチャカレンダー</h1>

<main class="flex justify-center items-center my-6 flex-col">
  <slot />
</main>

<footer class="mt-5">
  <div class=" flex justify-center py-3 border-t-2">
    祝日移動ガチャカレンダー created by &nbsp; <a href="https://github.com/tamanugi">@tamanugi</a>
  </div>
</footer>

<style>
</style>
