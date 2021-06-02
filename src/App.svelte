<script>
  import _ from 'lodash'
  import Tile from './components/Tile.svelte'

  const numberOfTilesPerRow = 9
  const numberOfBombs = 8
  const tileRow = createArray(numberOfTilesPerRow)
  const bombs = createArray(numberOfBombs, () => true)
  const numberOfFields = Math.pow(numberOfTilesPerRow, 2)
  const allTiles = _.shuffle([...bombs, ...createArray(numberOfFields - numberOfBombs, () => false)])

  const mappedTiles = allTiles.map((isBomb, index) => {
    const column = index % numberOfTilesPerRow
    const row = Math.floor(index / numberOfTilesPerRow)

    return {
      column,
      row,
      isBomb
    }
  })

  function createArray (length, mapping) {
    return Array.from(new Array(length), mapping)
  }

  let remainingFields = numberOfFields - numberOfBombs

  function onFieldRevealed () {
    remainingFields--
    if (remainingFields !== 0) {
      return
    }
    if (confirm('You won!')) {
      restartGame()
    }
  }

  function getNumber (row, column) {

    return [
      findTile(row - 1, column - 1),
      findTile(row - 1, column),
      findTile(row - 1, column + 1),
      findTile(row, column - 1),
      findTile(row, column + 1),
      findTile(row + 1, column - 1),
      findTile(row + 1, column),
      findTile(row + 1, column + 1)
    ].filter(e => e && e.isBomb).length
  }

  function findTile (row, column) {
    return mappedTiles.find(i => i.row === row && i.column === column)
  }

  function onBombClicked () {
    if (confirm('Bomb clicked!')) {
      restartGame()
    }
  }

  function restartGame () {
    window.location.href = window.location.href
  }
</script>

<div>
  {remainingFields}
</div>
<div class="tile-container">
  {#each tileRow as _, column}
    <div class="row">
      {#each tileRow as _, row}
        <Tile tile="{findTile(row, column)}"
              numbersOfBombsInNeighborhood="{getNumber(row, column)}"
              on:bomb-clicked={onBombClicked}
              on:field-revealed={onFieldRevealed}
        />
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
