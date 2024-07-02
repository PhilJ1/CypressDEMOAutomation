const {defineConfig} = require('cypress');
const dotenv = require('cypress-plugin-dotenv');
const environments = require('./src/environments.js');
module.exports = defineConfig({
	projectId: 'zaqmt4',
	e2e: {
    testIsolation:true,
		setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
		switch (browser.name) {
			case 'chrome':
				launchOptions.args.push('--no-sandbox')
				launchOptions.args.push('--auto-open-devtools-for-tabs')
				launchOptions.args.push('--start-fullscreen')
				break;
			case 'edge':
				break;
			default:
				//electron
				console.log('default');
				break;
		}
		return launchOptions
      })
	  	return config.env.configFile = environments
		},
		testIsolation: true,
		headless: true
	},
	experimentalCspAllowList: ["frame-src"],
	// retries: {
	// 	openMode: 1,
	// 	runMode: 1
	// },
	experimentalStudio: true,
	viewportHeight: 720,
	viewportWidth: 1280,
	downloadsFolder: './downloads',
	chromeWebSecurity: false,
	video: true,
	watchForFileChanges: true,
	experimentalFetchPolyfill: true,
	trashAssetsBeforeRuns:true,
  	scrollBehavior:'nearest',
});