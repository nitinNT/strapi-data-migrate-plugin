import React, { useState } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { Button } from '@strapi/design-system';
import MigratePreview from '../MigrateModal';

const MigrateButton = () => {
  const [isMigrateModalVisible, setIsMigrateModalVisible] = useState(false);

  const { modifiedData, slug } = useCMEditViewDataManager();

  return (
    <>
      <Button variant="secondary" onClick={() => setIsMigrateModalVisible((prev) => !prev)}>
        Migrate this Data
      </Button>

      {isMigrateModalVisible && (
        <MigratePreview modifiedData={modifiedData} collectionName={slug} setIsVisible={setIsMigrateModalVisible} />
      )}
    </>
  );
};

export default MigrateButton;
