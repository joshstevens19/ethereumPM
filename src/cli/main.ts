#!/usr/bin/env node
import * as program from "commander"
import { PackageDescriptionsConsts } from "../consts/packages-descriptions.consts";
import * as chalkImport from "chalk";
const chalk = chalkImport.default;
import { InitialiseControls } from "../common/initialise-controls";
import { IRegister } from "../interfaces/iregister";
import { VersionBump } from "../enums/version-bump";
import { Usage } from "./usage";
import {
  AccessTypes, CommandTypes, HookTypes, OrgActionType,
  ProfileActionTypes, PublicAccessTypes, TagActionTypes
} from "./enums";
import { LogHandler } from "./log-handler";

// find TS library as we want the entire library to be in TS
// use later on
import ProgressBar = require("progress");
import { Helpers } from "../common/helpers";
const co = require("co");
const prompt = require("co-prompt");
const asciiTable = require("ascii-table");

program
  .version("0.0.1")
  .description("These are command EPM commands: .. NEED TO NAME ALL THE COMMANDS LAST")
  .usage("helper command")
  .parse(process.argv);

program
  .command("access <private|public|grant|revoke|ls> [$1] [$2] [$3]")
  .usage("command - used to set access levels")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.access))
  .action(async (accessLevel: string, $1: string, $2: string, $3: string) => {
    accessLevel = accessLevel.toLowerCase();

    if (accessLevel !== AccessTypes.private &&
      accessLevel !== AccessTypes.public &&
      accessLevel !== AccessTypes.grant &&
      accessLevel !== AccessTypes.ls &&
      accessLevel !== AccessTypes.revoke) {
      return LogHandler.logCommandError("access commands are only accessible for scoped packages", CommandTypes.access)
    }

    switch (accessLevel) {
      case AccessTypes.private:
        // to do control
        break;
      case AccessTypes.public:
        // to do control
        break;
      case AccessTypes.grant:
        const grantMissingArguments = [];

        if (!$1) {
          grantMissingArguments.push("<read-only|read-write>");
        }

        if (!$2) {
          grantMissingArguments.push("<org:team>");
        }

        if (grantMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(grantMissingArguments);
          return LogHandler.logUsages(CommandTypes.access, AccessTypes.grant);
        }

        // validation complete call controls

        break;
      case AccessTypes.ls:
        // write control
        break;
      case AccessTypes.revoke:

        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org:team>"]);
          return LogHandler.logUsages(CommandTypes.access, AccessTypes.revoke);
        }

        // validation complete call controls 

        break;
    }
  });

program
  .command("audit [fix]")
  .usage("command - use perform audits on packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.audit))
  .action(async (fix) => {
    if (fix && fix !== "fix") {
      LogHandler.logError(`erorr: ${fix} is not a argument did you mean fix ?`, true);
      return LogHandler.logUsages(CommandTypes.audit);
    }

    // do control logix 
  });

program
  .command("bin")
  .option("-g, --global", "Will print the global folder")
  .usage("command - prints the folder where epm will install executables")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.bin))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.bin, true);
      return LogHandler.logUsages(CommandTypes.bin);
    }

    const global = dir.global

    // do control logix 
  });

program
  .command("cache clean")
  .usage("command - removes all the cached packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.cache))
  .action(async (clean) => {
    if (!clean || clean !== "clean") {
      LogHandler.logError(`erorr: ${clean} is not a argument did you mean clean ?`, true);
      return LogHandler.logUsages(CommandTypes.cache);
    }

    // do control logix 
  });

// deprecated CLI
program
  .command("deprecate <package|package@version> <message>")
  .usage("command - deprecate a package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.deprecate))
  .action(async (_package, message) => {

    // change the logic to pass in a message

    try {
      await InitialiseControls.deprecateControl.deprecatePackage(_package)
      LogHandler.log("Successfully deprecated the package");
    } catch (error) {
      LogHandler.logError("Could not deprecate the package, please try again later.")
    }
  });

program
  .command("doctor")
  .usage("command - check the health of epm")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.doctor))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.doctor, true);
      return LogHandler.logUsages(CommandTypes.doctor);
    }

    const result = await InitialiseControls.doctorControl.checkEverythingIsAvailable();
    // use ascii table for this
    console.log(result);
  });

