// import * as fs from 'fs';
// import {exec, execSync} from 'child_process';
import {parseInt} from 'lodash';
import {readTextFile} from "@tauri-apps/api/fs";
import {Command} from "@tauri-apps/api/shell";

// const sliPath = 'bgm01.ogg.sli';
// const oggPath = 'bgm01.ogg';
// const savePath = 'bgm01.ogg.flac';

// const fileName = 'bgm01.ogg';
// const rootDir = '\\\\192.168.137.164\\data_root6\\downloadedData\\9-nine-bgm\\1\\';

export const processFunction = async (rootDir: string, fileName: string) => {

    const sliPath = rootDir + fileName + `.sli`;
    const oggPath = rootDir + fileName;
    const savePath = rootDir + fileName + '.flac';

    // const s = fs.readFileSync(sliPath, 'utf-8',);
    const s = await readTextFile(sliPath,);

    const r = new RegExp(/^Link\s*{\s*From=(\d+);\s*To=(\d+);/gm);

    const m = r.exec(s);

    console.log(m);
    if (m) {
        console.log(m[0]);
        console.log(parseInt(m[1]));
        console.log(parseInt(m[2]));

        const cmd =
            '"D:\\IDMDownloads\\ffmpeg-4.3.1-2020-11-19-full_build\\bin\\ffmpeg.exe"'
            + ' -i '
            + '"' + oggPath + '"'
            + ' -af atrim=start_sample='
            + parseInt(m[2])
            + ':end_sample='
            + parseInt(m[1])
            + ' '
            + '"' + savePath + '"';
        console.log(cmd);

        const ffmpegExe = 'D:\\IDMDownloads\\ffmpeg-4.3.1-2020-11-19-full_build\\bin\\ffmpeg.exe';
        // https://tauri.studio/en/docs/api/js/classes/shell.Command
        const command = new Command(
            ffmpegExe,
            [
                '-i',
                oggPath,
                '-af',
                `atrim=start_sample=${parseInt(m[2])}:end_sample=${parseInt(m[1])}`,
                savePath,
            ]
        );

        console.log('command', command);

        command.on('close', data => {
            console.log(`command finished with code ${data.code} and signal ${data.signal}`);
        });
        command.on('error', error => console.error(`command error: "${error}"`));
        command.stdout.on('data', line => console.log(`command stdout: "${line}"`));

        const child = await command.spawn();
        // const child = await command.execute();
        console.log('child', child);
        console.log('pid:', child.pid);

    }

}

// const fileNames: string[] = [
//     // 'bgm01.opus',
//     // 'bgm02.opus',
//     // 'bgm03.opus',
//     // 'bgm04.opus',
//     // 'bgm07.opus',
//     // 'bgm09.opus',
//     // 'bgm18.opus',
//     // 'bgm19.opus',
//     'bgm20.opus',
//     'bgm21.opus',
// ];
// const rootDir = 'e:\\GalGame\\??????????????????????????????\\BGM\\';
//
// (async () => {
//     for (let T of fileNames) {
//         await processFunction(rootDir, T);
//     }
// })();
