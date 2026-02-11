"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { PanoramaScene } from "@/data/projects";

// Import CSS at the top level
import "@photo-sphere-viewer/core/index.css";

// Dynamic import will be used to load PSV
type ViewerType = import("@photo-sphere-viewer/core").Viewer;

interface PanoramaViewerProps {
  scenes: PanoramaScene[];
  initialSceneId?: string;
  onSceneChange?: (sceneId: string) => void;
}

export default function PanoramaViewer({
  scenes,
  initialSceneId,
  onSceneChange,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ViewerType | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId || scenes[0]?.id);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentScene = scenes.find((s) => s.id === currentSceneId) || scenes[0];

  const navigateToScene = useCallback((sceneId: string) => {
    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene || !viewerRef.current) return;

    setIsLoading(true);
    setCurrentSceneId(sceneId);
    onSceneChange?.(sceneId);

    viewerRef.current.setPanorama(scene.imageUrl).then(() => {
      setIsLoading(false);
    });
  }, [scenes, onSceneChange]);

  // Initialize viewer
  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    let isMounted = true;

    const initViewer = async () => {
      // Dynamic imports for SSR compatibility
      const { Viewer } = await import("@photo-sphere-viewer/core");

      if (!isMounted || !containerRef.current) return;

      const viewer = new Viewer({
        container: containerRef.current,
        panorama: currentScene.imageUrl,
        caption: currentScene.name,
        loadingTxt: "Yükleniyor...",
        navbar: [
          "zoom",
          "move",
          "caption",
          "fullscreen",
        ],
        defaultYaw: 0,
        defaultPitch: 0,
        minFov: 30,
        maxFov: 90,
      });

      viewerRef.current = viewer;

      // Handle ready event
      viewer.addEventListener("ready", () => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

      // Fullscreen change listener
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    };

    initViewer();

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [currentScene, navigateToScene]);

  // Update scene when currentSceneId changes externally
  useEffect(() => {
    if (initialSceneId && initialSceneId !== currentSceneId) {
      navigateToScene(initialSceneId);
    }
  }, [initialSceneId, currentSceneId, navigateToScene]);

  const toggleFullscreen = () => {
    if (!containerRef.current?.parentElement) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="panorama-wrapper">
      {/* Main Viewer */}
      <div className="panorama-container">
        <div ref={containerRef} className="panorama-viewer" />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="panorama-loading">
            <div className="loading-spinner" />
            <span>Yükleniyor...</span>
          </div>
        )}

        {/* Custom Controls */}
        <div className="panorama-controls">
          <button
            onClick={toggleFullscreen}
            className="control-btn"
            title={isFullscreen ? "Tam ekrandan çık" : "Tam ekran"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            )}
          </button>
        </div>

        {/* Scene Title */}
        <div className="panorama-title">
          <h3>{currentScene.name}</h3>
        </div>
      </div>

      {/* Scene List */}
      <div className="panorama-sidebar">
        <div className="panorama-scenes">
          <h4>Mekanlar</h4>
          <div className="scene-list">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                className={`scene-item ${scene.id === currentSceneId ? "active" : ""}`}
                onClick={() => navigateToScene(scene.id)}
              >
                <span className="scene-dot" />
                <span className="scene-name">{scene.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .panorama-wrapper {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 1.5rem;
          height: 70vh;
          min-height: 500px;
        }

        .panorama-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: var(--ink);
        }

        .panorama-viewer {
          width: 100%;
          height: 100%;
        }

        .panorama-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          z-index: 10;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .panorama-controls {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          z-index: 20;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .control-btn.active {
          background: var(--accent);
        }

        .control-btn svg {
          width: 20px;
          height: 20px;
        }

        .panorama-title {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          z-index: 20;
        }

        .panorama-title h3 {
          margin: 0;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 6px;
        }

        .panorama-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panorama-scenes {
          flex: 1;
          background: var(--paper-strong);
          border-radius: 12px;
          padding: 1rem;
          overflow: auto;
        }

        .panorama-scenes h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .scene-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .scene-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .scene-item:hover {
          background: var(--paper);
          border-color: var(--accent);
        }

        .scene-item.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .scene-dot {
          width: 8px;
          height: 8px;
          background: currentColor;
          border-radius: 50%;
          opacity: 0.5;
        }

        .scene-item.active .scene-dot {
          opacity: 1;
        }

        .scene-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .panorama-wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
            height: auto;
          }

          .panorama-container {
            height: 50vh;
            min-height: 300px;
          }
        }

        @media (max-width: 600px) {
          .panorama-sidebar {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
