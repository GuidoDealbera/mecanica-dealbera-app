import NewLicencePlate from "./NewLicencePlate";
import OldLicencePlate from "./OldLicencePlate";

interface Props {
    licence: string
}

const LicencePlate: React.FC<Props> = ({licence}) => {
  const isNewFormat = licence.length === 7;
  return isNewFormat ? <NewLicencePlate licence={licence}/> : <OldLicencePlate licence={licence}/> 
}

export default LicencePlate