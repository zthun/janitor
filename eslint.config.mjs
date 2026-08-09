/* eslint-disable import-x/no-extraneous-dependencies */
import { environments, recommended } from "@zthun/janitor-eslint-config";

export default [...recommended, ...environments.node];
