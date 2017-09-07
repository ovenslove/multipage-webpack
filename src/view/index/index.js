import './index.scss';

import { test } from 'lib/utils';
import axios from 'axios';

axios.get('/api/4/news/latest')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
console.log(test('aaa'));
console.log("啊啊啊啊");