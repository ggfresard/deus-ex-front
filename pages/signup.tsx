import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "providers/AuthProvider"
import React, { useEffect } from "react"
import { useForm } from "utils"

const Signup: React.FC = () => {
  const [formValues, _, handleChange] = useForm({
    username: "",
    password: "",
    name: "",
  })
  const { register, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    isAuthenticated && router.push("/")
  }, [])

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
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="name"
          type="text"
          placeholder="Name"
          value={formValues.name}
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
            register(
              formValues.username,
              formValues.password,
              formValues.name
            ).then(() => router.push("/"))
          }
        >
          Sign Up
        </button>
      </div>
      <p className="text-center text-sm mt-1">
        Already have an account?{" "}
        {
          <Link href="login">
            <a className="cursor-pointer text-indigo-700 font-bold"> Login</a>
          </Link>
        }
      </p>
    </div>
  )
}
export default Signup
