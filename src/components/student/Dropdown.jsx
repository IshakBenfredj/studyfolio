import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoLogOutOutline } from "react-icons/io5";
import { UserContext } from "../../context/userContext";

import { IoMdArrowDropdown } from "react-icons/io";
import images from "../../constants/images";

export default function Dropdown() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        to={`/profile/${user?.id}`}
        className="transition-all flex items-center font-bold gap-1 border-2 p-[10px] border-gray-600 text-gray-600 rounded"
      >
        <img
          src={user?.profile_pic ? user.profile_pic : images.profil}
          alt=""
          className="w-6 h-6 rounded-full"
        />
        {user?.fname}
        <IoMdArrowDropdown size={20} />
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={`profile/${user.id}`}>
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <hr />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <IoLogOutOutline size={24} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
