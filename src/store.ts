import create from 'zustand'

export type Attribute = 'body' | 'reflexes' | 'technicalAbility' | 'intelligence' | 'cool'
type AttributeTypes = {
	[Property in Attribute]: number
}
type AppState = AttributeTypes & {
	level: number
	points: number
	updateLevel: (action: Action) => void
	updateAttribute: (attribute: Attribute, action: Action) => void
}

type Action = 'inc' | 'dec'

const baseValues = {
	minLevel: 1,
	maxLevel: 50,
	initialPoints: 7,
	minPoints: 0,
	minAttributePoints: 3,
	maxAttributePoints: 20,
}

export const useAppStore = create<AppState>((set, get) => ({
	level: baseValues.minLevel,
	points: baseValues.initialPoints,
	body: baseValues.minAttributePoints,
	reflexes: baseValues.minAttributePoints,
	technicalAbility: baseValues.minAttributePoints,
	intelligence: baseValues.minAttributePoints,
	cool: baseValues.minAttributePoints,
	updateLevel: (action) =>
		set((state) => {
			const allowInc = get().level < baseValues.maxLevel
			const allowDec = get().level > baseValues.minLevel && get().points > baseValues.minPoints
			return {
				inc: allowInc ? { level: state.level + 1, points: state.points + 1 } : state,
				dec: allowDec ? { level: state.level - 1, points: state.points - 1 } : state,
			}[action]
		}),
	updateAttribute: (attribute, action) =>
		set((state) => {
			const allowInc = get().points > baseValues.minPoints && get()[attribute] < baseValues.maxAttributePoints
			const allowDec = get()[attribute] > baseValues.minAttributePoints
			return {
				inc: allowInc ? { [attribute]: state[attribute] + 1, points: state.points - 1 } : state,
				dec: allowDec ? { [attribute]: state[attribute] - 1, points: state.points + 1 } : state,
			}[action]
		}),
}))
