import React, { useEffect, useState } from 'react';

import { IntegrationCard } from '@/components/IntegrationCard';
import Layout from '@/components/Layout';
// import { PanelHeader } from '@/components/PanelHeader';
import { Separator } from '@/components/ui/separator';
import LocalProvidersMenu from '@/components/LocalProvidersMenu';

import styles from '@/styles/Index.module.scss';
import { Provider } from '../../types';

export default function LLMs() {
  const [vectorProviders, setVectorProvider] = useState<Provider[]>([]);

  useEffect(() => {
    fetch('/api/integrations')
      .then((res) => res.json())
      .then((json) => setVectorProvider(json));
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <LocalProvidersMenu />
        <Separator />

        <div className={`${styles.gridView} ${styles.column}`}>
          {Array.isArray(vectorProviders)
            ? vectorProviders
                ?.filter((x) => {
                  return x?.type == 'llm_provider';
                })
                .map((provider) => (
                  <IntegrationCard provider={provider} key={provider.id} />
                ))
            : null}
        </div>
        <div className={styles.datasetHeaderRightAlign}>
          {/* <PanelHeader text="Add LLM Provider" /> */}
        </div>
      </main>
    </Layout>
  );
}
