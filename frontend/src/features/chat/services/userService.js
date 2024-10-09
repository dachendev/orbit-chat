import { useAuthUserContext } from '@/features/auth'
import axios from 'axios'

const baseUrl = '/api/users'

export const useUserService = () => {
  const [authUser] = useAuthUserContext()

  const config = {
    headers: {
      Authorization: `Bearer ${authUser.token}`,
    },
  }

  const all = () => axios.get(baseUrl, config).then((response) => response.data)

  return {
    all,
  }
}
