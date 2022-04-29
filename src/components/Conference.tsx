import {
  HMSPeer,
  selectLocalPeer,
  selectPeerScreenSharing,
  useHMSStore,
} from '@100mslive/react-sdk';
import React, {useCallback, useState} from 'react';
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
import useNotifications from '../hooks/useNotifications';
import ChatContainer from './ChatContainer';
import useChat from '../hooks/useChat';

const Conference = () => {
  const [showChat, setShowChat] = useState(true);
  // const remotes = useHMSStore(selectRemotePeers);
  // const local = useHMSStore(selectLocalPeer);
  const presenter = useHMSStore(selectPeerScreenSharing);

  const {media, videos, onlyAudio, forceSmallBox} = useGroupedParticipants();

  const isScreenShare = (p: HMSPeer): boolean => {
    return presenter && p.id === presenter.id ? true : false;
  };

  const hasSidebar = false;

  useNotifications();
  const {messages, sendMessage} = useChat();

  const toggleChat = useCallback(() => setShowChat(!showChat), [showChat]);

  return (
    <Page>
      <PageInside shortRight={true} shortLeft={false}>
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
                    <Peer
                      key={p.id}
                      peer={p}
                      small={forceSmallBox ? onlyAudio.length : 1}
                    />
                  ))}
                </WithoutVideoGrid>
              </Novideo>
            )}
          </Participants>
        </Grid>
      </PageInside>
      <ChatContainer
        active={showChat}
        handleShowChat={toggleChat}
        messages={messages}
        onSendMessage={sendMessage}
      />
    </Page>
  );
};

export default Conference;
