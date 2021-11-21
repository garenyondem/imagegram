import { EventEmitter } from 'events';
import { fork, Serializable } from 'child_process';

export const em = new EventEmitter();

em.on('convert-image', (filePath: string) => {
    const child = fork(process.cwd() + '/src/jobs/convert-image');

    child.send({ filePath });

    child.on('message', (m: Serializable) => {
        console.log('PARENT received message:', m);
    });
});
