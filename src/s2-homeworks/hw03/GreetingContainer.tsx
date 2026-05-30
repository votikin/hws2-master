import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

export const pureAddUser = (
    name: string,
    setError: (error: string) => void,
    setName: (name: string) => void,
    addUserCallback: (name: string) => void
) => {
    if (name.trim() === "") setError('field is empty')
    else {
        addUserCallback(name)
        setName('')
    }
}

export const pureOnBlur = (
    name: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
) => {
    if (name.trim() === '') setError('field is empty')
}

export const pureOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    addUser: () => void
) => {
    if (e.key === 'Enter')
        addUser()
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = Number(users.length)
    const lastUserName = users?.at(-1)?.name ?? ''

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
