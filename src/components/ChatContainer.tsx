import styled, {css} from 'styled-components';
import {ChatMessageType} from '../hooks/useChat';
import Chat from './Chat';

interface ChatContainerProps {
  active: boolean;
  handleShowChat: () => void;
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
}

const ChatContainer = ({
  active,
  messages,
  onSendMessage,
  handleShowChat,
}: ChatContainerProps) => {
  return (
    <ChatSide active={active}>
      <ChatSideContent>
        <ChatSideHeader>
          <h3>Chat</h3>
          <button onClick={() => handleShowChat()}>close</button>
        </ChatSideHeader>
        <Chat messages={messages} onSend={onSendMessage} />
      </ChatSideContent>
    </ChatSide>
  );
};

export default ChatContainer;

const ChatSide = styled.div<{active: boolean}>`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 50px;
  width: 370px;
  padding: 12px 0 0;
  z-index: 4;
  transform: translateX(100%);
  border-left: 1px solid ${(props) => props.theme.colors.border};
  transition: transform 300ms, top 300ms, left 300ms;

  @media ${(props) => props.theme.responsive.tablet} {
    transform: translateX(0) translateY(100%);
    width: 100%;
    top: 50px;
  }

  ${(props) =>
    props.active &&
    css`
      transform: translateX(0);

      @media ${(props) => props.theme.responsive.tablet} {
        transform: translateX(0) translateY(0);
      }
      @media ${(props) => props.theme.responsive.phone} {
        transform: translateX(0) translateY(0);
      }
    `}
`;

const ChatSideHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > button {
    appearance: none;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${(props) => props.theme.colors.border};
    }
  }
`;

const ChatSideContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
