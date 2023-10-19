import React from 'react';
import { SpinLoading } from 'antd-mobile';

export default function Spinner() {
    const inlineStyles = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.2)'
    };

    return (
        <div style={inlineStyles}>
            <SpinLoading
                color="primary"
                style={{
                    "--size": "60px"
                }} />
        </div>
    );
}