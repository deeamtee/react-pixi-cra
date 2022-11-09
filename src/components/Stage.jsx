import * as PIXI from 'pixi.js';
import React from 'react';
import { AppProvider } from '../context';
import { render } from '../renderer';

const Stage = ({ children, width, height }) => {
	const mountStage = React.useCallback(
		(canvas) => {
			const app = new PIXI.Application({
				width: width,
				height: height,
				view: canvas,
				backgroundColor: 0x292c33,
			});
			const provider = <AppProvider app={app}>{children}</AppProvider>;
			render(provider, app.stage);
			// document.body.appendChild(app.view);
		},
		[children, width, height]
	);

	return <canvas ref={mountStage} />;
};

export default Stage;
