import {
  HMSPeer,
  selectLocalPeer,
  selectPeerScreenSharing,
  useHMSStore,
} from '@100mslive/react-sdk';
import React from 'react';
import useGroupedParticipants from '../hooks/useGroupedParticipants';
import {
  Grid,
  Media,
  Novideo,
  Participants,
  Video,
  WithoutVideoGrid,
} from './Grid/GridElements';
import Peer from './Peer';
import ScreenShare from './ScreenShare';
import GroupGridProvider from './Grid/GroupGridProvider';
import {Page, PageInside} from './PageElements';

const Conference = () => {
  // const remotes = useHMSStore(selectRemotePeers);
  // const local = useHMSStore(selectLocalPeer);
  const presenter = useHMSStore(selectPeerScreenSharing);

  const {media, videos, onlyAudio, forceSmallBox} = useGroupedParticipants();

  const isScreenShare = (p: HMSPeer): boolean => {
    return presenter && p.id === presenter.id ? true : false;
  };

  const hasSidebar = false;

  return (
    <Page>
      <PageInside shortRight={false} shortLeft={false}>
        <Grid paddingBottom={media.length > 0}>
          {media.length > 0 && (
            <Media>
              <GroupGridProvider
                videoCount={media.length}
                updateDimCalculation={
                  +hasSidebar + media.length + videos.length + onlyAudio.length
                }
              >
                {media.map((p, i) => {
                  // if the screenSharing is active it is the first item of media
                  if (i === 0 && isScreenShare(p)) {
                    return <ScreenShare key={p.id} peer={p} />;
                  } else {
                    return <Peer key={p.id} peer={p} />;
                  }
                })}
              </GroupGridProvider>
            </Media>
          )}

          <Participants>
            {videos.length > 0 && (
              <Video weight={videos.length}>
                <GroupGridProvider
                  videoCount={videos.length}
                  updateDimCalculation={
                    +hasSidebar +
                    media.length +
                    videos.length +
                    onlyAudio.length
                  }
                >
                  {videos.map((p) => (
                    <Peer key={p.id} peer={p} />
                  ))}
                </GroupGridProvider>
              </Video>
            )}
            {onlyAudio.length > 0 && (
              <Novideo weight={onlyAudio.length}>
                <WithoutVideoGrid videoCount={onlyAudio.length}>
                  {onlyAudio.map((p) => (
                    <Peer key={p.id} peer={p} />
                  ))}
                </WithoutVideoGrid>
              </Novideo>
            )}
          </Participants>
        </Grid>
      </PageInside>
    </Page>
  );
};

export default Conference;