program
  .command("doctor")
  .usage("command - check the health of epm")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.doctor))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.doctor, true);
      return LogHandler.logUsages(CommandTypes.doctor);
    }

    const result = await InitialiseControls.doctorControl.checkEverythingIsAvailable();
    console.log(result);
  });

program
  .command("document [package]")
  .usage("command - load document up for a project")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.document))
  .action(async (_package) => {
    // write control logic 
  });

program
  .command("hook <ls|add|update|rm> [$1] [$2] [$3]")
  .usage("command - hook events on packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.hook))
  .action(async (hookAction, $1, $2, $3) => {
    if (hookAction !== HookTypes.add &&
      hookAction !== HookTypes.ls &&
      hookAction !== HookTypes.rm &&
      hookAction !== HookTypes.update) {
      return LogHandler.logCommandError("hook command needs a hook action", CommandTypes.hook);
    }

    switch (hookAction) {
      case HookTypes.add:
        const packageName: string | undefined = $1;

        // write control logic

        break;
      case HookTypes.ls:

        const hookListMissingArguments = [];

        if (!$1) {
          hookListMissingArguments.push("<url>");
        }

        if (!$2) {
          hookListMissingArguments.push("<secret>");
        }

        if (hookListMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(hookListMissingArguments);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.ls);
        }

        // write logic for control

        break;
      case HookTypes.rm:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<id>"]);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.rm);
        }

        // write logic for control

        break;
      case HookTypes.update:
        const hookUpdateMissingArguments = [];

        if (!$1) {
          hookUpdateMissingArguments.push("<id>");
        }

        if (!$2) {
          hookUpdateMissingArguments.push("<url>");
        }

        if (hookUpdateMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(hookUpdateMissingArguments);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.update);
        }

        break;
    }
  });


program
  .command("ignore")
  .option("-l, --list", "Print out epm list")
  .usage("command - generate and read epm ignore file")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.ignore))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.ignore, true);
      return LogHandler.logUsages(CommandTypes.ignore);
    }

    // write control logic 
  });

program
  .command("init [team]")
  .option("-c, --complete", "Auto completes the initialise, populates with default values")
  .usage("command - initialise a new epm project")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.init))
  .action((team, dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.init, true);
      return LogHandler.logUsages(CommandTypes.init);
    }

    const autoComplete = dir.complete;

    // complete questions etc

    InitialiseControls.initControl.initialiseProject();
  });

program
  .command("install [package|package@version]")
  .usage("command - installs packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.install))
  .action(async (_package: string) => {

    // finish logic with package@version

    if (_package) {
      try {
        await InitialiseControls.installControl.installPackage(_package)
      } catch (err) {
        LogHandler.log(chalk.bold.redBright(err.message));
      }
    } else {
      try {
        await InitialiseControls.installControl.installPackages()
      } catch (err) {
        LogHandler.log(chalk.bold.redBright(err.message));
      }
    }
  });


/****** MAKE THIS USE CO-PROMPT **********/
program
  .command("login")
  .description(PackageDescriptionsConsts.login)
  .option("--username <username>", "The username to authenticate")
  .option("--password <password>", "The user\"s password")
  .action((dir, cmd) => {
    const username = dir.username;
    const password = dir.password;

    if (username && password) {
      InitialiseControls.loginControl.authenticate(username, password)
        .catch(err => console.log(err));
    } else {
      console.log("please supply and username or password")
    }
  });
/***************************************************/

program
  .command("logout")
  .usage("command - logout of packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.logout))
  .action(async () => {
    try {
      await InitialiseControls.logoutControl.unauthenticate();
    } catch(error) {
      LogHandler.logError("Could not logout please try again later", true);
    }
  });

program
  .command("ls [package|package@version]")
  .usage("command - lists dependencies for a project")
  .option("-f, --full", "Get dependencies for dependencies")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.ls))
  .action(async (_package, dir) => {
    try {
      const response = await InitialiseControls.lsControl.installedDependencies();

      if (!dir.full) {
        const table = new asciiTable("project dependencies")
        table.setHeading("version", "package name")
        for (let l = 0; l < response.length; l++) {
          table.addRow(response[l].version, response[l].packageName)
        }

        LogHandler.log(table.toString());
      } else {
        console.log("do the nice tree shizzle.......");
      }

    } catch (err) {
      LogHandler.log(err);
    }
  });

