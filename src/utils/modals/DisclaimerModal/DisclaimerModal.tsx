import BaseModal from '@/utils/modals/BaseModal';
import ModalContent from '@/utils/modals/DisclaimerModal/ModalContent';

class DisclaimerModal extends BaseModal {
  entry: number;
  round: number;
  callback: () => void;

  constructor({
    entry,
    round,
    callback,
  }: {
    entry: number;
    round: number;
    callback: () => void;
  }) {
    super();
    this.entry = entry;
    this.round = round;
    this.callback = callback;
  }

  backdropClose = false;

  getModalName = () => 'disclaimer-modal';

  getModalContent = () => (
    <ModalContent
      entry={this.entry}
      round={this.round}
      callback={this.callback}
    />
  );
}

export default DisclaimerModal;
