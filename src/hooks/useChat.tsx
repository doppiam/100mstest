import {
  HMSMessage,
  selectHMSMessages,
  selectLocalPeer,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';

export interface ChatMessageType extends HMSMessage {
  sender: string;
  date: number;
}

export default function useChat() {
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  // @ts-ignore
  const messages: ChatMessageType[] = useHMSStore(selectHMSMessages);

  const sendMessage = (message: string) => {
    const newMessage: Omit<ChatMessageType, HMSMessage['id']> = {
      message: message,
      sender: localPeer.name,
      date: Date.now(),
    };
    hmsActions.sendBroadcastMessage(
      JSON.stringify(newMessage),
      'ChatMessageType'
    );
  };

  console.log(messages);

  return {
    sendMessage,
    messages,
  };
}
