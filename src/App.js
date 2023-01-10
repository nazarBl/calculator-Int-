import React, { useEffect, useState } from 'react';

import style from './App.module.scss';

import buttons from './Store/Store';

import Button from './components/Button/Button';

const App = () => {
	const [firstOperand, setFirstOperand] = useState('');
	const [secondOperand, setSecondOperand] = useState('');
	const [operation, setOperation] = useState('cleared');
	const [result, setResult] = useState('');
	const [displayValue, setDisplayValue] = useState('0');

	useEffect(() => {
		console.log(`Operation:${operation}`);
		console.log(`First operand:${firstOperand}`);
		console.log(`Second operand:${secondOperand}`);
		console.log('------------------------------');

		if (operation === 'cleared' && !firstOperand) {
			setDisplayValue('0');
		} else if (!secondOperand && firstOperand) {
			setDisplayValue(firstOperand);
		} else if (secondOperand && operation !== 'equals') {
			setDisplayValue(secondOperand);
			setResult('');
		} else if (operation === 'equals') {
			setDisplayValue(result);
		} else {
			setDisplayValue('error');
		}
	}, [operation, firstOperand, secondOperand, result, displayValue]);

	return (
		<div className={style.appWrapper}>
			<div className={style.displayBlock}>{displayValue}</div>

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
						displayValue={displayValue}
					/>
				);
			})}
		</div>
	);
};

export default App;
