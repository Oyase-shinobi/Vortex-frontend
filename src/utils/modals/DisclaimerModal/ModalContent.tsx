import { useContext, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { parseUnits } from 'viem';
import {
  useWallet,
  InputTransactionData,
} from '@aptos-labs/wallet-adapter-react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import { setGameMode, setUserRound, setUserEntry } from '@/store/game/slice';
import { openNotification } from '@/store/notification/slice';
import { setIsLoading } from '@/store/loading/slice';

import aptos, { functionName } from '@/utils/constants/Aptos';
import GameMode from '@/utils/constants/GameMode';
import LocalStorageKeys from '@/utils/constants/LocalStorageKeys';
import Media from '@/utils/constants/Media';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { ModalContext } from '@/utils/contexts/ModalContext/ModalContext';

import './DisclaimerModal.scss';

type ModalContentType = {
  entry: number;
  round: number;
  callback: () => void;
};

const ModalContent = ({ entry, round, callback }: ModalContentType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useContext(ModalContext);
  const { isWindowSmall } = useWindowSize();
  const { account, signAndSubmitTransaction } = useWallet();
  const [dontShowDisclaimer, saveDontShowDisclaimer] = useLocalStorage(
    LocalStorageKeys.dontShowDisclaimer,
    false,
  );

  const [isCheck, setIsCheck] = useState(dontShowDisclaimer);

  const handleCheckboxClicked = () => {
    setIsCheck(!isCheck);
    saveDontShowDisclaimer(!isCheck);
  };

  const handleReadRulesOnClicked = () => {
    navigate('/rules');
    closeModal();
  };

  const handlePlayOnClicked = async () => {
    try {
      dispatch(setIsLoading(true));

      const entryBigint = parseUnits(entry.toString(), 8);
      const transaction: InputTransactionData = {
        sender: account!.address,
        data: {
          function: functionName('enter_game'),
          functionArguments: [round, Number(entryBigint)],
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
      callback();
      closeModal();
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
    }
  };

  const checkboxClassname = isCheck ? 'checked' : '';

  return (
    <div className="disclaimer-modal">
      <ButtonDiv className="close-button" onClick={closeModal}>
        <img src={Media.icons.closeSmall} alt="close" className="close-icon" />
      </ButtonDiv>

      <div className="modal-title">{'VORTEX'}</div>

      <div className="modal-description">
        {
          'GM. By entering a round, you indicate that you fully understand the rules of the game, and that '
        }
        <span className="green">
          {
            'if you lose a round, you’ll lose all the assets that you entered into the prize pot.'
          }
        </span>
      </div>

      <div className="action-row">
        <ButtonDiv className="dont-show-row" onClick={handleCheckboxClicked}>
          <div className={`dont-show-checkbox ${checkboxClassname}`}>
            {isCheck && (
              <img src={Media.icons.check} alt="check" className="check-icon" />
            )}
          </div>
          <div className="dont-show-text">{'Don’t show me this again'}</div>
        </ButtonDiv>
        <img className="logo" src={Media.gifs.vertex} alt="logo" />
      </div>

      <div className="button-row">
        <ButtonDiv className="rule-button" onClick={handleReadRulesOnClicked}>
          {'Review the rules'}
        </ButtonDiv>
        <ButtonDiv className="play-button" onClick={handlePlayOnClicked}>
          {isWindowSmall ? "Let's play!" : 'I understand, let’s play!'}
        </ButtonDiv>
      </div>
    </div>
  );
};

export default ModalContent;
