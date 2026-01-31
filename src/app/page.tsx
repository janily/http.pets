'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PetState {
  method: string;
  mood: 'happy' | 'excited' | 'transformed' | 'changed' | 'sad' | 'neutral';
  visible: boolean;
  color: string;
}

const HTTP_PETS = {
  GET: { emoji: '🐶', name: 'Doggo', color: '#3b82f6' }, // blue
  POST: { emoji: '🐱', name: 'Kitto', color: '#ef4444' }, // red
  PUT: { emoji: '🦊', name: 'Foxxy', color: '#f59e0b' }, // yellow
  PATCH: { emoji: '🐼', name: 'Pando', color: '#8b5cf6' }, // purple
  DELETE: { emoji: '🦥', name: 'Slothy', color: '#6b7280' }, // gray
};

export default function HomePage() {
  const [pets, setPets] = useState<Record<string, PetState>>({
    GET: { method: 'GET', mood: 'neutral', visible: true, color: '#3b82f6' },
    POST: { method: 'POST', mood: 'neutral', visible: true, color: '#ef4444' },
    PUT: { method: 'PUT', mood: 'neutral', visible: true, color: '#f59e0b' },
    PATCH: { method: 'PATCH', mood: 'neutral', visible: true, color: '#8b5cf6' },
    DELETE: { method: 'DELETE', mood: 'neutral', visible: true, color: '#6b7280' },
  });

  const [logs, setLogs] = useState<Array<{method: string, url: string, timestamp: Date}>>([]);

  const handleRequest = (method: string) => {
    const petInfo = HTTP_PETS[method as keyof typeof HTTP_PETS];
    
    setPets(prev => ({
      ...prev,
      [method]: {
        method,
        visible: method !== 'DELETE' ? true : false,
        mood: getMoodForMethod(method),
        color: petInfo.color,
      }
    }));

    // For DELETE, make the pet come back after a delay
    if (method === 'DELETE') {
      setTimeout(() => {
        setPets(prev => ({
          ...prev,
          [method]: {
            method,
            visible: true,
            mood: 'sad',
            color: petInfo.color,
          }
        }));
      }, 2000);
    }

    // Add to logs
    setLogs(prev => [...prev, {
      method,
      url: '/api/pet',
      timestamp: new Date()
    }].slice(-10)); // Keep only last 10 logs
  };

  function getMoodForMethod(method: string): PetState['mood'] {
    switch (method) {
      case 'GET': return 'happy';
      case 'POST': return 'excited';
      case 'PUT': return 'transformed';
      case 'PATCH': return 'changed';
      case 'DELETE': return 'sad';
      default: return 'neutral';
    }
  }

  function getAnimationForMood(mood: string) {
    switch (mood) {
      case 'happy': return { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] };
      case 'excited': return { scale: [1, 1.3, 1], y: [0, -10, 0] };
      case 'transformed': return { scale: [1, 1.1, 1.2, 1] };
      case 'changed': return { scale: [1, 1.05, 1] };
      case 'sad': return { scale: [1, 0.9, 1], opacity: [1, 0.7, 1] };
      default: return { scale: 1 };
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">HTTP Pets</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interact with adorable pets that demonstrate different HTTP methods. 
            Click the buttons to send requests and watch how each pet responds!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {Object.entries(HTTP_PETS).map(([method, pet]) => {
            const petState = pets[method];
            
            return (
              <motion.div 
                key={method}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">
                  {petState.visible ? (
                    <motion.span
                      animate={getAnimationForMood(petState.mood)}
                      transition={{ duration: 0.5 }}
                    >
                      {pet.emoji}
                    </motion.span>
                  ) : (
                    <span className="opacity-20">{pet.emoji}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-4 uppercase font-mono">{method}</p>
                
                <button
                  onClick={() => handleRequest(method)}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors w-full"
                >
                  Send {method}
                </button>
                
                <div className="mt-3 text-xs text-gray-500 capitalize">
                  Mood: {petState.mood}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Log</h2>
          
          {logs.length === 0 ? (
            <p className="text-gray-500 italic">No requests sent yet. Send some HTTP requests to see them appear here!</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {logs.slice().reverse().map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    log.method === 'GET' ? 'bg-blue-50' :
                    log.method === 'POST' ? 'bg-red-50' :
                    log.method === 'PUT' ? 'bg-yellow-50' :
                    log.method === 'PATCH' ? 'bg-purple-50' :
                    log.method === 'DELETE' ? 'bg-gray-50' : 'bg-gray-50'
                  }`}
                >
                  <span className="font-mono font-bold text-sm">
                    <span className={`px-2 py-1 rounded ${
                      log.method === 'GET' ? 'bg-blue-200 text-blue-800' :
                      log.method === 'POST' ? 'bg-red-200 text-red-800' :
                      log.method === 'PUT' ? 'bg-yellow-200 text-yellow-800' :
                      log.method === 'PATCH' ? 'bg-purple-200 text-purple-800' :
                      log.method === 'DELETE' ? 'bg-gray-200 text-gray-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {log.method}
                    </span> {log.url}
                  </span>
                  <span className="text-xs text-gray-500">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About HTTP Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">GET</h3>
              <p className="text-gray-600 text-sm">Used to retrieve data. The server returns the requested resource. It should have no side effects.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-red-600 mb-2">POST</h3>
              <p className="text-gray-600 text-sm">Used to create new resources. Often causes changes on the server or side effects.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-yellow-600 mb-2">PUT</h3>
              <p className="text-gray-600 text-sm">Used to update a resource completely. Replaces the entire resource at the specified URI.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-purple-600 mb-2">PATCH</h3>
              <p className="text-gray-600 text-sm">Used to partially update a resource. Only modifies the fields provided in the request.</p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg text-gray-600 mb-2">DELETE</h3>
              <p className="text-gray-600 text-sm">Requests that the server deletes the resource identified by the URI. May cause side effects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}