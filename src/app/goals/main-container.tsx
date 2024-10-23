import { DataTable } from "@/components/(goals)/data-table";
import { goalsDummyData } from "./constants";

const MainContainer = () => {
  let data = goalsDummyData;
  return (
    <div className="w-[80%]">
      <DataTable data={data} />
    </div>
  );
};

export default MainContainer;
