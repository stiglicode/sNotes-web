import React, { useEffect } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import SearchField from "../../ui/Search";
import Actions from "./components";
import Tree from "../../ui/Tree";
import generateTree from "../../ui/Tree/render/tree";
import { CachedTreeType } from "../../../utilities/types/tree.type";
import axios from "axios";
import ReceiveToken from "../../../services/LocalStorage/jwt/receive-token";

const SideMenu = ({ atom }: { atom: RecoilState<any>[] }) => {
  const managerVisibility = useRecoilValue(atom[0]);
  const [{ tree, flat }, setCache] = useRecoilState<CachedTreeType>(atom[1]);
  const token = ReceiveToken();

  useEffect(() => {
    console.log(window.localStorage);
    axios.get("/records/one", { headers: { ["x-access-token"]: token } }).then((res) => {
      console.log(res?.data);
      return setCache((prev) => {
        return {
          ...prev,
          flat: res.data,
        };
      });
    });
  }, []);
  useEffect(() => {
    setCache((prev) => {
      return {
        ...prev,
        tree: generateTree(prev.flat, 0),
      };
    });
  }, [flat]);

  return (
    <div className={`side-menu ${managerVisibility ? "active" : ""}`}>
      <SearchField placeholder={"Search..."} />
      <Actions atom={atom[1]} />
      <Tree
        data={tree}
        selected={(data) => {
          setCache((prev) => ({
            ...prev,
            selected: data,
          }));
        }}
      />
    </div>
  );
};

export default SideMenu;
