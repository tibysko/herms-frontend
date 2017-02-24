module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  "apps": [

    // frontend application
    {
      "name": "frontend",
      "script": "server/server.js",
      "exec_mode": 'fork',
      "cwd": "/",
      "env": {
        "FRONTEND_PORT": "8080",
        "FRONTEND_PATH": "../dist"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  "deploy": {
    "production": {
      "user": "pi",
      "host": [{
        "host": "192.168.1.146", // raspberry
        "port": "22"
      }],
      "ref": "origin/master",
      "repo": "https://github.com/tibysko/herms-frontend.git",
      "path": "/home/pi/herms/frontend",
      "post-deploy": "npm install && npm run build-prod && pm2 startOrRestart ecosystem.config.js --env production",
    },
    "aws": {
      "user": "ubuntu",
      "host": "35.156.49.48",
      "port": "22",
      "ref": "origin/master",
      "repo": "https://github.com/tibysko/herms-frontend.git",
      "path": "/home/ubuntu/herms/frontend",
      "post-deploy": "npm install && npm run build-prod && pm2 startOrRestart ecosystem.config.js --env production",
    }
  }
}
