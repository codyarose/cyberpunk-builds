import React from 'react'
import styled from 'styled-components'
import { Attribute, baseValues, useAppStore } from '../store'

interface Props {
	attribute: Attribute
}

function AttributeCounter({ attribute }: Props) {
	const count = useAppStore((state) => state[attribute])
	const points = useAppStore((state) => state.points)
	const updateAttribute = useAppStore((state) => state.updateAttribute)

	const disable = {
		inc: count >= baseValues.maxAttributePoints || points <= baseValues.minPoints,
		dec: count <= baseValues.minAttributePoints,
	}

	return (
		<div style={{ marginBottom: '1rem' }}>
			<div>
				<button onClick={() => updateAttribute(attribute, 'inc')} disabled={disable.inc}>
					+
				</button>
				<span>
					{attribute}: {count}
				</span>
				<button onClick={() => updateAttribute(attribute, 'dec')} disabled={disable.dec}>
					-
				</button>
			</div>
			<details>
				<summary>Stats</summary>
				<StyledStatList>
					{attributeStatsData[attribute].map(({ stat, by, unit }) => (
						<StyledStat key={stat}>
							<StyledAmount>
								{by > 0 ? '+' : null}
								{by * (count - baseValues.minAttributePoints)}
								<span>{unit}</span>
							</StyledAmount>
							<span>{stat}</span>
						</StyledStat>
					))}
				</StyledStatList>
			</details>
		</div>
	)
}

export { AttributeCounter }

const StyledStatList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 1rem 0;
`

const StyledStat = styled.li`
	display: grid;
	grid-template-columns: 50px auto;
	gap: 1.5ch;
	margin-bottom: 0.25rem;
	:nth-child(even) {
		background-color: rgba(255, 255, 255, 0.05);
	}
`

const StyledAmount = styled.span`
	text-align: right;
	display: grid;
	grid-template-columns: auto 1ch;
	span {
		opacity: 0.6;
	}
`

const attributeStatsData: {
	[Property in Attribute]: {
		stat: string
		by: number
		unit: '%' | 's' | null
	}[]
} = {
	body: [
		{ stat: 'Health', by: 5, unit: null },
		{ stat: 'Stamina', by: 3, unit: null },
		{ stat: 'Damage: Fists & Gorilla Arms', by: 3, unit: null },
		{ stat: 'Damage: Melee weapons', by: 1.5, unit: '%' },
		{ stat: 'Movement penalty while grappling, or wielding HMG', by: -6, unit: '%' },
		{ stat: 'Duration: Grappling', by: 5, unit: 's' },
	],
	reflexes: [
		{ stat: 'Passive evasion', by: 1, unit: '%' },
		{ stat: 'Crit chance', by: 1, unit: '%' },
		{ stat: 'Damage: Mantis Blades', by: 3, unit: null },
	],
	technicalAbility: [{ stat: 'Armor', by: 5, unit: '%' }],
	intelligence: [
		{ stat: 'Cyberdeck RAM capacity', by: 4, unit: '%' },
		{ stat: 'Damage: Quickhack', by: 0.5, unit: '%' },
		{ stat: 'Duration: Quickhacks', by: 1, unit: '%' },
	],
	cool: [
		{ stat: 'Damage: Crit', by: 2, unit: '%' },
		{ stat: 'All resistances', by: 1, unit: '%' },
		{ stat: 'Damage: Stealth', by: 10, unit: '%' },
		{ stat: 'Enemy detection speed while in stealth', by: -0.5, unit: '%' },
		{ stat: 'Damage: Monowire', by: 3, unit: null },
	],
}
