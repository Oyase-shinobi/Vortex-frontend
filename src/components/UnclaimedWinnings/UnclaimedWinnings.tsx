import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Network } from 'aptos';
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import { setIsLoading } from '@/store/loading/slice';
import { openNotification } from '@/store/notification/slice';

import aptos, { functionName } from '@/utils/constants/Aptos';
import ApiService from '@/utils/api/ApiService';
import Media from '@/utils/constants/Media';
import NumberHelper from '@/utils/helpers/NumberHelper';
import StringHelper from '@/utils/helpers/StringHelper';
import useWindowSize from '@/utils/hooks/useWindowSize';

import './UnclaimedWinnings.scss';

const UnclaimedWinnings = () => {
  const dispatch = useDispatch();
  const {
    account,
    connected,
    network,
    changeNetwork,
    signAndSubmitTransaction,
  } = useWallet();
  const { isWindowSmall } = useWindowSize();

  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false);
  const [unclaimedAmount, setUnclaimedAmount] = useState<number | null>(null);

  const fetchUnClaimedAmount = (address: `0x${string}` | undefined) => {
    if (address === undefined) return;
    ApiService.player.getUnclaimedPrize(address).then((res) => {
      setUnclaimedAmount(Number(NumberHelper.formatAptos(res)));
    });
  };

  useEffect(() => {
    if (connected && account !== null) {
      fetchUnClaimedAmount(account.address as `0x${string}`);
    }
    return () => {
      setUnclaimedAmount(null);
    };
  }, [connected, account]);

  const claimPrize = async () => {
    try {
      dispatch(setIsLoading(true));

      const transaction: InputTransactionData = {
        sender: account!.address,
        data: {
          function: functionName('claim_prize'),
          functionArguments: [],
        },
      };
      const response = await signAndSubmitTransaction(transaction);
      const result = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      console.log('result', result);

      fetchUnClaimedAmount(account?.address as `0x${string}`);
      dispatch(setIsLoading(false));
      dispatch(openNotification('Claim successfully confirmed!'));
    } catch (error) {
      dispatch(setIsLoading(false));
      dispatch(openNotification(`Error: ${error}`));
      console.error(error);
    }
  };

  return (
    <div className="unclaimed-winnings">
      <div className="title">{'Your Unclaimed Winnings'}</div>
      <div className="unclaimed-section">
        <img className="tt-icon" src={Media.images.aptos} alt="tt" />
        <div className="unclaimed-amount">
          {unclaimedAmount !== null
            ? `${StringHelper.numberWithComma(unclaimedAmount)}APT`
            : '?APT'}
        </div>
        {connected ? (
          network?.chainId !== '2' ? (
            <ButtonDiv
              className="claim-button"
              onClick={() => {
                changeNetwork(Network.TESTNET)
                  .then()
                  .catch((error) => {
                    dispatch(openNotification(error));
                  });
              }}
            >
              {'Switch Network'}
            </ButtonDiv>
          ) : (
            <ButtonDiv
              className="claim-button"
              onClick={claimPrize}
              disabled={unclaimedAmount === null || unclaimedAmount <= 0}
            >
              {'Claim Now'}
            </ButtonDiv>
          )
        ) : (
          <ButtonDiv
            className="claim-button"
            onClick={() => {
              if (!isOpenWalletModal) {
                setIsOpenWalletModal(true);
              }
            }}
          >
            {isWindowSmall ? 'Connect' : 'Connect Wallet'}
            <div style={{ display: 'none' }}>
              <WalletSelector
                isModalOpen={isOpenWalletModal}
                setModalOpen={setIsOpenWalletModal}
              />
            </div>
          </ButtonDiv>
        )}
      </div>
    </div>
  );
};

export default UnclaimedWinnings;
