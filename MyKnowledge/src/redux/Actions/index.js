import * as GeneralActions from './General';
import * as SettingsActions from './Settings';
import * as DefaultActions from './Default';
import * as FilterActions from './Filter';

export const Actions = Object.assign({},
    GeneralActions,
    SettingsActions,
    DefaultActions,
    FilterActions
);