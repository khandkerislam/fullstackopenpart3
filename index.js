const morgan = require('morgan');
const express = require('express');
const path = require('path');

const cors = require('cors')

const app = express()
app.use(cors());

morgan.token("body", req => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :body - status :status length :res[content-length] - :response-time ms"
  )
);

app.use(express.static(path.resolve(__dirname,"../build")));


const people = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

const generatedId = () => {
    const maxId = people.length > 0
        ? Math.floor(Math.random() * Math.floor(200))
        : 0
    return maxId
}

app.get('/', (req, res) => {
    res.send(
        `<p>Hello World</p>`
    )
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${people.length} people</p>`
    )
})

app.get('/api/persons', (req,res)=>{
    res.json(people)
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    const number = people.find(number => number.id === id)
    number ? response.json(number) : response.status(404).end()
})

app.delete('/api/people/:id',(request,response) => {
    const id = Number(request.params.id)
    people = people.filter(number => number.id !== id)

    response.status(204).end()
})

app.post('/api/people/:id',(request,response) => {

    const body = request.body

    if(people.includes(person => person.name === body.name)){
      response.status(400).json({ error: 'duplicate content'})
    }

    if (!body.number || !body.name)
    {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    const person = {
      name: body.name,
      number: body.number || false,
      id: generateId()
    }

    people = people.concat(person)

    response.json(people)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
