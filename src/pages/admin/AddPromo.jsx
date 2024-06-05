import { useContext, useState } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import { DataContext } from "../../context/dataContext";
import batches from "../../constants/batches";

export default function AddPromo() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [number_of_groups, setNumberOfGroups] = useState();
  const { groups, promos, setPromos, setGroups } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post(
        "/add_promo_with_groups",
        {
          name,
          year,
          number_of_groups,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPromos([...promos, data.promo]);
      setGroups([...groups, ...data.groups]);
      setName("");
      setNumberOfGroups("");
      setYear("");
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="md:w-5/12 w-[95%] space-y-3" onSubmit={handleSubmit}>
        <Title text={"Add Batch"} />
        <Input selectBox set={setName}>
          <option disabled selected>
            Select Name
          </option>
          {batches.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </Input>
        <Input
          type={"text"}
          name={"year"}
          label={"year"}
          state={year}
          set={setYear}
        />
        <Input
          type={"number"}
          name={"number_of_groups"}
          label={"number of groups"}
          state={number_of_groups}
          set={setNumberOfGroups}
        />
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add New"} loading={loading} />
        </div>
      </form>
    </div>
  );
}
