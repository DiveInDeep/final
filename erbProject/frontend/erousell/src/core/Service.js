import axios from 'axios';
import _ from 'lodash';
import * as Main from './Main';

async function call(_method, _endPoint, _postObj = {}) {
  try {
    let baseURL = "http://127.0.0.1:8081";
    let method = _.toString(_method).toLowerCase();
    let postObj = _.clone(_postObj) || {};
    let endpoint = _.toString(_endPoint);
    let params;

    let headers = {
      authorization: Main.getAccessToken(),
      userId: Main.getUserId(),
    }

    if (method === 'get') {
      params = postObj;
      postObj = null;
    }

    let resp = await axios({
      method,
      baseURL,
      url: endpoint,
      params,
      data: postObj,
      headers
    })

    let respData = resp.data;
    return respData;

  } catch(err) {
    console.error(err);
  }
}


async function upload(_method, _endPoint, _postObj = {}) {
  try {
    let baseURL = process.env.REACT_APP_URL;
    let method = _.toString(_method).toLowerCase();
    let postObj = _.clone(_postObj) || {};
    let endpoint = _.toString(_endPoint);
    let params;

    let headers = {
      authorization: Main.getAccessToken(),
      userId: Main.getUserId(),
      'Content-Type':'multipart/form-data'
    }

    if (method === 'get') {
      params = postObj;
      postObj = null;
    }

    let resp = await axios({
      method,
      baseURL,
      url: endpoint,
      params,
      data: postObj,
      headers
    })

    let respData = resp.data;
    return respData;

  } catch(err) {
    console.error(err);
  }
}

export {call, upload};