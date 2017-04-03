import { SnConfigBehavior } from './snconfigbehavior';
import { SnConfigField } from './snconfigfielddecorator';

/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package
 */
export class SnConfigModel {

    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig | SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'URL to the repository (e.g.: demo.sensenet.com)',
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
    })
    public RepositoryUrl: string;

    /**
     * The Username for authentication
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'Name for a user',
        Question: 'Please enter the username: ',
    })
    public UserName?: string;

    /**
     * The password for authentication
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.HideConsoleInput,
        Question: 'Please enter the password for the user',
    })
    public Password?: string;
}
