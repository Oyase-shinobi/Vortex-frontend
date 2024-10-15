import { ChangeEvent, useMemo } from 'react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import NumberHelper from '@/utils/helpers/NumberHelper';

import './Pagination.scss';

type PaginationType = {
  page: number | string;
  totalPages: number;
  setPage: (page: number | string) => void;
};

const Pagination = ({ page, totalPages, setPage }: PaginationType) => {
  const isNextDisabled = useMemo(() => {
    if (page === '') return true;
    return Number(page) + 1 > totalPages;
  }, [page, totalPages]);
  const isPreviousDisabled = useMemo(() => {
    if (page === '') return true;
    return Number(page) - 1 < 1;
  }, [page, totalPages]);

  const nextPage = () => {
    if (isNextDisabled || page === '') return;
    setPage(Number(page) + 1);
  };

  const previousPage = () => {
    if (isPreviousDisabled || page === '') return;
    setPage(Number(page) - 1);
  };

  const handlePageOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const re = /^[0-9\b]+$/;

    if (value === '') {
      setPage('');
      return;
    }

    if (value === '0') {
      setPage('1');
      return;
    }

    const newValue = Number(
      NumberHelper.toFloor(NumberHelper.convertDotNumber(value)),
    );

    if (
      newValue < 0 ||
      value.includes('-') ||
      value.includes('e') ||
      value.includes('.') ||
      !re.test(newValue.toString())
    ) {
      return;
    }

    setPage(newValue);
  };

  return (
    <div className="pagination">
      <ButtonDiv
        className={`previous ${isPreviousDisabled && 'disabled'}`}
        onClick={previousPage}
      >
        {'<'}
      </ButtonDiv>
      <div>{'PAGE'}</div>
      {/* TODO: refine on change values... */}
      <input
        className="page-input"
        inputMode="numeric"
        pattern="\d+"
        value={page}
        step={1}
        min={1}
        onChange={handlePageOnChange}
        onKeyDown={(e) => {
          if (
            e.key === '-' ||
            e.key === '+' ||
            e.key === '.' ||
            e.key === 'e' ||
            e.key === 'E'
          ) {
            e.preventDefault();
          }
        }}
      />
      <div>{'OF'}</div>
      <div className="total-page">{totalPages}</div>
      <ButtonDiv
        className={`next ${isNextDisabled && 'disabled'}`}
        onClick={nextPage}
      >
        {'>'}
      </ButtonDiv>
    </div>
  );
};

export default Pagination;
