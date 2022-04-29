import {HMSNotificationTypes, useHMSNotifications} from '@100mslive/react-sdk';
import {useEffect} from 'react';
import toast from 'react-hot-toast';

export default function useNotifications() {
  const notification = useHMSNotifications();

  useEffect(() => {
    if (!notification) {
      return;
    }

    console.log('notification type', notification.type);
    console.log('data', notification.data);

    // you can use the following to show appropriate toast notifications for eg.
    switch (notification.type) {
      case HMSNotificationTypes.PEER_JOINED:
        console.log(`${notification.data.name} joined`);
        toast.success(`${notification.data.name} joined`);
        break;
      case HMSNotificationTypes.PEER_LEFT:
        console.log(`${notification.data.name} left`);
        toast.success(`${notification.data.name} left`);
        break;
      case HMSNotificationTypes.NEW_MESSAGE:
        console.log(
          `${notification.data.message} received from ${notification.data.senderName}`
        );
        break;
      case HMSNotificationTypes.ERROR:
        console.log('[Error]', notification.data);
        console.log('[Error Code]', notification.data.code);
        break;
      case HMSNotificationTypes.RECONNECTING:
        console.log('[Reconnecting]', notification.data);
        break;
      case HMSNotificationTypes.RECONNECTED:
        console.log('[Reconnected]');
        break;
      case HMSNotificationTypes.NAME_UPDATED:
      case HMSNotificationTypes.METADATA_UPDATED:
      case HMSNotificationTypes.ROLE_UPDATED:
        console.log(
          `peer updated(${notification.type}), new peer=`,
          notification.data
        );
        break;
      case HMSNotificationTypes.TRACK_DEGRADED:
        console.log(
          `track - ${notification.data} degraded due to poor network`
        );
        break;
      case HMSNotificationTypes.TRACK_RESTORED:
        console.log(`track - ${notification.data} recovered`);
        break;
      case HMSNotificationTypes.ROOM_ENDED:
        console.log(`room ended, reason - ${notification.data.reason}`);
        break;
      case HMSNotificationTypes.REMOVED_FROM_ROOM:
        console.log(`removed from room, reason - ${notification.data.reason}`);
        break;
      case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
        console.log(`device changed - ${notification.data}`);
        break;
      default:
        break;
    }
  }, [notification]);

  //   return <div>Notification: {notification?.type}</div>;
}
