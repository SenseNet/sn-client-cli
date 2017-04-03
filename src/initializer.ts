import * as Path from 'path';
import { PathHelper } from "./utils/pathhelper";
import { SnConfigReader } from "./utils/snconfig/snconfigreader";
import { Stage } from "./utils/stage";

export class Initializer {

    private static stage: Stage;
    public static get Stage(): Stage {
        return this.stage;
    }

    private static pathHelper: PathHelper;
    public static get PathHelper(): PathHelper {
        return this.pathHelper;
    }

    private static configReader: SnConfigReader;
    public static get SnConfigReader(): SnConfigReader {
        return this.configReader;
    }

    public static async Init() {
        this.pathHelper = new PathHelper(process.cwd(), `${__dirname}${Path.sep}..`);
        this.stage = new Stage(this.pathHelper);
        await this.stage.PrepareAsync();
        this.configReader = new SnConfigReader(this.pathHelper.PackageRootPath);
        this.configReader.ReadConfigFile();
    }
}
