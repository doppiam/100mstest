import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import memoize from 'fast-memoize';
import styled from 'styled-components';

const VideoBoxDimensionContext = React.createContext([251, 251]);

interface GroupGridProps {
  videoCount: number;
  updateDimCalculation: number;
  children: React.ReactNode;
}

export default function GroupGridProvider({
  videoCount,
  updateDimCalculation,
  children,
}: GroupGridProps) {
  const [dimensions, setDimensions] = useState([251, 251]);

  const containerRef = useRef<HTMLDivElement>(null);

  const dimCalculation = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const {clientWidth: width, clientHeight: height} = containerRef.current;

    const {newWidth, newHeight} = calcBest(width, height, videoCount);

    if (newWidth === dimensions[0] && newHeight === dimensions[1]) {
      return;
    }

    setDimensions([newWidth, newHeight]);
  }, [videoCount, dimensions, updateDimCalculation]);

  useEffect(() => {
    dimCalculation();

    if (!window.ResizeObserver) {
      const interval = setInterval(dimCalculation, 50);

      window.addEventListener('resize', dimCalculation);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', dimCalculation);
      };
    }

    const observer = new ResizeObserver((entries) => {
      dimCalculation();
    });

    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    observer.observe(container);

    return () => observer.unobserve(container);
  }, [dimCalculation]);

  return (
    <VideoBoxDimensionContext.Provider value={dimensions}>
      <Container ref={containerRef}>
        <Content>{children}</Content>
      </Container>
    </VideoBoxDimensionContext.Provider>
  );
}

export const useVideoboxDimensions = () => useContext(VideoBoxDimensionContext);

const calcBest = memoize(function calcBest(
  width: number,
  height: number,
  count: number
) {
  const squared = calcIterative(width, height, count, S11);
  const A1 = squared.newHeight * squared.newWidth;

  const ratio169 = calcIterative(width, height, count, S169);
  const A2 = ratio169.newHeight * ratio169.newWidth;
  const ratio43 = calcIterative(width, height, count, S43);
  const A3 = ratio43.newHeight * ratio43.newWidth;

  if (A1 > A2) {
    if (A1 > A3) {
      // console.log('Meglio quadrato');
      return squared;
    } else {
      // console.log('Meglio 4:3');
      return ratio43;
    }
  } else {
    if (A2 > A3) {
      // console.log('Meglio 16:9');
      return ratio169;
    } else {
      // console.log('Meglio 4:3');
      return ratio43;
    }
  }
});

function calcIterative(
  width: number,
  height: number,
  count: number,
  ratio: number
) {
  let calculatedHeight = 1;
  let newWidth = 0;
  do {
    newWidth++;

    let perRow = Math.floor(width / newWidth);
    let rows = Math.ceil(count / perRow);
    calculatedHeight = rows * (newWidth / ratio);

    // console.log({
    //   newWidth,
    //   rows,
    //   calculatedHeight,
    //   width,
    //   height,
    // });
  } while (calculatedHeight <= height);

  newWidth--;

  // console.log({
  //   ratio,
  //   newWidth,
  //   newHeight: newWidth / ratio,
  // });

  // TODO: we do newWidth - 1 to fix an error in approximation causing sizing being too large of 1px
  // DONE: with the new grid system we can get rid of the -1 on newWidth
  // DONEpt2: we need to keep the -1 on newWidth also with the new grid system, added floor to keep integer numbers
  return {
    newWidth: Math.floor(newWidth) - 1,
    newHeight: Math.floor(newWidth / ratio),
  };
}

const S43 = 4 / 3;
const S169 = 16 / 9;
const S11 = 1;

const Container = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
`;
