import * as path from 'path';
import * as fs from 'fs';
const exampleRelativeDirPath = 'docs/_debug_examples';
const outputRelativeDirPath = 'sub_projects/debug/output';
const correctOutputRelativeDirPath = 'sub_projects/debug/correct_output';
export type BrowserNameType = 'webkit' | 'firefox' | 'chromium' | 'edge';
export function rightPadding(text: string, maxLen: number) {
    let s = text;
    while (s.length < maxLen) {
        s += " ";
    }
    return s;
}

export function outputLog(msg: string) {
    const _path = `${getAbsoluteDirectoryPath(outputRelativeDirPath)}`;
    fs.writeFile(_path + "/result.log", msg, () => {
        console.log('正常に書き込みが完了しました');
    });
}

export function getAbsoluteDirectoryPath(relativeDirPath: string): string {
    const name = "GraphTableSVG";
    const p = __filename.indexOf(name);
    const baseDirPath = __filename.substring(0, p + name.length);
    if (relativeDirPath == "") {
        return `${baseDirPath}`
    } else {
        return `${baseDirPath}/${relativeDirPath}`
    }
}
export function concatenatePaths(relativeDirPath1: string, relativeDirPath2: string): string {
    if (relativeDirPath1 == "") {
        return relativeDirPath2;
    } else {
        if (relativeDirPath2 == "") {
            return relativeDirPath1;
        } else {
            return `${relativeDirPath1}/${relativeDirPath2}`;
        }

    }
}
function getAbusoluteOutputHTMLFolderPath(): string {
    return `${getAbsoluteDirectoryPath(outputRelativeDirPath)}/html`;
}
function getAbusoluteOutputNormalizedHTMLFolderPath(): string {
    return `${getAbsoluteDirectoryPath(outputRelativeDirPath)}/normalized_html`;
}

function getAbusoluteOutputScreenShotFolderPath(): string {
    return `${getAbsoluteDirectoryPath(outputRelativeDirPath)}/screenshot`;
}
function getAbusoluteCorrectHTMLFolderPath(): string {
    return `${getAbsoluteDirectoryPath(correctOutputRelativeDirPath)}/html`;
}
function getAbusoluteCorrectNormalizedHTMLFolderPath(): string {
    return `${getAbsoluteDirectoryPath(correctOutputRelativeDirPath)}/normalized_html`;
}

function getAbusoluteCorrectPNGFolderPath(): string {
    return `${getAbsoluteDirectoryPath(correctOutputRelativeDirPath)}/screenshot`;
}

export function tryCreateSaveFolders() {

    createDirectoryIfNotExist(getAbusoluteOutputHTMLFolderPath());
    createDirectoryIfNotExist(getAbusoluteOutputScreenShotFolderPath());
    createDirectoryIfNotExist(getAbusoluteOutputNormalizedHTMLFolderPath());

    createDirectoryIfNotExist(getAbusoluteCorrectHTMLFolderPath());
    createDirectoryIfNotExist(getAbusoluteCorrectPNGFolderPath());
    createDirectoryIfNotExist(getAbusoluteCorrectNormalizedHTMLFolderPath());

}


export class BrowserHTMLPair {
    dirPath: string = "";;
    filename: string = "";;
    browserName: BrowserNameType = "firefox";
    constructor(_dirPath: string, _filename: string, _browserName: BrowserNameType) {
        this.dirPath = _dirPath;
        this.filename = _filename;
        this.browserName = _browserName;



    }
    public get filenameWithoutExe(): string {
        const exe = path.extname(this.filename)
        const filenameWithoutExe = this.filename.substring(0, this.filename.length - exe.length);
        return filenameWithoutExe;

    }
    public get exampleDirPath(): string {
        const exampleDirPath = concatenatePaths(getAbsoluteDirectoryPath(exampleRelativeDirPath), this.dirPath);
        return exampleDirPath;

    }
    public get outputDirPath(): string {
        const outputDirPath = concatenatePaths(getAbsoluteDirectoryPath(outputRelativeDirPath), this.dirPath);
        return outputDirPath;
    }
    public get correctOutputDirPath(): string {
        const correctOutputDirPath = concatenatePaths(getAbsoluteDirectoryPath(correctOutputRelativeDirPath), this.dirPath);
        return correctOutputDirPath;

    }
    public get absoluteFilePath(): string {
        const absoluteFilePath = concatenatePaths(this.exampleDirPath, this.filename);
        return absoluteFilePath;
    }



    public get outputHTMLPath(): string {
        return `${getAbusoluteOutputHTMLFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.html`;
    }
    public get outputNormalizedHTMLPath(): string {
        return `${getAbusoluteOutputNormalizedHTMLFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.log`;
    }