program
  .command("org <create|destroy|edit|adduser|rmuser|lsusers|addteam|rmteam|lsteams| [$1] [$2]")
  .usage("command - organisation logic")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.org))
  .action(async (orgActionType, $1, $2) => {
    // i think there is a much nicer way to do this
    // but as i have no internet most the time i write this 
    // it can make do 
    if (orgActionType !== OrgActionType.addteam &&
      orgActionType !== OrgActionType.adduser &&
      orgActionType !== OrgActionType.create &&
      orgActionType !== OrgActionType.destroy &&
      orgActionType !== OrgActionType.edit &&
      orgActionType !== OrgActionType.lsteams &&
      orgActionType !== OrgActionType.lsusers &&
      orgActionType !== OrgActionType.rmteam &&
      orgActionType !== OrgActionType.rmuser) {
      LogHandler.logError("please supply valid org action type", true);
      return LogHandler.logUsages(CommandTypes.org);
    }

    switch (orgActionType) {
      case OrgActionType.addteam:
        // show co-prompt to generate a new team
        break;
      case OrgActionType.adduser:
        const addUserMissingArguments = [];
        if (!$1) {
          addUserMissingArguments.push("<org>");
        }

        if (!$2) {
          addUserMissingArguments.push("<username>")
        }

        if (addUserMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(addUserMissingArguments);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.adduser);
        }

        // write control logic
        break;
      case OrgActionType.create:
        // show co-prompt to generate a new org
        break;
      case OrgActionType.destroy:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org>"]);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.destroy);
        }

        // show a are you sure?! 
        break;
      case OrgActionType.edit:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org>"]);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.edit);
        }

        // write control logic
        break;
      case OrgActionType.lsteams:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org>"]);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.lsteams);
        }

        // write control logic
        break;
      case OrgActionType.lsusers:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org>"]);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.lsusers);
        }

        // write control logic
        break;
      case OrgActionType.rmteam:
        const removeTeamMissingArguments = [];
        if (!$1) {
          removeTeamMissingArguments.push("<org>");
        }

        if (!$2) {
          removeTeamMissingArguments.push("<team>")
        }

        if (removeTeamMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(removeTeamMissingArguments);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.rmteam);
        }

        // write control logic
        break;
      case OrgActionType.rmuser:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org>"]);
          return LogHandler.logUsages(CommandTypes.org, OrgActionType.rmuser);
        }

        // write control logic
        break;
    }
  });

program
  .command("outdated [<package>|<package@version>")
  .usage("command - outdated logic")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.outdated))
  .action(async () => {

    try {
      const packages = await InitialiseControls.outdatedControl.checkForOutdatedPackages()
      const outdatedTable = new asciiTable("outdated packages")
      outdatedTable.setHeading("latest version", "package name")
      for (let l = 0; l < packages.length; l++) {
        outdatedTable.addRow(packages[l].version, packages[l].name)
      }

      LogHandler.log(outdatedTable.toString());
    } catch (err) {
      LogHandler.logError(err);
    }
  });

// ------------------- TO DO OWNER LAST ---------------------------------
// ********************************************************************//

program
  .command("ping [package]")
  .usage("command - ping the server or the package server")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.ping))
  .action(async (_package) => {
    if (_package) {
      const alive = await InitialiseControls.pingControl.alive();
      if (alive) {
        LogHandler.log("server is alive");
      } else {
        LogHandler.log("no response from the server.. it could be down")
      }
    } else {
      // write control logic 
    }
  });

program
  .command("profile <set|get> [$1] [$2]")
  .usage("command - set and gets the profile details")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.profile))
  .action(async (profileActionType, $1, $2) => {
    if (profileActionType !== ProfileActionTypes.get &&
      profileActionType !== ProfileActionTypes.set) {
      LogHandler.logError("please supply valid profile action type", true);
      return LogHandler.logUsages(CommandTypes.profile);
    }

    if ($1 === "password") {
      // do logic for setting new password
    } else {
      switch (profileActionType) {
        case ProfileActionTypes.get:
          // write control logic 
          break;
        case ProfileActionTypes.set:
          if (!$1) {
            LogHandler.logMissingRequiredArguments(["<json>"]);
            return LogHandler.logUsages(CommandTypes.profile, ProfileActionTypes.set);
          }

          // write control logic

          break;
      }
    }

    // old code
    // const firstName: string = dir.firstName || null;
    // const lastName: string = dir.lastName || null;
    // const introduction: string = dir.introduction || null;

    // if (!firstName && !lastName && !introduction) {
    //   const profile = await InitialiseControls.profileControl.details()
    //   console.log(profile);
    // } else {
    //   const newProfileDetails: IUpdateProfileDetailsRequest = {
    //     firstName,
    //     lastName,
    //     introduction
    //   }

    //   await InitialiseControls.profileControl.updateDetails(newProfileDetails);
    // }

  })

