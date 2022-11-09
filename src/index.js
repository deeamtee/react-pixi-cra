import React, { useMemo, useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Sprite from './components/Sprite';
import './index.css';
import boy from './resources/boy.png'
import apple from './resources/apple.png'
import tree1 from './resources/tree1.png'
import tree2 from './resources/tree2.png'
import trava from './resources/trava.png'
import arrow from './resources/arrow.png'
import Stage from './components/Stage';
import { useTick } from './hooks';
import { randomInteger } from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Stage width={800} height={600}><App /></Stage>)


function App() {
    const [appleVisible, setAppleVisible] = useState(true);
    const [counter, setCounter] = useState(0);
    const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 15 })
    const [applePosition, setApplePosition] = useState({ x: 700, y: 250 })
    const [y, setY] = React.useState(15);
    const backgroundSize = 100;

    const randomForest = useMemo(() => {
        const background = [];
        for (let i = 0; i < 25; i++) {
            const number = randomInteger(1, 2);
            background.push({ x: randomInteger(20, 800), y: randomInteger(20, 600), number })
        }

        return background;

    }, [])

    const background = useMemo(() => {
        const size = backgroundSize;
        const background = [];
        for (let i = 0; i < 800 / size; i++) {
            for (let j = 0; j < 600 / size; j++) {
                background.push({ x: size * i, y: size * j })

            }
        }
        return background;
    }, [])

    const arrowTicker = (delta) => {
        setArrowPosition(prev => ({ x: prev.x + 10 * delta, y: prev.y }))
    }

    const getIntersaction = useCallback((positionA, positionB, size) => {
        const { x: xA, y: yA } = positionA;
        const { x: xB, y: yB } = positionB;

        return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(() => {
        const isIntersaction = getIntersaction(arrowPosition, applePosition, 25);

        if (isIntersaction && appleVisible) {
            setAppleVisible(false);
            setCounter(prev => {
                console.log(prev + 1);
                return prev + 1
            })
        }

    }, [arrowPosition, applePosition])


    useEffect(() => {
        const interval = setInterval(() => {
            const y = randomInteger(0, 550);
            setApplePosition({ x: 700, y })
            setAppleVisible(true)
        }, 2500)

        return () => {
            clearTimeout(interval);
        }
    }, [])

    useTick(arrowTicker)

    const handleClick = useCallback((event) => {
        setArrowPosition({ x: 30, y: event.offsetY })
    }, []);

    const handleMouseMove = useCallback((event) => {
        console.log('handleMouseMove');
        setY(event.data.global.y)
    }, []);

    return <>
        {background.map(({ x, y }, i) => {
            return <Sprite key={i} img={trava} width={backgroundSize} height={backgroundSize} x={x} y={y} />
        })}
        {randomForest.map(({ x, y, number }, i) => {
            if (number === 1) { return <Sprite key={i} img={tree1} width={100} height={100} x={x} y={y} /> }
            return <Sprite key={i} img={tree2} width={100} height={100} x={x} y={y} />
        })}
        {appleVisible && <Sprite img={apple} width={70} height={55} x={applePosition.x} y={applePosition.y} />}
        <text text={counter} x={750} y={15} style={{ fontSize: 48, fill: 0xffffff }} />
        <Sprite img={arrow} width={70} height={40} x={arrowPosition.x} y={arrowPosition.y} />
        <Sprite img={boy} width={150} height={120} anchor={0.37} onClick={handleClick} onMouseMove={handleMouseMove} x={30} y={y} />
    </>
}
