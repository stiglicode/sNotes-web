import React from "react";
import { Collapse, IconButton, List, ListItemButton, ListItemText, Menu, Radio, RadioGroup } from "@mui/material";
import { DeleteForever, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { GROUP } from "../../../../../../../../utilities/enums/tabs";
import { ICON } from "../../../../../../../../utilities/enums/group-icons.enum";
import GroupIcon from "../../../../../../../ui/GroupIcon";
import { IGroup } from "../../../../../../../../utilities/types/tree.type";

interface Props {
  data: IGroup;
}

const ActiveGroupListItem: React.FC<Props> = ({ data }) => {
  const [openMenu, setOpenMenu] = React.useState(true);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openIconMenu = Boolean(anchorEl);
  const handleOpenIconsMenu = (event: React.MouseEvent<HTMLLabelElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleCloseIconsMenu = () => {
    setAnchorEl(null);
  };
  return (
    <List dense className={"active-group_list--item"}>
      <ListItemButton onClick={handleOpenMenu} disableRipple={true} className={"border-radius"}>
        <div className={"active-group_list--item-groupIcon"}>
          <label
            id="group-icon-changer-button"
            aria-controls={openIconMenu ? "group-icon-changer" : undefined}
            aria-haspopup="true"
            aria-expanded={openIconMenu ? "true" : undefined}
            onClick={handleOpenIconsMenu}
            aria-label={"Group icon changer"}
            className={"active-group_list--item-groupIcon_button"}
          >
            <GroupIcon name={data.icon} className={"active-group_list--item-groupIcon_button--icon"} />
            <Edit sx={{ fontSize: "12px" }} className={"active-group_list--item-groupIcon_button--edit"} />
          </label>
          <Menu
            id="group-icon-changer"
            anchorEl={anchorEl}
            open={openIconMenu}
            onClose={handleCloseIconsMenu}
            MenuListProps={{
              "aria-labelledby": "group-icon-changer-button",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={"active-group_list--item-groupIcon_menu"}>
              <RadioGroup row aria-labelledby="group-icons-radio" name={GROUP.ICON}>
                {Object.entries(ICON).map((icon, key) => {
                  return (
                    <Radio
                      key={key}
                      // onChange={formik.handleChange}
                      // checked={formik.values[GROUP.ICON] === icon[1]}
                      icon={
                        <div className={"active-group_list--item-groupIcon_menu--icons disable"}>
                          <GroupIcon name={icon[1]} />
                        </div>
                      }
                      checkedIcon={
                        <div className={"active-group_list--item-groupIcon_menu--icons"}>
                          <GroupIcon name={icon[1]} />
                        </div>
                      }
                      value={icon[1]}
                      name={GROUP.ICON}
                      inputProps={{ "aria-label": icon[1] }}
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </Menu>
        </div>
        <ListItemText
          primary={
            <span
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={"active-group_list--item-name"}
            >
              <input
                onFocus={(e) => {
                  e.stopPropagation();
                }}
                defaultValue={data.name}
                className={"active-group_list--item-name_input"}
              />
              <Edit className={"active-group_list--item-name_icon"} sx={{ fontSize: "14px" }} />
            </span>
          }
        />
        <IconButton
          size={"small"}
          color={"error"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{ marginRight: "1rem" }}
        >
          <DeleteForever />
        </IconButton>
        {openMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <div>aaa</div>
      </Collapse>
    </List>
  );
};

export default ActiveGroupListItem;
