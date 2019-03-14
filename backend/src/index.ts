import * as fs from 'fs';
import * as express from 'express';
import * as http from 'request-promise';

// extract macaroon and include it in every request for lnd node authorization
const rawMacaroon = fs.readFileSync('admin.macaroon');
const macaroonHexString = new Buffer(rawMacaroon).toString('hex');

// start the server on port 3000
const app = express();
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// register endpoint that communicates with the lnd node's REST-API via HTTPS
app.get("/tip", (req, res) => {

    // add this line to prevent that nodejs throws an exception because we're not using a SSL-certificate here
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

    http.post('https://37.221.195.132:8080/v1/invoices', {
        body: {
            memo: `Tip No. ${new Date().getTime()}`,
            value: 3500
        },
        headers: {
            'Grpc-Metadata-macaroon': macaroonHexString
        },
        json: true
    }).then((invoice: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(invoice);
    });
});
