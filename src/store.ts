import create from 'zustand'

export type Attribute = 'body' | 'reflexes' | 'technical ability' | 'intelligence' | 'cool'
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

export const baseValues = {
	minLevel: 1,
	maxLevel: 50,
	initialPoints: 7,
	minPoints: 0,
	minAttributePoints: 3,
	maxAttributePoints: 20,
}

export const useAppStore = create<AppState>((set) => ({
	level: baseValues.minLevel,
	points: baseValues.initialPoints,
	body: baseValues.minAttributePoints,
	reflexes: baseValues.minAttributePoints,
	'technical ability': baseValues.minAttributePoints,
	intelligence: baseValues.minAttributePoints,
	cool: baseValues.minAttributePoints,
	updateLevel: (action) =>
		set((state) => {
			return {
				inc: allowAction.inc.level() ? { level: state.level + 1, points: state.points + 1 } : state,
				dec: allowAction.dec.level() ? { level: state.level - 1, points: state.points - 1 } : state,
			}[action]
		}),
	updateAttribute: (attribute, action) => {
		set((state) => {
			return {
				inc: allowAction.inc.attribute(attribute)
					? { [attribute]: state[attribute] + 1, points: state.points - 1 }
					: state,
				dec: allowAction.dec.attribute(attribute)
					? { [attribute]: state[attribute] - 1, points: state.points + 1 }
					: state,
			}[action]
		})
	},
}))

const allowAction: {
	inc: {
		level: () => boolean
		attribute: (attribute: Attribute) => boolean
	}
	dec: {
		level: () => boolean
		attribute: (attribute: Attribute) => boolean
	}
} = {
	inc: {
		level: () => useAppStore.getState().level < baseValues.maxLevel,
		attribute: (attribute: Attribute) =>
			useAppStore.getState().points > baseValues.minPoints &&
			useAppStore.getState()[attribute] < baseValues.maxAttributePoints,
	},
	dec: {
		level: () =>
			useAppStore.getState().level > baseValues.minLevel && useAppStore.getState().points > baseValues.minPoints,
		attribute: (attribute: Attribute) => useAppStore.getState()[attribute] > baseValues.minAttributePoints,
	},
}
