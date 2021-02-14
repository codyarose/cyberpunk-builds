import React from 'react'
import { useAppStore } from '../store'

function LevelCounter() {
	const level = useAppStore((state) => state.level)
	const updateLevel = useAppStore((state) => state.updateLevel)

	return (
		<div style={{ marginBottom: '1rem' }}>
			<button onClick={() => updateLevel('inc')}>+</button>
			<span>Level: {level}</span>
			<button onClick={() => updateLevel('dec')}>-</button>
		</div>
	)
}

export { LevelCounter }
