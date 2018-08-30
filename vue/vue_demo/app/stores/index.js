import picshowStore from "./picshowStore.js";
import carlistStore from "./carlistStore.js";
import userinfoStore from "./userinfoStore.js";
import createLogger from 'vuex/dist/logger';

export default {
	modules: {
		picshowStore,
		carlistStore,
		userinfoStore
	},
	plugins: [createLogger()]
}