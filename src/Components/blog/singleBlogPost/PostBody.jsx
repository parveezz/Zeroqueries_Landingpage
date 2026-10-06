"use client";

import React from 'react';

export default function PostBody({ content }) {
    if (!content) return null;

    return (
        <div className="lg:col-span-8 space-y-6 text-black/70 leading-relaxed font-light text-sm sm:text-base">
            {/* About Section */}
            {(content.aboutTitle || content.about) && (
                <div>
                    {content.aboutTitle && (
                        <h2 className="text-lg sm:text-xl font-normal text-black mb-2">
                            {content.aboutTitle}
                        </h2>
                    )}
                    {content.about && <p>{content.about}</p>}
                </div>
            )}

            {/* Challenge Section */}
            {(content.challengeTitle || (content.challenges && content.challenges.length > 0)) && (
                <div>
                    {content.challengeTitle && (
                        <h2 className="text-lg sm:text-xl font-normal text-black mb-2">
                            {content.challengeTitle}
                        </h2>
                    )}
                    {content.challenges && content.challenges.length > 0 && (
                        <div className="space-y-3">
                            {content.challenges.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Solution Section */}
            {(content.solutionTitle || (content.solutions && content.solutions.length > 0)) && (
                <div>
                    {content.solutionTitle && (
                        <h2 className="text-lg sm:text-xl font-normal text-black mb-2">
                            {content.solutionTitle}
                        </h2>
                    )}
                    {content.solutions && content.solutions.length > 0 && (
                        <div className="space-y-3">
                            {content.solutions.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}