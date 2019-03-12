import * as bech32 from 'bech32';
import {AddressUtil} from './address.util';
import {TransactionUtil} from './transaction.util';
import {BitcoinCliStringBuilderUtil} from './bitcoinCliStringBuilder.util';
import {LightningUtil} from './lightning.util';



LightningUtil.createTippingInvoice(100);

/*
const inputs = [
    {txid: 'bed623a92160ab02e8fbb320a665f7d420a6e5baccfc13372d5af0e51bb96fc5', vout: 0}
];
const outputs = [
    {'2Msz3p73sk2PP5cAMncPNB4pPyUu2pSRm2m': 0.001}
];
console.log(CommandBuilder.createRawTransactionPayload(0.01, inputs, outputs));
*/

/*
Remember:
ArrayBuffer: a data structure designed to hold a given amount of BINARY data.
TypedArray: a VIEW into an ArrayBuffer where every item has the same size and type.
DataView: another VIEW into an ArrayBuffer, but one which allows items of DIFFERENT size and type in the ArrayBuffer.
=> both TYPED ARRAYS and DATA VIEW have Getters and Setters for the underlying binary data!
*/

/// SEGWIT ADDRESSES
/*
const buffer = Buffer.from('foobar', 'UTF-8');
// has 6 entries => console.log displays the corresponding ASCII-Code for each character in decimal
const bytes = new Uint8Array(buffer);
// we could also provide the ArrayBuffer directly since Uint8Array is just a VIEW of the underlying bytes
const rearrangedBytes = bech32.toWords(bytes);
// pass the FORMATTED bytes (with 'Re-arranged bits into groups of 5'), not the raw bytes directly
const encoded = bech32.encode('foo', rearrangedBytes);
console.log(`bech32 encoded string: ${encoded}`);

// decode
const decoded = bech32.decode(encoded);
// Format re-arranged bytes to the initial representation, create a buffer from the returned Uint8Array and format it back to a string
const initialAddress = Buffer.from(bech32.fromWords(decoded.words)).toString('UTF-8');
console.log('bech32 decoded data: ' + initialAddress);

/// LEGACY ADDRESSES
const base58Address = 'a';
AddressUtil.decodeBase58Address(base58Address);

*/
