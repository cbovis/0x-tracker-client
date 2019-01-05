import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import callApi from '../../../util/call-api';

class ArticlesProvider extends React.Component {
  state = { isLoading: false, page: 1 };

  componentDidMount() {
    this.fetchInitial().catch(error => {
      this.setState({ error });
    });
  }

  componentDidUpdate(prevProps) {
    const { source } = this.props;

    if (prevProps.source !== source) {
      this.fetchInitial().catch(error => {
        this.setState({ error });
      });
    }
  }

  handleLoadMore = event => {
    const { page } = this.state;

    event.preventDefault();
    this.fetchMore(page + 1);
  };

  fetchInitial = async () => {
    const { source } = this.props;

    this.setState({ articles: undefined, isLoading: true });

    const data = await callApi('articles', { page: 1, source });

    this.setState({
      articles: data.articles,
      isLoading: false,
      pageCount: data.pageCount,
    });
  };

  fetchMore = async (page = 1) => {
    const { source } = this.props;

    this.setState({ isLoading: true });

    const data = await callApi('articles', { page, source });

    this.setState(prevState => ({
      articles: prevState.articles.concat(data.articles),
      isLoading: false,
      page: data.page,
      pageCount: data.pageCount,
    }));
  };

  fetchArticles = async (page = 1, source) =>
    callApi('articles', { page, source });

  render() {
    const { articles, error, isLoading, page, pageCount } = this.state;
    const { children, limit } = this.props;

    if (error) {
      throw error;
    }

    return children({
      articles: limit ? _.take(articles, limit) : articles,
      canLoadMore: page < pageCount,
      loadingInitial: articles === undefined,
      loadingMore: isLoading && articles !== undefined,
      loadMore: this.handleLoadMore,
    });
  }
}

ArticlesProvider.propTypes = {
  children: PropTypes.func.isRequired,
  limit: PropTypes.number,
  source: PropTypes.string,
};

ArticlesProvider.defaultProps = {
  limit: undefined,
  source: undefined,
};

export default ArticlesProvider;
