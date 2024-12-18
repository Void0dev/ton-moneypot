import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Moneypot } from '../wrappers/Moneypot';
import '@ton/test-utils';

describe('Moneypot', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let moneypot: SandboxContract<Moneypot>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        moneypot = blockchain.openContract(await Moneypot.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await moneypot.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: moneypot.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and moneypot are ready to use
    });
});
