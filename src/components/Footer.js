import {useAVToggle, useHMSActions} from '@100mslive/react-sdk';
import DeviceSettings from './DeviceSettings';

function Footer() {
  const {isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo} =
    useAVToggle();

  const hmsActions = useHMSActions();

  const quitRoom = () => {
    hmsActions.leave();
  };

  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? 'Mute' : 'Unmute'}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? 'Hide' : 'Unhide'}
      </button>
      <button className="btn-control" onClick={quitRoom}>
        Quit
      </button>
      <DeviceSettings />
    </div>
  );
}

export default Footer;
