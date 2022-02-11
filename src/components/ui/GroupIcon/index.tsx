import React from "react";
import { GroupIconsName, IGroupIconProps } from "../../../utilities/types/group-icon.type";
import { ICON } from "../../../utilities/enums/group-icons.enum";

import { Deck, Email, Inbox, MenuBook, School, SpeakerNotes, Work } from "@mui/icons-material";

const iconList = (name: GroupIconsName, className: string) => {
  switch (name) {
    case ICON.PERSONAL:
      return <Deck className={className} />;
    case ICON.SCHOOL:
      return <School className={className} />;
    case ICON.WORK:
      return <Work className={className} />;
    case ICON.BOOK:
      return <MenuBook className={className} />;
    case ICON.NOTE:
      return <SpeakerNotes className={className} />;
    case ICON.EMAIL:
      return <Email className={className} />;
    case ICON.DEFAULT:
      return <Inbox className={className} />;
    default:
      return <Inbox className={className} />;
  }
};

const GroupIcon: React.FC<IGroupIconProps> = ({ name, className = "" }) => {
  return <>{iconList(name, className)}</>;
};

export default GroupIcon;
