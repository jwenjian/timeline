const fs = require('fs');
const axios = require('axios');
const db = require('./src/assets/data.json');
const client = axios.default.create({
  baseURL: 'https://giki.app/api',
  headers: {
    'authorization': 'Basic ' + process.env['giki_token'],
    'content-type': 'application/json'
  }
})

const talks = [];

client.get('talks/query', {
  params: {
    'user_name': process.env['giki_username'],
    'page': -1 // page = -1 means all data
  }
}).then(resp => {

  // total count
  console.log(`total count = ${resp.data.count}`)
  if (db.length == resp.data.count) {
    console.log('no new data to sync');
    return;
  }

  // all data
  resp.data.data.forEach(t => {
    talks.push({
      id: t.id,
      timestamp: t.created_at,
      content: t.text,
      tags: t.tags,
      htmlContent: ''
    })
  })

  console.log(talks.length);
  fs.writeFileSync('src/assets/data.json', JSON.stringify(talks));

  // request by page
  // let times = Math.floor(resp.data.count / resp.data.data.length);
  // console.log(`request times = ${times}`);

  // let reqs = []

  // for (let i = 1; i <= times; i++) {
  //   reqs.push(client.get('talks/query', {
  //     params: {
  //       'user_name': 'wenjian',
  //       'page': i
  //     }
  //   }))
  // }

  // Promise.all(reqs).then(resps => {
  //   console.log(resps);
  //   resps.forEach(r => {
  //     r.data.data.forEach(t => {
  //       talks.push({
  //         id: t.id,
  //         timestamp: t.created_at,
  //         content: t.text,
  //         tags: t.tags,
  //         htmlContent: ''
  //       })
  //     })
  //   })


  // }).catch(errs => {
  //   console.error(errs)
  // })

}).catch(err => console.error(err)).finally(() => {
  // update lastupdated file
  fs.writeFileSync('.lastupdated', 'last updated at : ' + Date.now());
})
