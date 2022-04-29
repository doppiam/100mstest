import {
  selectIsLocalScreenShared,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import DeviceSettings from './DeviceSettings';

function Footer() {
  const hmsActions = useHMSActions();

  const quitRoom = () => {
    hmsActions.leave();
  };

  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  const shareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);
    } catch (error) {
      // an error will be thrown if user didn't give access to share screen
    }
  };

  const stopShare = () => {
    hmsActions.setScreenShareEnabled(false);
  };

  return (
    <div className="control-bar">
      <DeviceSettings />
      {!amIScreenSharing && (
        <button onClick={() => shareScreen()}>Share Screen</button>
      )}
      {amIScreenSharing && (
        <button onClick={() => stopShare()}>Stop Share Screen</button>
      )}
      <button className="btn-control" onClick={quitRoom}>
        Quit
      </button>
    </div>
  );
}

export default Footer;
