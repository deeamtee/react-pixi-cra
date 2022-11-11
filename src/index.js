import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import boy from './resources/boy.png';
import tree1 from './resources/tree1.png';
import tree2 from './resources/tree2.png';
import trava100 from './resources/trava100.png';
import apple from './resources/apple.png';
import arrow from './resources/arrow.png';
import Sprite from './components/Sprite'
import Tiling from './components/Tiling'
import Stage from './components/Stage'
import { useApp, useTick } from './hooks'
import { randomInteger } from './utils'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<div style={{ cursor: 'none' }}><Stage width={800} height={600}><App /></Stage></div>);

function App() {
    const [y, setY] = useState(15)
    const [arrowPosition, setArrowPosition] = useState({ x: 900, y: 15 })
    const [applePosition, setApplePosition] = useState({ x: 700, y: 15 })
    const [appleVisible, setAppleVisible] = useState(true)
    const [counter, setCounter] = useState(0);
    const app = useApp();

    const handleMouseMove = (event) => {
        console.log('handleMouseMove');
        setY(event.data.global.y)
    };

    const randomForest = useMemo(() => {
        const background = [];
        for (let i = 0; i < 25; i++) {
            const number = randomInteger(1, 2);

            const treePosition = { x: randomInteger(20, 800), y: randomInteger(20, 600) }

            background.push({ x: treePosition.x, y: treePosition.y, number });

        }
        return background;
    }, [])

    const handleClick = useCallback(
        (event) => {
            setArrowPosition({ x: 30, y: event.offsetY })
        },
        [],
    )

    const getIntersection = useCallback(
        (positionA, positionB, size) => {
            const { x: xA, y: yA } = positionA;
            const { x: xB, y: yB } = positionB;

            return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
        },
        [],
    )

    useEffect(() => {
        setInterval(() => {
            const y = randomInteger(0, 550)
            setApplePosition({ x: 700, y })
            setAppleVisible(true)
        }, 2500)

    }, [])


    useEffect(() => {
        const isIntersection = getIntersection(arrowPosition, applePosition, 25);

        if (isIntersection && appleVisible) {
            setAppleVisible(false)
            setCounter(p => p + 1)
            console.log(counter);
        }
    }, [arrowPosition, applePosition])

    const arrowTicker = (delta) => {
        setArrowPosition(prev => ({ x: prev.x + 10 * delta, y: prev.y }))
    }
    useTick(arrowTicker)

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])


    return (
        <>
            <Tiling img={trava100} width={app.screen.width} height={app.screen.height} />
            {randomForest.map(({ x, y, number }, i) => {
                if (number === 1) {
                    return <Sprite key={i} img={tree1} width={100} height={100} x={x} y={y} />
                } else {
                    return <Sprite key={i} img={tree2} width={100} height={100} x={x} y={y} />

                }

            })}
            <text text={counter} style={{ fontSize: 48, fill: 0xffffff }} x={750} y={0} />
            {appleVisible && <Sprite img={apple} width={75} height={50} x={applePosition.x} y={applePosition.y} />}
            <Sprite img={arrow} width={70} height={40} x={arrowPosition.x} y={arrowPosition.y} />
            <Sprite img={boy} width={150} height={120} x={30} y={y} anchor={0.37} onMouseMove={handleMouseMove} />
        </>
    )
}
