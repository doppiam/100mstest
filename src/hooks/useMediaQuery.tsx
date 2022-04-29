import {useEffect, useState} from 'react';

export default function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    setIsTablet(window.matchMedia('(max-width: 768px)').matches);
    setIsPhone(window.matchMedia('(max-width: 640px)').matches);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
      setIsTablet(window.matchMedia('(max-width: 768px)').matches);
      setIsPhone(window.matchMedia('(max-width: 640px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isPhone,
  };
}
