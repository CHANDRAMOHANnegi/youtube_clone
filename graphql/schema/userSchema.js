

module.exports = `

type User {
    id:ID!,
    email:String!,
    firstname:String!,
    lastname:String!,
    createdAt:String!,
 }

input UserInput{
    email:String!,
    password:String!,
    firstname:String!,
    lastname:String,
 }

type AuthData {
    userId: ID!,
    token: String!,
    tokenExp: Int!,
    firstname:String!,
    lastname:String,
    email:String!,
    role:Int!,
    image:String
}

`;
