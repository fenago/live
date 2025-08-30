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

import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import { LiveAPIProvider, useLiveAPIContext } from "./contexts/LiveAPIContext";
import SidePanel from "./components/side-panel/SidePanel";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import ChatButton from "./components/chat-button/ChatButton";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import SamplePrompts from "./components/sample-prompts/SamplePrompts";
import cn from "classnames";
import { LiveClientOptions } from "./types";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<MainConsole />} />
      </Routes>
    </Router>
  );
}

function MainConsole() {
  return (
    <div className="App">
      <LiveAPIProvider options={apiOptions}>
        <MainConsoleContent />
      </LiveAPIProvider>
    </div>
  );
}

function MainConsoleContent() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const { client } = useLiveAPIContext();
  const navigate = useNavigate();

  const handlePromptClick = (prompt: string) => {
    client.send([{ text: prompt }]);
  };

  return (
    <div className="streaming-console">
      <SidePanel />
      <main>
            <div className="header-section">
              <img 
                src="/mdc_logo2.png" 
                alt="Miami Dade College Logo" 
                className="mdc-logo"
              />
              <div className="title-container">
                <h1 className="main-title">AI Ethics Toolbox</h1>
                <div className="subtitle">Miami Dade College</div>
                <div className="subtitle-small">Presidents Innovation Fund</div>
              </div>
              <button className="about-button" onClick={() => navigate('/about')}>
                <span className="material-symbols-outlined">info</span>
                About
              </button>
            </div>
            <div className="credits-section">
              <h3 className="credits-title">Development Team</h3>
              <div className="credits-list">
                <div className="credit-item">
                  <span className="credit-name">Dr. Darrell Arnold</span>
                  <span className="credit-role">Philosophy, North Campus</span>
                </div>
                <div className="credit-item">
                  <span className="credit-name">Dr. Ernesto Lee</span>
                  <span className="credit-role">AI & Data Analytics, Kendall Campus</span>
                </div>
                <div className="credit-item">
                  <span className="credit-name">Professor Sarah Jacob</span>
                  <span className="credit-role">Philosophy, West Campus</span>
                </div>
                <div className="credit-item">
                  <span className="credit-name">Dr. A.J. Kreider</span>
                  <span className="credit-role">Philosophy, Homestead Campus</span>
                </div>
                <div className="credit-item">
                  <span className="credit-name">Professor Matthew Sang</span>
                  <span className="credit-role">Philosophy and Humanities, Padron Campus</span>
                </div>
              </div>
            </div>
            <SamplePrompts onPromptClick={handlePromptClick} />
            <div className="main-app-area">
              {/* APP goes here */}
              <Altair />
              <video
                className={cn("stream", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
              enableEditingSettings={true}
            >
              <ChatButton />
            </ControlTray>
      </main>
    </div>
  );
}

export default App;
