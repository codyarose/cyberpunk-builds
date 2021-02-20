import React from 'react'
import styled from 'styled-components'
import { baseValues, useAppStore } from '../store'
import { CounterButton } from './CounterButton'

interface Props {
	className?: string
}

function LevelCounter({ className }: Props) {
	const level = useAppStore((state) => state.level)
	const points = useAppStore((state) => state.points)
	const updateLevel = useAppStore((state) => state.updateLevel)

	const disable = {
		inc: level >= baseValues.maxLevel,
		dec: level <= baseValues.minLevel,
	}

	return (
		<StyledContainer className={className}>
			<StyledCount>{level}</StyledCount>
			<StyledTitle>Level</StyledTitle>
			<CounterButton onClick={() => updateLevel('inc')} disabled={disable.inc} />
			<CounterButton onClick={() => updateLevel('dec')} disabled={disable.dec} />
			<StyledPoints>
				<StyledSubtitle>Attribute points</StyledSubtitle>
				{points}
			</StyledPoints>
		</StyledContainer>
	)
}

export { LevelCounter }

const StyledContainer = styled.div`
	position: relative;
	background-color: var(--dark-blue);
	border: 1px solid var(--red-200);
	padding: 2rem;
`

const StyledTitle = styled.h2`
	font-size: 1.5rem;
	margin: 0;
`

const StyledSubtitle = styled.h3`
	font-size: 1.25rem;
	margin: 0;
`

const StyledCount = styled.div`
	font-size: 2rem;
	margin-bottom: 0.5rem;
`

const StyledPoints = styled.div`
	font-size: 2rem;
	padding-top: 1rem;
	margin-top: 1rem;
`
