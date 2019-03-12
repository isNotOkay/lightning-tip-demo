# lightning-angular-tip
This post demonstrates briefly how you can run your own lightning node, create QR-Codes from invoices using [angularx-qrcode](https://www.npmjs.com/package/angularx-qrcode) and let users pay these invoices using the [Eclair mobile wallet](https://play.google.com/store/apps/details?id=fr.acinq.eclair.wallet).

## Setup bitcoind to run on TESTNET
Create a config file named **bitcoin.conf**:
```
prune=1024
testnet=1
server=1
daemon=1
zmqpubrawblock=tcp://127.0.0.1:28332
zmqpubrawtx=tcp://127.0.0.1:28333
rpcuser=YOUR_USERNAME
rpcpassword=YOUR_PASSWORD
rpcallowip=IP_OF_MACHINE_THAT_CALLS_RPC_REQUESTS
test.rpcport=18332
```

Start the bitcoin node:
```
bitcoind
```

## Setup lnd to run on TESTNET

Create a config file named **lnd.conf**:

```
bitcoin.active=1
bitcoin.testnet=1
bitcoin.node=bitcoind
alias=YOUR_NODE_NAME
debuglevel=debug
restlisten=0.0.0.0:8080
no-macaroons: true // just for testing purposes!
```

Start the lightning node:
```
lnd
```

Open a new tab to unlock your lightning node:
```
lncli --network=testnet unlock
```

Wait a few minutes and check whether your node is accessible from outside: [https://1ml.com/testnet/](https://1ml.com/testnet/).

## Grab the Code
```
git clone https://github.com/isNotOkay/lightning-tip-demo
```

## Start the Backend
```
cd backend
npm install && npm run build && npm run start
```

## Start the Frontend
```
cd frontend
npm install && ng serve
```


## Send tips
Install [Eclair mobile wallet](https://play.google.com/store/apps/details?id=fr.acinq.eclair.wallet), connect to your lightning node and scan the generated QR-Code. That's all! Eclair should recognize the invoice and send 100 satoshis to your lightning node.
```


