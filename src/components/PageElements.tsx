import styled, {css} from 'styled-components';

export const Page = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: #fff;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  overflow-y: auto;
  position: relative;

  @media ${(props) => props.theme.responsive.tablet} {
    height: calc(var(--vh, 1vh) * 100 - 50px);
  }
`;

export const PageInside = styled.div<{shortRight: boolean; shortLeft: boolean}>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 ${(props) => props.theme.layout.roomFooter};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.shortRight &&
    css`
      margin: 0 370px 0 0;
      width: calc(100% - 370px);
      @media ${(props) => props.theme.responsive.tablet} {
        width: 100%;
        margin: 0;
      }
    `}

  ${(props) =>
    props.shortLeft &&
    css`
      margin: 0 0 0 300px;
      width: calc(100% - 300px);
      @media ${(props) => props.theme.responsive.tablet} {
        width: 100%;
        margin: 0;
      }
    `}

  ${(props) =>
    props.shortLeft &&
    props.shortRight &&
    css`
      margin: 0 370px 0 300px;
      width: calc(100% - 300px - 370px);
      @media ${(props) => props.theme.responsive.tablet} {
        width: 100%;
        margin: 0;
      }
    `}

  @media ${(props) => props.theme.responsive.desktopSmall} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.responsive.phone} {
    padding: 0 0 ${(props) => props.theme.layout.roomFooter};
  }
`;

export const RoomError = styled.div`
  text-align: center;
  width: 100%;
`;
