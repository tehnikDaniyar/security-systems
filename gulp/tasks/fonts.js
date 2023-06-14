import fs, { appendFile } from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
	//finding .otf files
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		//convert .otf to .ttf
		.pipe(fonter({
			formats: ['ttf'],
		}))
		//pastening in src folder
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
};

export const ttfToWoff = () => {
	//finding .ttf files
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		//convert .ttf to .woff
		.pipe(fonter({
			formats: ['woff'],
		}))
		//pastening in build folder
		.pipe(app.gulp.dest(app.path.build.fonts))
		//findening .ttf files
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
		//converting .ttf to .woff2
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.path.build.fonts))
};

export const fontsStyle = () => {
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavybold') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
							`@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
								font-weight: ${fontWeight};
								font-style: normal;
							}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				console.log("file scss/fonts.scss is exist. If youneed update tihs file, delete it");
			}
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
} 
