import { useState, useEffect } from 'react'

import UserData from '@customtypes/UserData'

interface UserDataHookResponse {
  userData: UserData | null
}

const useUserData = (): UserDataHookResponse => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    handleGetUserData()
  }, [])

  async function handleGetUserData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:4000/getUserData', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
      })

      const data = await response.json()

      const userData: UserData = {
        login: data.login,
        id: data.id,
        node_id: data.node_id,
        avatar_url: data.avatar_url,
        gravatar_id: data.gravatar_id,
        url: data.url,
        html_url: data.html_url,
        followers_url: data.followers_url,
        following_url: data.following_url,
        gists_url: data.gists_url,
        starred_url: data.starred_url,
        subscriptions_url: data.subscriptions_url,
        organizations_url: data.organizations_url,
        repos_url: data.repos_url,
        events_url: data.events_url,
        received_events_url: data.received_events_url,
        type: data.type,
        site_admin: data.site_admin,
        name: data.name,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        hireable: data.hireable,
        bio: data.bio,
        twitter_username: data.twitter_username,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at
      }

      setUserData(userData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return {
    userData
  }
}

export default useUserData
