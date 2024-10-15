import './DateCell.scss';

type DateCellType = {
  value: Date | null;
};

const DateCell = ({ value }: DateCellType) => {
  const formatDate = (date: Date | null) => {
    if (date === null) {
      return 'Not finished';
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}\n${day} ${month}, ${year}`;
  };

  return <div className="date-cell">{formatDate(value)}</div>;
};

export default DateCell;
