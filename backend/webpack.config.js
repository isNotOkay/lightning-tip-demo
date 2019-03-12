module.exports = {
    "mode": "development",
    "entry": {
        "index": "./src/index.ts",
        "getAddressBalance": "./src/commands/getAddressBalance.command.ts",
        "sendTransaction": "./src/commands/sendTransaction.command.ts",
        "server": "./src/server.ts"
    },
    "target": 'node',
    "output": {
        "path": __dirname + '/dist',
        "filename": "[name].js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            }
        ]
    },
    "resolve": {
        "extensions": ['.ts', '.js', '.json']
    }
};
