module.exports = [
  {
    url: 'https://jsjot.com/',
    title: 'jsjot',
    date: 'Apr 20, 2018',
    description: `Fast, minimal JavaScript console logger for code tinkering. I made this for one of my final assignments in a JavaScript course in college.
    I wanted a simple, quick way to test JavaScript snippets and I wasn't satisfied with the existing solutions. It is a Single Page Application that leverages
    the Codemirror library for all the syntax highlighting and indentation and Websockets for real time collaboration. The technologies used are: React, Webpack,
    Node.js, Express, Websockets, Sass, LocalStorage. The server uses Ubuntu with PM2, clustering, SSL certification, HTTP/2.`,
  },
  {
    url: `${
      process.env.NODE_ENV === 'production'
        ? 'https://connorwiebe.com'
        : 'http://localhost:3000'
    }/ultrafomo`,
    title: 'ULTRAFOMO',
    date: 'Feb 15, 2020',
    description: `ULTRAFOMO is a website that lets you look at how much money you could have made, or did make, from a given stock portfolio. I created it
    over the weekend for fun using React, Chart.js, AWS Lambda and Netlify.`,
  },
  {
    url: 'https://dreambounty.com/',
    title: 'dreambounty',
    date: 'Feb 20, 2018',
    description: `Crowdfunding platform for supporting the creation of content that you want to see content creators produce.
  It's a fully functioning website that I created for my capstone project in college. It combined many of the skills I learned up to that point. It features
  OAuth authentication, Stripe integration, a relational database with plpgsql procedures, transactions, foreign keys, sessions, Google Analytics, Promises,
  error reporting. It was built using: Node.js, Express, Postgresql, Redis, Pug, Stripe.`,
  },
  {
    url: 'https://www.npmjs.com/package/bystrina',
    title: 'bystrina',
    date: 'June 13, 2019',
    description: `Bystrina is a command line interface for downloading torrents. It was created for a school project using commander.js, pm2 and webtorrent.
    It's available to be installed via npm.`,
  },
  {
    url: 'https://status123.herokuapp.com/',
    title: 'status',
    date: 'Jan 20, 2018',
    description: `Receive email notifications when a Reddit post is created matching a specific word or phrase. I used the Reddit API to search subreddits for
    matching words and send the emails using Sendgrid. I used Redis to rate limit the daily number of emails allowed per user. Created using: React, Node.js,
    Express, Redis.`,
  },
  {
    url: 'https://www.npmjs.com/package/crypto-alphanumeric-id',
    title: 'crypto-alphanumeric-id',
    date: 'Dec 11, 2016',
    description: `Generate cryptographic, alphanumeric, base62 strings of a given length. I kept finding myself needing a module that did only this, and it didn't
    exist, so I created it.`,
  },
]
