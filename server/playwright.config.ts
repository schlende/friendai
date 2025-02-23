import { PlaywrightTestConfig, devices } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config({ path: "./.env.test" })

const devconfig: PlaywrightTestConfig = {

	use: {
		baseURL: "http://localhost:5173"
	},

	timeout: 5000,
	testDir: 'tests',
	testMatch: ['**/*.test.ts'],
};


const prodconfig: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default devconfig;
