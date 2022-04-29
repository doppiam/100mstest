import {HMSRoomProvider} from '@100mslive/react-sdk';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import Preview from '../components/Preview';
import myTheme from '../config/theme';

const mockGetUserMedia = jest.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});

Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
});

it('renders Preview', async () => {
  render(
    <HMSRoomProvider>
      <ThemeProvider theme={myTheme}>
        <Preview />
      </ThemeProvider>
    </HMSRoomProvider>
  );
  await waitFor(() => {
    const title = screen.getByRole('heading', {
      name: /benvenuto!/i,
    });

    expect(title).toBeInTheDocument();
  });
});

it('renders Enter preview', async () => {
  render(
    <HMSRoomProvider>
      <ThemeProvider theme={myTheme}>
        <Preview
          isAudioMuted={true}
          isVideoMuted={true}
          captureNetworkQualityInPreview={false}
          rememberDeviceSelection={false}
        />
      </ThemeProvider>
    </HMSRoomProvider>
  );
  await waitFor(() => {
    const title = screen.getByRole('heading', {
      name: /benvenuto!/i,
    });

    expect(title).toBeInTheDocument();
  });

  const nameField = screen.getByRole('textbox');
  const joinPreview = screen.getByRole('button', {
    name: /preview/i,
  });
  fireEvent.change(nameField, {
    target: {value: 'Mike'},
  });
  expect(nameField).toHaveValue('Mike');
});
