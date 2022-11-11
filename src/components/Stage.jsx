import * as PIXI from 'pixi.js';
import { useCallback } from 'react';
import { AppProvider } from '../context';
import { render } from '../renderer';

const Stage = ({ width, height, options, children }) => {
	const mountStage = useCallback(
		(canvas) => {
			const app = new PIXI.Application({
				width,
				height,
				view: canvas,
				backgroundColor: 0x292c33,
			});
			const provider = <AppProvider app={app}>{children}</AppProvider>;
			render(provider, app.stage);
		},
		[children, width, height]
	);

	return <canvas ref={mountStage} />;
};

export default Stage;
