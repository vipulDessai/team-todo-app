// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = process.env.NODE_ENV === 'test' ? true : false;
// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = process.env.NODE_ENV === 'test' ? true : false;
// @ts-ignore
self.IS_REACT_ACT_ENVIRONMENT = process.env.NODE_ENV === 'test' ? true : false;
// @ts-ignore
window.IS_REACT_ACT_ENVIRONMENT = process.env.NODE_ENV === 'test' ? true : false;

// Read all the environment variables
import { config } from 'dotenv';
config();

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// since the window is global and its keys can be accessed
// it will serve the ENV attributes
for(let envKey in process.env) {
    window[envKey] = JSON.stringify(process.env[envKey]);
}