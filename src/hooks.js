import { useContext, useEffect } from 'react';
import { AppContext } from './context';

const useApp = () => {
    const app = useContext(AppContext);
    return app;
}

export const useTick = (fn) => {
    const { ticker } = useApp();

    useEffect(() => {
        ticker.add(fn)

        return () => {
            ticker.remove(fn);
        }
    }, [fn, ticker])

}