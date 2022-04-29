import {useRef, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {
  HMSPeer,
  useHMSStore,
  useHMSActions,
  selectCameraStreamByPeerID,
  selectConnectionQualityByPeerID,
  selectPeerAudioByID,
} from '@100mslive/react-sdk';

const QUALITY: Record<number, string> = {
  0: 'Reconnecting',
  1: 'Very Bad Connection',
  2: 'Bad Connection',
  3: 'Moderate Connection',
  4: 'Good Connection',
  5: 'Excellent Connection',
};

interface PeerProps {
  peer: HMSPeer;
}

const Peer = ({peer}: PeerProps) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const downlinkQuality = useHMSStore(
    selectConnectionQualityByPeerID(peer.id)
  )?.downlinkQuality;
  const audioLevel = useHMSStore(selectPeerAudioByID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <PeerContainer
      isSpeaking={audioLevel && audioLevel > 25 ? true : false}
      audioLevel={audioLevel}
    >
      <video ref={videoRef} autoPlay muted playsInline></video>
      {downlinkQuality && <div>{QUALITY[downlinkQuality]}</div>}
      <AudioLevel level={audioLevel} />
      {peer.name} {peer.isLocal ? '(You)' : ''}
    </PeerContainer>
  );
};

export default Peer;

const PeerContainer = styled.div<{isSpeaking: boolean; audioLevel: number}>`
  position: relative;
  border: 4px solid transparent;

  ${(props) =>
    props.isSpeaking &&
    css`
      animation: border-pulsate 2s infinite;
      border: 4px solid cyan;
      @keyframes border-pulsate {
        0% {
          border-color: rgba(0, 255, 255, 1);
        }
        50% {
          border-color: rgba(0, 255, 255, 0);
        }
        100% {
          border-color: rgba(0, 255, 255, 1);
        }
      }
    `}
`;
const AudioLevel = styled.div<{level: number}>`
  position: absolute;
  display: block;
  bottom: 0;
  transition: width 300ms;

  ${(props) =>
    props.level &&
    css`
      width: ${props.level}%;
      height: 4px;
      background-color: green;
    `}
`;
