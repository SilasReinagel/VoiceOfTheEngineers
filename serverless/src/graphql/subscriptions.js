/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSuggestion = /* GraphQL */ `
  subscription OnCreateSuggestion(
    $id: ID
    $title: String
    $description: String
    $upvotes: [ID]!
  ) {
    onCreateSuggestion(
      id: $id
      title: $title
      description: $description
      upvotes: $upvotes
    ) {
      id
      title
      description
      upvotes
      createdOn
      updatedOn
      authorId
    }
  }
`;
export const onUpdateSuggestion = /* GraphQL */ `
  subscription OnUpdateSuggestion(
    $id: ID
    $title: String
    $description: String
    $upvotes: [ID]!
  ) {
    onUpdateSuggestion(
      id: $id
      title: $title
      description: $description
      upvotes: $upvotes
    ) {
      id
      title
      description
      upvotes
      createdOn
      updatedOn
      authorId
    }
  }
`;