program
  .command("publish [location]")
  .usage("command - publish packages")
  .option("-t, --tag <tag>", "tag for the package")
  .option("-a, --access <public|private>", "what access level the package should be")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.publish))
  .action(async (location, cmd) => {
    const tags = cmd.tag;
    const access = cmd.access;

    if (access) {
      if (access !== PublicAccessTypes.public &&
        access !== PublicAccessTypes.private) {
        LogHandler.logError("please supply an valid 'access' type", true);
        return LogHandler.logUsages(CommandTypes.publish);
      }
    }

    // write control logic 
    // await InitialiseControls.publishControl.publishPackage();
  });

/*** REWRITE THE REGISTER LOGIC FOR CO PROMPT */
program
  .command("register")
  .description(PackageDescriptionsConsts.register)
  .option("--username <username>", "The username to sign in with")
  .option("--password <password>", "The users password")
  .option("--firstName <firstName>", "The users first name")
  .option("--lastName <lastName>", "The users lastname")
  .option("--introduction <introudction>", "The users introduction to show on the profile")
  .action((dir, cmd) => {
    const username = dir.username;
    const password = dir.password;
    const firstName = dir.firstName;
    const lastName = dir.lastName;
    const introduction = dir.introduction || null;

    if (username && password && firstName && lastName) {
      const user: IRegister = {
        username,
        password,
        firstName,
        lastName,
        introduction
      };

      InitialiseControls.registerControl.createUser(user)
        .then(() => console.log("User registered"))
        .catch((error: any) => console.error(error))

    } else {
      console.log("Please supply a username, password, firstname and lastname");
    }

  })

program
  .command("root")
  .usage("command - prints out root ethereum modules locations")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.profile))
  .action(async (cmd) => {
    const global = cmd.global;
  });

program
  .command("star [package]")
  .usage("command - star a package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.star))
  .action(async (_package) => {
    try {
      await InitialiseControls.starControl.starPackage(_package);
      LogHandler.log("Successfully starred the package")
    } catch (error) {
      LogHandler.logError("Could not star the package, please try again later");
    }
  });

program
  .command("stars [username]")
  .usage("command - stars for a username")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.stars))
  .action(async (username) => {
    try {
      const stars = await InitialiseControls.starControl.getAllStars();
      console.log(stars);
    } catch (error) {
      LogHandler.logError("Could get stars for username, please try again later");
    }
  });

/** WRITE SEARCH LOGIC */
//....................///

program
  .command("tag <add|rm|ls> [$1] [$2]")
  .usage("command - tag packages and see tags for packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.tag))
  .action(async (tagActionType, $1, $2) => {
    if (tagActionType !== TagActionTypes.add &&
      tagActionType !== TagActionTypes.ls &&
      tagActionType !== TagActionTypes.rm) {
      LogHandler.logError("please supply valid tag action type", true);
      return LogHandler.logUsages(CommandTypes.tag);
    }

    switch (tagActionType) {
      case TagActionTypes.add:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<tag>"]);
          return LogHandler.logUsages(CommandTypes.tag, TagActionTypes.add);
        }

        // write control logic 

        break;
      case TagActionTypes.ls:
        // write control logic 
        break;
      case TagActionTypes.rm:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<tag>"]);
          return LogHandler.logUsages(CommandTypes.tag, TagActionTypes.rm);
        }

        // write control logic 
        break;
    }
  })

/** WRITE TEAM LOGIC */
//....................///

program
  .command("test")
  .usage("command - runs test for project")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.test))
  .action(async () => {
    // write control logic 
  });

