document.addEventListener('DOMContentLoaded', () => {
    // --- CARRUSEL ---
    const tira = document.querySelector('.carrusel-tira');

    if (tira) {
        const imagenes = document.querySelectorAll('.carrusel-tira img');
        const puntos = document.querySelectorAll('.punto');
        const btnPrev = document.querySelector('.prev');
        const btnNext = document.querySelector('.next');

        let contador = 0;

        const actualizarCarrusel = () => {
            tira.style.transform = `translateX(-${contador * 100}%)`;

            puntos.forEach((punto, index) => {
                punto.classList.toggle('activo', index === contador);
            });
        };

        if (btnNext) {
            btnNext.onclick = () => {
                contador = (contador + 1) % imagenes.length;
                actualizarCarrusel();
            };
        }

        if (btnPrev) {
            btnPrev.onclick = () => {
                contador = (contador - 1 + imagenes.length) % imagenes.length;
                actualizarCarrusel();
            };
        }
    }

    // --- FORMULARIOS CON FEEDBACK ---
    function manejarFormularioParticipacion(config) {
        const formulario = document.getElementById(config.formularioId);
        const feedback = document.getElementById(config.feedbackId);

        if (!formulario || !feedback) return;

        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById(config.nombreId).value.trim();
            const apellido = document.getElementById(config.apellidoId).value.trim();
            const email = document.getElementById(config.emailId).value.trim();
            const programa = document.getElementById(config.programaId).value;

            if (nombre === '' || apellido === '' || email === '' || programa === '') {
                alert('Por favor completá todos los campos.');
                return;
            }

            formulario.classList.add('oculto');

            feedback.innerHTML = `
                <h3>¡Hola ${nombre}!</h3>
                <h3>Te has registrado con éxito.</h4>
                <p>Gracias por confiar en nosotros, no olvides sacar tu entrada.</p>
                <p>¡Te esperamos!</p>
            `;

            feedback.classList.remove('oculto');
        });
    }

    manejarFormularioParticipacion({
        formularioId: 'formularioParticipacionSeccion',
        feedbackId: 'feedbackFormularioSeccion',
        nombreId: 'nombreSeccion',
        apellidoId: 'apellidoSeccion',
        emailId: 'emailSeccion',
        programaId: 'programaSeccion'
    });

    manejarFormularioParticipacion({
        formularioId: 'formularioParticipacionModal',
        feedbackId: 'feedbackFormularioModal',
        nombreId: 'nombreModal',
        apellidoId: 'apellidoModal',
        emailId: 'emailModal',
        programaId: 'programaModal'
    });

    // --- MODAL FORMULARIO ---
    const botonesAbrirModal = document.querySelectorAll('.portada-button, .juga-button');
    const modalFormulario = document.getElementById('modalFormulario');
    const cerrarModal = document.getElementById('cerrarModal');

    if (botonesAbrirModal.length > 0 && modalFormulario) {
        botonesAbrirModal.forEach((boton) => {
            boton.addEventListener('click', (evento) => {
                evento.preventDefault();

                const formularioModal = document.getElementById('formularioParticipacionModal');
                const feedbackModal = document.getElementById('feedbackFormularioModal');

                if (formularioModal && feedbackModal) {
                    formularioModal.reset();
                    formularioModal.classList.remove('oculto');
                    feedbackModal.classList.add('oculto');
                }

                modalFormulario.classList.remove('oculto');
            });
        });
    }

    if (cerrarModal && modalFormulario) {
        cerrarModal.addEventListener('click', () => {
            modalFormulario.classList.add('oculto');
        });
    }
});