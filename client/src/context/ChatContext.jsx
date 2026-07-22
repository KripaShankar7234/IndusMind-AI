import React, { createContext, useContext, useState } from 'react';
import { aiAssistantApi } from '../services/apiService';

const ChatContext = createContext();

const initialConversations = [
  { id: 'conv-1', title: 'Turbine Vibration Diagnostic', date: 'Today, 2:15 PM' },
  { id: 'conv-2', title: 'ISO 45001 EHS Gap Analysis', date: 'Yesterday' },
  { id: 'conv-3', title: 'Boiler Feed Pump Alignment', date: 'Jul 19, 2026' }
];

const initialMessages = [
  {
    id: 'msg-1',
    sender: 'assistant',
    timestamp: '2:15 PM',
    text: `Hello Dr. Jenkins! I am **IndusMind AI**, your unified industrial knowledge brain. 

I have indexed **42,800+ pages** across OEM manuals, maintenance work orders, ISO/OSHA compliance frameworks, and thermal scan diagnostics.

How can I assist your asset reliability team today?`,
    confidenceScore: 100,
    sources: []
  }
];

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await aiAssistantApi.queryKnowledge(userText, activeConvId);

      const aiMsg = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.answer,
        sources: response.sources,
        confidenceScore: response.confidenceScore || 98
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => {
    const newId = 'conv-' + Date.now();
    const newTitle = 'New Reliability Query ' + (conversations.length + 1);
    setConversations([{ id: newId, title: newTitle, date: 'Just now' }, ...conversations]);
    setActiveConvId(newId);
    setMessages([
      {
        id: 'msg-init-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'New session initialized. Ask anything about your industrial assets, failure modes, OEM guidelines, or compliance standards.',
        confidenceScore: 100,
        sources: []
      }
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConvId,
        setActiveConvId,
        messages,
        isTyping,
        sendMessage,
        startNewChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
