import React, { MouseEventHandler, RefCallback, RefObject } from 'react';

import './ButtonDiv.scss';

interface ButtonDivType {
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  innerRef?: RefObject<HTMLDivElement> | RefCallback<HTMLDivElement>;
  id?: string;
  disabled?: boolean;
}

const ButtonDiv = ({
  children,
  className,
  onClick,
  innerRef,
  id,
  disabled = false,
}: ButtonDivType) => {
  const disabledClassname = disabled ? 'disabled' : '';

  return (
    <div
      className={`button-div ${className ?? ''} ${disabledClassname}`}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        if (disabled || !onClick) return;
        onClick(event);
      }}
      ref={innerRef}
      id={id}
    >
      {children}
    </div>
  );
};

export default ButtonDiv;
