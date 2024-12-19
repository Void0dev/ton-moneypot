# MoneyPot game

https://verifier.ton.org/EQDc1gynhAOQ1ErvYspbK7ZOD28Cj5ny5tOd0JEkQn3U7JuQ?testnet

============================================================================================
Contract Address (testnet)
============================================================================================

kQDc1gynhAOQ1ErvYspbK7ZOD28Cj5ny5tOd0JEkQn3U7CAa

============================================================================================
Please, follow deployment link
============================================================================================

https://verifier.ton.org/tactDeployer/Qmein1kgVbPwucSzUrCkHm2N75KiGamJwG5cp3xRuDR41Y?testnet

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

