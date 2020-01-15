import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";

import pkg from "./package.json";

const { pluginName } = pkg;
const name = pluginName.from
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: pluginName.from,
	output: {
		file: pluginName.to,
		format: "umd",
		name
	},
	plugins: [
		ts({
			include: ["src/**/*"],
			tsconfig: {
				target: "es6",
				declaration: true
			}
		}),
		svelte(),
		resolve(),
		terser({
			numWorkers: 2
		}),
		progress(),
		filesize()
	]
};