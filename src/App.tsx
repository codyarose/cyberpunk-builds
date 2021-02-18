import React from 'react'
import styles from './App.module.css'
import { AttributeCounter } from './components/AttributeCounter'
import { LevelCounter } from './components/LevelCounter'

function App() {
	return (
		<main className={styles.App}>
			<div className={styles.AppContent}>
				<div>
					<LevelCounter />
					<AttributeCounter attribute="body" />
					<AttributeCounter attribute="reflexes" />
					<AttributeCounter attribute="technicalAbility" />
					<AttributeCounter attribute="intelligence" />
					<AttributeCounter attribute="cool" />
				</div>
			</div>
		</main>
	)
}

export default App
