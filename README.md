# MoneyPot game

## Deployment

### Testnet
1. MoneypotMaster https://verifier.ton.org/EQBbHy8pPbITcJgNG8dBePGZSQpC4TeY843DFG_jP9Aha1HK?testnet
2. TestJettonMaster https://verifier.ton.org/EQDaBJqenXzLPhuhqo3-4ZHyBXCvA4lnY8-0qHH2CkUzinjq?testnet

Wallets Addresses for incoming bets:
1. TON EQADPO8Yiz0uzKh6voecVq8VfWijcTtphTKX3Wo1wEK5CrDP
2. TestJetton: EQCNtzVQkhvNoXqZQKucNlOvN0v135aTsInzbXwtqat7VWmu

### Mainnet
TBA

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`

### Contract Interface

Implements: Stoppable, Ownable

Moneypot contract processes following messages:

1. Deposit (Anyone)
2. Withdraw (Admin only)
3. Declare round winner (Admin only)

MVP: All jettons on wallet.

