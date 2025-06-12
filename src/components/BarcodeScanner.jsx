import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { searchProduct, formatCurrency } from '../data/priceList';
import '../styles/components.css';

const BarcodeScanner = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [codeReader, setCodeReader] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      initializeScanner();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isOpen]);

  const initializeScanner = async () => {
    try {
      const reader = new BrowserMultiFormatReader();
      setCodeReader(reader);

      // Get available video devices
      const videoInputDevices = await reader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        setError('No camera devices found');
        return;
      }

      // Use back camera if available, otherwise use first available
      const backCamera = videoInputDevices.find(
        (device) =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
      );

      const deviceId = backCamera
        ? backCamera.deviceId
        : videoInputDevices[0].deviceId;
      setSelectedDeviceId(deviceId);

      startScanning(reader, deviceId);
    } catch (err) {
      console.error('Error initializing scanner:', err);
      setError('Failed to initialize camera');
    }
  };

  const startScanning = (reader, deviceId) => {
    setIsScanning(true);
    setError(null);

    reader.decodeFromVideoDevice(deviceId, videoRef.current, (result, err) => {
      if (result) {
        handleScanResult(result.getText());
      }
      if (err) {
        // Only log errors that aren't "not found" errors
        if (err.name !== 'NotFoundException') {
          console.error('Scan error:', err);
        }
      }
    });
  };

  const handleScanResult = (scannedText) => {
    // Search for the product in our price list
    const product = searchProduct(scannedText);

    if (product) {
      setScanResult({
        found: true,
        name: product.name,
        price: product.price,
        scannedCode: scannedText,
      });

      // Play success sound (optional)
      playSuccessSound();
    } else {
      setScanResult({
        found: false,
        scannedCode: scannedText,
      });
    }

    // Stop scanning temporarily to show result
    setIsScanning(false);

    // Auto-resume scanning after 3 seconds
    setTimeout(() => {
      setScanResult(null);
      if (isOpen && codeReader && selectedDeviceId) {
        startScanning(codeReader, selectedDeviceId);
      }
    }, 3000);
  };

  const playSuccessSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const cleanup = () => {
    if (codeReader) {
      codeReader.reset();
    }
    setIsScanning(false);
    setScanResult(null);
    setError(null);
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  const resumeScanning = () => {
    setScanResult(null);
    if (codeReader && selectedDeviceId) {
      startScanning(codeReader, selectedDeviceId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="scanner-container fade-in">
      {/* Header */}
      <div className="scanner-header">
        <h2 className="scanner-title">Scan Barcode</h2>
        <button
          className="close-scanner"
          onClick={handleClose}
          aria-label="Close scanner"
        >
          ×
        </button>
      </div>

      {/* Camera Viewport */}
      <div className="scanner-viewport">
        <video
          ref={videoRef}
          className="scanner-video"
          autoPlay
          playsInline
          muted
        />

        {/* Scanner Overlay */}
        <div className="scanner-overlay">
          <div className="scanner-frame">
            {isScanning && <div className="scan-line" />}
          </div>
        </div>

        {/* Instructions */}
        <div className="scanner-instructions">
          {error ? (
            <div className="scanner-error">
              <p>⚠️ {error}</p>
              <button className="btn btn-secondary" onClick={initializeScanner}>
                Try Again
              </button>
            </div>
          ) : isScanning ? (
            <p>Point your camera at a barcode</p>
          ) : (
            <p>Scanning paused...</p>
          )}
        </div>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className={`scan-result ${scanResult ? 'show' : ''} slide-up`}>
          <div className="scan-result-content">
            {scanResult.found ? (
              <>
                <div className="scan-result-title bounce">
                  {scanResult.name}
                </div>
                <div className="scan-result-price pulse">
                  {formatCurrency(scanResult.price)}
                </div>
                <p className="scan-result-code">
                  Code: {scanResult.scannedCode}
                </p>
              </>
            ) : (
              <>
                <div className="scan-result-not-found">
                  Product not found in our catalog
                </div>
                <p className="scan-result-code">
                  Scanned: {scanResult.scannedCode}
                </p>
              </>
            )}

            <button className="btn btn-primary" onClick={resumeScanning}>
              Scan Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
