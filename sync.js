const fs = require('fs');
const axios = require('axios');
const client = axios.default.create({
  baseURL: 'https://api.giki.app/',
  headers: {
    'authorization': 'Basic ' + process.env['giki_token'],
    'content-type': 'application/json'
  }
})

const talks = [];
const event_per_page = 20;

client.get('talks', {
  params: {
    'name': process.env['giki_username'],
    'page': -1 // page = -1 means all data
  }
}).then(resp => {

  // total count
  console.log(`total count = ${resp.data.count}`)

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
  let times = Math.floor(resp.data.count / event_per_page);
  for (let index = 0; index <= times; index++) {
    let page_data = talks.slice(index * event_per_page, index * event_per_page + event_per_page)
    fs.writeFileSync('public/data/data-' + index + ".json", JSON.stringify(page_data));
  }
  // fs.writeFileSync('src/assets/data.json', JSON.stringify(talks));

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
