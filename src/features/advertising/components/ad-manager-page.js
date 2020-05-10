import { useWallet, UseWalletProvider } from 'use-wallet';
import React from 'react';

import AdSlotManager from './ad-slot-manager';
import LoadingAdSlots from './loading-ad-slots';
import MetamaskRequired from './metamask-required';
import NoAdSlots from './no-ad-slots';
import UseAdvertisingSlots from '../hooks/use-advertising-slots';
import WalletDisconnected from './wallet-disconnected';

const AdManagerPage = () => {
  const wallet = useWallet();
  const [adSlots, loadingAdSlots] = UseAdvertisingSlots(wallet);

  React.useEffect(() => {
    wallet.activate();
  }, []);

  if (window.ethereum === undefined) {
    return <MetamaskRequired />;
  }

  if (!wallet.connected) {
    return <WalletDisconnected onConnect={() => wallet.activate()} />;
  }

  if (loadingAdSlots) {
    return <LoadingAdSlots />;
  }

  if (adSlots.length === 0) {
    return <NoAdSlots />;
  }

  return <AdSlotManager adSlots={adSlots} />;
};

// eslint-disable-next-line import/no-anonymous-default-export, react/no-multi-comp, react/display-name
export default () => (
  <UseWalletProvider>
    <AdManagerPage />
  </UseWalletProvider>
);
