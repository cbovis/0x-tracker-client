import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { URL } from '../../../constants';
import { AllIcon } from '../../../components/icons';
import Link from '../../../components/link';

const FilterItem = styled(Link)`
  color: ${(props) => (props.active ? 'inherit' : COLORS.NEUTRAL.MYSTIC_700)};
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  }
`;

const FilterImage = styled.img.attrs({ alt: '' })`
  border-radius: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const ArticlesFilter = ({ sources }) => {
  const location = useLocation();

  return (
    <nav>
      <FilterItem active={location.pathname === URL.NEWS} href={URL.NEWS}>
        All
        <AllIcon height={20} width={20} />
      </FilterItem>
      {sources.map((source) => {
        const sourceUrl = `${URL.NEWS}/${source.slug}`;

        return (
          <FilterItem
            active={location.pathname === sourceUrl}
            href={sourceUrl}
            key={source.slug}
          >
            {source.name}
            <FilterImage src={source.imageUrl} />
          </FilterItem>
        );
      })}
    </nav>
  );
};

ArticlesFilter.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ArticlesFilter;
