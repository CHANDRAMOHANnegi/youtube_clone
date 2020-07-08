module.exports = `

input File {
    filename: String!
    mimetype: String!
}

type Photo {

    url: String!,
    filename:String!,
    format:String!,

}

type Writer {
id:ID,
    firstname:String!,
    lastname:String!,
    image:String,

}

type Video {

    id:ID!,
    title:String!,
    description:String!,
    filePath: String!,
    category: String!
    views:Int,
    privacy:Int,
    duration:String,
    thumbnail: String!,
    createdAt: String!,
    updatedAt: String!,
    userId:ID!,
    writer:Writer
    Comments:[Comment!]

}

`;
