'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const fetchBackendMessage = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const apiUrl = `${backendUrl}/api/message`;

      // Define a timeout duration (e.g., 5 seconds)
      const timeoutPromise = new Promise<Response>((_, reject) => // Explicitly type this promise as resolving to Response or rejecting
        setTimeout(() => reject(new Error('Request timed out')), 5000) // 5 seconds timeout
      );

      try {
        const fetchPromise = fetch(apiUrl);

        const response = await Promise.race([
          fetchPromise,
          timeoutPromise
        ]);

        // Add a type guard to ensure 'response' is a Response object before accessing its properties
        if (response instanceof Response) { // <--- ADD THIS CHECK
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, URL: ${response.url}`);
            const errorText = await response.text();
            console.error("Backend Error Response:", errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText.substring(0, 100)}...`);
          }

          const data = await response.json();
          setMessage(data.message);
        } else {
          // This case should theoretically be caught by the catch block if timeoutPromise rejects
          // but it's good for type safety if Promise.race resolved to something unexpected.
          throw new Error('Unexpected response type from Promise.race');
        }
      } catch (error) {
        console.error("Error fetching message from backend:", error);
        if (error instanceof Error && error.message.includes('timed out')) {
          setMessage('Error fetching message: Backend took too long to respond.');
        } else {
          setMessage('Error fetching message');
        }
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Frontend Connected to Backend</h1>
      <p><strong>Message from Backend:</strong> {message}</p>
    </main>
  );
}
