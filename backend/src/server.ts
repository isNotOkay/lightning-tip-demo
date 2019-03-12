import * as express from 'express';
import {LightningUtil} from './lightning.util';
import * as fs from 'fs';
import * as http from 'request-promise';

var macaroonString = fs.readFileSync('admin.macaroon');
console.log(macaroonString);
var macaroonHexString = Buffer.from(macaroonString, 'utf8').toString('hex');
console.log(macaroonHexString);

const app = express();
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/tip", (req, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    http.post('https://37.221.195.132:8080/v1/invoices', {
        body: {
            memo: `Tip No. ${new Date().getTime()}`,
            value: 100
        },
        headers: {
            'Grpc-Metadata-macaroon': macaroonHexString
        },
        json: true
    }).then((invoice: string) => {
        console.log(invoice);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(invoice);
    });
});
