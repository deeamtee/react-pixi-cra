import * as PIXI from 'pixi.js';

const Tiling = ({ img, ...args }) => {
	const texture = PIXI.Texture.from(img);
	return (
		<tiling
			texture={texture}
			{...args}
		/>
	);
};

export default Tiling;
