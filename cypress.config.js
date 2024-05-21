const {defineConfig} = require('cypress');
const dotenv = require('cypress-plugin-dotenv');
const prostredia = require('./prostredia.js');
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
				break;
		
			default:
				break;
		}
		return launchOptions
      })
	  	return config.env.configFile = prostredia
		},
		testIsolation: true,
		headless: true
	},
	experimentalCspAllowList: ["frame-src"],
	retries: {
		openMode: 1,
		runMode: 1
	},
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