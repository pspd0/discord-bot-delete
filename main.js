(async () => {
    const input = require('input');
    const axios = require('axios').default;
    const mail = await input.text("Enter Your Email: ");
    const password = await input.password("Enter Your Password: ");
    let {data: { token },} = await axios.post("https://discord.com/api/v9/auth/login",
        {
          login: mail,
          password: password,
          undelete: false,
          captcha_key: null,
          login_source: null,
          gift_code_sku_id: null,
        },
        {
        headers: {
            "content-type": "application/json",
        },
    });
    var ids = [];

    await axios.get('https://discord.com/api/v9/applications?with_team_applications=true', {
        headers: {
            authorization: token,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36'
        },
    }).then((res) => {
        console.log("Find Bot ids...\n");
        for(let i = 0; i<res.data.length; i++) {
            ids.push({id: res.data[i].id, name: res.data[i].name});
        };
        console.log("Finished Find Bot id.\n");
    });

    for(let i = 0; i<ids.length; i++) {
        await axios.post(`https://discord.com/api/v9/applications/${ids[i].id}/delete`, {}, {
            headers: {
                authorization: token,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36',
                'accept-encoding': 'gzip, deflate, br'
            },
        }).then((res) => {
            console.log(`${ids[i].name} is Deleted\n`);
        }).catch((e) => {
            console.error(String(e))
        });
    };

    console.log("Finished");
})();