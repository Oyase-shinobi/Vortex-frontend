## Vortex Frontend

Vortex uses `Nodit` as our custom Aptos fullnode and indexer:

```typescript
const config = new AptosConfig({
  network: Network.TESTNET,
  fullnode: `https://aptos-testnet.nodit.io/${EnvVariables.APTOS_NODIT_KEY}/v1`,
  indexer: `https://aptos-testnet.nodit.io/${EnvVariables.APTOS_NODIT_KEY}/v1/graphql`,
});
const aptos = new Aptos(config);
```

The usage of Nodit Indexer can be found at: `src/utils/helpers/AptosIndexer.ts` and `src/components/ConnectButtonModule/ConnectButtonModule.tsx`.