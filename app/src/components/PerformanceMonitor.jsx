import React, { useEffect, useState } from 'react';
import './PerformanceMonitor.css';

/**
 * Performance monitoring component
 * Tracks and displays application performance metrics
 */
const PerformanceMonitor = ({ isEnabled = false }) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  });

  useEffect(() => {
    if (!isEnabled) return;

    const startTime = performance.now();
    
    // Monitor performance metrics
    const updateMetrics = () => {
      const loadTime = performance.now() - startTime;
      
      // Get memory usage if available
      const memoryUsage = performance.memory 
        ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        : 0;

      // Count network requests
      const networkRequests = performance.getEntriesByType('resource').length;

      setMetrics({
        loadTime: Math.round(loadTime),
        renderTime: Math.round(performance.now() - startTime),
        memoryUsage,
        networkRequests
      });
    };

    // Update metrics every second
    const interval = setInterval(updateMetrics, 1000);

    // Initial update
    updateMetrics();

    return () => clearInterval(interval);
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="performance-monitor">
      <div className="performance-header">
        <h4>Performance Metrics</h4>
        <span className="performance-indicator">
          {metrics.loadTime < 1000 ? '🟢' : metrics.loadTime < 3000 ? '🟡' : '🔴'}
        </span>
      </div>
      
      <div className="performance-metrics">
        <div className="metric">
          <span className="metric-label">Load Time:</span>
          <span className="metric-value">{metrics.loadTime}ms</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Memory:</span>
          <span className="metric-value">{metrics.memoryUsage}MB</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Requests:</span>
          <span className="metric-value">{metrics.networkRequests}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
