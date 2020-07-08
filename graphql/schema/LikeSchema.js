module.exports = `
 
type Like {

    id:ID!,
    userId:ID!
   
}


input LikeInput {

    userId:String!,
    videoId:String,
    commentId:String

   }

`;
