import React, { useEffect } from 'react';
import axios from 'axios';

export default function LandingPage() {
  useEffect(() => {
    axios
      .get('/api/hello')
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log('error' + error);
      })
      .then(function () {
        // 항상 실행되는 영역
      });
  }, []);

  return <div>LandingPage</div>;
}
