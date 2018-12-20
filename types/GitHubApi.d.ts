export type GHPageInfo = {
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type GHAuthor = {
  login: string;
  url: string;
  avatarUrl: string;
};

export type GHComment = {
  body: string;
  publishedAt: string;
  author: GHAuthor;
};

export type GHComments = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHComment>;
};

export type GHLabel = {
  name: string;
  description: string | null;
  color: string;
};

export type GHLabels = {
  nodes: Array<GHLabel>;
};

export type GHIssue = {
  url: string;
  title: string;
  body: string;
  labels: GHLabels;
  comments: GHComments;
};

export type GHIssues = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHIssue>;
};

export type GHMilestone = {
  id: string;
  number: number;
  url: string;
  title: string;
  closedAt: string;
  description: string | null;
  issues: GHIssues;
};

export type GHMilestones = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHMilestone>;
};

export type GHRepository = {
  name: string;
  description: string | null;
  milestones: GHMilestones;
};


export type GHDigestIssue = {
  title: string;
};

export type GHDigestMilestone = {
  id: string;
  number: string;
  url: string;
  path: string; // androiddagashiサイトのパス。 buildscripts/githubapi-fetcherで生成
  title: string;
  description: string;
  closedAt: string;
  issues: {
    totalCount: number;
    nodes: Array<GHDigestIssue>;
  };
};

export type GHDigest = {
  name: string;
  url: string;
  milestones: {
    totalCount: number;
    nodes: Array<GHDigestMilestone>;
    pageInfo: GHPageInfo;
  };
};
