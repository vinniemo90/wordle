import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

// components
import Grid from './Grid'
import Modal from './Modal'

export default function Wordle({ solution }) {
	const { currentGuess, guesses, isCorrect, handleKeyup } =
		useWordle(solution)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		window.addEventListener('keyup', handleKeyup)

		if (isCorrect) {
			setTimeout(() => setShowModal(true), 2000)
			window.removeEventListener('keyup', handleKeyup)
		}
		console.log(guesses.length)
		if (guesses.length > 5) {
			setTimeout(() => setShowModal(true), 2000)
			window.removeEventListener('keyup', handleKeyup)
		}

		return () => window.removeEventListener('keyup', handleKeyup)
	}, [handleKeyup, isCorrect, guesses.length])

	return (
		<div>
			<p>current guess - {currentGuess}</p>
			<Grid guesses={guesses} currentGuess={currentGuess} />
			{showModal && (
				<Modal
					isCorrect={isCorrect}
					guesses={guesses}
					solution={solution}
				/>
			)}
		</div>
	)
}
