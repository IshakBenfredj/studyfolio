import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import Input from "../Input";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import Button from "../Button";
import PopupContainer from "../PopupContainer";

/* eslint-disable react/prop-types */
export default function EditPopup({ table, setTable }) {
  const [promo_id, setPromoId] = useState(null);
  const [group_id, setGroupId] = useState(null);

  const { promos, groups, setStudents } = useContext(DataContext);

  const modifyGroup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("/modify_group", {
        student_ids: table,
        new_group: group_id,
      });
      handleSuccess(data.message);
      setStudents(data.students);
      setTable([]);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <PopupContainer>
      <form
        onSubmit={modifyGroup}
        className="bg-third sc:w-1/3 md:2/3 w-11/12 rounded-md p-3 space-y-3"
      >
        <h1 className="text-secondary font-bold capitalize text-xl text-center">
          Edit Batch and Group for {table.length} student
        </h1>
        <Input selectBox set={setPromoId}>
          <option disabled selected>
            Select Batch
          </option>
          {promos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Input>
        <Input selectBox set={setGroupId}>
          <option disabled selected>
            Select Group
          </option>
          {promo_id &&
            groups.map(
              (g) =>
                g.promo.id == promo_id && (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                )
            )}
        </Input>
        <div className="grid grid-cols-4 w-full gap-2">
          <Button text={"Close"} danger clickFunc={() => setTable([])} />
          <div className="col-span-3">
            <Button text={"Modify Group"} />
          </div>
        </div>
      </form>
    </PopupContainer>
  );
}
