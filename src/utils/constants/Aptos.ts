import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { Network } from 'aptos';

import EnvVariables from '@/utils/constants/EnvVariables';

const config = new AptosConfig({
  network: 'testnet' as Network.TESTNET,
  // fullnode: `https://aptos-testnet.nodit.io/${EnvVariables.APTOS_NODIT_KEY}/v1`,
  indexer: `https://aptos-testnet.nodit.io/${EnvVariables.APTOS_NODIT_KEY}/v1/graphql`,
});
const aptos = new Aptos(config);

export const functionName = (
  name: string,
): `${string}::${string}::${string}` => {
  return `${EnvVariables.CONTRACT_ADDRESS}::${EnvVariables.MODULE_NAME}::${name}`;
};

export default aptos;
