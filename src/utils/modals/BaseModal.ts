import { ReactElement } from 'react';

/**
 * Represents a modal.
 * @class
 */
class BaseModal {
  /**
   * Close modal when backdrop is clicked.
   * @member
   */
  backdropClose = false;

  /**
   * Closes the modal.
   * @function
   */
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  onClose = () => {};

  /**
   * Gets the name of the modal.
   * @function
   * @return {string} - the title of the modal
   */
  getModalName: () => ReactElement | string = (): string => '';

  /**
   * Gets the content of the modal.
   * @function
   * @return {ReactElement | string} - the content of the modal
   */
  getModalContent: () => ReactElement | string = (): ReactElement | string =>
    '';
}

export default BaseModal;
