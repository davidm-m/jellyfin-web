import React, { FunctionComponent } from 'react';
import type { LogFile } from '@jellyfin/sdk/lib/generated-client/models/log-file';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useApi } from 'hooks/useApi';
import datetime from 'scripts/datetime';

type LogItemProps = {
    logs: LogFile[];
};

const LogItemList: FunctionComponent<LogItemProps> = ({ logs }: LogItemProps) => {
    const { api } = useApi();

    const getLogFileUrl = (logFile: LogFile) => {
        if (!api) return '';

        let url = api.basePath + '/System/Logs/Log';

        url += '?name=' + encodeURIComponent(String(logFile.Name));
        url += '&api_key=' + encodeURIComponent(api.accessToken);

        return url;
    };

    const getDate = (logFile: LogFile) => {
        const date = datetime.parseISO8601Date(logFile.DateModified, true);
        return datetime.toLocaleDateString(date) + ' ' + datetime.getDisplayTime(date);
    };

    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {logs.map(log => {
                return (
                    <ListItem key={log.Name} disablePadding>
                        <ListItemButton href={getLogFileUrl(log)} target='_blank'>
                            <ListItemText
                                primary={log.Name}
                                primaryTypographyProps={{ variant: 'h3' }}
                                secondary={getDate(log)}
                                secondaryTypographyProps={{ variant: 'body1' }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default LogItemList;
