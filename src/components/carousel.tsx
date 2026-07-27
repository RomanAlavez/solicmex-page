import { useEffect, useState } from 'react'

export default function Carousel() {
    const CAROUSE_IMAGES = [
        "/trabajo-1.webp",
        "/oficinas-ISSEG-1.webp",
        "/images/projects/image-22.jpg",
        "/oficinas-ISSEG-2.webp",
        "/actividad-fisica.webp",
        "/oficinas-ISSEG-3.webp",
        "/images/projects/image-24.jpg",
        "/proveedores.webp",
        "/trabajo-2.webp",
    ]

    const [currentImageCarousel, setCurrentImageCarousel] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageCarousel((prev) => (prev + 1) % CAROUSE_IMAGES.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [CAROUSE_IMAGES.length])

    return (


        <img
            key={currentImageCarousel}
            src={CAROUSE_IMAGES[currentImageCarousel]}
            alt="Background Image"
            loading="eager"
            decoding="async"
            className="
                    object-cover rounded-2xl w-full h-full 
                    animate-[fade_3s_ease-in-out_infinite]
                "
        />


    )
}