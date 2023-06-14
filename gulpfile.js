import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	gulp: gulp,
	path: path,
	plugins: plugins,
};

//======tasks===============
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';


//=====watcher==============
const watcher = () => {
	gulp.watch(path.whatch.files, copy);
	gulp.watch(path.whatch.html, html);
	gulp.watch(path.whatch.scss, scss);
	gulp.watch(path.whatch.js, js);
	gulp.watch(path.whatch.images, images);
};


//=====scripts==============
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainScript = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const dev = gulp.series(reset, mainScript, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainScript);
const deployZIP = gulp.series(reset, mainScript, zip);

//=====exports==============
export { svgSprive };
export { dev };
export { build };
export { deployZIP };

gulp.task('default', dev);

