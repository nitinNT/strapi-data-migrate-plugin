import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
} from "@strapi/design-system/ModalLayout";
import { request } from "@strapi/helper-plugin";

import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { TextInput } from "@strapi/design-system/TextInput";
import { Button } from "@strapi/design-system/Button";
import MigrateLoaderModal from "../MigrateLoaderModal";

const MigratePreview = ({ modifiedData, collectionName, setIsVisible }) => {
  const [loadModal, setLoadModal] = useState(false);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorDetails, setErrorDetails] = useState("");

  const [showLoader, setShowLoader] = useState(false);

  const migrateData = async () => {
    setLoadModal(true);
    try {
      setShowLoader(true);

      await request("/strapi-plugin-data-migrate/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: {
          url,
          email,
          password,
          collectionName,
          contentBody: modifiedData,
        },
      });

      setLoadModal(false);
    } catch (err) {
      setShowLoader(false);
      setErrorDetails(err);
    }
  };
  return (
    <ModalLayout onClose={() => setIsVisible((prev) => !prev)}>
      <ModalHeader>Data Migrate Plugin</ModalHeader>
      <ModalBody>
        <Box paddingTop={2} paddingBottom={4} paddingLeft={4}>
          <Typography variant="beta">
            Destination Strapi Envrionment Details
          </Typography>
          <Box paddingTop={4}>
            <Divider />
          </Box>
        </Box>
        <TextInput
          placeholder="URL "
          label="Environment URL"
          name="Strapi Environment URL"
          hint="https://cms.editage.com"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <Box>
          <TextInput
            placeholder="nitin.tejuja12@gmail.com"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            placeholder="password"
            label="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button onClick={migrateData}>Migrate</Button>

          {loadModal && (
            <MigrateLoaderModal
              id={modifiedData.id}
              errorDetails={errorDetails}
              setIsVisible={loadModal}
              loaderVisible={showLoader}
            />
          )}
        </Box>
      </ModalBody>
    </ModalLayout>
  );
};

export default MigratePreview;
