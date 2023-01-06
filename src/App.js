import React, { useEffect, useRef, useState } from 'react';

import style from './App.module.scss';

import buttons from './Store/Store';

import Button from './components/Button/Button';

const App = () => {
	const [firstOperand, setFirstOperand] = useState('');
	const [secondOperand, setSecondOperand] = useState('');
	const [operation, setOperation] = useState('cleared');
	const [result, setResult] = useState('');

	const inputRef = useRef();
	useEffect(() => {
		console.log(`Operation:${operation}`);
		console.log(`First operand:${firstOperand}`);
		console.log(`Second operand:${secondOperand}`);
		console.log('------------------------------');

		if (operation === 'cleared' && !firstOperand) {
			inputRef.current.value = '0';
		} else if (!secondOperand && firstOperand) {
			inputRef.current.value = firstOperand;
		} else if (secondOperand && operation !== 'equals') {
			inputRef.current.value = secondOperand;
			setResult('');
		} else if (operation === 'equals') {
			inputRef.current.value = result;
		} else {
			inputRef.current.value = 'error';
		}
	}, [operation, firstOperand, secondOperand, result]);

	return (
		<div className={style.appWrapper}>
			<input className={style.input} value="0" ref={inputRef}></input>

			{buttons.map((el, index) => {
				return (
					<Button
						key={index}
						icon={el.icon}
						value={el.value}
						operation={operation}
						setOperation={setOperation}
						setFirstOperand={setFirstOperand}
						setSecondOperand={setSecondOperand}
						firstOperand={firstOperand}
						secondOperand={secondOperand}
						setResult={setResult}
						result={result}
						inputRef={inputRef}
					/>
				);
			})}
		</div>
	);
};

export default App;
