import { Server } from './app';
import config from './config';
import { default as initMongoConnections } from './db/mongo';
import './extensions';

init(config.servicePort).catch((err) => {
    shutdown(err);
});

async function init(port: string) {
    await initMongoConnections();
    new Server(port).start();
}

process.on('uncaughtException', shutdown).on('SIGINT', shutdown).on('SIGTERM', shutdown);

function shutdown(err: any) {
    err && console.error(err);
    process.exit();
}
