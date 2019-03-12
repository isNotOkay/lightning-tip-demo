export class BitcoinCliStringBuilderUtil {
    private static readonly changeAddress = 'abc';
    private static readonly fee = 0.001;

    public static createRawTransactionPayload(totalInputAmount, inputs, outputs) {
        // calculate change and add it to the outputs
        let totalOutputAmount = 0;
        outputs.forEach((output) => {
            totalOutputAmount += output[Object.keys(output)[0]];
        });
        const change = totalInputAmount - totalOutputAmount - this.fee;
        outputs.push({[this.changeAddress]: change});

        return `hex=$(bitcoin-cli createrawtransaction '${JSON.stringify(inputs)}' '${JSON.stringify(outputs)}')`;
    }
}
