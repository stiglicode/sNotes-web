import React, { ChangeEvent } from "react";
import { IFoundUsers } from "../../../../../../../../utilities/types/search.type";
import { FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import { AutoStories, AutoStoriesOutlined, Create, CreateOutlined, Delete } from "@mui/icons-material";
import { nanoid } from "nanoid";

interface Props {
  contributor: IFoundUsers;
  contributors: React.Dispatch<React.SetStateAction<IFoundUsers[]>>;
}

const Contributors: React.FC<Props> = ({ contributor, contributors }) => {
  const deleteContributor = () => {
    contributors((prev) => {
      const copyOfContributors = [...prev];

      return [...copyOfContributors.filter((con) => con.id !== contributor.id)];
    });
  };

  const changePermission = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (value === "reader" || value === "writer") {
      contributors((prev) => {
        const index = prev.findIndex((contr) => contr.id === contributor.id);
        const copyOfContributors = [...prev];
        copyOfContributors[index] = {
          ...copyOfContributors[index],
          permission: value,
        };
        return [...copyOfContributors];
      });
    }
  };

  return (
    <div className={"contributor-wrapper"}>
      <span className={"contributor-wrapper_name"}>
        <IconButton
          aria-label="delete"
          color={"error"}
          className={"contributor-wrapper_name--delete"}
          onClick={deleteContributor}
        >
          <Delete />
        </IconButton>
        {contributor.nickname}
      </span>
      <RadioGroup
        key={nanoid()}
        row
        aria-labelledby="permission-selection"
        defaultValue={contributor.permission}
        name="contributor-permission"
        onChange={changePermission}
      >
        <FormControlLabel
          value="reader"
          control={<Radio icon={<AutoStoriesOutlined />} checkedIcon={<AutoStories />} />}
          label="Reader"
        />
        <FormControlLabel
          value="writer"
          control={<Radio icon={<CreateOutlined />} checkedIcon={<Create />} />}
          label="Writer"
          sx={{ margin: 0 }}
        />
      </RadioGroup>
    </div>
  );
};

export default Contributors;
