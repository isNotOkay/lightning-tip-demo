import * as http from 'request-promise';
import {RpcConfig} from './rpcConfig';

export class TransactionUtil {
    private static readonly fee = 0.0005;
    private static readonly changeAddress = '2MuSPjagiXheyhBP2TMRXjxPFsA1v9sEAUs';

    public static async send(receivingAddress: string, amount: number) {
        const options = RpcConfig.options();
        options.body.method = 'listunspent';
        const listUnspentRes: RpcResult = await http.post(options);
        const utxo = listUnspentRes.result.find((utxo: { [key: string]: string | number }) => utxo.amount > (amount + this.fee));
        if (!utxo) throw new Error(`Wallet does not have enough funds to spend ${amount} BTC.`);
        console.log(`\nUsing UTXO from transaction "${utxo.txid}" with vout index "${utxo.vout}". It contains ${utxo.amount} BTC.`);
        const change = +(utxo.amount - amount - this.fee).toFixed(5);
        const rawtransaction = [
            [{
                txid: utxo.txid,
                vout: utxo.vout
            }], {
                [receivingAddress]: amount,
                [this.changeAddress]: change
            }
        ];

        options.body.method = 'createrawtransaction';
        options.body.params = rawtransaction;
        const createRawTransactionRes: RpcResult = await http.post(options);
        const serializedTransaction = createRawTransactionRes.result;
        console.log('Created transaction.');

        options.body.method = 'signrawtransactionwithwallet';
        options.body.params = [serializedTransaction];
        const signRawTransactionWithWalletResponse: RpcResult = await http.post(options);
        console.log('Signed transaction.');

        options.body.method = 'sendrawtransaction';
        options.body.params = [signRawTransactionWithWalletResponse.result.hex];
        const sendRawTransactionRes: RpcResult = await http.post(options);
        console.log(`Sent transaction.\n`);

        options.body.method = 'gettransaction';
        options.body.params = [sendRawTransactionRes.result];
        const getTransactionRes: RpcResult = await http.post(options);
        console.log('=== TRANSACTION DETAILS ===');
        console.log(getTransactionRes.result);
    }
}
