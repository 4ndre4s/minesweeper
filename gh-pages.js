const githubPages = require('gh-pages');

githubPages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/4ndre4s/minesweeper.git',
    user: {
      name: 'Andreas Partsch',
      email: 'public@partsch.xyz'
    }
  },
  () => {
    console.log('Deployment complete!')
  }
)
