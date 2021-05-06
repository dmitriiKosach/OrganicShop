import React from 'react';

export default function Preloader() {

    return <React.Fragment>
        <div className="spinner-modal">
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}