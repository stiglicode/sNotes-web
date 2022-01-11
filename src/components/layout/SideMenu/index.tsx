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
  const [cache, setCache] = useRecoilState<CachedTreeType>(atom[1]);
  const token = ReceiveToken();
  console.log(cache);

  useEffect(() => {
    console.log(window.localStorage);
    axios.get("/records/one", { headers: { ["x-access-token"]: token } }).then((res) => {
      return setCache((prev) => {
        return {
          ...prev,
          flat: res.data,
          tree: generateTree(res.data, 0),
        };
      });
    });
  }, []);
  // useEffect(() => {
  //   setCache((prev) => {
  //     return {
  //       ...prev,
  //       tree: generateTree(prev.flat, null),
  //     };
  //   });
  // }, [cache.flat]);
  console.log(cache);

  return (
    <div className={`side-menu ${managerVisibility ? "active" : ""}`}>
      <SearchField placeholder={"Search..."} />
      <Actions />
      <Tree
        data={cache.tree}
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
