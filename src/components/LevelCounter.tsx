import React from 'react'
import { baseValues, useAppStore } from '../store'

function LevelCounter() {
	const level = useAppStore((state) => state.level)
	const points = useAppStore((state) => state.points)
	const updateLevel = useAppStore((state) => state.updateLevel)

	const disable = {
		inc: level >= baseValues.maxLevel,
		dec: level <= baseValues.minLevel,
	}

	return (
		<div style={{ marginBottom: '1rem' }}>
			<button onClick={() => updateLevel('inc')} disabled={disable.inc}>
				+
			</button>
			<span>Level: {level}</span>
			<button onClick={() => updateLevel('dec')} disabled={disable.dec}>
				-
			</button>
			<div style={{ margin: '1rem 0' }}>Points: {points}</div>
		</div>
	)
}

export { LevelCounter }
