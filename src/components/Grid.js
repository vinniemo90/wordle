import React from 'react'

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess }) {
	return (
		<div>
			{guesses.map((g, i) => {
				if (guesses.length === i) {
					return <Row key={i} currentGuess={currentGuess} />
				}
				return <Row key={i} guess={g} />
			})}
		</div>
	)
}
