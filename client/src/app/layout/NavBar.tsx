import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks=
[
  {title:"catalog", path:"/catalog"},
  {title:"about", path:"/about"},
  {title:"contact", path:"/contact"},
  
]

const rigLinks=
[
  {title:"login", path:"/login"},
  {title:"register", path:"/register"},
]

type Props = {
  toggleDarkMode: () => void;
  darkMode: boolean;
}
export default function NavBar({darkMode, toggleDarkMode}: Props) {
 
  return (
    <AppBar position="fixed">
<Toolbar>
    <Typography component={NavLink} to='/' variant="h6">RE-STORE</Typography>
    <IconButton onClick={toggleDarkMode} >
      {darkMode?<DarkMode />:<LightMode sx={{color:"yellow"}} />}
    </IconButton>
    <List sx={{display:"flex"}}>
    {midLinks.map(({title, path}) => (
      <ListItem
        component={NavLink}
        to={path}
        key={path}
        sx={{
          color: "inherit", typography: "h6", 
        }}
        >
        {title.toLocaleUpperCase()}

      </ListItem>
    ))}

    </List>
    <IconButton size="large" sx={{color:"inherit"}} > 
      <Badge badgeContent={1} color="secondary" sx={{ml:2}}>
        <ShoppingCart  />

      </Badge>
      
      </IconButton>
    <List sx={{display:"flex", ml:"auto"}}>
    {rigLinks.map(({title, path}) => (
      <ListItem
        component={NavLink}
        to={path}
        key={path}
        sx={{
          color: "inherit", typography: "h6", 
        }}
        >
        {title.toLocaleUpperCase()}

      </ListItem>
    ))}

    </List>
      
    
   
</Toolbar>
    </AppBar>
  )
}