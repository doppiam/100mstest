import {
  selectDevices,
  selectIsLocalScreenShared,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';

const DeviceSettings = () => {
  const {isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo} =
    useAVToggle();

  const hmsActions = useHMSActions();

  // {audioInput, audioOutput, videoInput}
  const devices = useHMSStore(selectDevices);

  // {audioInputDeviceId, audioOutputDeviceId, videoInputDeviceId}
  const selected = useHMSStore(selectLocalMediaSettings);

  // show user a settings component to manually choose device
  // The following selected devices can be obtained when changed from your UI.

  // // Update AudioInput device by calling
  // hmsActions.setAudioSettings({ deviceId: selected.selectedAudioDeviceID });
  // // Update VideoInput device by calling
  // hmsActions.setVideoSettings({ deviceId: selected.selecedVideoDeviceID });
  // // Update AudioOutput device by calling
  // hmsActions.setAudioOutputDevice(selected.selectedAudioOutputDeviceID);

  return (
    <>
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? 'Mute' : 'Unmute'}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? 'Hide' : 'Unhide'}
      </button>
      <select
        onChange={(e) =>
          hmsActions.setAudioSettings({deviceId: e.target.value})
        }
      >
        {devices.audioInput.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <select
        onChange={(e) =>
          hmsActions.setVideoSettings({deviceId: e.target.value})
        }
      >
        {devices.videoInput.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DeviceSettings;
