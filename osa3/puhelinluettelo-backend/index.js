const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

morgan.token('postData', req => {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  else{
    return null
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
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
    "number": "050-0505050",
    "id": 4
  }
]

const genId = () => {

  let id = 0

  do{
    id = Math.floor(Math.random() * persons.length * 5 + 1)
  }while (persons.map(person => person.id).includes(id))

  return id
}

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has ${persons.length} contacts</p><p>${new Date()}</p>`)
  res.end()
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    res.json(person)
  }
  else{
    res.status(404).end()
  }
})


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
  const person = Object.assign({}, req.body)

  if(!person.name){
    return res.status(400).json({
      error: 'name missing'
    })
  }
  else if(!person.number){
    return res.status(400).json({
      error: 'number missing'
    })
  }
  else if(persons.map(item => item.name).includes(person.name)){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  else{
    person.id = genId()
    persons = persons.concat(person)
    res.json(person)
  }


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
