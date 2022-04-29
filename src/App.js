import JoinForm from './components/JoinForm';
import {useEffect} from 'react';
import {
  selectIsConnectedToRoom,
  selectIsSomeoneScreenSharing,
  selectPeerCount,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import Footer from './components/Footer';
import Conference from './components/Conference';
import Preview from './components/Preview';

export default function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const count = useHMSStore(selectPeerCount);
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      {isConnected ? (
        <>
          <h3>Connessi: {count}</h3>
          {screenshareOn && <h3>Screenshare attivo</h3>}
          <Conference />
          <Footer />
        </>
      ) : (
        <Preview />
      )}
    </div>
  );
}
