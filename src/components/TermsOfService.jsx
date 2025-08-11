import { useState } from 'react';
import React from 'react';
import Dialog from './Dialog';


export default function TermsOfService({ name }) {
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
            <h1 class="text-4xl font-bold mb-6">Términos de Servicio</h1>
            <p class="mb-4">
              Bienvenido a SOLICMEX. Al acceder a nuestro sitio web o utilizar nuestros servicios, aceptas cumplir con estos Términos de Servicio. Si no estás de acuerdo, por favor no uses nuestros servicios.
            </p>
            <h2 class="text-2xl font-semibold mt-6 mb-2">Uso del Sitio</h2>
            <p class="mb-4">
              Este sitio está diseñado para ofrecer información sobre nuestros servicios de protección contra incendios. No está permitido utilizar el sitio para fines ilegales o no autorizados.
            </p>
            <h2 class="text-2xl font-semibold mt-6 mb-2">Propiedad Intelectual</h2>
            <p class="mb-4">
              Todo el contenido de este sitio web, incluyendo textos, gráficos y logotipos, es propiedad de SOLICMEX o sus licenciantes, y está protegido por las leyes de propiedad intelectual.
            </p>
            <h2 class="text-2xl font-semibold mt-6 mb-2">Modificaciones</h2>
            <p class="mb-4">
              Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Las modificaciones serán efectivas desde su publicación en este sitio.
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
