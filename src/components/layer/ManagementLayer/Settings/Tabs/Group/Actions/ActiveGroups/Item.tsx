import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AutoStories,
  AutoStoriesOutlined,
  Create,
  CreateOutlined,
  DeleteForever,
  DisabledByDefault,
  Edit,
  ExpandLess,
  ExpandMore,
  Logout,
  Star,
  Warning,
} from "@mui/icons-material";
import { GROUP } from "../../../../../../../../utilities/enums/tabs";
import { ICON } from "../../../../../../../../utilities/enums/group-icons.enum";
import GroupIcon from "../../../../../../../ui/GroupIcon";
import { IGroup } from "../../../../../../../../utilities/types/tree.type";
import Modal from "../../../../../../../ui/Modal";
import { formattedDate } from "../../../../../../../../utilities/date-formatter";
import { nanoid } from "nanoid";

interface Props {
  data: IGroup;
  defaultOpen: boolean;
  isAuthor: boolean;
  loggedUserId: string;
}

const ActiveGroupListItem: React.FC<Props> = ({ data, defaultOpen, isAuthor, loggedUserId }) => {
  const [openMenu, setOpenMenu] = useState(defaultOpen);
  const [openModal, setOpenModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    message: <></>,
    button: ["", ""],
  });

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openIconMenu = Boolean(anchorEl);
  const handleOpenIconsMenu = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (isAuthor) setAnchorEl(event.currentTarget);

    event.stopPropagation();
  };
  const handleCloseIconsMenu = () => {
    setAnchorEl(null);
  };
  return (
    <List dense className={"active-group_list--item"}>
      <ListItemButton
        onClick={handleOpenMenu}
        disableRipple={true}
        className={`border-radius ${openMenu ? "opened" : ""}`}
      >
        <div className={"active-group_list--item-groupIcon"}>
          <label
            id="group-icon-changer-button"
            aria-controls={openIconMenu ? "group-icon-changer" : undefined}
            aria-haspopup="true"
            aria-expanded={openIconMenu ? "true" : undefined}
            onClick={handleOpenIconsMenu}
            aria-label={"Group icon changer"}
            className={`active-group_list--item-groupIcon_button ${!isAuthor ? "disabled" : ""}`}
          >
            <GroupIcon name={data.icon} className={"active-group_list--item-groupIcon_button--icon"} />
            {isAuthor ? (
              <Edit sx={{ fontSize: "12px" }} className={"active-group_list--item-groupIcon_button--edit"} />
            ) : (
              <></>
            )}
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
              {isAuthor ? (
                <>
                  <input
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    disabled={!isAuthor}
                    defaultValue={data.name}
                    className={"active-group_list--item-name_input"}
                  />
                  <Edit className={"active-group_list--item-name_icon"} sx={{ fontSize: "14px" }} />
                </>
              ) : (
                <span style={{ lineHeight: "1", transform: "translateY(1px)" }}>{data.name}</span>
              )}
            </span>
          }
        />
        {isAuthor ? (
          <IconButton
            size={"small"}
            color={"error"}
            className={"active-group_list--item-exit"}
            onClick={(e) => {
              setDeleteMessage({
                message: (
                  <>
                    Are you sure? The group&nbsp;
                    <Typography sx={{ display: "inline", opacity: 0.5 }} fontStyle={"italic"}>
                      &quot;{data.name}&quot;
                    </Typography>{" "}
                    will be&nbsp;
                    <Typography sx={{ display: "inline" }} color={"error"} fontWeight={"bold"}>
                      temporary deleted
                    </Typography>
                  </>
                ),
                button: ["Delete", "Keep"],
              });
              setOpenModal(true);
              e.stopPropagation();
            }}
            sx={{ marginRight: "1rem" }}
          >
            <DeleteForever />
          </IconButton>
        ) : (
          <IconButton
            size={"small"}
            color={"error"}
            className={"active-group_list--item-exit"}
            onClick={(e) => {
              setDeleteMessage({
                message: (
                  <>
                    You are leaving the&nbsp;
                    <Typography sx={{ display: "inline", opacity: 0.5 }} fontStyle={"italic"}>
                      &quot;{data.name}&quot;
                    </Typography>
                    &nbsp;group.&nbsp;
                    <Typography sx={{ display: "inline" }} color={"error"} fontWeight={"bold"}>
                      Are you sure?
                    </Typography>
                  </>
                ),
                button: ["Leave", "Stay"],
              });
              setOpenModal(true);
              e.stopPropagation();
            }}
            sx={{ marginRight: "1rem" }}
          >
            <Logout />
          </IconButton>
        )}

        {openMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <div className={"active-group_list--item-contributors"}>
          <div className={"active-group_list--item-contributors_list"}>
            {data.users.map((user, key) => {
              return (
                <div key={key} className={"pending-group_list--item active-group_list--item-contributors_list--item"}>
                  <div className={"active-group_list--item-contributors_list--item-column non-edit"}>
                    <Tooltip
                      title={`${user.name}${loggedUserId === user.id ? " - You" : ""}`}
                      arrow
                      followCursor
                      enterDelay={500}
                    >
                      <div className={"pending-group_list--item-col"}>
                        <span className={"pending-group_list--item-label"}>Member:</span>
                        <span className={"pending-group_list--item-text"}>
                          {data.author === user.id && !isAuthor ? (
                            <Star fontSize={"small"} sx={{ marginRight: "3px" }} />
                          ) : (
                            <></>
                          )}
                          {user.name}
                          {loggedUserId === user.id ? (
                            <Typography fontWeight={"normal"} fontSize={"11px"} lineHeight={1} alignSelf={"flex-start"}>
                              &nbsp;(You)
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                    </Tooltip>
                    <div className={"pending-group_list--item-col"}>
                      <span className={"pending-group_list--item-label"}>Member since:</span>
                      <span className={"pending-group_list--item-text"}>{formattedDate(user.since, "dd.mm.yyyy")}</span>
                    </div>
                    {!isAuthor ? (
                      <div className={"pending-group_list--item-col"}>
                        <span className={"pending-group_list--item-label"}>Permission:</span>
                        <span className={"pending-group_list--item-text"}>{user.permission}</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {isAuthor && loggedUserId !== user.id ? (
                    <div className={"active-group_list--item-contributors_list--item-column"}>
                      <RadioGroup
                        key={nanoid()}
                        row
                        aria-labelledby="permission-selection"
                        defaultValue={user.permission}
                        name="contributor-permission"
                        sx={{ marginRight: "2rem" }}
                        // onChange={changePermission}
                      >
                        <Radio value="reader" icon={<AutoStoriesOutlined />} checkedIcon={<AutoStories />} />
                        <Radio value="writer" sx={{ margin: 0 }} icon={<CreateOutlined />} checkedIcon={<Create />} />
                      </RadioGroup>
                      <IconButton
                        size={"small"}
                        color={"error"}
                        className={"active-group_list--item-contributors_list--item-column_delete"}
                        onClick={(e) => {
                          setDeleteMessage({
                            message: (
                              <>
                                Are you sure? The user&nbsp;
                                <Typography sx={{ display: "inline", opacity: 0.5 }} fontStyle={"italic"}>
                                  &quot;{user.name}&quot;
                                </Typography>{" "}
                                will be&nbsp;
                                <Typography sx={{ display: "inline" }} color={"error"} fontWeight={"bold"}>
                                  denied access
                                </Typography>
                              </>
                            ),
                            button: ["Denied", "Allow"],
                          });
                          setOpenModal(true);
                          e.stopPropagation();
                        }}
                      >
                        <DisabledByDefault />
                      </IconButton>
                    </div>
                  ) : data.author === user.id ? (
                    <div
                      className={"active-group_list--item-contributors_list--item-column non-edit"}
                      style={{ width: "100px", justifyContent: "flex-end" }}
                    >
                      <Typography fontWeight={"bold"} color={"primary"}>
                        Author
                      </Typography>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Collapse>
      <Modal
        head={false}
        footer
        okText={deleteMessage.button[0]}
        closeText={deleteMessage.button[1]}
        onOk={() => setOpenModal(false)}
        okType={"error"}
        open={openModal}
        body={
          <Box component={"div"} sx={{ display: "flex", flexDirection: "row", columnGap: "1em" }}>
            <Warning color={"error"} />
            <Typography sx={{ display: "inline" }}>{deleteMessage.message}</Typography>
          </Box>
        }
        onClose={() => setOpenModal(false)}
      />
    </List>
  );
};

export default ActiveGroupListItem;
