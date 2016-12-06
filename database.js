module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '8e1bdfcadd2ac6739fa7d20c84fbd282',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || '1urFtM5PLnFdqC3_V8UobJ-a',

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || 'YOUR_TWITTER_CONSUMER_KEY',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'YOUR_TWITTER_CONSUMER_SECRET',
  'secret': 'pooeplsiasdflkj1234kdj9',
  'database': "postgres://brandonshepherd@localhost/chasepn"
};
