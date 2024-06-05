/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/loading/Loading";
import { DataContext } from "../../context/dataContext";
import ModuleCard from "../../components/ModuleCard";

export default function Modules() {
  const { user } = useContext(UserContext);
  const { promoModules } = useContext(DataContext);
  const [showModules, setShowModules] = useState(null);
  useEffect(() => {
    const filterModules = promoModules?.filter(
      (sm) => sm.promo.id === user?.group.promo.id && sm.shown == 1
    );
    setShowModules(filterModules);
  }, [promoModules, user]);
  return (
    <>
      {!showModules ? (
        <Loading />
      ) : (
        <div className="container grid sc:grid-cols-4 md:grid-cols-2 gap-4 py-6">
          {showModules.map((m) => (
            <ModuleCard key={m.module.id} m={m} path={"/student"} />
          ))}
        </div>
      )}
    </>
  );
}