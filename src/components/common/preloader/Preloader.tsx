import React from 'react'
import bookPreloader from '../../../assets/img/book.png'

const preloaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}

const Preloader: React.FC = () => {
    return (
        <div style={preloaderStyles}>
            <div><img src={bookPreloader} /></div>
        </div>
    )
}

export default Preloader
