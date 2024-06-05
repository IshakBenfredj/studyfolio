/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Title from "../../components/Title";
import { DataContext } from "../../context/dataContext";
import PromoModulesPopup from "../../components/admin/PromoModulesPopup";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
// import { MdDeleteOutline } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Search from "../../components/admin/Search";

export default function Promos() {
  const { promos, setPromos, loading, promoModules, setPromoModules } =
    useContext(DataContext);
  const [promoId, setPromoId] = useState("");
  const [modulesSearch, setModulesSearch] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setModulesSearch(promoModules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promoModules]);

  const deletePromo = async (id) => {
    try {
      const { data } = await Axios.post("/delete_promo", { id_promo: id });
      const filterd = promos.filter((p) => p.id != id);
      setPromos(filterd);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const delete_module_promo = async (id, promo_id) => {
    console.log(id);
    try {
      const { data } = await Axios.post("/delete_module_promo", {
        id_promo: promo_id,
        id_modules: [id],
      });
      const filtered = promoModules.filter(
        (pm) => pm.module.id != id && pm.promo.id == promo_id
      );
      setPromoModules(filtered);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.data.response.error);
    }
  };
  const show = async (id, promo_id) => {
    try {
      const { data } = await Axios.post("/show_module", {
        id_promo: promo_id,
        id_module: id,
      });
      setPromoModules(data.data);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const hide = async (id, promo_id) => {
    try {
      const { data } = await Axios.post("/hide_module", {
        id_promo: promo_id,
        id_module: id,
      });
      setPromoModules(data.data);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  return (
    <>
      {promoId && (
        <PromoModulesPopup
          setPromoId={setPromoId}
          promoId={promoId}
          setPromoModules={setPromoModules}
          promoModules={promoModules}
        />
      )}
      <div className="py-10 sc:overflow-y-auto w-full h-screen flex flex-col items-center">
        <div className="md:w-1/2 mb-10">
          <Title text={"Batches List"} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <div className="center">
              <Search
                table={modulesSearch}
                setTable={setModulesSearch}
                firstTable={promoModules}
                searchText={searchText}
                setSearchText={setSearchText}
                promo
              />
            </div>
            <div className="overflow-x-scroll sc:overflow-visible w-11/12 sc:center items-start mx-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Batch Name</TableCell>
                    <TableCell>Module Name</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Shown</TableCell>
                    <TableCell>Events</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promos.map((p) =>
                    !modulesSearch?.filter((pm) => pm.promo.id === p.id)
                      .length ? (
                      <>
                        <TableRow>
                          <TableCell>{p.name}</TableCell>
                          <TableCell colSpan={4}>
                            <div className="no-result text-lg font-semibold">
                              No Modules Result In This Batch
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => setPromoId(p.id)}>
                              Add Module
                            </Button>
                            <Button
                              color="error"
                              onClick={() => deletePromo(p.id)}
                            >
                              Delete Batch
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      modulesSearch
                        ?.filter((pm) => pm.promo.id === p.id)
                        .map((pm, index) => (
                          <React.Fragment key={pm.id}>
                            <TableRow key={p.id}>
                              {index == 0 && (
                                <TableCell
                                  rowSpan={
                                    modulesSearch?.filter(
                                      (pm) => pm.promo.id === p.id
                                    ).length
                                  }
                                >
                                  {p.name}
                                </TableCell>
                              )}
                              <TableCell>{pm.module.name}</TableCell>{" "}
                              <TableCell>
                                {pm.semester == 1 ? "Semester 1" : "Semester 2"}
                              </TableCell>{" "}
                              <TableCell>
                                {pm.shown == 1 ? "True" : "False"}
                              </TableCell>
                              <TableCell>
                                <div className="center gap-4 h-full">
                                  {pm.shown == "0" ? (
                                    <Button
                                      color="success"
                                      onClick={() => show(pm.module.id, p.id)}
                                    >
                                      Show
                                    </Button>
                                  ) : (
                                    <Button
                                      color="error"
                                      onClick={() => hide(pm.module.id, p.id)}
                                    >
                                      Hide
                                    </Button>
                                  )}
                                  <Button
                                    color="error"
                                    onClick={() =>
                                      delete_module_promo(pm.module.id, p.id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                              {index == 0 && (
                                <TableCell
                                  rowSpan={
                                    modulesSearch?.filter(
                                      (pm) => pm.promo.id === p.id
                                    ).length
                                  }
                                >
                                  <Button onClick={() => setPromoId(p.id)}>
                                    Add Module
                                  </Button>
                                  <Button
                                    color="error"
                                    onClick={() => deletePromo(p.id)}
                                  >
                                    Delete Batch
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          </React.Fragment>
                        ))
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// const DropPromo = ({ promo, setPromoId, promoModules, setPromoModules }) => {
// const delete_module_promo = async (id) => {
//   console.log(id);
//   try {
//     const { data } = await Axios.post("/delete_module_promo", {
//       id_promo: promo.id,
//       id_modules: [id],
//     });
//     const filtered = promoModules.filter(
//       (pm) => pm.module.id != id && pm.promo.id == promo.id
//     );
//     setPromoModules(filtered);
//     handleSuccess(data.message);
//   } catch (error) {
//     handleError(error.data.response.error);
//   }
// };

// const show = async (id) => {
//   try {
//     const { data } = await Axios.post("/show_module", {
//       id_promo: promo.id,
//       id_module: id,
//     });
//     setPromoModules(data.data);
//     handleSuccess(data.message);
//   } catch (error) {
//     handleError(error.response.data.error);
//   }
// };
// const hide = async (id) => {
//   try {
//     const { data } = await Axios.post("/hide_module", {
//       id_promo: promo.id,
//       id_module: id,
//     });
//     setPromoModules(data.data);
//     handleSuccess(data.message);
//   } catch (error) {
//     handleError(error.response.data.error);
//   }
// };

//   return (
//     <Drop title={promo?.name}>
//       <div className="w-full my-3">
//         <Button
//           text={"add new module"}
//           clickFunc={() => setPromoId(promo.id)}
//         />
//       </div>
//       <div className="overflow-x-scroll sc:overflow-visible w-full sc:center items-start">
//         {!promoModules.filter((pm) => pm.promo.id == promo.id).length ? (
//           <p className="no-result">No Modules added for this promo</p>
//         ) : (
//           <table>
//             <thead>
//               <th>Module Name</th>
//               <th>Semester</th>
//               <th>Shown</th>
//               <th>Events</th>
//             </thead>
//             <tbody>
//               {promoModules
//                 .filter((pm) => pm.promo.id == promo.id)
//                 .map((pm, index) => (
//                   <tr key={index}>
//                     <td>{pm.module.name}</td>
//                     <td>{pm.shown == "1" ? "S1" : "S2"}</td>
//                     <td>{pm.shown == "0" ? "False" : "True"}</td>
//                     <td>
//                       <div className="center gap-4 h-full">
//                         <button
//                           className={
//                             pm.shown == "0" ? "text-green-500" : "text-red-500"
//                           }
//                         >
//                           {pm.shown == "0" ? (
//                             <button
//                               className="text-green-500"
//                               onClick={() => show(pm.module.id)}
//                             >
//                               Show
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => hide(pm.module.id)}
//                               className="text-red-500"
//                             >
//                               Hide
//                             </button>
//                           )}
//                         </button>
//                         <button
//                           className="text-red-500"
//                           onClick={() => delete_module_promo(pm.module.id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Drop>
//   );
// };
