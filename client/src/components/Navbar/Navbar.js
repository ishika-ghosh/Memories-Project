import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styles, pages, settings } from "./style";

function Navbar() {
  const user = useSelector((state) => state.userAuth.authData);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: "PROFILE",
      payload: JSON.parse(localStorage.getItem("profile")),
    });
  }, [location, dispatch]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (s) => {
    if (s === "Logout") {
      dispatch({ type: "LOGOUT" });
      navigate("/auth");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ImageSearchIcon sx={styles.icon} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={styles.App}
          >
            Memories
          </Typography>

          <Box sx={styles.menuBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ImageSearchIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={styles.responsiveText}
          >
            Memories
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h6"
            sx={{ display: { xs: "none", md: "block" }, mr: 2 }}
          >
            {user && `Welcome ${user.data.name}`}
          </Typography>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ px: 0 }}>
                  {user.data.picture ? (
                    <Avatar alt={user.data.name} src={user.data.picture} />
                  ) : (
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user.data.name[0]}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <button style={styles.btnStyle} onClick={() => navigate("/auth")}>
              <Link to="/auth" style={styles.linkStyle}>
                LogIn/SignUp
              </Link>
            </button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
