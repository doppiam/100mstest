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
import {useVideoboxDimensions} from './Grid/GroupGridProvider';

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
  small?: number;
}

const Peer = ({peer, small}: PeerProps) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const downlinkQuality = useHMSStore(
    selectConnectionQualityByPeerID(peer.id)
  )?.downlinkQuality;
  const audioLevel = useHMSStore(selectPeerAudioByID(peer.id));
  const [containerWidth, containerHeight] = useVideoboxDimensions();

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
      width={containerWidth}
      height={containerHeight}
      small={small}
      hasVideo={!!videoTrack}
      isSpeaking={audioLevel && audioLevel > 25 ? true : false}
      audioLevel={audioLevel}
    >
      <video ref={videoRef} autoPlay muted playsInline></video>
      <Status>
        {downlinkQuality && <div>{QUALITY[downlinkQuality]}</div>}
        <AudioLevel level={audioLevel} />
        {peer.name} {peer.isLocal ? '(You)' : ''}
      </Status>
    </PeerContainer>
  );
};

export default Peer;

const PeerContainer = styled.div<{
  isSpeaking: boolean;
  audioLevel: number;
  width: number;
  height: number;
  hasVideo: boolean;
  small?: number;
}>`
  border: 4px solid transparent;
  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  max-height: 100%;
  padding: 10px;

  > div:first-child {
    height: 100%;
  }

  ${(props) =>
    props.small &&
    css`
      max-width: 90px;
      max-height: 90px;
      min-width: 50px;
      min-height: 50px;
      width: calc(100% / (${props.small} + 1));
      height: auto;
      aspect-ratio: 1;
      margin: 5px;
      padding: 0;
    `}

  ${(props) =>
    props.isSpeaking &&
    css`
      animation: border-pulsate 2s infinite;
      border: 4px solid cyan;
    `}

    video {
    position: absolute;
    top: 0px;
    left: 50%;
    max-width: 100%;
    height: 100%;
    border-radius: 5px;
    transform: translate(-50%, 0px);
    width: 100%;
    object-fit: cover;
  }

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

const Status = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  color: #fff;
  padding: 16px;
`;
