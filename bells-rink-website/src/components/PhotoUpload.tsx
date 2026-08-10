import React, { useState, useRef, useCallback } from 'react';
import { uploadCommunityPhoto } from '../lib/supabase';
import { track } from '../lib/analytics';
import './PhotoUpload.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

const PhotoUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported image format. Please use JPG, PNG, or WebP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size is 10MB.`;
    }
    return null;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of Array.from(newFiles)) {
      const error = validateFile(file);
      if (error) {
        setErrorMsg(error);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setFiles(prev => [...prev, ...validFiles].slice(0, 10));
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 10));
    setErrorMsg('');
  }, []);

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadState('uploading');
    setProgress(0);
    setErrorMsg('');

    try {
      for (let i = 0; i < files.length; i++) {
        await uploadCommunityPhoto(files[i], name || undefined);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setUploadState('success');
      track('Photo Upload', { count: files.length });
      // Clean up previews
      previews.forEach(p => URL.revokeObjectURL(p));
      setFiles([]);
      setPreviews([]);
      setName('');
    } catch (err: any) {
      setUploadState('error');
      setErrorMsg(err?.message || 'Upload failed. Please try again.');
    }
  };

  const reset = () => {
    setUploadState('idle');
    setProgress(0);
    setErrorMsg('');
  };

  return (
    <div className="photo-upload">
      <div className="upload-anniversary-badge">
        <span className="badge-year">100</span>
        <span className="badge-text">Years of Memories</span>
      </div>

      <h3>Share Your Bell's Memories!</h3>
      <p className="upload-subtitle">
        We're celebrating <strong>100 years of Bell's Skating Rink</strong> and we want YOUR photos!
        Upload pictures you've taken at the rink over the years — whether it was last weekend or decades ago.
        Help us build a community collection of memories!
      </p>

      {uploadState === 'success' ? (
        <div className="upload-success">
          <div className="success-icon">🎉</div>
          <h4>Photos Uploaded Successfully!</h4>
          <p>Thank you for sharing your Bell's memories! Your photos will be reviewed and added to our community gallery.</p>
          <button className="upload-btn" onClick={reset}>Upload More Photos</button>
        </div>
      ) : (
        <>
          <div className="upload-name-field">
            <label htmlFor="uploader-name">Your Name (optional)</label>
            <input
              id="uploader-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Johnson Family"
              disabled={uploadState === 'uploading'}
            />
          </div>

          <div
            className={`upload-dropzone ${dragActive ? 'drag-active' : ''} ${files.length > 0 ? 'has-files' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && addFiles(e.target.files)}
              style={{ display: 'none' }}
            />

            {files.length === 0 ? (
              <div className="dropzone-content">
                <div className="dropzone-icon">📸</div>
                <p className="dropzone-text">
                  <strong>Tap to select photos</strong> or drag & drop
                </p>
                <p className="dropzone-hint">JPG, PNG, WebP • Up to 10MB each • Max 10 photos</p>
              </div>
            ) : (
              <div className="preview-grid" onClick={(e) => e.stopPropagation()}>
                {previews.map((src, i) => (
                  <div key={i} className="preview-item">
                    <img src={src} alt={`Preview ${i + 1}`} />
                    <button
                      className="preview-remove"
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      aria-label="Remove photo"
                      disabled={uploadState === 'uploading'}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {files.length < 10 && (
                  <div className="preview-add" onClick={() => inputRef.current?.click()}>
                    <span>+</span>
                    <small>Add more</small>
                  </div>
                )}
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="upload-error">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {uploadState === 'uploading' && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-text">Uploading... {progress}%</span>
            </div>
          )}

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={files.length === 0 || uploadState === 'uploading'}
          >
            {uploadState === 'uploading' ? 'Uploading...' : `Upload ${files.length > 0 ? `${files.length} Photo${files.length > 1 ? 's' : ''}` : 'Photos'}`}
          </button>

          <div className="upload-video-note">
            <div className="video-note-icon">🎥</div>
            <p>
              <strong>Have videos?</strong> Email them to{' '}
              <a href="mailto:bellsrollerrink@gmail.com">bellsrollerrink@gmail.com</a>
              {' '}— we'd love to see them!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoUpload;
