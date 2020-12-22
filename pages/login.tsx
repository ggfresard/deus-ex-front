import { useAuth } from "providers/AuthProvider"
import { useForm } from "utils"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Link from "next/link"

const Login: React.FC = () => {
  const [formValues, _, handleChange] = useForm({ username: "", password: "" })
  const { login, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    !isLoading && isAuthenticated && router.push("/")
  }, [isLoading, isAuthenticated])

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-3/5 mx-auto">
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="px-3 py-2 bg-indigo-700 text-gray-100 shadow-md hover:shadow-lg hover:text-gray-50 rounded-md font-semibold"
          onClick={() =>
            login(formValues.username, formValues.password).then(() =>
              router.push("/")
            )
          }
        >
          Login
        </button>
      </div>
      <p className="text-center text-sm mt-1">
        Don't have an account?{" "}
        {
          <Link href="signup">
            <a className="cursor-pointer text-indigo-700 font-bold"> Sign Up</a>
          </Link>
        }
      </p>
    </div>
  )
}
export default Login
