module.exports = `
 
type Comment {

    id:ID!,
    content:String!,
    createdAt:String!
    writer:Writer
    
 }

input CommentInput {

    userId:String!,
    videoId:String!,
    content:String!
commentId:String

   }

`;
