import { useState } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "@/store";

const NavbarButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.light,
  "&:hover": {
    color: theme.palette.common.black,
  },
}));

export default function PrimarySearchAppBar() {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1, borderBottom: "1px solid black" }}>
      <AppBar position="static" elevation={0} style={{ background: "white" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography variant="heading" component="h3" color="black">
              {isLoggedIn ? "Logged In" : "Not logged in"}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Header Right Section */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* Profile Icon */}
            <NavbarButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary.light"
              sx={{ mr: 0.5 }}
            >
              {/* <NavbarLogo src={logoSvg} alt="The Tea Lab" sx={{ mx : "auto", }} /> */}
              <AccountCircle sx={{ fontSize: "2rem" }} />
              {/* </RouterLink> */}
            </NavbarButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
