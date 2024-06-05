/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import Button from "../Button";
import Input from "../Input";
import PopupContainer from "../PopupContainer";
import { handleError, handleSuccess } from "../../utils/toastify";
import Axios from "../../api";

export default function PromoModulesPopup({
  setPromoId,
  promoId,
  setPromoModules,
  promoModules,
}) {
  const { modules } = useContext(DataContext);
  const [id_module, setIdModule] = useState("");
  const [shown, setShown] = useState("1");
  const [semester, setSemestre] = useState("1");
  const addModuleToPromo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/add_module_promo", {
        id_promo: promoId,
        id_module,
        shown,
        semester,
      });
      handleSuccess(data.message);
      setPromoModules([...promoModules, data.data]);
      setPromoId("");
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  return (
    <PopupContainer>
      <div className="bg-third sc:w-1/3 md:2/3 w-11/12 rounded-md p-3 space-y-3">
        <h1 className="text-secondary font-bold capitalize text-xl text-center">
          Add Module to this promo
        </h1>
        <form className="space-y-2" onSubmit={addModuleToPromo}>
          <Input selectBox set={setIdModule}>
            <option disabled selected>
              Select Module
            </option>
            {modules.length > 0 &&
              modules.map((m) => (
                <option key={m.id} value={m.id} className="text-secondary">
                  {m.name}
                </option>
              ))}
          </Input>
          <Input selectBox set={setSemestre}>
            <option selected value={"1"}>
              S1
            </option>
            <option value={"2"}>S2</option>
          </Input>
          <Input selectBox set={setShown}>
            <option selected value={"1"}>
              Show
            </option>
            <option value={"0"}>Hide</option>
          </Input>
          <div className="grid grid-cols-4 w-full gap-2">
            <Button text={"Close"} danger clickFunc={() => setPromoId("")} />
            <div className="col-span-3">
              <Button text={"Add"} />
            </div>
          </div>
        </form>
      </div>
    </PopupContainer>
  );
}
