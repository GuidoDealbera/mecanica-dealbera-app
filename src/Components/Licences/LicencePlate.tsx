import NewLicencePlate from "./NewLicencePlate";
import OldLicencePlate from "./OldLicencePlate";

interface Props {
    licence: string;
    width?: string | number
}

const LicencePlate: React.FC<Props> = ({licence, width}) => {
  const isNewFormat = licence.length === 7;
  return isNewFormat ? <NewLicencePlate licence={licence} width={width}/> : <OldLicencePlate licence={licence} width={width}/> 
}

export default LicencePlate