import * as core from '@actions/core'
import {getPrNumber, getPrBranch, isNewPR} from './github'
import {generateEnvId, fetchEnv, createEnv} from './mobify'

async function run(): Promise<void> {
  try {
    core.info('-- Mobify Preview --')

    const prNumber = getPrNumber()
    const branch = getPrBranch()
    let envId
    if (!prNumber || !branch) {
      core.error('Could not get pull request information from context, exiting')
      return
    }
    core.info(`PR: ${prNumber}`)
    core.info(`Branch: ${branch}`)

    if (!isNewPR()) {
      core.info('This is a new PR')

      envId = generateEnvId(prNumber, branch)
      const env = fetchEnv(envId)
      if (!env) {
        core.info('Creating a new environment for the PR')
        createEnv(prNumber, branch)
      } else {
        core.info('Environment is already created')
        core.info(JSON.stringify(env))
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

/*
const contextPayloadSample = {
  after: '5228d3eff0d3a0de47463ee6b59104aaf9532af0',
  action: 'synchronize',
  before: '6a516f573e83acf6953f0ef93c9bf4bb74aa8917',
  number: 3,
  pull_request: {
    _links: {
      comments: {
        href:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues/3/comments'
      },
      commits: {
        href:
          'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3/commits'
      },
      html: {
        href: 'https://github.com/kevinxh/mobify-preview/pull/3'
      },
      issue: {
        href: 'https://api.github.com/repos/kevinxh/mobify-preview/issues/3'
      },
      review_comment: {
        href:
          'https://api.github.com/repos/kevinxh/mobify-preview/pulls/comments{/number}'
      },
      review_comments: {
        href:
          'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3/comments'
      },
      self: {
        href: 'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3'
      },
      statuses: {
        href:
          'https://api.github.com/repos/kevinxh/mobify-preview/statuses/5228d3eff0d3a0de47463ee6b59104aaf9532af0'
      }
    },
    active_lock_reason: null,
    additions: 5857,
    assignee: null,
    assignees: [],
    author_association: 'OWNER',
    base: {
      label: 'kevinxh:main',
      ref: 'main',
      repo: {
        allow_merge_commit: true,
        allow_rebase_merge: true,
        allow_squash_merge: true,
        archive_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/assignees{/user}',
        blobs_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/branches{/branch}',
        clone_url: 'https://github.com/kevinxh/mobify-preview.git',
        collaborators_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/comments{/number}',
        commits_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/contributors',
        created_at: '2020-08-21T17:04:57Z',
        default_branch: 'develop',
        delete_branch_on_merge: false,
        deployments_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/deployments',
        description: null,
        disabled: false,
        downloads_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/downloads',
        events_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/forks',
        full_name: 'kevinxh/mobify-preview',
        git_commits_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/commits{/sha}',
        git_refs_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/refs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/tags{/sha}',
        git_url: 'git://github.com/kevinxh/mobify-preview.git',
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: null,
        hooks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/hooks',
        html_url: 'https://github.com/kevinxh/mobify-preview',
        id: 289322695,
        issue_comment_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues/events{/number}',
        issues_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues{/number}',
        keys_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/keys{/key_id}',
        labels_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/labels{/name}',
        language: 'TypeScript',
        languages_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/languages',
        license: {
          key: 'mit',
          name: 'MIT License',
          node_id: 'MDc6TGljZW5zZTEz',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit'
        },
        merges_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/merges',
        milestones_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/milestones{/number}',
        mirror_url: null,
        name: 'mobify-preview',
        node_id: 'MDEwOlJlcG9zaXRvcnkyODkzMjI2OTU=',
        notifications_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/notifications{?since,all,participating}',
        open_issues: 3,
        open_issues_count: 3,
        owner: {
          avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
          events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
          followers_url: 'https://api.github.com/users/kevinxh/followers',
          following_url:
            'https://api.github.com/users/kevinxh/following{/other_user}',
          gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/kevinxh',
          id: 10948652,
          login: 'kevinxh',
          node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
          organizations_url: 'https://api.github.com/users/kevinxh/orgs',
          received_events_url:
            'https://api.github.com/users/kevinxh/received_events',
          repos_url: 'https://api.github.com/users/kevinxh/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/kevinxh/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/kevinxh'
        },
        private: false,
        pulls_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/pulls{/number}',
        pushed_at: '2020-08-21T21:59:41Z',
        releases_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/releases{/id}',
        size: 347,
        ssh_url: 'git@github.com:kevinxh/mobify-preview.git',
        stargazers_count: 0,
        stargazers_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/stargazers',
        statuses_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/statuses/{sha}',
        subscribers_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/subscribers',
        subscription_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/subscription',
        svn_url: 'https://github.com/kevinxh/mobify-preview',
        tags_url: 'https://api.github.com/repos/kevinxh/mobify-preview/tags',
        teams_url: 'https://api.github.com/repos/kevinxh/mobify-preview/teams',
        trees_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/trees{/sha}',
        updated_at: '2020-08-21T21:55:16Z',
        url: 'https://api.github.com/repos/kevinxh/mobify-preview',
        watchers: 0,
        watchers_count: 0
      },
      sha: '51b6df6c54044c602d366f4a1f220a3a2d74c9da',
      user: {
        avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
        events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
        followers_url: 'https://api.github.com/users/kevinxh/followers',
        following_url:
          'https://api.github.com/users/kevinxh/following{/other_user}',
        gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/kevinxh',
        id: 10948652,
        login: 'kevinxh',
        node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
        organizations_url: 'https://api.github.com/users/kevinxh/orgs',
        received_events_url:
          'https://api.github.com/users/kevinxh/received_events',
        repos_url: 'https://api.github.com/users/kevinxh/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/kevinxh/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/kevinxh'
      }
    },
    body: '',
    changed_files: 8,
    closed_at: null,
    comments: 0,
    comments_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/issues/3/comments',
    commits: 3,
    commits_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3/commits',
    created_at: '2020-08-21T21:56:40Z',
    deletions: 135,
    diff_url: 'https://github.com/kevinxh/mobify-preview/pull/3.diff',
    draft: false,
    head: {
      label: 'kevinxh:develop',
      ref: 'develop',
      repo: {
        allow_merge_commit: true,
        allow_rebase_merge: true,
        allow_squash_merge: true,
        archive_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/assignees{/user}',
        blobs_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/branches{/branch}',
        clone_url: 'https://github.com/kevinxh/mobify-preview.git',
        collaborators_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/comments{/number}',
        commits_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/contributors',
        created_at: '2020-08-21T17:04:57Z',
        default_branch: 'develop',
        delete_branch_on_merge: false,
        deployments_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/deployments',
        description: null,
        disabled: false,
        downloads_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/downloads',
        events_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/forks',
        full_name: 'kevinxh/mobify-preview',
        git_commits_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/commits{/sha}',
        git_refs_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/refs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/tags{/sha}',
        git_url: 'git://github.com/kevinxh/mobify-preview.git',
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: null,
        hooks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/hooks',
        html_url: 'https://github.com/kevinxh/mobify-preview',
        id: 289322695,
        issue_comment_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues/events{/number}',
        issues_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/issues{/number}',
        keys_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/keys{/key_id}',
        labels_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/labels{/name}',
        language: 'TypeScript',
        languages_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/languages',
        license: {
          key: 'mit',
          name: 'MIT License',
          node_id: 'MDc6TGljZW5zZTEz',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit'
        },
        merges_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/merges',
        milestones_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/milestones{/number}',
        mirror_url: null,
        name: 'mobify-preview',
        node_id: 'MDEwOlJlcG9zaXRvcnkyODkzMjI2OTU=',
        notifications_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/notifications{?since,all,participating}',
        open_issues: 3,
        open_issues_count: 3,
        owner: {
          avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
          events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
          followers_url: 'https://api.github.com/users/kevinxh/followers',
          following_url:
            'https://api.github.com/users/kevinxh/following{/other_user}',
          gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/kevinxh',
          id: 10948652,
          login: 'kevinxh',
          node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
          organizations_url: 'https://api.github.com/users/kevinxh/orgs',
          received_events_url:
            'https://api.github.com/users/kevinxh/received_events',
          repos_url: 'https://api.github.com/users/kevinxh/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/kevinxh/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/kevinxh'
        },
        private: false,
        pulls_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/pulls{/number}',
        pushed_at: '2020-08-21T21:59:41Z',
        releases_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/releases{/id}',
        size: 347,
        ssh_url: 'git@github.com:kevinxh/mobify-preview.git',
        stargazers_count: 0,
        stargazers_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/stargazers',
        statuses_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/statuses/{sha}',
        subscribers_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/subscribers',
        subscription_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/subscription',
        svn_url: 'https://github.com/kevinxh/mobify-preview',
        tags_url: 'https://api.github.com/repos/kevinxh/mobify-preview/tags',
        teams_url: 'https://api.github.com/repos/kevinxh/mobify-preview/teams',
        trees_url:
          'https://api.github.com/repos/kevinxh/mobify-preview/git/trees{/sha}',
        updated_at: '2020-08-21T21:55:16Z',
        url: 'https://api.github.com/repos/kevinxh/mobify-preview',
        watchers: 0,
        watchers_count: 0
      },
      sha: '5228d3eff0d3a0de47463ee6b59104aaf9532af0',
      user: {
        avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
        events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
        followers_url: 'https://api.github.com/users/kevinxh/followers',
        following_url:
          'https://api.github.com/users/kevinxh/following{/other_user}',
        gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/kevinxh',
        id: 10948652,
        login: 'kevinxh',
        node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
        organizations_url: 'https://api.github.com/users/kevinxh/orgs',
        received_events_url:
          'https://api.github.com/users/kevinxh/received_events',
        repos_url: 'https://api.github.com/users/kevinxh/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/kevinxh/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/kevinxh'
      }
    },
    html_url: 'https://github.com/kevinxh/mobify-preview/pull/3',
    id: 471871480,
    issue_url: 'https://api.github.com/repos/kevinxh/mobify-preview/issues/3',
    labels: [],
    locked: false,
    maintainer_can_modify: false,
    merge_commit_sha: 'ce511efaa2ecf4e6b1f6c2d8c4c413bad6a913cb',
    mergeable: null,
    mergeable_state: 'unknown',
    merged: false,
    merged_at: null,
    merged_by: null,
    milestone: null,
    node_id: 'MDExOlB1bGxSZXF1ZXN0NDcxODcxNDgw',
    number: 3,
    patch_url: 'https://github.com/kevinxh/mobify-preview/pull/3.patch',
    rebaseable: null,
    requested_reviewers: [],
    requested_teams: [],
    review_comment_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/pulls/comments{/number}',
    review_comments: 0,
    review_comments_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3/comments',
    state: 'open',
    statuses_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/statuses/5228d3eff0d3a0de47463ee6b59104aaf9532af0',
    title: 'Test',
    updated_at: '2020-08-21T21:59:41Z',
    url: 'https://api.github.com/repos/kevinxh/mobify-preview/pulls/3',
    user: {
      avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
      events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
      followers_url: 'https://api.github.com/users/kevinxh/followers',
      following_url:
        'https://api.github.com/users/kevinxh/following{/other_user}',
      gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
      gravatar_id: '',
      html_url: 'https://github.com/kevinxh',
      id: 10948652,
      login: 'kevinxh',
      node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
      organizations_url: 'https://api.github.com/users/kevinxh/orgs',
      received_events_url:
        'https://api.github.com/users/kevinxh/received_events',
      repos_url: 'https://api.github.com/users/kevinxh/repos',
      site_admin: false,
      starred_url:
        'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/kevinxh/subscriptions',
      type: 'User',
      url: 'https://api.github.com/users/kevinxh'
    }
  },
  repository: {
    archive_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/{archive_format}{/ref}',
    archived: false,
    assignees_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/assignees{/user}',
    blobs_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/git/blobs{/sha}',
    branches_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/branches{/branch}',
    clone_url: 'https://github.com/kevinxh/mobify-preview.git',
    collaborators_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/collaborators{/collaborator}',
    comments_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/comments{/number}',
    commits_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/commits{/sha}',
    compare_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/compare/{base}...{head}',
    contents_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/contents/{+path}',
    contributors_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/contributors',
    created_at: '2020-08-21T17:04:57Z',
    default_branch: 'develop',
    deployments_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/deployments',
    description: null,
    disabled: false,
    downloads_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/downloads',
    events_url: 'https://api.github.com/repos/kevinxh/mobify-preview/events',
    fork: false,
    forks: 0,
    forks_count: 0,
    forks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/forks',
    full_name: 'kevinxh/mobify-preview',
    git_commits_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/git/commits{/sha}',
    git_refs_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/git/refs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/git/tags{/sha}',
    git_url: 'git://github.com/kevinxh/mobify-preview.git',
    has_downloads: true,
    has_issues: true,
    has_pages: false,
    has_projects: true,
    has_wiki: true,
    homepage: null,
    hooks_url: 'https://api.github.com/repos/kevinxh/mobify-preview/hooks',
    html_url: 'https://github.com/kevinxh/mobify-preview',
    id: 289322695,
    issue_comment_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/issues/comments{/number}',
    issue_events_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/issues/events{/number}',
    issues_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/issues{/number}',
    keys_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/keys{/key_id}',
    labels_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/labels{/name}',
    language: 'TypeScript',
    languages_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/languages',
    license: {
      key: 'mit',
      name: 'MIT License',
      node_id: 'MDc6TGljZW5zZTEz',
      spdx_id: 'MIT',
      url: 'https://api.github.com/licenses/mit'
    },
    merges_url: 'https://api.github.com/repos/kevinxh/mobify-preview/merges',
    milestones_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/milestones{/number}',
    mirror_url: null,
    name: 'mobify-preview',
    node_id: 'MDEwOlJlcG9zaXRvcnkyODkzMjI2OTU=',
    notifications_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/notifications{?since,all,participating}',
    open_issues: 3,
    open_issues_count: 3,
    owner: {
      avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
      events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
      followers_url: 'https://api.github.com/users/kevinxh/followers',
      following_url:
        'https://api.github.com/users/kevinxh/following{/other_user}',
      gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
      gravatar_id: '',
      html_url: 'https://github.com/kevinxh',
      id: 10948652,
      login: 'kevinxh',
      node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
      organizations_url: 'https://api.github.com/users/kevinxh/orgs',
      received_events_url:
        'https://api.github.com/users/kevinxh/received_events',
      repos_url: 'https://api.github.com/users/kevinxh/repos',
      site_admin: false,
      starred_url:
        'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/kevinxh/subscriptions',
      type: 'User',
      url: 'https://api.github.com/users/kevinxh'
    },
    private: false,
    pulls_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/pulls{/number}',
    pushed_at: '2020-08-21T21:59:41Z',
    releases_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/releases{/id}',
    size: 347,
    ssh_url: 'git@github.com:kevinxh/mobify-preview.git',
    stargazers_count: 0,
    stargazers_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/stargazers',
    statuses_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/statuses/{sha}',
    subscribers_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/subscribers',
    subscription_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/subscription',
    svn_url: 'https://github.com/kevinxh/mobify-preview',
    tags_url: 'https://api.github.com/repos/kevinxh/mobify-preview/tags',
    teams_url: 'https://api.github.com/repos/kevinxh/mobify-preview/teams',
    trees_url:
      'https://api.github.com/repos/kevinxh/mobify-preview/git/trees{/sha}',
    updated_at: '2020-08-21T21:55:16Z',
    url: 'https://api.github.com/repos/kevinxh/mobify-preview',
    watchers: 0,
    watchers_count: 0
  },
  sender: {
    avatar_url: 'https://avatars1.githubusercontent.com/u/10948652?v=4',
    events_url: 'https://api.github.com/users/kevinxh/events{/privacy}',
    followers_url: 'https://api.github.com/users/kevinxh/followers',
    following_url:
      'https://api.github.com/users/kevinxh/following{/other_user}',
    gists_url: 'https://api.github.com/users/kevinxh/gists{/gist_id}',
    gravatar_id: '',
    html_url: 'https://github.com/kevinxh',
    id: 10948652,
    login: 'kevinxh',
    node_id: 'MDQ6VXNlcjEwOTQ4NjUy',
    organizations_url: 'https://api.github.com/users/kevinxh/orgs',
    received_events_url: 'https://api.github.com/users/kevinxh/received_events',
    repos_url: 'https://api.github.com/users/kevinxh/repos',
    site_admin: false,
    starred_url: 'https://api.github.com/users/kevinxh/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/kevinxh/subscriptions',
    type: 'User',
    url: 'https://api.github.com/users/kevinxh'
  }
}

*/
