<script>
  import { createEventDispatcher } from 'svelte'
  import Bomb from './Icons/Bomb.svelte'
  import MarkedAsBomb from './Icons/MarkedAsBomb.svelte'

  const dispatch = createEventDispatcher()

  export let tile
  export let numbersOfBombsInNeighborhood

  let isCovered = true
  let bombClicked = false

  function reveal () {
    if (isMarkedAsBomb || !isCovered) {
      return
    }
    isCovered = false
    if (tile.isBomb) {
      bombClicked = true;
      setTimeout(() => {
        dispatch('bomb-clicked')
      }, 1)
      return
    }
    dispatch('field-revealed')
    if (numbersOfBombsInNeighborhood !== 0) {
      return
    }
    emitEmptyFieldRevealed()
  }

  let isMarkedAsBomb = false

  function toggleBombMarker (event) {
    event.preventDefault()
    isMarkedAsBomb = !isMarkedAsBomb
  }

  function onEmptyFieldRevealed ({ detail: { row, column } }) {
    if (!isCovered || !isNeighbor(row, column)) {
      return
    }
    isCovered = false
    dispatch('field-revealed')
    if (numbersOfBombsInNeighborhood !== 0) {
      return
    }
    emitEmptyFieldRevealed()
  }

  function isNeighbor (row, column) {
    return isNumberDirectNeighbour(tile.row, row) && isNumberDirectNeighbour(tile.column, column)
  }

  function isNumberDirectNeighbour (number, neighbour) {
    return neighbour >= number - 1 && neighbour <= number + 1
  }

  function emitEmptyFieldRevealed () {
    window.dispatchEvent(new CustomEvent('empty-field-revealed', { detail: { row: tile.row, column: tile.column } }))
  }

</script>

<svelte:window on:empty-field-revealed={onEmptyFieldRevealed}/>
<div class={`tile ${!isCovered ? 'tile-' + numbersOfBombsInNeighborhood : ''}`}
     class:covered={isCovered}
     class:marked-as-bomb={isMarkedAsBomb}
     class:bomb-clicked={bombClicked}
     on:click={reveal}
     on:contextmenu={toggleBombMarker}>
  {#if !isCovered && !tile.isBomb && numbersOfBombsInNeighborhood !== 0}
    {numbersOfBombsInNeighborhood}
  {/if}
  {#if !isCovered && tile.isBomb}
    <Bomb/>
  {/if}
  {#if isMarkedAsBomb && isCovered}
    <MarkedAsBomb/>
  {/if}
</div>

<style>
  .tile {
      width: 20px;
      height: 20px;
      background: #cccccc;
      border: 1px solid #6f6f6f;
      text-align: center;
      font-weight: bold;
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
  .tile.bomb-clicked {
      background: red;
  }
  .tile.marked-as-bomb {
      cursor: default;
  }
  .tile.tile-1 {
    color: blue;
  }
  .tile.tile-2 {
    color: green;
  }
  .tile.tile-3 {
    color: red;
  }
  .tile.tile-4 {
    color: black;
  }
  .tile.tile-5 {
    color: darkred;
  }
  .tile.tile-6 {
    color: lightgreen;
  }
  .tile.tile-7 {
    color: brown;
  }
  .tile.tile-8 {
    color: grey;
  }
</style>
