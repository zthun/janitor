/* eslint-disable import/no-extraneous-dependencies */
import { environments, recommended } from "@zthun/janitor-eslint-config";

export default [...recommended, ...environments.node];
