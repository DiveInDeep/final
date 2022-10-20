import React, {useEffect} from 'react';
import * as service from '../core/Service';

const Test = () => {
  async function test () {
    try {
      let resp = await service.call('get', '/qq');
      console.log(resp);
    }catch(err) {
      console.error(err);
    }
  }
  useEffect(() => {
    test();
  }, [])
  return (
    <>
    hi
    </>
  );
};

export default Test;