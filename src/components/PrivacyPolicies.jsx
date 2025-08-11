import { useState } from 'react';
import Dialog from './Dialog';


export default function PrivacyPolicies({ name }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDialog = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            {
                isOpen &&
                <Dialog handleDialog={handleDialog}>
                    <section class="max-w-4xl mx-auto py-16 px-6 text-white">
                        <h1 class="text-4xl font-bold mb-6">Política de Privacidad</h1>
                        <p class="mb-4">
                            En SOLICMEX valoramos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
                        </p>
                        <h2 class="text-2xl font-semibold mt-6 mb-2">Recopilación de Datos</h2>
                        <p class="mb-4">
                            Podemos recopilar datos personales como nombre, correo electrónico, número telefónico y otra información que proporciones voluntariamente al llenar formularios en nuestro sitio.
                        </p>
                        <h2 class="text-2xl font-semibold mt-6 mb-2">Uso de Información</h2>
                        <p class="mb-4">
                            Usamos la información para responder tus solicitudes, proporcionar servicios y mejorar la experiencia del usuario.
                        </p>
                        <h2 class="text-2xl font-semibold mt-6 mb-2">Seguridad</h2>
                        <p class="mb-4">
                            Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, no podemos garantizar una seguridad absoluta en internet.
                        </p>
                        <h2 class="text-2xl font-semibold mt-6 mb-2">Contacto</h2>
                        <p class="mb-4">
                            Si tienes preguntas sobre esta política, puedes contactarnos en: operaciones@solicmex.com
                        </p>
                    </section>
                </Dialog>
            }
            <span className="cursor-pointer text-cyan-500/70 hover:text-cyan-300 text-sm transition-colors" onClick={handleDialog}>
                {name}
            </span>
        </>




    )
}
