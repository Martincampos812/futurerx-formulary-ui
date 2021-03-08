import React, { ReactElement } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import "./CustomMenu.scss";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: "end",
//       color: theme.palette.text.secondary,
//       marginBottom: "5px",
//     },
//   })
// );

const useStyles = makeStyles({
  // customStyle: {
  //   "& div": {
  //     width: "170px",
  //     webKitOutline: "none",
  //     marginTop: 13,
  //     border: "1px solid #e5e5e5",
  //   },
  // },
});

interface Props {
  children: any;
  open: any;
  anchorEl: any;
  className: string;
  //   handleClose: () => any;
}

export default function CustomMenu({
  children,
  open,
  anchorEl,
  className,
}: //   handleClose,
Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={`menu-container`}>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        // onClose={handleClose}
        TransitionComponent={Fade}
        className={className}
      >
        {children}
      </Menu>
    </div>
  );
}
