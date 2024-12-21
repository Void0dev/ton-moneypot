import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/usdtJetton.tact',
    options: {
        debug: true,
    },
};
