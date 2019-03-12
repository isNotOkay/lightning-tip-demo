import * as base58 from 'bs58';
import * as sha256 from 'sha256';
import {RpcConfig} from './rpcConfig';
import * as http from 'request-promise';

export class AddressUtil {
    public static decodeBase58Address(address: string) {
        // decode
        const decodedAddress = toHexString(base58.decode(address));
        const versionPrefix = decodedAddress.slice(0, 2);
        const pubKeyHash = decodedAddress.substring(2, decodedAddress.length - 8);
        const checksum = decodedAddress.substring(decodedAddress.length - 8, decodedAddress.length);
        console.log('\nDecoded Address (version, pubKeyHash, checksum):');
        console.log(`${versionPrefix} ${pubKeyHash} ${checksum}`);

        // check
        const hash = sha256(hexStringToByte(versionPrefix + pubKeyHash));
        const hashOfHash = sha256(hexStringToByte(hash));
        const calculatedChecksum = hashOfHash.substring(0, 8);
        console.log('\nCalculated Checksum: ');
        console.log(calculatedChecksum);

        if (checksum === calculatedChecksum) {
            console.log('\n=> Valid bitcoin address!');
        } else {
            console.log('\n=> Checksum does not match. Invalid bitcoin address!');
        }
    }

    public static async getAddressBalance(address: string) {
        const options = RpcConfig.options();
        options.body.method = 'listunspent';
        const listUnspentRes: RpcResult = await http.post(options);
        const owningUtxos = listUnspentRes.result.filter((utxo: { [key: string]: string | number }) => utxo.address === address);
        const balance = owningUtxos.reduce((sum: number, utxo: { [key: string]: string | number }) => sum + Number(utxo.amount), 0);
        console.log(`Balance: ${balance.toFixed(8)}`);
    }
}

/// Helper functions
function toHexString(byteArray) {
    return byteArray.map((byte) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    const a = [];
    // a hex digit contains of 4 bytes => fill each Uint8 with two hex digits
    for (let i = 0, len = str.length; i < len; i += 2) {
        const subString = str.substr(i, 2);
        /*
         IMPORTANT:
         Specify the radix so the correct bit representation is returned!
         E.g. "10" is 10 in decimal and 16 in hex, so the functions needs to know what base it is.
         */
        a.push(parseInt(subString, 16));
    }

    return new Uint8Array(a);
}
