import React from 'react';
import styled, {css} from 'styled-components';
import Linkify from 'react-linkify';
import {lighten} from 'polished';
import {selectLocalPeer, useHMSStore} from '@100mslive/react-sdk';

interface ChatMessageProps {
  author: string;
  date: string;
  text: string;
}

const ChatMessage = ({author, date, text}: ChatMessageProps) => {
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <Container mine={localPeer.name === author}>
      <Head>
        <Author>{author}</Author>
        <Date>{date}</Date>
      </Head>
      <Body>
        <Linkify componentDecorator={linkDecorator}>{text}</Linkify>
      </Body>
    </Container>
  );
};

const linkDecorator = (
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key}>
      {decoratedText}
    </a>
  );
};

export default ChatMessage;

const Container = styled.div<{mine: boolean}>`
  position: relative;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #fff;

  & + & {
    margin-top: 20px;
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: solid 13px transparent;
    border-top-color: #fff;
    border-right-color: #fff;
    position: absolute;
    top: 0;
    left: -20px;
  }

  ${(props) =>
    props.mine &&
    css`
      background-color: ${(props) =>
        lighten(0.1, props.theme.colors.secondary)};

      &::after {
        right: -20px;
        left: initial;
        border-top-color: ${(props) =>
          lighten(0.1, props.theme.colors.secondary)};
        border-left-color: ${(props) =>
          lighten(0.1, props.theme.colors.secondary)};
        border-right-color: transparent;
      }

      ${Head} {
        flex-direction: row-reverse;
      }
      ${Body} {
        text-align: right;
      }
    `}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const Author = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Date = styled.span`
  display: inline-block;
  margin: 0 10px;
  font-weight: 300;
  font-size: 1.2rem;
  font-style: italic;
  color: ${(props) => props.theme.colors.label};
`;

const Body = styled.p`
  margin: 0;
  font-size: 1.4rem;
  line-height: 20px;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Delete = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.error};
`;
