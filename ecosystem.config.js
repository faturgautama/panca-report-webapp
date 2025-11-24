module.exports = {
    apps: [{
        name: 'panca-report',
        script: 'npx',
        args: 'http-server dist/panca-report-webapp/browser -p 4200 -c-1',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production'
        }
    }]
};
