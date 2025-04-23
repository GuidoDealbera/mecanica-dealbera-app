import NewPlateTable from "./NewPlateTable";
import OldPlateTable from "./OldPlateTable";

interface Props {
    licence: string;
    width?: string | number
}

const TablePlate: React.FC<Props> = ({licence, width}) => {
    const isNewFormat = licence.length === 7;
    return isNewFormat ? <NewPlateTable licence={licence} width={width}/> : <OldPlateTable licence={licence} width={width}/> 
  }
  
  export default TablePlate