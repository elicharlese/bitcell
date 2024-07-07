import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => console.log('WebSocket connected');

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };

    ws.current.onclose = () => console.log('WebSocket disconnected');

    return () => {
      ws.current ? ws.current.close() : null;
    };
  }, [url]);

  return data;
};

export default useWebSocket;