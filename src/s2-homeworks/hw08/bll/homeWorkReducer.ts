import {UserType} from '../HW8'

const initialState: UserType[] = []

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state = initialState, action: ActionType): UserType[] => { 
    switch (action.type) {
        case 'sort': { 
            return action.payload === 'up'
                ? [...state].sort((a,b) => a.name.localeCompare(b.name))
                : [...state].sort((a,b) => b.name.localeCompare(a.name))
        }
        case 'check': {
            return state.filter(item => item.age >= action.payload)
        }
        default:
            return state
    }
}
