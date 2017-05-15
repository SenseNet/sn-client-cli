import * as Path from 'path';
import { PathHelper } from "./utils/pathhelper";
import { SnCliConfigModel } from "./utils/snconfig/snconfigmodel";
import { SnConfigReader } from "./utils/snconfig/snconfigreader";
import { Stage } from "./utils/stage";

export class Initializer {

    private constructor() { }

    private static _instance: Initializer;
    public static get Current(): Initializer {
        if (!this._instance) {
            this._instance = new Initializer();
        }
        return this._instance;
    }

    private stage: Stage;
    public get Stage(): Stage {
        return this.stage;
    }

    private pathHelper: PathHelper;
    public get PathHelper(): PathHelper {
        return this.pathHelper;
    }

    private configReader: SnConfigReader<SnCliConfigModel>;
    public get SnConfigReader(): SnConfigReader<SnCliConfigModel> {
        return this.configReader;
    }

    public async Init() {
        this.pathHelper = new PathHelper(
            process.cwd(),
            `${process.cwd()}${Path.sep}node_modules${Path.sep}sn-client-js`,
            `${process.cwd()}${Path.sep}node_modules${Path.sep}sn-client-cli`);
        this.stage = new Stage(this.pathHelper);
        await this.stage.PrepareAsync();
        this.configReader = new SnConfigReader(SnCliConfigModel, this.pathHelper.PackageRootPath);
        this.configReader.ReadConfigFile();
    }
}
