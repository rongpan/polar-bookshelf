import PDFJS from 'pdfjs-dist';
import {PDFViewer, PDFLinkService, PDFFindController} from 'pdfjs-dist/web/pdf_viewer';

const url = '../../../test.pdf';

async function createPDFViewer() {

    PDFJS.GlobalWorkerOptions.workerSrc = '../../../node_modules/pdfjs-dist/build/pdf.worker.js';

    const container = document.getElementById('viewerContainer');

    if (! container) {
        throw new Error("No container");
    }

    const pdfLinkService = new PDFLinkService();

    const pdfViewer = new PDFViewer({
        container: container as HTMLDivElement,
        linkService: pdfLinkService,
        // findController: this.pdfFindController,
        // enhanceTextSelection: true,
        textLayerMode: 2
    });

    const pdfFindController = new PDFFindController({
        pdfViewer
    });

    pdfLinkService.setViewer(pdfViewer);
    // pdfViewer.setFindController(pdfFindController);

    const loadingTask = PDFJS.getDocument({
        url,
        cMapUrl: '../../../node_modules/pdfjs-dist/cmaps/',
        cMapPacked: true,
    });

    const pdfDocument = await loadingTask.promise;

    pdfViewer.setDocument(pdfDocument);
    pdfLinkService.setDocument(pdfDocument, url);

}

createPDFViewer().catch(err => console.log(err));
