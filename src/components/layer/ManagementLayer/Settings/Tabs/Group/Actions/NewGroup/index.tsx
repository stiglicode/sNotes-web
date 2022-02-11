import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import FormInput from "../../../../../../../form/Input";
import { useFormik } from "formik";
import { INewGroup } from "../../../../../../../../utilities/types/tab.type";
import { GROUP } from "../../../../../../../../utilities/enums/tabs";
import { NewGroupValidation } from "../../../../../../../../utilities/validation/tab.validation";
import { IFoundUsers } from "../../../../../../../../utilities/types/search.type";
import axios from "axios";
import { search } from "../../../../../../../../utilities/search-algo";
import debounce from "../../../../../../../../utilities/debounce";
import Contributors from "./Contributors";
import { nanoid } from "nanoid";
import { ICON } from "../../../../../../../../utilities/enums/group-icons.enum";
import GroupIcon from "../../../../../../../ui/GroupIcon";
import { Groups, GroupsOutlined } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ICachedStoreAtom, PropsAndAtom } from "../../../../../../../../utilities/types/atom.type";

const NewGroup: PropsAndAtom<any> = ({ atom }) => {
  const updateGroups = useSetRecoilState<ICachedStoreAtom>(atom[0]);
  const [otherData, setOtherData] = useState(false);
  const [offsetLength, setOffsetLength] = useState([1, 10]);
  const [searchValues, setSearchValues] = useState<IFoundUsers[]>([]);
  const [options, setOptions] = useState<IFoundUsers[]>([]);
  const [waitForResponse, setWaitForResponse] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IFoundUsers[]>([]);
  const redirect = useNavigate();

  const handleSubmit = (value: INewGroup) => {
    const structuredData = {
      groupName: value[GROUP.NAME],
      groupIcon: value[GROUP.ICON],
      groupShareable: value[GROUP.SHARE],
      groupContributors: selectedRecord.map((prev) => {
        return {
          id: prev.id,
          permission: prev.permission,
        };
      }),
    };
    return axios.post("/groups/new", structuredData).then(() => {
      return axios.get("/groups").then(() => {
        updateGroups((prev: any) => ({ ...prev, updateGroups: true }));
        redirect("/");
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      [GROUP.NAME]: "",
      [GROUP.SHARE]: false,
      [GROUP.ICON]: "Default",
    },

    validationSchema: NewGroupValidation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!otherData) {
      setWaitForResponse(true);
      setOtherData(false);
      axios.get(`/auth/users?offset=${offsetLength[0]}&length=${offsetLength[1]}`).then((res) => {
        setWaitForResponse(false);

        return setSearchValues((prev) => [...prev, ...res.data.data]);
      });
    }

    return () => {
      return setSearchValues([]);
    };
  }, [otherData]);

  return (
    <div className={"newGroup-wrapper"}>
      <Box component={"form"} onSubmit={formik.handleSubmit} autoComplete="off">
        <FormInput label={"Name of group"} name={GROUP.NAME} form={formik} autoFocus variant={"standard"} />
        <FormControl>
          <span>Group icon</span>
          <RadioGroup row aria-labelledby="group-icons-radio" name={GROUP.ICON}>
            {Object.entries(ICON).map((icon, key) => {
              return (
                <Radio
                  key={key}
                  onChange={formik.handleChange}
                  checked={formik.values[GROUP.ICON] === icon[1]}
                  icon={
                    <div className={"newGroup-wrapper_icons disable"}>
                      <GroupIcon name={icon[1]} />
                    </div>
                  }
                  checkedIcon={
                    <div className={"newGroup-wrapper_icons"}>
                      <GroupIcon name={icon[1]} />
                    </div>
                  }
                  value={icon[1]}
                  name={GROUP.ICON}
                  sx={{ fontSize: "3rem" }}
                  inputProps={{ "aria-label": icon[1] }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          onChange={formik.handleChange}
          checked={formik.values[GROUP.SHARE]}
          sx={{ width: "fit-content" }}
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
              icon={<GroupsOutlined />}
              checkedIcon={<Groups />}
              name={GROUP.SHARE}
            />
          }
          label="Shareable"
        />
        <Autocomplete
          onChange={(e, v) => {
            if (typeof v !== "string" && v !== null) {
              if (!selectedRecord.find((record) => record.id === v.id)) {
                setSelectedRecord((prev) => [...prev, { ...v, permission: "reader" }]);
              }
            }
          }}
          onInputChange={debounce((v) => {
            const value = v.target.value;
            setOtherData(false);
            if (search(value, searchValues, "nickname").length === 0) {
              setOtherData(true);
              return setOffsetLength([offsetLength[0] + offsetLength[1], 10]);
            }
            setOptions(search(value, searchValues, "nickname"));
          }, 300)}
          options={options}
          getOptionLabel={(option) => option.nickname}
          freeSolo
          renderOption={(props, option) => {
            return (
              <li {...props} key={nanoid()}>
                {option.nickname}
              </li>
            );
          }}
          loading={waitForResponse}
          hidden={!formik.values[GROUP.SHARE]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Contributors"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {waitForResponse ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              size={"small"}
            />
          )}
        />
        {formik.values[GROUP.SHARE] ? (
          selectedRecord.length ? (
            <div className={"contributors-list"}>
              {selectedRecord.map((record, key) => {
                return <Contributors contributor={record} contributors={setSelectedRecord} key={key} />;
              })}
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Button type={"submit"} variant={"contained"}>
          Create
        </Button>
      </Box>
    </div>
  );
};

export default NewGroup;
