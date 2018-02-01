import React from 'react';

const PageShell = Page => {
    return props =>
        <div className="dimitri">
            <Page {...props} />
        </div>;
};

export default PageShell;