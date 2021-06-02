<script>

  export let tile;

  let isCovered = true;

  function reveal() {
    if (isMarkedAsBomb) {
      return;
    }
    isCovered = false;
  }

  let isMarkedAsBomb = false;

  function toggleBombMarker(event) {
    event.preventDefault();
    isMarkedAsBomb = !isMarkedAsBomb;
  }
</script>

<div class="tile"
     class:covered={isCovered}
     class:marked-as-bomb={isMarkedAsBomb}
     class:is-bomb={!isCovered && tile.isBomb}
     on:click={reveal}
     on:contextmenu={toggleBombMarker}>
</div>

<style>
  .tile {
      width: 20px;
      height: 20px;
      background: #cccccc;
      border: 1px solid #6f6f6f;
  }
  .tile.covered {
      width: 16px;
      height: 16px;
      background: #c6c6c6;
      cursor: pointer;
      border-top: 3px outset white;
      border-left: 3px outset white;
      border-bottom: 3px outset #808080;
      border-right: 3px outset #808080;
  }
  .tile.covered.marked-as-bomb::before {
      content: '';
      cursor: default;
      display: inline-block;
      width: .75rem;
      height: .75rem;
      margin-left: 1px;
      margin-bottom: 1px;
      border-radius: 15px;
      background: orange;
  }
  .tile:not(.covered).is-bomb {
      background: red;
  }
</style>
