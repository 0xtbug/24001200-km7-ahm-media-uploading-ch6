module.exports = {
  apps : [{
    name: 'media-upload',
    script: 'app.js',
    watch: true,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }]
};
