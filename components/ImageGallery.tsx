// components/ImageGallery.tsx
import React from 'react';

interface ImageGalleryProps {
    images: { url: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 2).map((image, index) => (
                    <div key={index} className="w-full">
                        <img src={image.url} alt={image.alt} className="w-full h-auto" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.slice(2).map((image, index) => (
                    <div key={index} className="w-full">
                        <img src={image.url} alt={image.alt} className="w-full h-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;