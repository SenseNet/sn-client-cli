import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Path from 'path';
import { PathHelper } from '../src/utils/pathhelper';

const expect = Chai.expect;

@suite('Path Helper Tests')
export class PathHelperTests {

    private PathHelper: PathHelper;
    public before() {
        this.PathHelper = new PathHelper('c:/temp/package/../package', 'c:/temp/package/../package/node_modules/sn-client-js', 'c:/temp/package/../package/node_modules/sn-client-cli');
    }

    @test
    public 'Should normalize PackageRoot path'() {
        expect(this.PathHelper.PackageRootPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package`);
    }

    @test
    public 'Should normalize SnClient path'() {
        expect(this.PathHelper.SnClientPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package${Path.sep}node_modules${Path.sep}sn-client-js`);

    }

    @test
    public 'Should provide realible relative path to PackageRootPath'() {
        expect(this.PathHelper.GetRelativeToPackageRootPath('./alma')).to.be.eq(Path.join(this.PathHelper.PackageRootPath, './alma'));
    }

    @test
    public 'Should provide realible relative path to SnClientPath'() {
        expect(this.PathHelper.GetRelativeToSnClientPath('./alma')).to.be.eq(Path.join(this.PathHelper.SnClientPath, './alma'));

    }
}
