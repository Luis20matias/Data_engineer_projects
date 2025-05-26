import { add } from "./import-examples/mathUtils";
import calculateTotal from "./import-examples/calculator"
import _ from 'lodash';

console.log('Importing in TypeScript!', add(1,5))
console.log('Importing in TypeScript!', _.add(2,3))
console.log('Importing in TypeScript!', calculateTotal([1,2,3]))