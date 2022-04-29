import {DefaultTheme} from 'styled-components';

const myTheme: DefaultTheme = {
  colors: {
    primary: '#16346c',
    secondary: '#AFB4DB',

    // Status
    success: '#76D06E',
    error: '#DB6161',
    warning: '#F9B233',
    info: '#2997ff',

    // Elements
    neutral: '#C4C4C4',
    border: '#ebebeb',
    background: '#f4f5f9',
  },
  typography: {
    main: "'Barlow', sans-serif",
  },
  layout: {
    gutter: '16px',
    roomFooter: '80px',
  },
  responsive: {
    phoneSmall: `(max-width: 320px)`,
    phone: `(max-width: 640px)`,
    tablet: `(max-width: 768px)`,
    laptop: `(max-width: 1024px)`,
    desktopSmall: `(max-width: 1100px)`,
    desktopSmallHeight: `(max-height: 800px) and (min-width: 1100px)`,
    desktop: `(max-width: 1440px)`,
    desktopLarge: `(min-width: 1920px)`,
  },
};

export default myTheme;
