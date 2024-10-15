import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';

import DrawingAnimation from '@/components/DrawingAnimation/DrawingAnimation';
import PlayerEntryCard from '@/components/PlayerEntryCard/PlayerEntryCard';
import WheelWinner from '@/components/WheelWinner/WheelWinner';

import { RootState } from '@/store/store';
import { setGameState } from '@/store/game/slice';

import ColorHelper from '@/utils/helpers/ColorHelper';
import GameState from '@/utils/constants/GameState';
import Media from '@/utils/constants/Media';
import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import { PlayerEntryWithIndex } from '@/utils/types';

import './SpinWheel.scss';

type ChartDataType = {
  title: `0x${string}`;
  value: number;
  color: string;
};

const SpinWheel = () => {
  const dispatch = useDispatch();
  const {
    gameState,
    playerEntryList,
    roundWinner,
    winnerAddress,
    round,
    prizePool,
    colors,
  } = useSelector((state: RootState) => state.gameSlice.game);

  const [hoverPlayer, setHoverPlayer] = useState<PlayerEntryWithIndex | null>(
    null,
  );
  const [chartAngle, setChartAngle] = useState(270);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current ?? '');
    };
  }, []);

  useEffect(() => {
    setChartAngle(270);
  }, [round]);

  useEffect(() => {
    if (gameState === GameState.idle) {
      clearInterval(intervalIdRef.current ?? '');
      setChartAngle(270);
      return;
    }
    if (gameState === GameState.selecting) {
      intervalIdRef.current = setInterval(() => {
        setChartAngle((prevAngle) =>
          prevAngle + 10 >= 360 ? 0 : prevAngle + 10,
        );
      }, 10);

      return () => {
        clearInterval(intervalIdRef.current ?? '');
      };
    } else {
      clearInterval(intervalIdRef.current ?? '');
    }
  }, [gameState]);

  useEffect(() => {
    if (
      roundWinner !== null &&
      winnerAddress !== null &&
      gameState === GameState.selecting
    ) {
      if (roundWinner.round !== round) {
        return;
      }
      const winnerIndex = chartData.findIndex(
        (item: ChartDataType) => item.title === winnerAddress,
      );
      if (winnerIndex === -1) {
        return;
      }
      let sumToWinner = 0;
      for (let index = 0; index < winnerIndex; index += 1) {
        sumToWinner += chartData[index].value;
      }
      sumToWinner += chartData[winnerIndex].value / 2;
      const ratio = (sumToWinner * 360) / prizePool;
      const lastAngle = 270 - ratio > 0 ? 270 - ratio : 630 - ratio;
      clearInterval(intervalIdRef.current ?? '');
      spinToWinner(lastAngle);
    }
  }, [winnerAddress, roundWinner, gameState, round]);

  const spinToWinner = (targetAngle: number) => {
    // console.log('spin to winner');
    let spinSpeed = 5;
    let remainAngles = 720 + (360 - chartAngle) + targetAngle;

    intervalIdRef.current = setInterval(() => {
      setChartAngle((prevAngle) => {
        if (remainAngles < 480) {
          spinSpeed = 5;
        }
        if (remainAngles < 420) {
          spinSpeed = 3.75;
        }
        if (remainAngles < 360) {
          spinSpeed = 2.5;
        }
        if (remainAngles < 300) {
          spinSpeed = 1.75;
        }
        if (remainAngles < 240) {
          spinSpeed = 1;
        }
        if (remainAngles < 120) {
          spinSpeed = 0.5;
        }
        if (remainAngles < 30) {
          spinSpeed = 0.25;
        }
        if (remainAngles < 10) {
          spinSpeed = 0.1;
        }
        if (remainAngles <= 0) {
          clearInterval(intervalIdRef.current ?? '');
          setChartAngle(targetAngle);
          dispatch(setGameState(GameState.complete));
          return targetAngle;
        }

        remainAngles -= spinSpeed;
        return prevAngle + spinSpeed >= 360 ? 0 : prevAngle + spinSpeed;
      });
    }, 10);
  };

  const chartData: ChartDataType[] = useMemo(() => {
    return playerEntryList.map((item: PlayerEntry) => ({
      title: item.player,
      value: Number(item.entry),
      color: ColorHelper(colors, item.index),
    }));
  }, [playerEntryList]);

  const entrySum = useMemo(() => {
    return playerEntryList.reduce(
      (accum: number, item: PlayerEntry) => accum + Number(item.entry),
      0,
    );
  }, [playerEntryList]);

  const entryRatio = (entryAmount: number) => (entryAmount * 100) / entrySum;

  const handleOnMouseOver = (event: any, dataIndex: number) => {
    const player = playerEntryList[dataIndex];
    setHoverPlayer(player);
  };

  const handleOnMouseOut = () => {
    setHoverPlayer(null);
  };

  return (
    <div className="spin-wheel">
      <img src={Media.images.greenWheel} className="wheel" alt="wheel" />

      <div className="pie-chart">
        <PieChart
          data={chartData}
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
          startAngle={chartAngle}
          segmentsShift={0}
        />
      </div>

      <img
        src={Media.images.greenWheelPointer}
        className="pointer"
        alt="pointer"
      />

      {gameState === GameState.complete ? (
        <div className="wheel-winner-container">
          <WheelWinner />
        </div>
      ) : gameState === GameState.selecting ? (
        <img
          src={Media.gifs.greenWheelCenter}
          className="center"
          alt="center"
        />
      ) : (
        <img src={Media.images.greenCenter} className="center" alt="center" />
      )}

      {gameState === GameState.selecting && (
        <div className="drawing-animation-container">
          <DrawingAnimation />
        </div>
      )}

      {hoverPlayer && (
        <div className="player-entry-card-container">
          <PlayerEntryCard
            color={ColorHelper(colors, hoverPlayer.index)}
            percentage={entryRatio(Number(hoverPlayer.entry))}
            entry={Number(hoverPlayer.entry)}
          />
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
