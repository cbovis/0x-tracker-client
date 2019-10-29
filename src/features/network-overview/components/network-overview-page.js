import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import NetworkOverviewStats from './network-overview-stats';
import NetworkVolume from '../../metrics/components/network-volume';
import PageLayout from '../../../components/page-layout';
import TabbedCard from '../../../components/tabbed-card';
import TimePeriodSelector from '../../../components/time-period-selector';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';
import ProtocolBreakdown from './protocol-breakdown';

const DashboardColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: ${props => (props.lastRow ? '0' : '1.25rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};

    &:last-child {
      margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};
    }
  `}
`;

const StyledNetworkOverviewStats = styled(NetworkOverviewStats)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const NetworkOverviewPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const period = params.get('period') || TIME_PERIOD.MONTH;

  return (
    <>
      <Helmet key="relayers">
        <title>Active Relayers</title>
      </Helmet>
      <PageLayout
        filter={
          <TimePeriodSelector
            css="width: 100%;"
            onChange={newPeriod => {
              history.push(`${URL.NETWORK_OVERVIEW}?period=${newPeriod}`);
            }}
            value={period}
          />
        }
        title="Network Overview"
      >
        <StyledNetworkOverviewStats period={period} />
        <Row>
          <DashboardColumn lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: <NetworkVolume period={period} />,
                  title: 'Trade Volume',
                },
                {
                  component: <NetworkVolume period={period} type="fills" />,
                  title: 'Trade Count',
                },
              ]}
            />
          </DashboardColumn>
          <DashboardColumn lg={5}>
            <TabbedCard
              tabs={[
                {
                  component: <TopTokens period={period} />,
                  title: 'Top Tokens',
                },
                {
                  component: <TopRelayers period={period} />,
                  title: 'Top Relayers',
                },
              ]}
            />
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: <NetworkVolume period={period} />,
                  title: 'Protocol Usage',
                },
              ]}
            />
          </DashboardColumn>
          <DashboardColumn lg={5}>
            <TabbedCard
              tabs={[
                {
                  component: <ProtocolBreakdown period={period} />,
                  title: 'Protocol Breakdown',
                },
              ]}
            />
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: <NetworkVolume period={period} />,
                  title: 'Active Traders',
                },
              ]}
            />
          </DashboardColumn>
          <DashboardColumn lg={5}>
            <TabbedCard
              tabs={[
                {
                  component: <TopTokens period={period} />,
                  title: 'Traders Breakdown',
                },
              ]}
            />
          </DashboardColumn>
        </Row>
      </PageLayout>
    </>
  );
};

NetworkOverviewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default NetworkOverviewPage;