import * as fs from 'fs';
import * as path from 'path';
import { Address, beginCell, contractAddress, fromNano, toNano } from "@ton/core";
import { MoneypotMaster } from "../build/Moneypot/tact_MoneypotMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { compile, NetworkProvider } from '@ton/blueprint';
import { JettonWalletTemplate } from '../build/TestJetton/tact_JettonWalletTemplate';

export async function run(provider: NetworkProvider) {
    // Parameters
    let testnet = true;
    let packageName = 'tact_MoneypotMaster.pkg';
    let owner = Address.parse('0QADPO8Yiz0uzKh6voecVq8VfWijcTtphTKX3Wo1wEK5ClaA');
    let jettonMatser = Address.parse('EQC_r0gkBKPyOTXpyNWFQ0cfIdRLPrx0aEmoNJYasMCjRd5I');

    // Initialize contract    
    // let jettonCode = await compile('JettonWallet');
    let initJetton = await JettonWalletTemplate.init(jettonMatser, owner);
    let init = await MoneypotMaster.init(owner, initJetton.code, jettonMatser);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, '../build/Moneypot', packageName));

    // Prepareing
    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();    
};