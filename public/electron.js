/* eslint import/no-unresolved: [2, { ignore: ['electron'] }] */
/* eslint-disable import/no-extraneous-dependencies */

const electron = require('electron');
const menubar = require('menubar');
const path = require('path');
const { autoUpdater } = require('electron-updater');

const isDev = require('electron-is-dev');

const { dialog, Menu, app, BrowserWindow } = electron;

const config = require('./config');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let menu;

autoUpdater.autoDownload = false;

function sendStatusToWindow(text) {
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Found Updates',
    message: 'An update has been found. Do you want to update now?',
    buttons: ['Sure', 'No'],
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate();

      dialog.showMessageBox({
        title: 'Downloading...',
        message: 'The update is downloading in background. We\'ll let you know when it\'s finished.',
      });
    }
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be restarted for updating...',
  }, () => {
    autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
  sendStatusToWindow(info);
});

autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater.');
  sendStatusToWindow(err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
  logMessage += ` - Downloaded ${progressObj.percent}%`;
  logMessage += ` (${progressObj.transferred}/${progressObj.total})`;
  sendStatusToWindow(logMessage);
});

function getMenuTemplate() {
  const template = [
    {
      label: config.APP_NAME,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'close' },
        { type: 'separator' },
        { role: 'front' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: `Learn more about ${config.APP_NAME}`,
          click: () => electron.shell.openExternal(config.APP_URL),
        },
        {
          label: 'Report an Issue...',
          click: () => electron.shell.openExternal(`mailto:${config.SUPPORT_EMAIL}`),
        },
      ],
    },
  ];

  if (!mainWindow) {
    template[3].submenu.push({
      type: 'separator',
    });
  }

  return template;
}

function initMenu() {
  menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 320,
    minHeight: 500,
    titleBarStyle: 'hidden',
  });

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, 'index.html')}`);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    initMenu();
  });

  // mainWindow.webContents.openDevTools();

  initMenu(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  autoUpdater.checkForUpdates();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow == null) {
    createWindow();
  }
});


// Menubar
menubar({
  dir: path.resolve(__dirname),
  icon: path.resolve(__dirname, 'images', 'iconTemplate.png'),
  width: 400,
  height: 500,
  showDockIcon: true,
});
