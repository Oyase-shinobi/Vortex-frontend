import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store/store';
import { closeNotification } from '@/store/notification/slice';

import './NotificationBox.scss';

const NotificationBox = () => {
  const dispatch = useDispatch();
  const { message, isShow } = useSelector(
    (state: RootState) => state.notificationSlice.notification,
  );

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch(closeNotification());
      }, 3500);
    }
  }, [isShow]);

  if (!isShow) return null;

  return <div className="notification-box">{message}</div>;
};

export default NotificationBox;
