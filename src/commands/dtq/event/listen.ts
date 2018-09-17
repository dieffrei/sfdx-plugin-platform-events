import {core, flags, SfdxCommand} from '@salesforce/command';

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('dtq', 'org');

export default class Listen extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx dtq:event:listen --targetusername myOrg@example.com --targetdevhubusername devhub@org.com`
  ];

  public static args = [{name: 'eventName'}];

  protected static flagsConfig = {
    'wait': flags.string({char: 'w', description: 'Wait for events for...'}),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public delay(time:number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve,time));
  }

  public async listenEvents(conn) {
    conn.streaming.topic("/event/" + this.args.eventName)
      .subscribe( (message) => {
        this.ux.logJson(message);
    });
  }

  public async run(): Promise<core.AnyJson> {
    const waitForInMilliseconds:number = (this.flags.wait != null)
      ? (1000 * 60 * this.flags.wait)
      : (1000 * 60 * 10);
    const conn = this.org.getConnection();
    this.ux.startSpinner(`Listen ${this.args.eventName} for ${this.org.getAuthInfo().getUsername()} for ${waitForInMilliseconds / 60000} minutes.`);
    this.listenEvents(conn);
    await this.delay(waitForInMilliseconds);
    return {};
  }

}
