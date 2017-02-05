module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // frontend application
    {
      name: "frontend",
      script: "server/server.js",
      exec_mode: 'fork',
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node", // change user
      host: [{
        host: "192.168.99.100", // change ip
        port: "22022" // change port
      }],
      ref: "origin/master",
      repo: "https://github.com/tibysko/herms-frontend.git",
      path: "/home/pi/herms/frontend",
      "post-deploy": "npm install && npm run build-prod && pm2 startOrRestart ecosystem.json --env production",
      env: {
        NODE_ENV: "production",
        FRONTEND_PORT: "8080",
        FRONTEND_PATH: "dist"
      }
    }
  }
}
