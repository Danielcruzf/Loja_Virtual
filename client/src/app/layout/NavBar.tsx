import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks =
  [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },

  ]

const rigLinks =
  [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
  ]
const navStyles =// estilo do link
{

  color: "inherit", typography: "h6",
  textDecoration: "none",
  "&:hover": {// muda cor do link ao passar o mouse
    color: "grey.500",
    fontWeight: 700
  },
  "&.active": {// ativa cor do link ao clicar
    color: "secondary.main",
    fontWeight: 700,
  },

}
type Props = {
  toggleDarkMode: () => void;
  darkMode: boolean;
}
export default function NavBar({ darkMode, toggleDarkMode }: Props) {

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center" >
          <Typography component={NavLink} sx={navStyles} to='/' variant="h6" >RE-STORE</Typography>
          <IconButton onClick={toggleDarkMode} >
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >


                {title.toLocaleUpperCase()}

              </ListItem>
            ))} 

          </List>
        </Box>
        <Box  display= "flex" alignItems= "center">

          <IconButton size="large" sx={{ color: "inherit" }} >
            <Badge badgeContent={1} color="secondary" sx={{ ml: 2 }}>
              <ShoppingCart />

            </Badge>

          </IconButton>
          <List sx={{ display: "flex", ml: "auto" }}>
            {rigLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toLocaleUpperCase()}

              </ListItem>
            ))}

          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}