import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import boy from './resources/boy.png';
import apple from './resources/apple.png';
import Sprite from './components/Sprite'
import Stage from './components/Stage'
import { useTick } from './hooks'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Stage width={800} height={600}><App /></Stage>);

function App() {
    const [visible, setVisible] = useState(true)
    const [y, setY] = useState(15)

    const handleClick = () => {
        console.log('handleClick');
        setVisible(prev => !prev)
    };
    const handleMouseMove = (event) => {
        console.log('handleMouseMove');
        setY(event.data.global.y)
    };

    useTick((delta) => {
        setY(prev => prev + delta * 10)
    })

    return (
        <>
            {visible && <Sprite img={apple} width={70} height={50} x={550} y={15} />}
            <Sprite img={boy} width={150} height={130} x={15} y={y} onClick={handleClick} onMouseMove={handleMouseMove} />
        </>
    )
}
