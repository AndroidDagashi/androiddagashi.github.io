export interface GHPageInfo {
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GHAuthor {
  login: string;
  url: string;
  avatarUrl: string;
}

export interface GHComment {
  body: string;
  publishedAt: string;
  author: GHAuthor;
}

export interface GHComments {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: GHComment[];
}

export interface GHLabel {
  name: string;
  description: string | null;
  color: string;
}

export interface GHLabels {
  nodes: GHLabel[];
}

export interface GHIssue {
  url: string;
  title: string;
  body: string;
  labels: GHLabels;
  comments: GHComments;
}

export interface GHIssues {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: GHIssue[];
}

export interface GHMilestone {
  id: string;
  number: number;
  url: string;
  title: string;
  closedAt: string;
  description: string | null;
  issues: GHIssues;
}

export interface GHMilestones {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: GHMilestone[];
}

export interface GHRepository {
  name: string;
  description: string | null;
  milestones: GHMilestones;
}


export interface GHDigestIssue {
  title: string;
}

export interface GHDigestMilestone {
  id: string;
  number: string;
  url: string;
  path: string; // androiddagashiサイトのパス。 buildscripts/githubapi-fetcherで生成
  title: string;
  description: string;
  closedAt: string;
  issues: {
    totalCount: number;
    nodes: GHDigestIssue[];
  };
}

export interface GHDigest {
  name: string;
  url: string;
  milestones: {
    totalCount: number;
    nodes: GHDigestMilestone[];
    pageInfo: GHPageInfo;
  };
}
