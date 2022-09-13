# wpm
> A hacked-together solution for resolving downstream dependency errors in the Wasp ecosystem


### Get Started
1. Ensure both NodeJS and NPM are installed:
```bash
$ node -v && npm -v
```
2. Download all dependencies:
```bash
$ npm install
```
3. (Optional, **Linux-Only**) - symlink ``index.mjs`` to ``wpm``
```bash
$ npm link
```


### Features + Usage
WPM supports several operations out-of-the-box. Just like a package manager like NPM, it can install and uninstall packages at latest or historical versions, but it has the added benefit of checking for specific known issues of the installed library with the Wasp Ecosystem. 

__As a side-note, wpm also has a (limited) ability to detect typos and output smart responses to these. For example, typing ``instale`` instead of ``install`` will output a message like ``Invalid command 'instale.' Did you mean 'install'?``.__

To install a package, you can simply do:
```bash
$ wpm install <package name> --version=<version (optional)>
```
Or, if you never symlinked:
```bash
$ node index.mjs install <package name> --version=<version (optional)>
```

Likewise, ``uninstall <package name> --version=<version (optional)>`` will uninstall a package. Besides these, there are also some optional flags, listed below:
 - ``--update`` - updates the ``wasp.json`` file, which contains all the known packages having issues with the Wasp ecosystem at the time. By default, all ``install``'s update before downloading the package.
 - ``--help`` - As the name implies, this flag outputs all the valid commands wpm accepts.


### Adding New Issues (Using ``Wasp.json``)
This repository hosts the live-copy of the file containing all the package errors within the Wasp ecosystem, any time a new issue is discovered, a PR here adding this to the ``wasp.json`` file will ensure that anyone else using the tool is aware.

New entries in ``wasp.json`` should follow the format of the ``test-error`` package shown there, namely:
```json
"<package name>": {
  "error": "The message to be displayed, or potentially a fix for the error (e.g., use @v2.0.0 in install)"
}
```


### TODO
 - ``--version`` flags, regular releases.
 - GUI for ading new errors. This shold be trivial, since they can be written directly to ``wasp.json``.
 - comprehensive testing could uncover various bugs within wpm.


### License
MIT
