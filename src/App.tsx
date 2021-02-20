import React from 'react'
import styled from 'styled-components'
import { AttributeCounter } from './components/AttributeCounter'
import { LevelCounter } from './components/LevelCounter'

function App() {
	return (
		<StyledContainer>
			<StyledContent>
				<StyledAttributesGrid>
					<LevelCounter className="attr-grid--level" />
					<AttributeCounter attribute="body" className="attr-grid--body" />
					<AttributeCounter attribute="reflexes" className="attr-grid--reflexes" />
					<AttributeCounter attribute="technical ability" className="attr-grid--technical" />
					<AttributeCounter attribute="intelligence" className="attr-grid--intelligence" />
					<AttributeCounter attribute="cool" className="attr-grid--cool" />
				</StyledAttributesGrid>
			</StyledContent>
		</StyledContainer>
	)
}

export default App

const StyledContainer = styled.div`
	background: linear-gradient(
		170deg,
		hsl(347.14, 51.22%, 16.08%) 0%,
		hsl(347.16, 50.88%, 15.94%) 7.6%,
		hsl(347.21, 49.92%, 15.57%) 13.7%,
		hsl(347.25, 48.4%, 14.98%) 18.8%,
		hsl(347.24, 46.36%, 14.22%) 22.9%,
		hsl(347.12, 43.83%, 13.32%) 26.6%,
		hsl(346.8, 40.8%, 12.31%) 30%,
		hsl(346.16, 37.24%, 11.23%) 33.5%,
		hsl(345, 33.42%, 10.11%) 37.4%,
		hsl(342.09, 30.66%, 8.97%) 41.9%,
		hsl(336.7, 28.12%, 7.78%) 47.4%,
		hsl(326.12, 23.88%, 6.55%) 54.2%,
		hsl(297.7, 17.18%, 5.34%) 62.5%,
		hsl(251.38, 19.38%, 4.91%) 72.7%,
		hsl(222.99, 32.13%, 4.23%) 85.1%,
		hsl(217.5, 40%, 3.92%) 100%
	);
	min-height: 100vh;
	display: flex;
	place-items: center;
	text-transform: uppercase;
`

const StyledContent = styled.div`
	width: 100%;
	max-width: 64rem;
	margin: 0 auto;
	padding: 3rem;
`

const StyledAttributesGrid = styled.div`
	display: grid;
	text-align: center;
	grid-template-columns: repeat(3, 1fr);
	grid-template-areas:
		'body reflexes technical'
		'. level .'
		'intelligence . cool';
	gap: 2rem;

	[class*='attr-grid'] {
		position: relative;
	}

	.attr-grid {
		&--level {
			grid-area: level;
		}
		&--body {
			grid-area: body;
			top: 50%;
		}
		&--reflexes {
			grid-area: reflexes;
		}
		&--technical {
			grid-area: technical;
			top: 50%;
		}
		&--intelligence {
			grid-area: intelligence;
			bottom: 50%;
		}
		&--cool {
			grid-area: cool;
			bottom: 50%;
		}
	}
`
