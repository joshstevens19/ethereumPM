import { 
        Audit, Build, EthereumPmJson, Init, LS, Install, Login, Logout, Outdated, 
        Owner, Ping, Profile, Repo, Search, Star, Uninstall, Update, Version, 
        WhoAmI, Package, EthereumModules, LocalEpmFiles 
       } from "../controls";

import { InitialiseApis } from "./initialise-apis";

export class InitialiseControls {
    private static _auditControl: Audit;
    private static _buildControl: Build;
    private static _ethereumPmJson: EthereumPmJson;
    private static _ethereumModules: EthereumModules;
    private static _initControl: Init;
    private static _installControl: Install;
    private static _localEpmFiles: LocalEpmFiles;
    private static _loginControl: Login;
    private static _logoutControl: Logout;
    private static _lsControl: LS;
    private static _outdatedControl: Outdated;
    private static _ownerControl: Owner;
    private static _packageControl: Package;
    private static _pingControl: Ping;
    private static _profileControl: Profile;
    private static _repoControl: Repo;
    private static _searchControl: Search;
    private static _starControl: Star;
    private static _uninstallControl: Uninstall;
    private static _updateControl: Update;
    private static _versionControl: Version;
    private static _whoAmiIControl: WhoAmI;

    constructor() { }

    public get auditControl(): Audit {
        if (InitialiseControls._auditControl) {
            return InitialiseControls._auditControl;
        }

        return InitialiseControls._auditControl = new Audit();
    }

    public get buildControl(): Build {
        if (InitialiseControls._buildControl) {
            return InitialiseControls._buildControl;
        }

        return InitialiseControls._buildControl = new Build();
    }

    public get ethereumPmJsonControl(): EthereumPmJson {
        if (InitialiseControls._ethereumPmJson) {
            return InitialiseControls._ethereumPmJson;
        }

        return InitialiseControls._ethereumPmJson = new EthereumPmJson();
    }

    public get ethereumModulesControl(): EthereumModules {
        if (InitialiseControls._ethereumModules) {
            return InitialiseControls._ethereumModules;
        }

        return InitialiseControls._ethereumModules = new EthereumModules(this.ethereumPmJsonControl);
    }

    public get initControl(): Init {
        if (InitialiseControls._initControl) {
            return InitialiseControls._initControl;
        }

        return InitialiseControls._initControl = new Init(this.ethereumPmJsonControl);
    }

    public get installControl(): Install {
        if (InitialiseControls._installControl) {
            return InitialiseControls._installControl;
        }

        return InitialiseControls._installControl = new Install(this.packageControl,
                                                                this.initControl,
                                                                this.ethereumPmJsonControl,
                                                                this.ethereumModulesControl,
                                                                this.localEpmFilesControl,
                                                            );
    }

    public get localEpmFilesControl(): LocalEpmFiles {
        if (InitialiseControls._localEpmFiles) {
            return InitialiseControls._localEpmFiles;
        }

        return InitialiseControls._localEpmFiles = new LocalEpmFiles();
    }

    public get loginControl(): Login {
        if (InitialiseControls._loginControl) {
            return InitialiseControls._loginControl;
        }

        return InitialiseControls._loginControl = new Login(InitialiseApis.authenticationApi, this.localEpmFilesControl);
    }

    public get logoutControl(): Logout {
        if (InitialiseControls._logoutControl) {
            return InitialiseControls._logoutControl;
        }

        return InitialiseControls._logoutControl = new Logout(InitialiseApis.authenticationApi);
    }

    public get outdatedControl(): Outdated {
        if (InitialiseControls._outdatedControl) {
            return InitialiseControls._outdatedControl;
        }

        return InitialiseControls._outdatedControl = new Outdated(this.ethereumPmJsonControl, this.packageControl);
    }

    public get ownerControl(): Owner {
        if (InitialiseControls._ownerControl) {
            return InitialiseControls._ownerControl;
        }

        return InitialiseControls._ownerControl = new Owner();
    }

    public get packageControl(): Package {
        if (InitialiseControls._packageControl) {
            return InitialiseControls._packageControl;
        }

        return InitialiseControls._packageControl = new Package(InitialiseApis.packageApi, InitialiseApis.versionApi);
    }

    public get pingControl(): Ping {
        if (InitialiseControls._pingControl) {
            return InitialiseControls._pingControl;
        }

        return InitialiseControls._pingControl = new Ping(InitialiseApis.pingApi);
    }

    public get profileControl(): Profile {
        if (InitialiseControls._profileControl) {
            return InitialiseControls._profileControl;
        }

        return InitialiseControls._profileControl = new Profile();
    }

    public get repoControl(): Repo {
        if (InitialiseControls._repoControl) {
            return InitialiseControls._repoControl;
        }

        return InitialiseControls._repoControl = new Repo();
    }

    public get searchControl(): Search {
        if (InitialiseControls._searchControl) {
            return InitialiseControls._searchControl;
        }

        return InitialiseControls._searchControl = new Search();
    }

    public get starControl(): Star {
        if (InitialiseControls._starControl) {
            return InitialiseControls._starControl;
        }

        return InitialiseControls._starControl = new Star();
    }

    public get uninstallControl(): Uninstall {
        if (InitialiseControls._uninstallControl) {
            return InitialiseControls._uninstallControl;
        }

        return InitialiseControls._uninstallControl = new Uninstall(this.ethereumModulesControl, this.ethereumPmJsonControl);
    }

    public get updateControl(): Update {
        if (InitialiseControls._updateControl) {
            return InitialiseControls._updateControl;
        }

        return InitialiseControls._updateControl = new Update(this.packageControl,
                                                              this.installControl,
                                                              this.ethereumPmJsonControl
                                                            );
    }

    public get versionControl(): Version {
        if (InitialiseControls._versionControl) {
            return InitialiseControls._versionControl;
        }

        return InitialiseControls._versionControl = new Version();
    }

    public get whoAmIControl(): WhoAmI {
        if (InitialiseControls._whoAmiIControl) {
            return InitialiseControls._whoAmiIControl;
        }

        return InitialiseControls._whoAmiIControl = new WhoAmI();
    }

    public get lsControl(): LS {
        if (InitialiseControls._lsControl) {
            return InitialiseControls._lsControl;
        } 

        return InitialiseControls._lsControl = new LS(this.ethereumPmJsonControl, this.ethereumModulesControl);
    }
}