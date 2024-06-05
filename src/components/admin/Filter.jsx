import { useContext, useEffect, useState } from "react";
import Input from "../Input";
import { DataContext } from "../../context/dataContext";

export default function Filter({ table, setTable, firstTable }) {
  const { promos, groups } = useContext(DataContext);
  const [promo_id, setPromoId] = useState("0");
  const [promo, setPromo] = useState([]);
  const [group_id, setGroupId] = useState("0");

  useEffect(() => {
    if (promo_id !== "0") {
      const filterTable = firstTable.filter(
        (e) => e.group?.promo.id == promo_id
      );
      console.log(filterTable);
      setTable(filterTable);
      setPromo(filterTable);
    } else {
      setTable(firstTable);
      setGroupId("0");
      setPromo(firstTable);
    }
  }, [firstTable, promo_id, setTable]);

  useEffect(() => {
    if (group_id !== "0") {
      const filterTable = promo.filter((e) => e.group?.id == group_id);
      setTable(filterTable);
    } else {
      setTable(promo);
    }
  }, [group_id, promo, setTable]);

  return (
    <div className="mb-6 center gap-5 capitalize">
      <h1 className="font-bold">filtred by :</h1>
      <div>
        <Input selectBox set={setPromoId}>
          <option selected value={"0"}>
            All Batches
          </option>
          {promos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Input>
      </div>
      <div>
        <Input selectBox set={setGroupId}>
          <option selected value={"0"}>
            All Groups
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
      </div>
    </div>
  );
}
