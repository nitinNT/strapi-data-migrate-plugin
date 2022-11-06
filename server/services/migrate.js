"use strict";

const { isArray } = require("lodash");
const axios = require("axios");
module.exports = ({ strapi }) => ({
  async migrate(ctx) {
    const requestBody = ctx.request.body;
    const loginApi = requestBody.url + "/admin/login";

    try {
      const { data } = await axios.post(loginApi, {
        email: requestBody.email,
        password: requestBody.password,
      });

      requestBody.contentBody = this.removeIdsFromJSON(requestBody.contentBody);
      await this.saveData(
        requestBody.url,
        data.data.token,
        requestBody.collectionName,
        requestBody.contentBody
      );
      return {
        result: "success",
        data: {
          token: data.data.token,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        result: "fail",
        errorMessage: err.message,
      };
    }
  },

  async saveData(url, bearerToken, collectionName, contentBody) {
    const requestBody = contentBody;

    const response = await axios.post(
      `${url}/content-manager/collection-types/${collectionName}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return response.data.id;
  },
  removeIdsFromJSON(obj) {
    const isArrayF = isArray(obj);
    for (const k of Object.keys(obj)) {
      if (k === "id" || obj[k] === null) delete obj[k];

      if (typeof obj[k] === "object") {
        if (obj[k]["publishedAt"]) delete obj[k];
        else this.removeIdsFromJSON(obj[k]);
      } else if (isArrayF && obj.length === k) {
        this.removeIdsFromJSON(obj);
      }
    }
    return obj;
  },

  //   isRelation(contentBody) {
  //     if (contentBody["createdAt"] && contentBody["updatedAt"]) return true;
  //     else return false;
  //   },
  // async postDataToRelationApi(contentBody, url, currentBearerToken, bearerToken, relationName) {
  //   return await this.saveData(url, bearerToken, relationName, contentBody);
  // },

  // async traverse(contentBody, url, currentBearerToken, bearerToken) {
  //   const keys = Object.keys(contentBody);
  //   console.log(contentBody);

  //   const map = {
  //     modal: 'modal',
  //     cards: 'card',
  //     banners: 'banner',
  //     offerBanner: 'banner',
  //     serviceCards: 'card',
  //     card: 'card',
  //     content: 'content',
  //   };
  //   for (let i = 0; i < keys.length; i++) {
  //     const key = keys[i];

  //     if (isObject(contentBody[key])) {
  //       // check for relation
  //       if (this.isRelation(contentBody[key])) {
  //         console.log(map[key], key);
  //         contentBody[key] = await this.traverse(contentBody[key], url, currentBearerToken, bearerToken);
  //         const id = await this.postDataToRelationApi(contentBody, url, currentBearerToken, bearerToken, map[key]);
  //         contentBody[key] = id;
  //       } else {
  //         if (contentBody[key]['id']) delete contentBody[key]['id'];
  //       }
  //     }
  //     if (isArray(contentBody[key])) {
  //       for (let j = 0; j < contentBody[key].length; j++) {
  //         contentBody[key][j] = await this.traverse(contentBody[key][j], url, bearerToken);
  //       }
  //     }
  //   }
  //   return contentBody;
  // },
});
