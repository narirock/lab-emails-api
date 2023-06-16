const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const users = [
    {
        name: "User 1",
        ra: "1",
        permissions: ["zoom", "canvas"],
        emails: [
            { email: "user1@primary.com", type: "principal" },
            { email: "user1@secondary.com", type: "secondary" },
            { type: "secondary" }
        ]
    },
    {
        name: "User 2",
        ra: "2",
        permissions: ["zoom"],
        emails: [
            { email: "user2@primary.com", type: "principal" },
            { email: "user2@secondary.com", type: "secondary" }
        ]
    },
    {
        name: "User 3",
        ra: "3",
        permissions: [],
        emails: [
            { email: "user3@primary.com", type: "principal" },
            { email: "user3@secondary.com", type: "secondary" }
        ]
    },

]

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
});

app.get('/user', (req, res) => {
    try {

        if (req.body.ra) {
            let user = users.find((u) => u.ra == req.body.ra);

            if (!user) throw new Error('not found');

            if (req.body.email) {
                let checkEmail = user.emails.find((e) => e.email == req.body.email);

                if (checkEmail == undefined && checkEmail == null) {
                    res.statusCode = 200;
                    res.end(JSON.stringify({ exists: false, user }));
                    return null;
                }

                res.statusCode = 200;
                res.end(JSON.stringify({ exists: true, user }));
                return null;
            }





            res.statusCode = 200;
            res.end(JSON.stringify(user));
            return null;
        }




    } catch (err) {
        console.log(err.message);
    }

    res.statusCode = 404;
    res.end('{}');
});

app.get('/user/set_email', (req, res) => {
    try {
        if (req.query.ra != '' && req.query.email != '') {
            let index = users.findIndex((u) => u.ra = req.query.ra);
            users[index].emails.push({
                email: req.query.email,
                type: "secondary"
            })
            res.statusCode = 200;
            res.end(JSON.stringify(users[index]));
        } else {
            res.statusCode = 421;
            req.end("ra / email is required!")
        }
    } catch (error) {
        res.statusCode = 500;
        res.end(error.message);
    }
})

app.post('/user/login', (req, res) => {
    if (req.body.password == '12345678' && req.body.email == "campus.aluno@acad.espm.br") {
        res.statusCode = 200;
        let user = {
            'objectId': '75c91163-9695-4cfb-8de5-26bfc4c15cd7',
            'email_Addr': 'campus.aluno@acad.espm.br',
            'emplid': '100001',
            'oprid': 'ESPM_ALUNO_TEMPLATE',
            'tid': 'f748bd15-bcb6-447e-a38d-dd3ed9c4cc2f',
            'userPrincipalName': 'campus.aluno@acad.espm.br',
            'givenName': 'Nome',
            'surName': 'Sobrenome',
            'displayName': 'Nome',
            'issuerUserId': '16b40b53-bc73-44d5-ae9c-e1613427de09'
        };
        res.end(JSON.stringify(user));
    } else {
        res.statusCode = 400;
        res.end('User not found');
    }
})


app.listen(3001, () => {
    console.log('listening on port 3001');
});
