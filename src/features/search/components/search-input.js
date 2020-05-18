import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import buildRelayerUrl from '../../relayers/util/build-relayer-url';
import buildTokenUrl from '../../tokens/util/build-token-url';
import buildTraderUrl from '../../traders/util/build-trader-url';
import SearchSuggestion from './search-suggestion';
import useEscapeKey from '../../../hooks/use-escape-key';
import useAutocomplete from '../hooks/use-autocomplete';
import useNavigator from '../../../hooks/use-navigator';

const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  .react-autosuggest__container {
    flex-grow: 1;
  }

  .react-autosuggest__input {
    background: none;
    border: none;
    color: inherit;
    flex-grow: 1;
    margin: 12px 16px 12px 16px;
    outline: none;
    text-overflow: ellipsis;
    width: 100%;

    &::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_400};
    }
  }

  .react-autosuggest__suggestions-container {
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 3px rgba(126, 142, 177, 0.2);
    left: 0;
    position: absolute;
    margin: 8px 0 0;
    z-index: 100;
    width: 100%;
    max-height: 415px;
    overflow: auto;
  }

  .react-autosuggest__suggestions-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 12px 16px;
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
  }

  .react-autosuggest__section-title {
    background: ${COLORS.NEUTRAL.MYSTIC_100};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: ${COLORS.NEUTRAL.MYSTIC_700};
    font-weight: 500;
    padding: 12px 16px;
  }
`;

function getSuggestionValue(suggestion) {
  if (suggestion === undefined) {
    return '';
  }

  if (suggestion.type === 'token') {
    return suggestion.name || 'Unknown Token';
  }

  if (suggestion.type === 'trader') {
    return suggestion.name || 'Unknown Trader';
  }

  return suggestion.name;
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

const SearchInput = ({ autoFocus, onBlur, onFocus }) => {
  const { navigateTo } = useNavigator();
  const [inputValue, setInputValue] = React.useState('');
  const [suggestions, setSearchTerm] = useAutocomplete();
  const inputRef = React.useRef();

  useEscapeKey(() => {
    inputRef.current.blur();
  });

  return (
    <InputWrapper>
      <Autosuggest
        getSectionSuggestions={getSectionSuggestions}
        getSuggestionValue={getSuggestionValue}
        inputProps={{
          autoFocus,
          onBlur: () => {
            onBlur();
          },
          onChange: (e, { newValue }) => {
            setInputValue(newValue);
          },
          onFocus: () => {
            onFocus();
          },
          placeholder: 'Search for tokens, relayers, traders or fills',
          ref: inputRef,
          value: inputValue,
        }}
        multiSection
        onSuggestionsClearRequested={() => {
          setSearchTerm(null);
        }}
        onSuggestionSelected={(event, { suggestion }) => {
          inputRef.current.blur();

          if (suggestion.type === 'token') {
            navigateTo(buildTokenUrl(suggestion.address), undefined, {
              clientSide: false,
            });
          }

          if (suggestion.type === 'relayer') {
            navigateTo(buildRelayerUrl(suggestion.slug), undefined, {
              clientSide: false,
            });
          }

          if (suggestion.type === 'trader') {
            navigateTo(buildTraderUrl(suggestion.address), undefined, {
              clientSide: false,
            });
          }
        }}
        onSuggestionsFetchRequested={({ value, reason }) => {
          if (reason === 'input-changed' || reason === 'input-focused') {
            setSearchTerm(value);
          }
        }}
        renderSectionTitle={(section) => section.title}
        renderSuggestion={(suggestion) => (
          <SearchSuggestion suggestion={suggestion} />
        )}
        shouldRenderSuggestions={(value) => {
          if (!_.isString(value)) {
            return false;
          }

          return value.trim().length >= 3;
        }}
        suggestions={suggestions}
      />
    </InputWrapper>
  );
};

SearchInput.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default SearchInput;
