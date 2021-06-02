<script>
  import Tile from './components/Tile.svelte'

  const numberOfTiles = 9
  const TILES = Array.from(new Array(numberOfTiles), (_, i) => i + 1)
</script>

<div class="tile-container">
  {#each TILES as tile, columnIndex}
    <div class="row">
      {#each TILES as rowIndex}
        <Tile columnIndex={columnIndex} rowIndex={rowIndex}/>
      {/each}
    </div>
  {/each}
</div>

<style>
    .tile-container {
        display: inline-block;
        padding: 0.5rem;
        background: #c6c6c6;
        border-top: 3px outset white;
        border-left: 3px outset white;
        border-bottom: 3px outset #808080;
        border-right: 3px outset #808080;
    }
    .row {
        display: flex;
    }
</style>
