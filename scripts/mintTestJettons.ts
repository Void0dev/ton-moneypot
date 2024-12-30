import { NetworkProvider } from '@ton/blueprint';
import { comment, toNano, Address } from '@ton/core';

import { JettonWalletTemplate } from '../build/TestJetton/tact_JettonWalletTemplate';
import { JettonMasterTemplate } from '../build/TestJetton/tact_JettonMasterTemplate';
import { TestJetton, loadTep64TokenData, Tep64TokenData } from '../build/TestJetton/tact_TestJetton';


export async function run(provider: NetworkProvider): Promise<void> {
    const deployer = provider.sender().address!!;
    const receiverAddr = Address.parse('0QCpj8v9Rz3tsx9NkrxMfA_1Hg55b8KbD4KKWanyyAp3vzm7');

    const jettonMasterContract = await provider.open(
        await JettonMasterTemplate.fromInit(
            deployer,
            {
                $$type: "Tep64TokenData",
                flag: BigInt("1"),
                content: "https://s3.laisky.com/uploads/2024/09/jetton-sample.json",
            }
        )
    );

    console.log(`jetton master address: ${jettonMasterContract.address}`);

    const jettonMatserAddress = jettonMasterContract.address;
    // let jettonMatserAddress = Address.parse('EQDaBJqenXzLPhuhqo3-4ZHyBXCvA4lnY8-0qHH2CkUzinjq');

    // const jettonMasterContract = await provider.open(
    //     await TestJetton.fromAddress(jettonMatserAddress)
    // );

    const jettonWalletContract = await provider.open(
        await JettonWalletTemplate.fromInit(
            jettonMatserAddress,
            receiverAddr,
        )
    );

    console.log(`jetton master address: ${jettonMasterContract.address}`);
    console.log(`jetton wallet address: ${jettonWalletContract.address}`);

    // return;

    console.log("-------------------------------------")
    console.log(`mint jetton to ${receiverAddr.toString()}`);
    console.log("-------------------------------------")

    try {
        const randomInt = (): number => {
            return Math.floor(Math.random() * 10000);
        }
    await jettonMasterContract.send(
            provider.sender(),
            {
                value: toNano("1"),
                bounce: false,
            },
            {
                $$type: "MintJetton",
                queryId: BigInt(Math.floor(Date.now() / 1000)),
                amount: toNano(randomInt()),
                receiver: receiverAddr,
                responseDestination: deployer,
                forwardAmount: toNano("0.1"),
                forwardPayload: comment("forward_payload"),
            }
        );
} catch (e: any) {
    console.log('Error:', e);
}

    console.log("-------------------------------------")
    console.log(`wait jetton wallet deployed and show info`);
    console.log("-------------------------------------")

    console.log(`jetton wallet address: ${jettonWalletContract.address}`);
    await provider.waitForDeploy(jettonWalletContract.address, 50);    

    console.log("-------------------------------------")
    console.log(`show jetton info`);
    console.log("-------------------------------------")

    const jettonData = await jettonMasterContract.getGetJettonData();
    const jettonContent = loadTep64TokenData(jettonData.content.asSlice());
    console.log(`mintable: ${jettonData.mintable}`);
    console.log(`owner: ${jettonData.owner}`);
    console.log(`jetton content: ${jettonContent.content}`);
    console.log(`jetton total supply: ${jettonData.totalSupply}`);

    const walletData = await jettonWalletContract.getGetWalletData();
    console.log(`jetton wallet owner: ${walletData.owner}`);
    console.log(`jetton wallet master: ${walletData.master}`);
    console.log(`jetton wallet balance: ${walletData.balance}`);
}