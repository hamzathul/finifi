import Avatar from "@mui/material/Avatar";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Badge } from "@mui/material";
import Divider from "@mui/material/Divider";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center px-3 pt-2">
        {/* Title  */}
        <h1 className="text-2xl font-semibold ml-4">Manage Invoices</h1>

        {/* Notification icon and profile  */}
        <div className="flex gap-4 items-center justify-center">
          {/* Notification icon  */}
          <Avatar
            className="text-green-500 p-5"
            sx={{ bgcolor: "white", border: "1px solid #ccc", color: "grey" }}
          >
            <Badge
              color="error"
              overlap="circular"
              badgeContent=" "
              variant="dot"
            >
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </Avatar>
          <Divider orientation="vertical" flexItem />
          {/* Avatar section */}
          <div className="flex gap-2">
            {/* image  */}
            <Avatar
              alt="Remy Sharp"
              src="/pp.jpg"
              sx={{ width: 49, height: 49 }}
            />

            {/* name and email  */}
            <div>
              <p className="font-semibold">Rohit Sharma</p>
              <p className="text-sm">rohit.sharma@growquest.in</p>
            </div>
          </div>
        </div>
      </header>
      <Divider className="pt-3" />
    </>
  );
};

export default Header;
