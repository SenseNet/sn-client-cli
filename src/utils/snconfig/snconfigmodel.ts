import { Config } from 'sn-client-js';

/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package. It's values are populated from sn.config.js, from command line option or will be asked at runtime in CLI (depending on it's behavior flags).
 */
export class SnCliConfigModel {
    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    @Config.SnConfigField({
        Behavior: Config.SnConfigBehavior.AllowFromConfig | Config.SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'URL to the repository (e.g.: demo.sensenet.com)',
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
    })
    public RepositoryUrl: string;

    /**
     * The Username for type fetching authentication
     */
    @Config.SnConfigField({
        Behavior: Config.SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'Name for a user',
        Question: 'Please enter the username: ',
    })
    public UserName?: string;

    /**
     * The password for type fetching authentication
     */
    @Config.SnConfigField({
        Behavior: Config.SnConfigBehavior.HideConsoleInput,
        Question: 'Please enter the password for the user',
    })
    public Password?: string;
}
