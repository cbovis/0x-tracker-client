import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { media } from '../styles/util';
import subscribeImage from '../assets/images/subscribe.png';

const Wrapper = styled.div`
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  padding: 0 2rem;
`;

const Inner = styled.div`
  align-items: center;
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
  border-radius: 1px;
  justify-content: center;
  padding: 2rem 0 3rem 0;

  ${media.greaterThan('sm')`
    display: flex;
    padding: 3rem 0 4rem 0;
  `}
`;

const Image = styled.img`
  display: none;

  ${media.greaterThan('sm')`
    display: block;
    margin-right: 3rem;
  `}
`;

const Heading = styled.h2`
  font-size: 24px;
  margin: 0 0 0.25rem 0;
  line-height: 1;

  ${media.greaterThan('sm')`
    font-size: 30px;
  `}
`;

const Lead = styled.p`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  font-size: 18px;
  max-width: 400px;
  margin: 0;

  ${media.greaterThan('sm')`
    font-size: 18px;
  `}
`;

const EmailInput = styled.input`
  color: currentColor;
  border: none;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
  margin: 0 15px;
  min-width: 0;

  &::placeholder {
    color: ${COLORS.NEUTRAL.MYSTIC_800};
  }
`;

const FieldWrapper = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubscribeButton = styled.button`
  border: none;
  padding: 8px 15px;
  margin: 4px 4px 4px 0;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: ${COLORS.ACCENT.ANZAC_1000};
  background-color: ${COLORS.ACCENT.ANZAC_500};

  &:hover {
    background-color: ${COLORS.ACCENT.ANZAC_400};
  }

  &:active {
    background-color: ${COLORS.ACCENT.ANZAC_600};
  }
`;

const HoneyPot = styled.div`
  position: absolute;
  left: -5000px;
`;

const Form = styled.form`
  margin-top: 30px;
`;

const Body = styled.div`
  padding: 0 30px;

  ${media.greaterThan('sm')`
    padding: 0;
  `}
`;

const SubscribePanel = () => (
  <Wrapper>
    <Inner>
      <Image alt="" height="180" src={subscribeImage} width="235" />
      <Body>
        <Heading>Subscribe to our newsletter</Heading>
        <Lead>Monthly 0x ecosystem news and analysis.</Lead>
        <Form
          action="https://facebook.us2.list-manage.com/subscribe/post?u=1c752e167467d75829bc12aef&amp;id=33b834d61c"
          method="post"
          onSubmit={() => {
            if (window.fathom) {
              window.fathom.trackGoal('YV6F7FG6', 0);
            }
          }}
          target="_blank"
        >
          <HoneyPot aria-hidden="true">
            <input
              name="b_1c752e167467d75829bc12aef_33b834d61c"
              tabIndex="-1"
              type="text"
            />
          </HoneyPot>
          <FieldWrapper>
            <EmailInput
              name="EMAIL"
              placeholder="Enter your email"
              required
              type="email"
            />
            <SubscribeButton name="subscribe" type="submit">
              Subscribe
            </SubscribeButton>
          </FieldWrapper>
        </Form>
      </Body>
    </Inner>
  </Wrapper>
);

export default SubscribePanel;
