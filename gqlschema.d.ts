/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getMilestonesQueryVariables {
  repoOwner: string,
  repoName: string,
  fetchMilestonesPerPage?: number | null,
  fetchIssuesPerMilestone?: number | null,
  fetchCommentsPerIssue?: number | null,
  endMilestoneCursor?: string | null,
};

export interface getMilestonesQuery {
  // Lookup a given repository by the owner and repository name.
  repository:  {
    __typename: "Repository",
    // The name of the repository.
    name: string,
    // The description of the repository.
    description: string | null,
    // A list of milestones associated with the repository.
    milestones:  {
      __typename: "MilestoneConnection",
      // Identifies the total count of items in the connection.
      totalCount: number,
      // Information to aid in pagination.
      pageInfo:  {
        __typename: "PageInfo",
        // When paginating backwards, the cursor to continue.
        startCursor: string | null,
        // When paginating forwards, the cursor to continue.
        endCursor: string | null,
        // When paginating backwards, are there more items?
        hasPreviousPage: boolean,
        // When paginating forwards, are there more items?
        hasNextPage: boolean,
      },
      // A list of nodes.
      nodes:  Array< {
        __typename: "Milestone",
        id: string,
        // The HTTP URL for this milestone
        url: string,
        // Identifies the title of the milestone.
        title: string,
        // Identifies the description of the milestone.
        description: string | null,
        // A list of issues associated with the milestone.
        issues:  {
          __typename: "IssueConnection",
          // Identifies the total count of items in the connection.
          totalCount: number,
          // Information to aid in pagination.
          pageInfo:  {
            __typename: "PageInfo",
            // When paginating backwards, the cursor to continue.
            startCursor: string | null,
            // When paginating forwards, the cursor to continue.
            endCursor: string | null,
            // When paginating backwards, are there more items?
            hasPreviousPage: boolean,
            // When paginating forwards, are there more items?
            hasNextPage: boolean,
          },
          // A list of nodes.
          nodes:  Array< {
            __typename: "Issue",
            // The HTTP URL for this issue
            url: string,
            // Identifies the issue title.
            title: string,
            // Identifies the body of the issue.
            body: string,
            // A list of labels associated with the object.
            labels:  {
              __typename: "LabelConnection",
              // A list of nodes.
              nodes:  Array< {
                __typename: "Label",
                // Identifies the label name.
                name: string,
                // A brief description of this label.
                description: string | null,
              } | null > | null,
            } | null,
            // A list of comments associated with the Issue.
            comments:  {
              __typename: "IssueCommentConnection",
              // Identifies the total count of items in the connection.
              totalCount: number,
              // Information to aid in pagination.
              pageInfo:  {
                __typename: "PageInfo",
                // When paginating backwards, the cursor to continue.
                startCursor: string | null,
                // When paginating forwards, the cursor to continue.
                endCursor: string | null,
                // When paginating backwards, are there more items?
                hasPreviousPage: boolean,
                // When paginating forwards, are there more items?
                hasNextPage: boolean,
              },
              // A list of nodes.
              nodes:  Array< {
                __typename: "IssueComment",
                // Identifies the comment body.
                body: string,
                // The actor who authored the comment.
                author: ( {
                    __typename: "Organization",
                    // The username of the actor.
                    login: string,
                    // The HTTP URL for this actor.
                    url: string,
                    // A URL pointing to the actor's public avatar.
                    avatarUrl: string,
                  } | {
                    __typename: "User",
                    // The username of the actor.
                    login: string,
                    // The HTTP URL for this actor.
                    url: string,
                    // A URL pointing to the actor's public avatar.
                    avatarUrl: string,
                  } | {
                    __typename: "Bot",
                    // The username of the actor.
                    login: string,
                    // The HTTP URL for this actor.
                    url: string,
                    // A URL pointing to the actor's public avatar.
                    avatarUrl: string,
                  }
                ) | null,
              } | null > | null,
            },
          } | null > | null,
        },
      } | null > | null,
    } | null,
  } | null,
};
