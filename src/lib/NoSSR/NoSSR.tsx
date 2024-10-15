import * as React from 'react';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';

const DefaultOnSSR = () => <Fragment />;

interface NoSSRProps {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer?: boolean;
  /**
   * The fallback content to display.
   * @default null
   */
  fallback?: React.ReactNode;
}

const NoSSR: FC<NoSSRProps> = (props: NoSSRProps): ReactElement => {
  const { children, fallback, onSSR = <DefaultOnSSR /> } = { ...props };
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  return <Fragment>{canRender ? children : fallback || onSSR}</Fragment>;
};

export default NoSSR;
