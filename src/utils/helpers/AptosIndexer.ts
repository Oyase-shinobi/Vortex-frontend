import aptos from '@/utils/constants/Aptos';

class AptosIndexer {
  static getAptBalance = async (address: string) => {
    const result = (await aptos.queryIndexer({
      query: {
        query: `
            query MyQuery {
              current_fungible_asset_balances(
                where: {
                  owner_address: {
                    _eq: "${address}"
                  },
                  metadata: { 
                    asset_type: {
                      _eq: "0x1::aptos_coin::AptosCoin"
                    }
                  }
                }
              ) {
                owner_address
                amount
                metadata {
                  asset_type
                }
              }
            }

          `,
      },
    })) as any;
    const aptResult = result.current_fungible_asset_balances;
    if (aptResult.length === 0) {
      return 0;
    }
    return aptResult[0].amount;
  };
}

export default AptosIndexer;
