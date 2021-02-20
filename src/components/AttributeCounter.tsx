import React, { useRef } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { Attribute, baseValues, useAppStore } from '../store'
import { CounterButton } from './CounterButton'

interface Props {
	attribute: Attribute
	className?: string
}

function AttributeCounter({ attribute, className }: Props) {
	const count = useAppStore((state) => state[attribute])
	const points = useAppStore((state) => state.points)
	const updateAttribute = useAppStore((state) => state.updateAttribute)
	const node = useRef(null)

	const disable = {
		inc: count >= baseValues.maxAttributePoints || points <= baseValues.minPoints,
		dec: count <= baseValues.minAttributePoints,
	}

	return (
		<>
			<StyledContainer className={className} ref={node} data-tip={attribute} data-for={attribute}>
				<div>
					<StyledTitle>{attribute}</StyledTitle>
					<StyledCount>{count}</StyledCount>
					<CounterButton
						onClick={() => updateAttribute(attribute, 'inc')}
						onFocus={() => ReactTooltip.show(node.current!)}
						onBlur={() => ReactTooltip.hide(node.current!)}
						disabled={disable.inc}
					/>
					<CounterButton
						onClick={() => updateAttribute(attribute, 'dec')}
						onFocus={() => ReactTooltip.show(node.current!)}
						onBlur={() => ReactTooltip.hide(node.current!)}
						disabled={disable.dec}
					/>
				</div>
			</StyledContainer>
			<StyledTooltip id={attribute} place="bottom" effect="solid">
				<StyledStatList>
					<header>
						<h3>{attribute}</h3>
						<div>lvl {count}/20</div>
					</header>
					<StyledStatDescription>{attributeStatsData[attribute].description}</StyledStatDescription>
					<div>
						{attributeStatsData[attribute].stats.map(({ stat, by, unit }) => (
							<StyledStat key={stat}>
								<StyledAmount>
									{by > 0 ? '+' : null}
									{by * (count - baseValues.minAttributePoints)}
									<span>{unit}</span>
								</StyledAmount>
								<span>{stat}</span>
							</StyledStat>
						))}
					</div>
				</StyledStatList>
			</StyledTooltip>
		</>
	)
}

export { AttributeCounter }

const StyledContainer = styled.div`
	position: relative;
	background-color: var(--red-300);
	border: 1px solid var(--red-100);
	border-radius: 3px;
	padding: 2rem;
	transition: border-color 0.1s ease;

	:hover {
		border-color: currentColor;
	}
`

const StyledTitle = styled.h2`
	font-size: 1.5rem;
	margin: 0 0 1rem;
`

const StyledCount = styled.div`
	font-size: 2rem;
	margin-bottom: 0.5rem;
`

const StyledTooltip = styled(ReactTooltip)`
	&& {
		font-size: 1rem;
	}
	&.type-dark {
		color: inherit;
		background-color: var(--dark-blue);
		border: 1px solid var(--red-200);
		border-radius: 4px;
	}
`

const StyledStatList = styled.ul`
	width: 300px;
	list-style-type: none;
	padding: 0;
	margin: 1rem 0;
	text-align: left;
	text-transform: none;
	header {
		text-transform: uppercase;
		> * {
			padding-bottom: 0.5rem;
			margin-bottom: 0.5rem;
			border-bottom: 1px solid var(--red-200);
		}
		h3 {
			color: var(--yellow);
			font-size: inherit;
			margin-top: 0;
		}
		div {
			color: var(--red-100);
		}
	}
`

const StyledStat = styled.li`
	display: grid;
	grid-template-columns: 40px auto;
	gap: 1.5ch;
	padding: 0.25rem 0;
	:nth-child(even) {
		background-color: rgba(255, 255, 255, 0.05);
	}
`

const StyledStatDescription = styled.div`
	margin-bottom: 0.75rem;
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
		description: string
		stats: {
			stat: string
			by: number
			unit: '%' | 's' | null
		}[]
	}
} = {
	body: {
		description: 'Body determines your raw physical power, allows you to force open doors.',
		stats: [
			{ stat: 'Health', by: 5, unit: null },
			{ stat: 'Stamina', by: 3, unit: null },
			{ stat: 'Damage: Fists & Gorilla Arms', by: 3, unit: null },
			{ stat: 'Damage: Melee weapons', by: 1.5, unit: '%' },
			{ stat: 'Movement penalty while grappling, or wielding HMG', by: -6, unit: '%' },
			{ stat: 'Duration: Grappling', by: 5, unit: 's' },
		],
	},
	reflexes: {
		description: 'Reflexes determine your maneuverability, increases your overall movement speed.',
		stats: [
			{ stat: 'Passive evasion', by: 1, unit: '%' },
			{ stat: 'Crit chance', by: 1, unit: '%' },
			{ stat: 'Damage: Mantis Blades', by: 3, unit: null },
		],
	},
	'technical ability': {
		description:
			'Technical Ability represents your technical know-how. It allows you to unlock doors and use Tech weapons.',
		stats: [{ stat: 'Armor', by: 5, unit: '%' }],
	},
	intelligence: {
		description: 'Intelligence determines your netrunning proficiency.',
		stats: [
			{ stat: 'Cyberdeck RAM capacity', by: 4, unit: '%' },
			{ stat: 'Damage: Quickhack', by: 0.5, unit: '%' },
			{ stat: 'Duration: Quickhacks', by: 1, unit: '%' },
		],
	},
	cool: {
		description: 'Cool determines your resilience, composure and effectiveness in operating from stealth.',
		stats: [
			{ stat: 'Damage: Crit', by: 2, unit: '%' },
			{ stat: 'All resistances', by: 1, unit: '%' },
			{ stat: 'Damage: Stealth', by: 10, unit: '%' },
			{ stat: 'Enemy detection speed while in stealth', by: -0.5, unit: '%' },
			{ stat: 'Damage: Monowire', by: 3, unit: null },
		],
	},
}
