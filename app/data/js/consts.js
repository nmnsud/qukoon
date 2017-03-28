const {remote} = require('electron');
const mWindow = remote.getCurrentWindow();
const app = remote.app;
const {Menu, MenuItem} = remote;
const Dialog = remote.dialog;
const FileSystem = require('fs');
const PROJECT_DIRECTORY = process.env.USERPROFILE + '\\Documents\\Qukoon Projects\\';