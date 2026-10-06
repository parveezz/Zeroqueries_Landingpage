"use client";

import React from 'react';

export default function PostHeroImage({ image, alt }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={alt || "Article Hero"}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}