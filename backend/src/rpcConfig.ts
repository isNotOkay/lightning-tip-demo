export class RpcConfig {
    private static readonly user = 'kayosh';
    private static readonly password = 'pipapassword';

    public static options(): any {
        return {
            uri: 'http://37.221.195.132:18332',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(RpcConfig.user + ':' + RpcConfig.password).toString('base64')
            },
            json: true,
            body: {
                jsonrpc: "2.0"
            }
        };
    };
}
