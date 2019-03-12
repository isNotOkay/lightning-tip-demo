import * as http from 'request-promise';

export class LightningUtil {
    public static async createTippingInvoice(amount: number, macaroonHexString: string) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

        const invoiceRes = await http.post('https://37.221.195.132:8080/v1/invoices', {
            body: {
                memo: `Tip No. ${new Date().getTime()}`,
                value: amount
            },
            headers: {
                'Grpc-Metadata-macaroon': macaroonHexString
            },
            json: true
        });
        console.log(`\nInvoice over ${amount} sats:`);
        console.log(invoiceRes.payment_request);

        const decodeInvoiceRes = await http.get(`https://37.221.195.132:8080/v1/payreq/${invoiceRes.payment_request}`,{
            headers: {
                'Grpc-Metadata-macaroon': macaroonHexString
            },
            json: true
        });
        console.log('\nDetails:');
        console.log(decodeInvoiceRes);

        return invoiceRes.payment_request;
    }
}
