import * as  nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = './src';
const buildFolder = './dist';

export const path = {
	build: {
		files: `${buildFolder}/files/`,
		html: `${buildFolder}`,
		images: `${buildFolder}/img/`,
		scss: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		image: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
	},
	src: {
		files: `${srcFolder}/files/**/*.*`,
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/style.scss`,
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	whatch: {
		files: `${srcFolder}/files/**/*.*`,
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/scss/**/*.scss`,
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp, svg}`,
	},
	clean: {
		files: `${buildFolder}`,
	},
	server: {
		html: `${buildFolder}/`,
	},
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	buildFolder: buildFolder,
};