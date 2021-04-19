// import { ApolloServer } from "apollo-server";
import { ApolloServer, gql } from 'apollo-server';
import { DateResolver, EmailAddressResolver } from "graphql-scalars";

const typeDefs = gql`

  scalar Date
  scalar EmailAddress

  type LocalizedField {
    en: String
    fr: String
  }

  enum Locale {
    EN
    FR
  }

  type User {
    id: ID
    email: EmailAddress!
    firstName: String!
    lastName: String!
  }

  type Job {
    id: ID
    title: LocalizedField
    description: LocalizedField
    minSalary: Int
    maxSalary: Int
    closeDate: Date
    startDate: Date
  }

  type Application {
    id: ID
    job: Job
    user: User
    interest: String
    preferredLang: Locale
  }

  type Query {
    users: [User]
    jobs: [Job]
    applications: [Application]
  }
`;

const users = [
  {
    id: 1,
    email: "test@applicant.com",
    firstName: "Tristan",
    lastName: "Applicant",
  },
  {
    id: 2,
    email: "bob@applicant.com",
    firstName: "Bob",
    lastName: "ApplicantTwo",
  },
];

const jobs = [
  {
    id: 1, title: { en: "Junior Dev", fr: "Dev petit" }, description: { en: "You'll enjoy working on this awesome project!", fr: "Vous aimerez travaller sur ce projet genial!" },
    minSalary: 60000, maxSalary: 70000,
    closeDate: "2021-04-30",
    startDate: "2021-06-01",
  }
];

const applications = [
  {
    id: 1,
    jobId: 1,
    userId: 2,
    interest: "I love awesome jobs, who doesn't",
    preferredLang: "en",
  }
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Date: DateResolver,
  EmailAddress: EmailAddressResolver,
  Locale: {
    EN: "en",
    FR: "fr",
  },
  Query: {
    users: () => users,
    jobs: () => jobs,
    applications: () => applications.map(appl => ({
      ...appl,
      job: jobs.find(job => job.id === appl.jobId),
      user: users.find(user => user.id === appl.userId)
    })),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});