import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { login } from '../features/auth/authSlice'
import FinnModal from '../components/FinnModal'
import CircularIndeterminate from '../components/Spinner'
import { getData } from '../features/data/dataSlice'
import React, { useEffect, useState } from 'react'
import Quote from '../components/Quote'
import SnakeGameModal from '../components/Snake/SnakeGameModal'

export default function Home() {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )
  const [showComponent, setShowComponent] = useState(true)

  const dispatch = useAppDispatch()

  const loginDemo = () => {
    dispatch(
      login({
        email: 'finn@imadog.com',
        password: 'FinnFinn',
      }),
    )
  }

  useEffect(() => {
    dispatch(getData())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true)
    }, 10000) // 10 seconds in milliseconds

    return () => {
      clearTimeout(timer)
      setShowComponent(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setShowComponent(false)
    }
  }, [isSuccess])

  return (
    <>
      {isLoading ? (
        <>{showComponent ? <SnakeGameModal /> : <CircularIndeterminate />}</>
      ) : (
        <Paper elevation={14} className="form-container fade-in">
          {user ? (
            <>
              {user._id == '64728b96d38e1251fcc5cc82' ? (
                <>
                  <h1>Hi {user.name}</h1>
                  <h2>Welcome Back!</h2>
                  <FinnModal />
                </>
              ) : (
                <>
                  <h1>Hi {user.name}</h1>
                  <h2>Welcome Back!</h2>
                </>
              )}
            </>
          ) : (
            <>
              <h1>Achieve More, One Step at a Time!</h1>
              <h3>
                Consistently dedicating even a small amount of time can lead to
                substantial outcomes in the long run.
              </h3>
            </>
          )}

          {user ? (
            <Link to={`/goals/user/${user.name}`}>
            {/* // <Link to={"Dashboard"}> */}
              <Button variant="contained" id="btn-pair">
                Go to my dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="login">
                <Button variant="contained" id="btn-pair">
                  Log In
                </Button>
              </Link>

              <Button onClick={loginDemo} variant="contained" id="btn-pair">
                Try out a demo
              </Button>
            </>
          )}
        </Paper>
      )}
    </>
  )
}
