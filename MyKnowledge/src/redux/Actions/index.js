import * as GeneralActions from './General';
import * as SettingsActions from './Settings';
import * as DefaultActions from './Default';
import * as FilterActions from './Filter';
import * as DocumentActions from './Document';
import * as DocumentListActions from './DocumentList';

export const Actions = Object.assign({},
    GeneralActions,
    SettingsActions,
    DefaultActions,
    FilterActions,
    DocumentActions,
    DocumentListActions,
);