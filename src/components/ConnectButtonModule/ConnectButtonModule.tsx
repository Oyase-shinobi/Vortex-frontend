import { useEffect, useMemo, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import AptosIndexer from '@/utils/helpers/AptosIndexer';
import Media from '@/utils/constants/Media';
import NumberHelper from '@/utils/helpers/NumberHelper';
import StringHelper from '@/utils/helpers/StringHelper';
import useClickOutside from '@/utils/hooks/useClickOutside';

import './ConnectButtonModule.scss';

const ConnectButton = () => {
  const { connected, disconnect, account } = useWallet();
  const { isOpen, ref, setIsOpen } = useClickOutside(false);

  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false);
  const [balance, setBalance] = useState(BigInt(0));

  let refreshBalanceInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (connected && account?.address !== null) {
      fetchBalance();
      refreshBalanceInterval = setInterval(async () => {
        await fetchBalance();
      }, 4000);

      return () => {
        clearInterval(refreshBalanceInterval!);
      };
    }
    if (!connected) {
      if (refreshBalanceInterval) {
        clearInterval(refreshBalanceInterval);
      }
    }
  }, [connected, account]);

  const fetchBalance = async () => {
    if (account === null || account.address === null) return 0;
    try {
      const result = await AptosIndexer.getAptBalance(account.address);
      setBalance(BigInt(result));
    } catch (error) {
      console.error(error);
    }
  };

  const formattedBalance = useMemo(() => {
    if (!connected) return '0';
    return Number(NumberHelper.formatAptos(balance)).toFixed(4);
  }, [connected, balance]);

  useEffect(() => {
    setIsOpenWalletModal(false);
  }, [connected]);

  const handleAddressOnClicked = () => {
    setIsOpen(!isOpen);
  };

  const disconnectClassname = isOpen ? 'disconnect-open' : '';

  if (!connected) {
    return (
      <ButtonDiv
        className="connect-button"
        onClick={() => {
          if (!isOpenWalletModal) {
            setIsOpenWalletModal(true);
          }
        }}
      >
        {'Connect Wallet'}
        <div style={{ display: 'none' }}>
          <WalletSelector
            isModalOpen={isOpenWalletModal}
            setModalOpen={setIsOpenWalletModal}
          />
        </div>
      </ButtonDiv>
    );
  }

  return (
    <div className="wallet-section">
      <div className="token-balance">
        <img src={Media.images.aptos} alt="tt" className="tt-icon" />
        <div>{`${formattedBalance}APT`}</div>
      </div>
      <ButtonDiv
        className={`wallet-address ${disconnectClassname}`}
        onClick={handleAddressOnClicked}
      >
        {StringHelper.truncateAddress(account?.address as string)}

        {isOpen && (
          <div className="wallet-address-disconnect" ref={ref}>
            <div className="address">
              {StringHelper.truncateAddress(account?.address as string)}
            </div>
            <ButtonDiv className="disconnect" onClick={() => disconnect()}>
              <img
                src={Media.icons.disconnect}
                alt="disconnect"
                className="disconnect-icon"
              />
              <div>{'Disconnect'}</div>
            </ButtonDiv>
          </div>
        )}
      </ButtonDiv>
    </div>
  );
};

export default ConnectButton;
