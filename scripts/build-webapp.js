const {Files} = require("../node_modules/polar-shared/src/util/Files");
const {FileCopy} = require("../node_modules/polar-shared/src/util/FileCopy");

const dest = 'dist/public';

async function copyRecursive(path, extensions) {
    await FileCopy.copy({
        path: path,
        dest,
        recurse: true,
        extensions
    });
}

async function copy(path, extensions) {
    await FileCopy.copy({
        path: path,
        dest,
        recurse: false,
        extensions
    });
}

async function purge(path) {
    await Files.removeDirectoryRecursivelyAsync(path);
}

async function exec() {

    // *** init the target dir
    await purge("dist/public");
    await Files.createDirAsync("dist/public");

    await copyRecursive('apps', ['html', 'svg', 'png', 'css', ]);

    await Files.copyFileAsync('apps/init.js', `${dest}/apps`);
    await Files.copyFileAsync('apps/service-worker-registration.js', `${dest}/apps`);

    // FIXME: now we have to pass globs... not just the extensions...
    //await copy('apps', ['html', 'svg', 'png', 'css', ]);

}

exec()
    .catch(err => console.error(err));
