import {
  selectDevices,
  selectIsLocalScreenShared,
  selectLocalMediaSettings,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';

const DeviceSettings = () => {
  const hmsActions = useHMSActions();

  // {audioInput, audioOutput, videoInput}
  const devices = useHMSStore(selectDevices);

  // {audioInputDeviceId, audioOutputDeviceId, videoInputDeviceId}
  const selected = useHMSStore(selectLocalMediaSettings);

  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  console.log(devices, selected);

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

      {!amIScreenSharing && (
        <button onClick={() => shareScreen()}>Share Screen</button>
      )}
      {amIScreenSharing && (
        <button onClick={() => stopShare()}>Stop Share Screen</button>
      )}
    </>
  );
};

export default DeviceSettings;
