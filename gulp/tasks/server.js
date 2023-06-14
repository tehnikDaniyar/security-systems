export const server = (done) => {
	return app.plugins.browserSync.init({
		server: {
			baseDir: `${app.path.server.html}`,
		},
		notify: false,
		port: 3000,
	});
};