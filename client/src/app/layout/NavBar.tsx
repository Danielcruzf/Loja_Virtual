import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/Stores";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import type { Item } from "../../app/models/basket"; 


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

export default function NavBar() {
  const { isLoading, darkMode } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  const {data:basket} = useFetchBasketQuery();
const itemCount =basket?.items.reduce((sum:number, item:Item)=>sum+item.quantity,0) ||0;
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center" >
          <Typography component={NavLink} sx={navStyles} to='/' variant="h6" >RE-STORE</Typography>
          <IconButton onClick={() => dispatch(setDarkMode())} >
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

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
       

        <Box display="flex" alignItems="center">
<IconButton component={Link} to='/basket' size="large" sx={{ color: "inherit" }} >
            <Badge badgeContent={itemCount} color="secondary" sx={{ ml: 2 }}>
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
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  )
}