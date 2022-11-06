import React from 'react';

import { Typography } from '@strapi/design-system/Typography';
import { Loader } from '@strapi/design-system/Loader';
import { Dialog, DialogBody } from '@strapi/design-system/Dialog';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import Information from '@strapi/icons/Information';

const MigrateLoaderModal = ({ id, errorDetails, setIsVisible, loaderVisible }) => {
  return (
    <>
      <Dialog isOpen={setIsVisible}>
        <DialogBody icon={loaderVisible && <Loader />}>
          <Stack spacing={2}>
            {!errorDetails && (
              <>
                <Flex justifyContent="center">
                  <Typography>Migrating the data for {id} </Typography>
                </Flex>
                <Flex justifyContent="center" style={{ textAlign: 'center' }}>
                  <Typography>
                    <Information /> Migration Process takes 1-2 min only
                  </Typography>
                </Flex>
              </>
            )}
            {errorDetails && (
              <Flex justifyContent="center" style={{ textAlign: 'center' }}>
                <Typography>
                  Oops some error occurred please send below error details to nitin tejuja
                  {JSON.stringify(errorDetails)}
                </Typography>
              </Flex>
            )}
          </Stack>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default MigrateLoaderModal;
