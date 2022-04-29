import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import {format} from 'date-fns';
import ChatMessage from './ChatMessage';
import {ChatMessageType} from '../hooks/useChat';

// {messages, onSend, me, getParticipantById} = props
interface ChatProps {
  messages: ChatMessageType[];
  onSend: (message: string) => void;
}
const Chat = ({messages, onSend}: ChatProps) => {
  const [message, setMessage] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  // when receiving a new message, scroll bottom is the user has not scrolled up, else show a "new messages" button
  useEffect(() => {
    if (!chatListRef.current) {
      return;
    }
    if (
      chatListRef.current.scrollTop >=
      chatListRef.current.scrollHeight - chatListRef.current.offsetHeight - 90
    ) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setHasNewMessage(false);
    } else {
      setHasNewMessage(true);
    }
  }, [messages]);

  // if we scroll down with the "new messages" button hide it
  useEffect(() => {
    if (!chatListRef.current) {
      return;
    }
    const listRef = chatListRef.current;

    const fn = () => {
      if (
        listRef.scrollTop >=
        listRef.scrollHeight - listRef.offsetHeight - 90
      ) {
        setHasNewMessage(false);
      }
    };

    listRef.addEventListener('scroll', fn);

    return () => {
      listRef?.removeEventListener('scroll', fn);
    };
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSend(message);
      setMessage('');
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    },
    [onSend, message]
  );

  const scrollBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
    setHasNewMessage(false);
  };

  return (
    <Container>
      <Body ref={chatListRef}>
        {messages.map((message) => (
          <ChatMessage
            key={JSON.parse(message.message).id}
            author={JSON.parse(message.message).sender}
            text={JSON.parse(message.message).message}
            date={format(new Date(JSON.parse(message.message).date), 'HH:mm')}
          />
        ))}
      </Body>

      <Footer onSubmit={handleSubmit}>
        {hasNewMessage && (
          <NewMessagesBtn onClick={() => scrollBottom()}>
            Nuovi messaggi
          </NewMessagesBtn>
        )}
        <input
          type="text"
          name="message"
          autoComplete="off"
          placeholder="Scrivi un messaggio"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button disabled={message === ''} type="submit">
          Invia
        </button>
      </Footer>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Footer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.border};
  position: relative;

  input {
    width: 100%;
    margin-right: 16px;
    padding: 14px;
    border-radius: 8px;
    border: none;
    background-color: white;
    font-size: 1.4rem;
    line-height: 14px;
    outline: none;
    font-family: ${(props) => props.theme.typography.primary};

    &:focus {
      box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary};
    }

    &::placeholder {
      color: #d3d3d3;
    }
  }

  button {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    border-radius: 50%;
    border: none;
    color: white;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    transition: all ease 0.2s;
    user-select: none;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:hover {
      background-color: ${(props) => darken(0.1, props.theme.colors.primary)};
    }
  }
`;

const NewMessagesBtn = styled.div`
  position: absolute;
  transform: translateY(-110%);
  top: 0;
  left: 0;
  right: 0;
  appearance: none;
  display: inline-block;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 8px 16px;
  color: #fff;
  font-family: ${(props) => props.theme.typography.primary};
  box-shadow: 0px 2px 7px ${(props) => props.theme.colors.shadow};
  cursor: pointer;
`;
