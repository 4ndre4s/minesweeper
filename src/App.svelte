<script>
  import Tile from './components/Tile.svelte'

  const numberOfTiles = 9
  const TILES = Array.from(new Array(numberOfTiles), (_, i) => i + 1)
</script>

{#each TILES as tile, columnIndex}
  <div class="row">
    {#each TILES as rowIndex}
      <Tile columnIndex={columnIndex} rowIndex={rowIndex}/>
    {/each}
  </div>
{/each}

<style>
    .row {
        display: flex;
    }
</style>
