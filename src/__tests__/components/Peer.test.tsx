import {HMSRoomProvider} from '@100mslive/react-sdk';
import {render, screen, fireEvent} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';
import Peer from '../../components/Peer';
import ScreenShare from '../../components/ScreenShare';
import angeliniTheme from '../../config/theme';

const PEER = {
  id: '123',
  name: 'Mike',
  isLocal: true,
  // videoTrack?: HMSTrackID,
  // audioTrack?: HMSTrackID,
  auxiliaryTracks: [],
};

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Peer component', () => {
  it('renders the Peer', () => {
    render(
      <HMSRoomProvider>
        <ThemeProvider theme={angeliniTheme}>
          <Peer peer={PEER} />
        </ThemeProvider>
      </HMSRoomProvider>
    );

    const name = screen.getByText(/mike \(you\)/i);

    expect(name).toBeInTheDocument();
  });

  it('renders the Screen', () => {
    render(
      <HMSRoomProvider>
        <ThemeProvider theme={angeliniTheme}>
          <ScreenShare peer={PEER} />
        </ThemeProvider>
      </HMSRoomProvider>
    );

    const name = screen.getByText(/mike \(you\) sta presentando/i);

    expect(name).toBeInTheDocument();
  });
});
