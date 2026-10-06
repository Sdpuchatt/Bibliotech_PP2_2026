/**
 * Project     : Bibliotech
 * Description : Manejador de componentes de interfaz dinámica (Zero innerHTML) para alertas y visor modal de PDFs.
 */

// Muestra una ventana de diálogo modal informativa
function showModal(title, message) {
    let modal = document.getElementById('msgModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'msgModal';
        modal.className = 'w3-modal';

        const content = document.createElement('div');
        content.className = 'w3-modal-content w3-card-4 w3-animate-zoom vault-card';
        content.style.maxWidth = '400px';

        const header = document.createElement('header');
        header.className = 'w3-container w3-border-bottom';

        const titleElem = document.createElement('h3');
        titleElem.id = 'modalTitle';
        header.appendChild(titleElem);

        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'w3-container w3-padding';

        const msgElem = document.createElement('p');
        msgElem.id = 'modalBody';
        
        const btnClose = document.createElement('button');
        btnClose.className = 'w3-button w3-right w3-teal w3-margin-bottom'; // Usando Teal como color corporativo
        btnClose.textContent = 'Cerrar';
        btnClose.addEventListener('click', () => modal.style.display = 'none');

        bodyDiv.appendChild(msgElem);
        bodyDiv.appendChild(btnClose);
        content.appendChild(header);
        content.appendChild(bodyDiv);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = message;
    modal.style.display = 'block';
}

// Muestra una ventana modal conteniendo un visor iframe de PDF para lectura en el sitio
function showPdfModal(title, pdfUrl) {
    let modal = document.getElementById('pdfModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdfModal';
        modal.className = 'w3-modal';
        modal.style.zIndex = '9999';

        const content = document.createElement('div');
        content.className = 'w3-modal-content w3-card-4 w3-animate-zoom vault-card';
        content.style.width = '85%';
        content.style.maxWidth = '950px';

        const header = document.createElement('header');
        header.className = 'w3-container w3-border-bottom w3-padding w3-display-container';

        const titleElem = document.createElement('h3');
        titleElem.id = 'pdfModalTitle';
        titleElem.className = 'w3-margin-0 w3-text-teal';
        header.appendChild(titleElem);

        // Botón de cerrar tipo 'X' posicionado en la cabecera
        const btnCloseHeader = document.createElement('span');
        btnCloseHeader.className = 'w3-button w3-display-topright w3-hover-red';
        btnCloseHeader.innerHTML = '&times;'; // Usamos innerHTML exclusivamente para la entidad de HTML 'times'
        btnCloseHeader.style.fontSize = '24px';
        btnCloseHeader.addEventListener('click', () => {
            modal.style.display = 'none';
            // Detener la carga del iframe vaciando el atributo src
            const iframe = document.getElementById('pdfIframe');
            if (iframe) iframe.src = '';
        });
        header.appendChild(btnCloseHeader);

        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'w3-container w3-padding-0';

        const iframe = document.createElement('iframe');
        iframe.id = 'pdfIframe';
        iframe.style.width = '100%';
        iframe.style.height = '75vh';
        iframe.style.border = 'none';
        
        bodyDiv.appendChild(iframe);
        content.appendChild(header);
        content.appendChild(bodyDiv);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    document.getElementById('pdfModalTitle').textContent = title;
    document.getElementById('pdfIframe').src = pdfUrl;
    modal.style.display = 'block';
}
