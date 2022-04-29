import {
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  selectLocalPeerID,
  selectRoomState,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import {useState} from 'react';
import Peer from './Peer';
import DeviceSettings from './DeviceSettings';

interface PreviewProps {
  isAudioMuted?: boolean;
  isVideoMuted?: boolean;
  captureNetworkQualityInPreview?: boolean;
  rememberDeviceSelection?: boolean;
}

const Preview = ({
  isAudioMuted,
  isVideoMuted,
  captureNetworkQualityInPreview,
  rememberDeviceSelection,
}: PreviewProps) => {
  const [name, setName] = useState('');
  const hmsActions = useHMSActions();
  const {isLocalAudioEnabled, isLocalVideoEnabled} = useAVToggle();
  const localPeer = useHMSStore(selectLocalPeer);
  const roomState = useHMSStore(selectRoomState);

  const handlePreview = async () => {
    const config = {
      userName: name,
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI2OTQ0ODdmZjY4OGMwMzdhMzdlZTVmIiwicm9vbV9pZCI6IjYyNmFiYzNkZmY2ODhjMDM3YTM4MGEwYSIsInVzZXJfaWQiOiJvdW5jdWxkeSIsInJvbGUiOiJndWVzdCIsImp0aSI6ImI5NTgzMDY3LTU2OTktNDExNS05NDIyLTZhMTc2NjI4MjVlNiIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NTEzMDY5NjN9.9o4EUX9KvQ5XsBaOa_RLk5TTxJRFoa0ByXe34YbE5UM', // client-side token generated from your token service
      settings: {
        // initial states
        isAudioMuted: isAudioMuted || false,
        isVideoMuted: isVideoMuted || false,
      },
      rememberDeviceSelection: rememberDeviceSelection || true, // remember manual device change
      captureNetworkQualityInPreview: captureNetworkQualityInPreview || true, // whether to measure network score in preview
    };
    await hmsActions.preview(config);
  };

  const handleJoin = () => {
    hmsActions.join({
      userName: localPeer.name,
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI2OTQ0ODdmZjY4OGMwMzdhMzdlZTVmIiwicm9vbV9pZCI6IjYyNmFiYzNkZmY2ODhjMDM3YTM4MGEwYSIsInVzZXJfaWQiOiJvdW5jdWxkeSIsInJvbGUiOiJndWVzdCIsImp0aSI6ImI5NTgzMDY3LTU2OTktNDExNS05NDIyLTZhMTc2NjI4MjVlNiIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NTEzMDY5NjN9.9o4EUX9KvQ5XsBaOa_RLk5TTxJRFoa0ByXe34YbE5UM',
    });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      {roomState === 'Disconnected' && (
        <>
          <h1>Benvenuto!</h1>
          <p>Inserisci il tuo nome e prova il tuo dispositivo</p>
          <input
            required
            value={name}
            onChange={handleName}
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <button onClick={handlePreview}>Preview</button>
        </>
      )}
      <PreviewVideo />
      {roomState === 'Preview' && <button onClick={handleJoin}>Join</button>}
    </div>
  );
};

export default Preview;

const PreviewVideo = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  return (
    <div>
      {localPeer && (
        <>
          <Peer peer={localPeer} />
          <DeviceSettings />
        </>
      )}
    </div>
  );
};
