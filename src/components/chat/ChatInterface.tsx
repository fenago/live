/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './chat-interface.scss';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ModelSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  systemPrompt: string;
  modelSettings: ModelSettings;
}

const DEFAULT_MODEL_SETTINGS: ModelSettings = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
  topK: 40
};

const ChatInterface: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const genAI = new GoogleGenerativeAI(API_KEY);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const createNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      systemPrompt: "You are a helpful AI assistant.",
      modelSettings: { ...DEFAULT_MODEL_SETTINGS }
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }, [sessions.length]);

  const selectChat = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const deleteChat = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(sessions.length > 1 ? sessions[0].id : null);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !currentSessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    // Add user message
    setSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, messages: [...session.messages, userMessage] }
        : session
    ));

    setInput('');
    setIsLoading(true);

    try {
      const session = sessions.find(s => s.id === currentSessionId);
      if (!session) return;

      // Create a model with session-specific settings
      const sessionModel = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: session.modelSettings.temperature,
          maxOutputTokens: session.modelSettings.maxTokens,
          topP: session.modelSettings.topP,
          topK: session.modelSettings.topK,
        },
        systemInstruction: session.systemPrompt
      });

      const result = await sessionModel.generateContent(input.trim());
      const response = await result.response;
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text(),
        isUser: false,
        timestamp: new Date()
      };

      // Add AI response
      setSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: [...session.messages, aiMessage] }
          : session
      ));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };

      setSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: [...session.messages, errorMessage] }
          : session
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const updateSessionSettings = (sessionId: string, systemPrompt: string, modelSettings: ModelSettings) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, systemPrompt, modelSettings }
        : session
    ));
  };

  // Auto-create first chat session
  useEffect(() => {
    if (sessions.length === 0) {
      createNewChat();
    }
  }, [sessions.length, createNewChat]);

  return (
    <div className="chat-interface">
      {/* Sidebar with chat sessions */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <button 
            className="new-chat-btn"
            onClick={createNewChat}
          >
            <span className="material-symbols-outlined">add</span>
            New Chat
          </button>
        </div>
        
        <div className="chat-sessions">
          {sessions.map(session => (
            <div 
              key={session.id}
              className={`chat-session-item ${currentSessionId === session.id ? 'active' : ''}`}
              onClick={() => selectChat(session.id)}
            >
              <div className="session-info">
                <div className="session-name">
                  {session.messages.length > 0 
                    ? session.messages[0].content.substring(0, 30) + '...'
                    : session.name
                  }
                </div>
                <div className="session-date">
                  {session.createdAt.toLocaleDateString()}
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(session.id);
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        <div className="chat-header">
          <h1>Gemini Chat</h1>
          <div className="header-actions">
            {currentSession && (
              <button 
                className="settings-btn"
                onClick={() => setShowSettings(true)}
                title="Chat Settings"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
            )}
            <div className="chat-status">
              {currentSession && (
                <span>
                  {currentSession.messages.length} messages
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {currentSession && currentSession.messages.length === 0 && !isLoading ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>Start a conversation</h3>
              <p>Ask me anything! I'm here to help with questions, creative tasks, coding, analysis, and more.</p>
            </div>
          ) : (
            <>
              {currentSession?.messages.map(message => (
                <div 
                  key={message.id}
                  className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                >
                  <div className="message-avatar">
                    {message.isUser ? (
                      <span className="material-symbols-outlined">person</span>
                    ) : (
                      <span className="material-symbols-outlined">smart_toy</span>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">
                      {message.content}
                    </div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai-message loading">
                  <div className="message-avatar">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="chat-input-area">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              rows={1}
              disabled={isLoading || !currentSessionId}
              className="chat-input"
            />
            <button 
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !currentSessionId}
              className="send-btn"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && currentSession && (
        <SettingsModal 
          session={currentSession}
          onSave={(systemPrompt, modelSettings) => {
            updateSessionSettings(currentSession.id, systemPrompt, modelSettings);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

// Settings Modal Component
interface SettingsModalProps {
  session: ChatSession;
  onSave: (systemPrompt: string, modelSettings: ModelSettings) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ session, onSave, onClose }) => {
  const [systemPrompt, setSystemPrompt] = useState(session.systemPrompt);
  const [temperature, setTemperature] = useState(session.modelSettings.temperature);
  const [maxTokens, setMaxTokens] = useState(session.modelSettings.maxTokens);
  const [topP, setTopP] = useState(session.modelSettings.topP);
  const [topK, setTopK] = useState(session.modelSettings.topK);

  const handleSave = () => {
    onSave(systemPrompt, {
      temperature,
      maxTokens,
      topP,
      topK
    });
  };

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chat Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="form-group">
            <label>System Prompt</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt for the AI..."
              rows={4}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Temperature ({temperature})</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
              <small>Controls randomness (0 = focused, 2 = creative)</small>
            </div>
            
            <div className="form-group">
              <label>Max Tokens</label>
              <input
                type="number"
                min="1"
                max="8192"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              />
              <small>Maximum response length</small>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Top P ({topP})</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
              />
              <small>Nucleus sampling threshold</small>
            </div>
            
            <div className="form-group">
              <label>Top K</label>
              <input
                type="number"
                min="1"
                max="100"
                value={topK}
                onChange={(e) => setTopK(parseInt(e.target.value))}
              />
              <small>Top-k sampling limit</small>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
