import React from 'react';

export default function Preloader() {

    return <React.Fragment>
        <div className="spinner__modal">
            <div className="d-flex justify-content-center">
                <div className="spinner__border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}