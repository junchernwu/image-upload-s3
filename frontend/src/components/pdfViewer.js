import ReactDOM from "react-dom";

import React, { useState } from "react";
import Pdf from "@mikecousins/react-pdf";

const MyPdfViewer = () => {
    const [page, setPage] = useState(1);

    return (
        <Pdf file="/images/09d082a43c7fed54d8c55768056e76ed" page={page}>
            {({ pdfDocument, pdfPage, canvas }) => (
                <>
                    {!pdfDocument && <span>Loading...</span>}
                    {canvas}
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                        <nav>
                            <ul className="pager">
                                <li className="previous">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>
                                <li className="next">
                                    <button
                                        disabled={page === pdfDocument.numPages}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </Pdf>
    );
};
export default MyPdfViewer