    public get outputPNGPath(): string {
        return `${getAbusoluteOutputScreenShotFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.png`;
    }
    public get correctHTMLPath(): string {
        return `${getAbusoluteCorrectHTMLFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.html`;
    }
    public get correctPNGPath(): string {
        return `${getAbusoluteCorrectPNGFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.png`;
    }
    public get correctNormalizedHTMLPath(): string {
        return `${getAbusoluteCorrectNormalizedHTMLFolderPath()}/${this.dirPath}_${this.filenameWithoutExe}_${this.browserName}.log`;
    }

    public async loadOutputHTML(): Promise<string | null> {
        if (fs.existsSync(this.outputHTMLPath)) {
            const html = await fs.readFileSync(this.outputHTMLPath, 'utf-8');
            return html;
        } else {
            return null;
        }
    }
    public async loadOutputNormalizedHTML(): Promise<string | null> {
        if (fs.existsSync(this.outputNormalizedHTMLPath)) {
            const html = await fs.readFileSync(this.outputNormalizedHTMLPath, 'utf-8');
            return html;
        } else {
            return null;
        }
    }

    public async loadcorrectHTML(): Promise<string | null> {
        if (fs.existsSync(this.correctHTMLPath)) {
            const html = await fs.readFileSync(this.correctHTMLPath, 'utf-8');
            return html;
        } else {
            return null;
        }
    }
    public async loadcorrectNormalizedHTML(): Promise<string | null> {
        if (fs.existsSync(this.correctNormalizedHTMLPath)) {
            const html = await fs.readFileSync(this.correctNormalizedHTMLPath, 'utf-8');
            return html;
        } else {
            return null;
        }
    }

    public async saveToCorrectHTML(html: string) {
        await fs.writeFile(this.correctHTMLPath, html, (err) => {
            if (err) throw err;
            console.log(`Saved: ${this.correctHTMLPath}`);
        });

    }
    public async copyToCorrectPNG(path: string) {
        fs.copyFileSync(path, this.correctPNGPath);
    }
    public async saveToCorrectNormalizedHTML(html: string) {
        await fs.writeFile(this.correctNormalizedHTMLPath, html, (err) => {
            if (err) throw err;
            console.log(`Saved: ${this.correctNormalizedHTMLPath}`);
        });

    }

}


type DirectoryInfo = { dirPath: string, fileName: string };

export function createDirectoryIfNotExist(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (err) => {
            if (err) { throw err; }
            console.log(`Created folder: ${dirPath}`);
        });
    }

}
export function createDirectories(info: DirectoryInfo) {
    const currentRelativeDirPath = info.dirPath;
    const fileName = info.fileName;
    const outputDirPath = concatenatePaths(getAbsoluteDirectoryPath(outputRelativeDirPath), currentRelativeDirPath);
    const correctOutputDirPath = concatenatePaths(getAbsoluteDirectoryPath(correctOutputRelativeDirPath), currentRelativeDirPath);
    const exe = path.extname(fileName)
    const filenameWithoutExe = fileName.substring(0, fileName.length - exe.length);


    createDirectoryIfNotExist(outputDirPath);
    createDirectoryIfNotExist(`${outputDirPath}/${filenameWithoutExe}`);

    createDirectoryIfNotExist(correctOutputDirPath);
    createDirectoryIfNotExist(`${correctOutputDirPath}/${filenameWithoutExe}`);

}

export function getFiles(currentRelativePath: string): BrowserHTMLPair[] {
    const r: BrowserHTMLPair[] = new Array();
    const fPath = concatenatePaths(exampleRelativeDirPath, currentRelativePath);
    const exampleCurrentAbsolutePath = getAbsoluteDirectoryPath(fPath);
    const files = fs.readdirSync(exampleCurrentAbsolutePath);
    const fileList = files.filter((file) => {
        const filePath = exampleCurrentAbsolutePath + "/" + file;
        return fs.statSync(filePath).isFile() && /.*\.html$/.test(file);
    })
    for (const vFileName of fileList) {
        r.push(new BrowserHTMLPair(currentRelativePath, vFileName, "firefox"));
        r.push(new BrowserHTMLPair(currentRelativePath, vFileName, "edge"));
        r.push(new BrowserHTMLPair(currentRelativePath, vFileName, "chromium"));




    }


    const dirList = files.filter((file) => {
        const subDirPath = exampleCurrentAbsolutePath + "/" + file;

        return fs.statSync(subDirPath).isDirectory()
    })
    for (const vDirName of dirList) {
        const subDirPath = concatenatePaths(currentRelativePath, vDirName);
        const resultArr = getFiles(subDirPath);
        resultArr.forEach((v) => {
            r.push(v);
        })

    }
    return r;
}
