import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import './TableTab.scss';

type TableTabType = {
  isActive: boolean;
  name: string;
  onClick: () => void;
};

const TableTab = ({ isActive, name, onClick }: TableTabType) => {
  const activeClassname = isActive ? 'active' : '';

  return (
    <ButtonDiv className={`table-tab ${activeClassname}`} onClick={onClick}>
      {name}
    </ButtonDiv>
  );
};

export default TableTab;
