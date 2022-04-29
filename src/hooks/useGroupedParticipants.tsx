import {
  HMSPeer,
  selectPeers,
  selectPeerScreenSharing,
  useHMSStore,
} from '@100mslive/react-sdk';
import useMediaQuery from './useMediaQuery';

type GroupedVideoType = {
  media: HMSPeer[] | [];
  videos: HMSPeer[];
  onlyAudio: HMSPeer[];
  forceSmallBox: boolean;
};

export default function useGroupedParticipants(): GroupedVideoType {
  const mediaQuery = useMediaQuery();

  const allParticipants = useHMSStore(selectPeers);
  const presenter = useHMSStore(selectPeerScreenSharing);

  // const allParticipants: Participant[] = [
  //   ...videoRoom.room.remotes,
  //   videoRoom.room.localParticipant,
  // ];

  const withVideos = allParticipants.filter((p) => p.videoTrack);
  const withoutVideos = allParticipants.filter((p) => !p.videoTrack);
  const screenSharing = presenter ? [presenter] : [];

  // define when we need to divide withVideos from withoutVideos, based on the number of participants and the size of the screen
  const separateWithoutVideo =
    (mediaQuery.isMobile && allParticipants.length > 6) ||
    (!mediaQuery.isMobile && allParticipants.length > 8);
  // const separateWithoutVideo = true;

  const forceSmallBox = withoutVideos.length > 20;
  // const forceSmallBox = true;

  // we need to separate the participants without video from participants with video
  if (separateWithoutVideo) {
    return {
      media: screenSharing,
      videos: withVideos,
      onlyAudio: withoutVideos,
      forceSmallBox: forceSmallBox,
    };
  }

  // we return the participants with video and the participants without video in the same array
  return {
    media: screenSharing,
    videos: [...withVideos, ...withoutVideos],
    onlyAudio: [],
    forceSmallBox: forceSmallBox,
  };
}
