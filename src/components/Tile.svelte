<script>
  export let rowIndex;
  export let columnIndex;

  let isCovered = true;


  function onClick() {
    isCovered = false;
  }
</script>

<div class="tile" class:covered={isCovered} on:click={onClick}></div>

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
</style>
