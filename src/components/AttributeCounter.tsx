import React from 'react'
import { Attribute, useAppStore } from '../store'

interface Props {
	attribute: Attribute
}

function AttributeCounter({ attribute }: Props) {
	const count = useAppStore((state) => state[attribute])
	const updateAttribute = useAppStore((state) => state.updateAttribute)

	return (
		<div style={{ marginBottom: '1rem' }}>
			<button onClick={() => updateAttribute(attribute, 'inc')}>+</button>
			<span>
				{attribute}: {count}
			</span>
			<button onClick={() => updateAttribute(attribute, 'dec')}>-</button>
		</div>
	)
}

export { AttributeCounter }
