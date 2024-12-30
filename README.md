# MoneyPot game

## Deployment

### Testnet
1. Moneypot https://verifier.ton.org/EQCRyI1SzvGHAbThdWKulMdegp-rZDX5UPdY14H30LMoFiyn?testnet

Wallets Addresses for incoming bets:
1. TON EQCRyI1SzvGHAbThdWKulMdegp-rZDX5UPdY14H30LMoFiyn
2. MPT EQAD9d5bGept8Q7yK1dxr2IPyXUGaRTidhtk37N3CB6eNgeX

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

