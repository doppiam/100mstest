import {
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from '@100mslive/react-sdk';

function ScreenShare({peer}) {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));

  const {videoRef} = useVideo({
    trackId: screenshareVideoTrack.id,
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
        {peer.name} {peer.isLocal ? '(You)' : ''}
      </div>
    </div>
  );
}

export default ScreenShare;