import { useState } from 'react'

const useWordle = (solution) => {
	const [currentGuess, setCurrentGuess] = useState('')
	const [guesses, setGuesses] = useState([]) // each guess is an array
	const [history, setHistory] = useState([]) // each guess is a string
	const [isCorrect, setIsCorrect] = useState(false)

	// format a guess into an array of letter objects
	// instead of using color I would use match and map matches
	// to a color config that way if we want to change colors it
	// is changed in one spot and colors are more likely to change
	// than match types
	// e.g. [{key: 'a', color: 'yellow'}]
	const formatGuess = () => {
		let solutionArray = [...solution]
		let formattedGuess = [...currentGuess].map((letter) => {
			return { key: letter, color: 'grey' }
		})

		// find any green letters
		formattedGuess.forEach((letter, index) => {
			if (solution[index] === letter.key) {
				formattedGuess[index].color = 'green'
				solutionArray[index] = null
			}
		})

		// find any yellow letters
		formattedGuess.forEach((letter, index) => {
			if (
				solutionArray.includes(letter.key) &&
				letter.color !== 'green'
			) {
				formattedGuess[index].color = 'yellow'
				solutionArray[solutionArray.indexOf(letter.key)] = null
			}
		})

		return formattedGuess
	}

	// add a new guess to the guesses state
	// update the isCorrect state if the guess is correct
	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true)
		}
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses]
			newGuesses.push(formattedGuess)
			return newGuesses
		})
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess]
		})

		setCurrentGuess('')
	}

	// handle keyup event & track current guess
	// if user presses enter, add the new guess
	const handleKeyup = ({ key }) => {
		if (key === 'Enter') {
			// only add guess if turn is less than 5
			if (guesses.length > 5) {
				console.log('you used all your guesses!')
				return
			}
			// do not allow duplicate words
			if (history.includes(currentGuess)) {
				console.log('you already tried that word.')
				return
			}
			// check word is 5 chars
			if (currentGuess.length !== 5) {
				console.log('word must be 5 chars.')
				return
			}
			const formatted = formatGuess()
			addNewGuess(formatted)
		}
		if (key === 'Backspace') {
			setCurrentGuess((prev) => prev.slice(0, -1))
			return
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => prev + key)
			}
		}
	}

	return { currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle
