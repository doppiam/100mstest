import styled, {css} from 'styled-components';

export const Grid = styled.div<{paddingBottom?: boolean}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media ${(props) => props.theme.responsive.desktopSmallHeight} {
    flex-direction: row;
  }

  ${(props) =>
    props.paddingBottom &&
    css`
      padding-bottom: ${(props) => props.theme.layout.roomFooter};

      @media ${(props) => props.theme.responsive.desktopSmall} {
        padding-bottom: 0;
      }
    `}
`;

export const Media = styled.div`
  flex: 4;
  padding: 5px;
  overflow: hidden;
  @media ${(props) => props.theme.responsive.phone} {
    flex: 3;
  }
`;

export const Participants = styled.div`
  flex: 1.3;
  display: flex;
  overflow: hidden;
  height: 100%;

  @media ${(props) => props.theme.responsive.desktopSmallHeight} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.responsive.phone} {
    flex-direction: column;
    flex: 4;
  }
`;

export const Video = styled.div<{weight?: number}>`
  flex: 2.5;
  min-width: 0;
  overflow: hidden;
  padding: 5px;
  height: 100%;
  ${(props) =>
    props.weight &&
    css`
      flex: calc(2.5 * ${props.weight});
      @media ${(props) => props.theme.responsive.desktopSmallHeight} {
        flex: 2;
      }
      @media ${(props) => props.theme.responsive.phone} {
        flex: 2;
      }
    `}
`;

export const Novideo = styled.div<{weight?: number}>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  padding: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.weight &&
    css`
      flex: calc(1 * ${props.weight > 5 ? 5 : props.weight});

      @media ${(props) => props.theme.responsive.desktopSmallHeight} {
        flex: 1;
      }
      @media ${(props) => props.theme.responsive.phone} {
        flex: 1;
      }
    `}
`;

export const WithoutVideoGrid = styled.div<{
  videoCount?: number;
  onlyWithoutVideo?: boolean;
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
