import * as fs from 'fs';
import * as path from 'path';
import { Address, beginCell, contractAddress, fromNano, toNano } from "@ton/core";
import { MoneypotMaster } from "../build/Moneypot/tact_MoneypotMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { NetworkProvider } from '@ton/blueprint';
import { TestJetton, Tep64TokenData } from '../build/TestJetton/tact_TestJetton';

export async function run(provider: NetworkProvider) {
    // Parameters
    let testnet = true;    
    let owner = Address.parse('0QADPO8Yiz0uzKh6voecVq8VfWijcTtphTKX3Wo1wEK5ClaA');

    // Create content Cell
    let testJettonPackageName = 'tact_TestJetton.pkg';
    const jettonParams = {
        name: "TactJet-12",
        description: "This is description of Test tact jetton",
        image: "https://ipfs.io/ipfs/QmbPZjC1tuP6ickCCBtoTCQ9gc3RpkbKx7C1LMYQdcLwti" // Image url
    };
    
    let metadata: Tep64TokenData = {
        $$type: 'Tep64TokenData',
        flag: 0n, // 0 - on-chain, 1 - offchain
        content: JSON.stringify(jettonParams),
    };

    // Initialize contract
    let init = await TestJetton.init(owner, metadata);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, '../build/TestJetton', testJettonPackageName));

    // Prepareing
    console.log('Uploading package...');
    let prepareJetton = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    // console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepareJetton);
    console.log();
};