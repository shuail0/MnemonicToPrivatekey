require('dotenv').config();
const fs = require('fs')
const bip39 = require('bip39');
const hdkey = require('hdkey');
const EthereumWallet = require('ethereumjs-wallet').default;

const mnemonic = ""; 

const wallet_amount = 51;

const seed = bip39.mnemonicToSeedSync(mnemonic);
const hdwallet = hdkey.fromMasterSeed(seed);

const pathBase = "m/44'/60'/0'/0";
let walletData = ['Wallet,Address,PrivateKey\n']; // 初始化csv数据，设置header


for(let i = 0; i < wallet_amount; i++){
    const path = pathBase + "/" + i;
    const wallet = hdwallet.derive(path);
    const childWallet = EthereumWallet.fromPrivateKey(Buffer.from(wallet.privateKey, 'hex'));
    const address = childWallet.getAddressString();
    const privateKey = wallet.privateKey.toString('hex');
    walletData.push(`wallet-${i},${address},${privateKey}\n`);
    // console.log(`Loki son-${i-1}: Address:${address}, Private Key:${privateKey}`);
}

fs.writeFileSync('wallets.csv', walletData.join('')); // 保存CSV文件