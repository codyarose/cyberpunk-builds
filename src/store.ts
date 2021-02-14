import create from 'zustand'

export type Attribute = 'body' | 'reflexes' | 'technicalAbility' | 'intelligence' | 'cool'
type AttributeTypes = {
	[Property in Attribute]: number
}
type AppState = AttributeTypes & {
	level: number
	updateLevel: (action: Action) => void
	updateAttribute: (attribute: Attribute, action: Action) => void
}

type Action = 'inc' | 'dec'

const minPoints = 3

export const useAppStore = create<AppState>((set) => ({
	level: 1,
	body: minPoints,
	reflexes: minPoints,
	technicalAbility: minPoints,
	intelligence: minPoints,
	cool: minPoints,
	updateLevel: (action) =>
		set((state) => {
			return {
				inc: { level: state.level + 1 },
				dec: { level: state.level > 1 ? state.level - 1 : state.level },
			}[action]
		}),
	updateAttribute: (attribute, action) =>
		set((state) => {
			return {
				inc: { [attribute]: state[attribute] + 1 },
				dec: { [attribute]: state[attribute] > minPoints ? state[attribute] - 1 : state[attribute] },
			}[action]
		}),
}))
