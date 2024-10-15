import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';
import Countdown from '@/components/Countdown/Countdown';

import { RootState } from '@/store/store';
import { setGameMode } from '@/store/game/slice';

import ApiService from '@/utils/api/ApiService';
import ColorHelper from '@/utils/helpers/ColorHelper';
import GameMode from '@/utils/constants/GameMode';
import GameState from '@/utils/constants/GameState';
import Media from '@/utils/constants/Media';
import NumberHelper from '@/utils/helpers/NumberHelper';
import StringHelper from '@/utils/helpers/StringHelper';
import useWindowSize from '@/utils/hooks/useWindowSize';
import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import { PlayerEntryWithIndex } from '@/utils/types';

import './EntryPanel.scss';

const EntryPanel = () => {
  const dispatch = useDispatch();
  const { connected, account, connect } = useWallet();
  const { isWindowSmall } = useWindowSize();

  const [futureEntryCount, setFutureEntryCount] = useState(0);
  const [futureEntryTotal, setFutureEntryTotal] = useState('0');

  const {
    gameMode,
    gameState,
    prizePool,
    playerEntryList,
    countdown,
    round,
    colors,
  } = useSelector((state: RootState) => state.gameSlice.game);

  useEffect(() => {
    if (account === null) return;
    if (round === null) return;
    ApiService.player
      .getFutureEntry(account.address as `0x${string}`, round)
      .then((futureEntry) => {
        setFutureEntryCount(futureEntry.futureEntryCount);
        setFutureEntryTotal(
          futureEntry.futureEntryTotal === 0
            ? '0'
            : Number(
                NumberHelper.formatAptos(BigInt(futureEntry.futureEntryTotal)),
              ).toFixed(4),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [account, round, prizePool]);

  useEffect(() => {
    if (!connected) {
      setFutureEntryCount(0);
      setFutureEntryTotal('0');
    }
  }, [connected]);

  const prizePoolString = StringHelper.numberWithComma(prizePool);

  const handleEnterOnClicked = () => {
    dispatch(setGameMode(GameMode.entry));
  };

  const myEntry: PlayerEntryWithIndex | null = useMemo(() => {
    if (!connected) return null;
    const playerEntry = playerEntryList.find(
      (item: PlayerEntry) => item.player === account?.address,
    );
    return playerEntry === undefined || playerEntry === null
      ? null
      : playerEntry;
  }, [connected, playerEntryList]);

  const actionButton = useMemo(() => {
    if (!connected) {
      return (
        <ButtonDiv className="action-button" onClick={() => connect}>
          {'Connect Wallet'}
        </ButtonDiv>
      );
    }
    if (isWindowSmall) {
      return null;
    }
    if (gameState === GameState.selecting) {
      return (
        <ButtonDiv className="action-button disabled">{'Drawing...'}</ButtonDiv>
      );
    }
    if (gameState === GameState.complete) {
      return (
        <ButtonDiv className="action-button disabled">
          {'Round Closed'}
        </ButtonDiv>
      );
    }
    if (gameMode === GameMode.entry) {
      return null;
    }
    return (
      <ButtonDiv className="action-button" onClick={handleEnterOnClicked}>
        {'Enter'}
      </ButtonDiv>
    );
  }, [gameMode, gameState, connected, isWindowSmall]);

  const myEntryClassname = myEntry === null ? '' : 'my-entry';

  const fixedClassname = isWindowSmall && !connected ? 'fixed' : '';

  const yourEntryString =
    myEntry === null ? 0 : StringHelper.numberWithComma(Number(myEntry.entry));
  const winChance =
    myEntry === null
      ? 0
      : ((Number(myEntry.entry) / prizePool) * 100).toFixed(2);

  return (
    <div className={`entry-panel ${fixedClassname}`}>
      <div className="countdown-prize-player-section">
        <Countdown time={countdown} gameState={gameState} />
        <div className="prize-pool">
          <div className="section-title">{'PRIZE POOL'}</div>
          <div className="section-content">
            <img src={Media.images.aptos} alt="tt" className="tt-icon" />
            <div>{`${prizePoolString}APT`}</div>
          </div>
        </div>
        <div className="player-count">
          <div className="section-title">{'PLAYERS'}</div>
          <div className="section-content">{`${playerEntryList.length}`}</div>
        </div>
      </div>

      <div className="entry-section">
        <div
          className={`entry-info-section ${myEntryClassname}`}
          style={{
            borderColor:
              myEntry === null ? '' : ColorHelper(colors, myEntry.index),
          }}
        >
          {myEntry && (
            <div
              className="color-bar"
              style={{ background: ColorHelper(colors, myEntry.index) }}
            />
          )}

          <div className="current-entry">
            <div className="win-chance">
              <div className="section-title">
                {!connected || isWindowSmall ? 'WIN CHANCE' : 'YOUR WIN CHANCE'}
              </div>
              <div className="section-content">{`${winChance}%`}</div>
            </div>

            <div className="your-entries">
              <div className="section-title">{'YOUR ENTRIES'}</div>
              <div className="section-content">
                <img src={Media.images.aptos} alt="tt" className="tt-icon" />
                <div>{`${yourEntryString}APT`}</div>
              </div>
            </div>
          </div>

          <div className="future-entry">
            <div className="section-column">
              <div className="section-title">
                {!connected || isWindowSmall
                  ? 'FUTURE ENTRIES'
                  : 'YOUR FUTURE ENTRIES'}
                {isWindowSmall && ':'}
              </div>
              <div className="section-content">{futureEntryCount}</div>
            </div>

            <div className="section-column">
              <div className="section-title">
                {'TOTAL'}
                {isWindowSmall && ':'}
              </div>
              <div className="section-content">{`${futureEntryTotal}APT`}</div>
            </div>
          </div>
        </div>

        {actionButton}
      </div>
    </div>
  );
};

export default EntryPanel;
