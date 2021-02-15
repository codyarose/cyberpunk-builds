import React from 'react'
import { useAppStore } from '../store'

function LevelCounter() {
	const level = useAppStore((state) => state.level)
	const points = useAppStore((state) => state.points)
	const updateLevel = useAppStore((state) => state.updateLevel)

	return (
		<div style={{ marginBottom: '1rem' }}>
			<button onClick={() => updateLevel('inc')}>+</button>
			<span>Level: {level}</span>
			<button onClick={() => updateLevel('dec')}>-</button>
			<div style={{ margin: '1rem 0' }}>Points: {points}</div>
		</div>
	)
}

export { LevelCounter }
