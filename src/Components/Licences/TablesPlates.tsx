import NewPlateTable from "./NewPlateTable";
import OldPlateTable from "./OldPlateTable";

interface Props {
    licence: string;
    width?: string | number
    dialog?: boolean
}

const TablePlate: React.FC<Props> = ({licence, dialog, width}) => {
    const isNewFormat = licence.length === 7;
    return isNewFormat ? <NewPlateTable licence={licence} width={width} dialog={dialog}/> : <OldPlateTable licence={licence} width={width} dialog={dialog}/> 
  }
  
  export default TablePlate