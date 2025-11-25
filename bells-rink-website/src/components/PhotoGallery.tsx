import React from 'react';
import './PhotoGallery.css';

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
  frameStyle?: 'polaroid' | 'neon' | 'classic';
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  columns = 3,
  showCaptions = false,
  frameStyle = 'neon'
}) => {
  return (
    <div className={`photo-gallery photo-gallery-columns-${columns} frame-style-${frameStyle}`}>
      {photos.map((photo, index) => (
        <div key={index} className="photo-frame">
          <div className="photo-inner">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="photo-image"
            />
          </div>
          {showCaptions && photo.caption && (
            <div className="photo-caption">{photo.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
