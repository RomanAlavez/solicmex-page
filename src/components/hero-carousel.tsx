import React, { useEffect, useState } from 'react'

export default function HeroCarousel() {
    const CAROUSE_IMAGES = [
        "/images/projects/image-21.jpg",
        "/images/projects/image-22.jpg",
        "/images/projects/image-23.jpg",
        "/images/projects/image-24.jpg",
        "/images/projects/image-25.jpg",
    ]

    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % CAROUSE_IMAGES.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [CAROUSE_IMAGES.length])

    return (
        <>
        
            <img
                key={currentImage}
                src={CAROUSE_IMAGES[currentImage]}
                alt="Background Image"
                loading="eager"
                decoding="async"
                className="
                    absolute -z-20 w-full h-full inset-0 object-cover
                    mask-y-from-70% mask-y-to-90%
                    mask-x-from-70% mask-x-to-90%
                    animate-[fade_5s_ease-in-out_infinite]
                    translate-x-3/12
                "
            />

            <img
                key={`blur-${currentImage}`}
                src={CAROUSE_IMAGES[currentImage]}
                alt="Background Blur"
                loading="eager"
                decoding="async"
                className="
                    absolute -z-30 w-full h-full object-cover blur-sm
                    animate-[fade_5s_ease-in-out_infinite]
                    translate-x-3/12
                "
            />

        </>
    )
}