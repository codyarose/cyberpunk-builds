import React from 'react'
import styles from './App.module.css'
import { AttributeCounter } from './components/AttributeCounter'
import { LevelCounter } from './components/LevelCounter'

function App() {
	return (
		<div className={styles.App}>
			<header className={styles.AppHeader}>
				<LevelCounter />
				<AttributeCounter attribute="body" />
				<AttributeCounter attribute="reflexes" />
				<AttributeCounter attribute="technicalAbility" />
				<AttributeCounter attribute="intelligence" />
				<AttributeCounter attribute="cool" />
			</header>
		</div>
	)
}

export default App
