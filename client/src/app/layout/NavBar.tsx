import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

interface NavBarProps {
  onThemeChange: () => void;
  darkMode: boolean; // Adicionado para saber o estado atual do tema
}

function NavBar({ onThemeChange, darkMode }: NavBarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restore App
        </Typography>
        <IconButton onClick={onThemeChange}>
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;