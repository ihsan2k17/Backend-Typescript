module.exports = {
    apps: [
        {
            name: 'kuponts',
            script: 'build/main.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV:'production'
            },
            output: 'logs/out.log', 
            error: 'logs/error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            merge_logs: true,
            combine_logs:true
        }
    ]
}