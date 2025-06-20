import { useEffect, useState } from "react";

type SSEData = {
  type: "text" | "image" | "audio" | "video" | "connection";
  content: string;
  timestamp?: string;
};

export default function SSEClient() {
  const [events, setEvents] = useState<SSEData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Setting up SSE connection...");
    const source = new EventSource("/api/stream");

    source.onopen = () => {
      console.log("SSE connection opened");
      setIsConnected(true);
      setError(null);
    };

    source.onmessage = (e) => {
      console.log("Received SSE message:", e.data);
      try {
        const parsed: SSEData = JSON.parse(e.data);
        setEvents((prev) => [...prev, parsed]);
      } catch (err) {
        console.error("Failed to parse SSE data:", err);
        setError("Failed to parse message data");
      }
    };

    source.onerror = (e) => {
      console.error("SSE error occurred:", e);
      setIsConnected(false);
      setError("Connection error occurred");
    };

    return () => {
      console.log("Closing SSE connection");
      source.close();
      setIsConnected(false);
    };
  }, []);

  const renderEvent = (event: SSEData, index: number) => {
    const baseClasses = "mb-4 p-3 border rounded-lg";
    
    switch (event.type) {
      case "connection":
        return (
          <div key={index} className={`${baseClasses} bg-green-100 border-green-300`}>
            <p className="text-green-800">✅ {event.content}</p>
            {event.timestamp && (
              <small className="text-green-600">{new Date(event.timestamp).toLocaleTimeString()}</small>
            )}
          </div>
        );
      case "text":
        return (
          <div key={index} className={`${baseClasses} bg-blue-100 border-blue-300`}>
            <p className="text-blue-800">{event.content}</p>
            {event.timestamp && (
              <small className="text-blue-600">{new Date(event.timestamp).toLocaleTimeString()}</small>
            )}
          </div>
        );
      case "image":
        return (
          <div key={index} className={`${baseClasses} bg-purple-100 border-purple-300`}>
            <p className="text-purple-800 mb-2">🖼️ Image received:</p>
            <img src={event.content} alt="SSE Image" className="w-40 rounded" onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/200x200?text=Image+Error";
            }} />
            {event.timestamp && (
              <small className="text-purple-600 block mt-2">{new Date(event.timestamp).toLocaleTimeString()}</small>
            )}
          </div>
        );
      case "audio":
        return (
          <div key={index} className={`${baseClasses} bg-yellow-100 border-yellow-300`}>
            <p className="text-yellow-800 mb-2">🎵 Audio received:</p>
            <audio controls src={event.content} className="w-full" />
            {event.timestamp && (
              <small className="text-yellow-600 block mt-2">{new Date(event.timestamp).toLocaleTimeString()}</small>
            )}
          </div>
        );
      case "video":
        return (
          <div key={index} className={`${baseClasses} bg-red-100 border-red-300`}>
            <p className="text-red-800 mb-2">🎬 Video received:</p>
            <video controls src={event.content} className="w-60 rounded" />
            {event.timestamp && (
              <small className="text-red-600 block mt-2">{new Date(event.timestamp).toLocaleTimeString()}</small>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold">🧠 Incoming Events</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-800">❌ Error: {error}</p>
        </div>
      )}
      
      {events.length === 0 && isConnected && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <p className="text-gray-600">⏳ Waiting for events... (first event should arrive in ~3 seconds)</p>
        </div>
      )}
      
      <div className="space-y-4">
        {events.map((event, index) => renderEvent(event, index))}
      </div>
    </div>
  );
}
