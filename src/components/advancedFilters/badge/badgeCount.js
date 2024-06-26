import React from 'react';
import  './badge.scss';

function Badge({ count }) {
    return (
        <div className="circle-container">
            <div className="badgecircle">
                <span className="circle-text">{count}</span>
            </div>
        </div>
    );
}

export default Badge;