program
  .command("unstar [package]")
  .usage("command - unstars a package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.unstar))
  .action(async (_package) => {
    try {
      await InitialiseControls.starControl.unstarPackage(_package);
      console.log("Successfully unstarred the package")
    } catch (error) {
      console.error(error);
    }
  });

/** WRITE TOKEN LOGIC ONCE CLI DESIGNED*/
program
  .command("token")
  .action(async () => {
    const jwtToken = await InitialiseControls.tokenControl.getCurrentJwtToken();
    console.log(jwtToken);

    // split this up when i design the cli 
    const unpackJwt = await InitialiseControls.tokenControl.getCurrentDecodedJwt();
    console.log(unpackJwt);

    // more to split up
    const expiryDate = await InitialiseControls.tokenControl.getCurrentJwtTokenExpiryDate();
    console.log(expiryDate);
  });
//....................///

program
  .command("uninstall [$1]")
  .usage("command - uninstalls a for package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.uninstall))
  .action(async ($1: string) => {
    if (!$1) {
      LogHandler.log("missing first parameter", true);
      return LogHandler.logUsages(CommandTypes.uninstall);
    }

    if ($1[0] === "@") {
      // then it is an org install 
      // write logic
      return;
    }

    if ($1.includes("@")) {
      // this is a version install 
      // write logic

      // do something with these later
      const packageAndVersion = $1.split("@");
      const packageName = packageAndVersion[0];
      const packageVersion = packageAndVersion[1];

      return;
    }

    // if none of those then it is a general install 

    try {
      await InitialiseControls.uninstallControl.uninstallPackage($1);
    } catch (error) {
      return LogHandler.logError("could not uninstall the package, please try again later");
    }

  });


/********************* WRITE UNPUBLISH LOGIC HERE *********************/
/**********************************************************************/

program
  .command("update [package]")
  .usage("command - update a package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.uninstall))
  .action(async (_package: string) => {
    if (!_package) {
      // update all package in the ethereum-pm.json
    } else {
      try {
        await InitialiseControls.updateControl.updatePackage(_package);
      } catch (error) {
        return LogHandler.logError("could not update the package");
      }
    }
  });

program
  .command("version <newVersion|major|minor|patch>")
  .usage("command - update version for package in ethereum-pm.json")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.version))
  .action(async (versionBump) => {
    let versionBumpType = VersionBump.dynamic;
    switch (versionBump) {
      case VersionBump.major:
        versionBumpType = VersionBump.major;
        break;
      case VersionBump.minor:
        versionBumpType = VersionBump.minor;
        break;
      case VersionBump.patch:
        versionBumpType = VersionBump.patch
        break;
    }

    try {
      if (versionBumpType === VersionBump.dynamic) {
        await InitialiseControls.versionControl.bumpVersion(versionBumpType, versionBump);
      } else {
        await InitialiseControls.versionControl.bumpVersion(versionBumpType);
      }
    } catch (error) {
      return LogHandler.logError("could not update version for the package");
    }
  });



program
  .command("whoami")
  .usage("command - returns who the logged in user is")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.whoami))
  .action(async () => {
    const profile = await InitialiseControls.profileControl.details()
    console.log(profile); // write better response
  })

program
  .command("undeprecate <package|package@version>")
  .usage("command - undeprecate the package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.undeprecate))
  .action(async (_package) => {
    try {
      await InitialiseControls.deprecateControl.undeprecatePackage(_package);
      LogHandler.log("Successfully undeprecated the package")
    } catch (error) {
      LogHandler.logError("Could not undeprecate the package, please try again later");
    }
  });

/************************** END OF REWRITE SO FAR  ***************************************************/

// program
//   .command("users <teamName>")
//   .description("Gets all the users for a team")


// good example below:

// program
// .command("addContact <firstame> <lastname> <phone> <email>")
// .alias("a")
// .description("Add a contact")
// .action((firstname, lastname, phone, email) => {
//   addContact({firstname, lastname, phone, email});
// });

//   // .action(() => {
//   //   console.log(program.username);
//   //   co(function *() {
//   //     console.log(program.username);
//   //     var username = yield prompt("username: ");
//   //     var password = yield prompt.password("password: ");
//   //     console.log(password);
//   //     console.log(chalk.bold.cyan(username));

//   //     const barOpts = {
//   //       width: 20,
//   //       total: 1000,
//   //       clear: true
//   //     };

//   //     const bar = new ProgressBar("Authenticating [:bar] :percent :etas", barOpts);

//   //     // setInterval(() => bar.tick(10), 100);

//   //     // while(number < 100000000) {
//   //     //   bar.tick(number);
//   //     //   number++;
//   //     // }

//   // })
// })

program.parse(process.argv);
