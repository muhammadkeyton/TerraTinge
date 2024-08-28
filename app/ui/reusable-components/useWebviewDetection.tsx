'use client';


import { useEffect, useState } from 'react';
import { isWebview } from '@dvlden/is-webview';

const useWebviewDetection = () => {
  const [isClient, setIsClient] = useState(false);
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsWebView(isWebview(navigator.userAgent));
  }, []);

  return { isClient, isWebView };
};

export default useWebviewDetection;
