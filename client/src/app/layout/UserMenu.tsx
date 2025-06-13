import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User } from '../models/user';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { History, Logout, Person } from '@mui/icons-material';
import { useLogoutMutation } from '../../features/account/accountApi';

type Props = {
    user: User
}

export default function UserMenu({ user }: Props) {
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                color='inherit'
                size='large'
                sx={{ fontSize:'1.1rem'}}
            >
                {user.email}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText>My orders</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}
