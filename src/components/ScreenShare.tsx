import {
  HMSPeer,
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from '@100mslive/react-sdk';

interface ScreenShareProps {
  peer: HMSPeer;
}

function ScreenShare({peer}: ScreenShareProps) {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));

  const {videoRef} = useVideo({
    trackId: screenshareVideoTrack ? screenshareVideoTrack.id : undefined,
  });

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? 'local' : ''}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? '(You)' : ''} sta presentando
      </div>
    </div>
  );
}

export default ScreenShare;
