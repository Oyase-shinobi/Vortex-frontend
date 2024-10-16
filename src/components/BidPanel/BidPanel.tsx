import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '@uidotdev/usehooks';
import { parseUnits } from 'viem';
import { Network } from 'aptos';
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react';

import QuickEntrySelection from '@/components/QuickEntrySelection/QuickEntrySelection';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import { RootState } from '@/store/store';
import { setIsLoading } from '@/store/loading/slice';
import { setGameMode, setUserEntry, setUserRound } from '@/store/game/slice';
import { openNotification } from '@/store/notification/slice';

import aptos, { functionName } from '@/utils/constants/Aptos';
import DisclaimerModal from '@/utils/modals/DisclaimerModal/DisclaimerModal';
import GameMode from '@/utils/constants/GameMode';
import GameState from '@/utils/constants/GameState';
import LocalStorageKeys from '@/utils/constants/LocalStorageKeys';
import NumberHelper from '@/utils/helpers/NumberHelper';
import StringHelper from '@/utils/helpers/StringHelper';
import { ModalContext } from '@/utils/contexts/ModalContext/ModalContext';

import './BidPanel.scss';

const BidPanel = () => {
  const dispatch = useDispatch();
  const { openModal } = useContext(ModalContext);
  const { balance } = useSelector((state: RootState) => state.userSlice.user);
  const { gameState, userEntry, userRound } = useSelector(
    (state: RootState) => state.gameSlice.game,
  );
  const { price } = useSelector(
    (state: RootState) => state.coinPriceSlice.coinPrice,
  );
  const { account, changeNetwork, network, signAndSubmitTransaction } =
    useWallet();

  const [dontShowDisclaimer] = useLocalStorage(
    LocalStorageKeys.dontShowDisclaimer,
    false,
  );

  const [entryAmount, setEntryAmount] = useState<number | string>(
    userEntry ?? '',
  );
  const [entryRound, setEntryRound] = useState<number | string>(userRound ?? 1);

  const totalEntry = useMemo(() => {
    if (Number(entryRound) <= 0) {
      return 0;
    }
    if (Number(entryAmount) <= 0) {
      return 0;
    }
    return Number(entryAmount) * Number(entryRound);
  }, [entryAmount, entryRound]);
  const totalEntryUsd = totalEntry * price;

  const totalEntryString = StringHelper.numberWithComma(totalEntry);
  const totalEntryUsdString = StringHelper.numberWithComma(totalEntryUsd);

  const addButtonClassname =
    totalEntry <= 0 ||
    gameState === GameState.selecting ||
    gameState === GameState.complete
      ? 'disabled'
      : '';

  const handleQuickSelectionOnClicked = (value: number) => {
    setEntryAmount(value);
    dispatch(setUserEntry(value));
  };

  const handleAddRoundOnClicked = () => {
    setEntryRound(Number(entryRound) + 1);
    dispatch(setUserRound(Number(entryRound) + 1));
  };

  const handleSubtractRoundOnClicked = () => {
    if (Number(entryRound) - 1 <= 0) {
      return;
    }
    setEntryRound(Number(entryRound) - 1);
    dispatch(setUserRound(Number(entryRound) - 1));
  };

  const handleBackOnClicked = () => {
    dispatch(setGameMode(GameMode.view));
  };

  const handleAddOnClicked = async () => {
    if (account === null) return;
    if (!dontShowDisclaimer) {
      openModal(
        new DisclaimerModal({
          entry: Number(entryAmount),
          round: Number(entryRound),
          callback: async () => {
            setEntryRound(1);
            setEntryAmount(0);
          },
        }),
      );
      return;
    }
    const entry = Number(parseUnits(entryAmount.toString(), 8).toString());
    try {
      dispatch(setIsLoading(true));
      const transaction: InputTransactionData = {
        sender: account.address,
        data: {
          function: functionName('enter_game'),
          functionArguments: [entryRound, entry],
        },
      };
      const response = await signAndSubmitTransaction(transaction);
      const result = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      console.log('result', result);

      dispatch(openNotification('Successfully add entry!'));
      dispatch(setIsLoading(false));
      dispatch(setGameMode(GameMode.view));
      dispatch(setUserRound(1));
      dispatch(setUserEntry(null));
      setEntryRound(1);
      setEntryAmount('');
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      dispatch(openNotification(`Error: ${error}`));
    }
  };

  const handleEntryInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '') {
      setEntryAmount('');
      dispatch(setUserEntry(0));
      return;
    }

    const splitDecimalList = value.split('.');
    if (splitDecimalList.length > 1 && splitDecimalList[1].length > 4) {
      return;
    }

    const newValue = Number(
      NumberHelper.toFloor(NumberHelper.convertDotNumber(value)),
    );

    if (newValue === 0) {
      setEntryAmount(value);
      return;
    }

    if (value[value.length - 1] === '0') {
      setEntryAmount(value);
      return;
    }

    if (newValue < 0 || value.includes('-') || value.includes('e')) {
      return;
    }

    setEntryAmount(newValue);
    dispatch(setUserEntry(newValue));
  };

  const handleEntryRoundOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const re = /^[0-9\b]+$/;

    if (value === '') {
      setEntryRound('');
      dispatch(setUserRound(0));
      return;
    }

    const newValue = Number(
      NumberHelper.toFloor(NumberHelper.convertDotNumber(value)),
    );

    if (
      newValue < 0 ||
      value.includes('-') ||
      value.includes('e') ||
      value.includes('.') ||
      !re.test(newValue.toString())
    ) {
      return;
    }

    setEntryRound(newValue);
    dispatch(setUserRound(newValue));
  };

  const handleMaxOnClicked = () => {
    if (entryAmount === '' || entryAmount === 0) {
      setEntryRound(50);
      return;
    }
    const maxRound = Math.floor(
      Number(NumberHelper.formatAptos(balance)) / Number(entryAmount),
    );
    setEntryRound(maxRound > 50 ? 50 : maxRound);
  };

  return (
    <div className="bid-panel">
      <div className="title">{'APT ENTRY PER ROUND'}</div>
      <input
        className="bid-input"
        inputMode="decimal"
        type="number"
        autoComplete="off"
        placeholder={'Enter amount...'}
        value={entryAmount.toString()}
        onChange={handleEntryInputOnChange}
        onWheel={(event) => event.currentTarget.blur()}
        onKeyDown={(e) => {
          if (
            e.key === '-' ||
            e.key === '+' ||
            e.key === 'e' ||
            e.key === 'E'
          ) {
            e.preventDefault();
          }
        }}
        min="0"
      />
      <div className="quick-select-row">
        <QuickEntrySelection
          entryAmount={10}
          handleOnClick={handleQuickSelectionOnClicked}
        />
        <QuickEntrySelection
          entryAmount={100}
          handleOnClick={handleQuickSelectionOnClicked}
        />
        <QuickEntrySelection
          entryAmount={1000}
          handleOnClick={handleQuickSelectionOnClicked}
        />
      </div>
      <div className="bid-round-container">
        <div className="round-container">
          <div className="title">{'NUMBER OF ROUNDS'}</div>
          <div className="round-selector-section">
            <div className="round-selector">
              <ButtonDiv
                className="round-action-button"
                onClick={handleSubtractRoundOnClicked}
              >
                {'-'}
              </ButtonDiv>
              <input
                className="round-number"
                inputMode="numeric"
                pattern="\d+"
                value={entryRound}
                step={1}
                min={1}
                onChange={handleEntryRoundOnChange}
                onKeyDown={(e) => {
                  if (
                    e.key === '-' ||
                    e.key === '+' ||
                    e.key === '.' ||
                    e.key === 'e' ||
                    e.key === 'E'
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              <ButtonDiv
                className="round-action-button"
                onClick={handleAddRoundOnClicked}
              >
                {'+'}
              </ButtonDiv>
            </div>
            <ButtonDiv className="max-button" onClick={handleMaxOnClicked}>
              {'MAX'}
            </ButtonDiv>
          </div>
        </div>

        <div className="total-entry-container">
          <div>{`TOTAL ENTRY: ${totalEntryString}APT($${totalEntryUsdString})`}</div>
          {/*<div>{`EST.GAS SAVING: ${gasSavingString}APT($${gasSavingUsdString})`}</div>*/}
        </div>
      </div>
      <div className="action-buttons">
        <ButtonDiv className="back-button" onClick={handleBackOnClicked}>
          {'Back'}
        </ButtonDiv>
        {network?.chainId !== '2' ? (
          <ButtonDiv
            className={`add-button ${addButtonClassname}`}
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
            className={`add-button ${addButtonClassname}`}
            onClick={handleAddOnClicked}
          >
            {'Add Selection'}
          </ButtonDiv>
        )}
      </div>
    </div>
  );
};

export default BidPanel;
